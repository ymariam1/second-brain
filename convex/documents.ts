import { action, internalQuery, mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import OpenAI from 'openai';
import { Id } from "./_generated/dataModel";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getDocuments = query({
    async handler(ctx) {
      const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  
      if (!userId) {
        return [];
      }
  
      return await ctx.db
        .query("documents")
        .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
        .collect();
    },
  });

  export async function hasAccessToDocument(ctx: MutationCtx | QueryCtx, documentId: Id<"documents">) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        
        if (!userId) {
            return null;
        }
        const document = await ctx.db.get(documentId);

        if (!document) {
            return null;
        }

        if (document?.tokenIdentifier !== userId) {
            return null;
        }

        return { document, userId };
  }


export const getDocument = query({
    args: {
        documentId: v.id("documents"),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToDocument(ctx, args.documentId);
       
        if (!accessObj) {
            return null;
        }
        return {...accessObj.document, 
            documentUrl: await ctx.storage.getUrl(accessObj.document.fileId) };
    },
})

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  });

export const createDocument = mutation({
    args: {
        title: v.string(),
        fileId: v.id("_storage"),
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        
        if (!userId) {
            throw new ConvexError('Not authenticated')
        }
        await ctx.db.insert('documents', {
            title: args.title,
            tokenIdentifier: userId,
            fileId: args.fileId,
        })
    },
})

export const hasAccessToDocumentQuery = internalQuery({
    args: {
        documentId: v.id("documents"),
    },
    async handler(ctx, args) {
        return await hasAccessToDocument(ctx, args.documentId);
    }
})

export const askQuestion = action({
    args: {
        question: v.string(),
        documentId: v.id('documents'),
    },
    async handler(ctx, args) {
        const accessObj = await ctx.runQuery(internal.documents.hasAccessToDocumentQuery, { 
            documentId: args.documentId 
        });
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        

        if (!accessObj) {
            throw new ConvexError('You do not have access to the document')
        }

        const file = await ctx.storage.get(accessObj.document.fileId);

        if (!file) {
            throw new ConvexError('File not found')
        }
        
        const text = await file.text();
        const chatCompletion: OpenAI.Chat.Completions.ChatCompletion = await client.chat.completions.create({
            messages: [
                { 
                    role: 'system', 
                    content: ` 
            You are a highly knowledgeable and reliable assistant that helps manage and reference files within a "second brain" system. 
            You are given the content of a text file. 
            - You will read the text carefully. 
            - When answering questions, use only the information provided in the text file. 
            - If the question cannot be answered using the text file, state that there is insufficient information. 
            - Provide answers in a clear, concise, and accurate manner, referencing relevant sections of the text where appropriate.

            Content of the text file:
            ${text}
            `,        
                },
                { 
                    role: 'user',
                    content: `Please answer the following question based on the text file above: ${args.question}`,

                }],
            model: 'gpt-4o',
          });
          await ctx.runMutation(internal.chats.createChatRecord, {
            documentId: args.documentId, 
            text: args.question,
            isHuman: true,
            tokenIdentifier: accessObj.userId,
          });

          const response = chatCompletion.choices[0].message.content ?? 'could not generate a response';

          await ctx.runMutation(internal.chats.createChatRecord, {
            documentId: args.documentId, 
            text: response,
            isHuman: false,
            tokenIdentifier: accessObj.userId,
          });

          
          return response;
    },
}) 