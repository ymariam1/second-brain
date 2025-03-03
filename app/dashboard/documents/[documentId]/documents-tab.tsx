import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export function DocumentsTab() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Documents</TabsTrigger>
    <TabsTrigger value="password">Chat</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
    </TabsContent>
  <TabsContent value="password">
    Change your password here.
    </TabsContent>
</Tabs>

    );
}