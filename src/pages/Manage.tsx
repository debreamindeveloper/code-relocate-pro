import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsTable from "@/components/manage/EventsTable";
import EventForm from "@/components/manage/EventForm";
import HoursTable from "@/components/manage/HoursTable";
import HoursForm from "@/components/manage/HoursForm";

const Manage = () => {
  const { instance, accounts } = useMsal();
  const account = accounts[0];
  const displayName = account?.name ?? account?.username ?? "Admin";

  const [creatingEvent, setCreatingEvent] = useState(false);
  const [creatingHour, setCreatingHour] = useState(false);

  const handleSignOut = () => {
    instance.logoutRedirect().catch((error) => {
      console.error("Logout failed", error);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{displayName}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="hours">Opening hours</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Events</h2>
                <p className="text-sm text-muted-foreground">
                  All events stored in Azure Table Storage. Past events are dimmed.
                </p>
              </div>
              <Button onClick={() => setCreatingEvent(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New event
              </Button>
            </div>
            <EventsTable />
            <EventForm open={creatingEvent} onOpenChange={setCreatingEvent} />
          </TabsContent>

          <TabsContent value="hours" className="mt-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Opening hours
                </h2>
                <p className="text-sm text-muted-foreground">
                  Weekly opening hours displayed in the public Contact section.
                </p>
              </div>
              <Button onClick={() => setCreatingHour(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New day
              </Button>
            </div>
            <HoursTable />
            <HoursForm open={creatingHour} onOpenChange={setCreatingHour} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Manage;
