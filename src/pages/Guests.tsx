import mockData from "@/mocks/guests.json";
import type { Guest } from "@/types/guest";
import { GuestsTable } from "@/components/guests/GuestsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const guestsData = mockData as { guests: Guest[] };

const Guests = () => {
  const handleGuestClick = (guest: Guest) => {
    console.log("Guest clicked:", guest);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Guests Management</h1>
          <p className="text-muted-foreground">View and manage guest information.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Guest
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          Filters
        </Button>
      </div>

      <GuestsTable 
        guests={guestsData.guests} 
        onGuestClick={handleGuestClick}
      />
    </div>
  );
};

export default Guests;
