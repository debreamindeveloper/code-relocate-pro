import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import EventsTable from "@/components/manage/EventsTable";
import EventForm from "@/components/manage/EventForm";

const Manage = () => {
  const { instance, accounts } = useMsal();
  const account = accounts[0];
  const displayName = account?.name ?? account?.username ?? "Admin";

  const [creating, setCreating] = useState(false);

  const handleSignOut = () => {
    instance.logoutRedirect().catch((error) => {
      console.error("Logout failed", error);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Event Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{displayName}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Events</h2>
            <p className="text-sm text-muted-foreground">
              All events stored in Azure Table Storage. Past events are dimmed.
            </p>
          </div>
          <Button onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New event
          </Button>
        </div>

        <EventsTable />

        <EventForm open={creating} onOpenChange={setCreating} />
      </main>
    </div>
  );
};

export default Manage;
