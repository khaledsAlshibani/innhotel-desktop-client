import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, X, Plus } from "lucide-react";
import type { Guest } from "@/types/guest";
import type { Room } from "@/types/room";
import type { Service } from "@/types/service";
import guestsData from "@/mocks/guests.json";
import roomsData from "@/mocks/rooms.json";
import servicesData from "@/mocks/services.json";
import branchesData from "@/mocks/branches.json";

interface ReservationFormData {
  guest_id: string;
  branch_id: string;
  check_in_date: Date;
  check_out_date: Date;
  rooms: { id: string; price_per_night: number }[];
  services: { id: string; quantity: number }[];
}

interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => void;
}

export const ReservationForm = ({ onSubmit }: ReservationFormProps) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
  const [selectedServices, setSelectedServices] = useState<Array<{ service: Service; quantity: number }>>([]);

  const form = useForm<ReservationFormData>({
    defaultValues: {
      guest_id: "",
      branch_id: "",
      rooms: [],
      services: [],
    },
  });

  const guests = (guestsData as { guests: Guest[] }).guests;
  const rooms = (roomsData as { rooms: Room[] }).rooms;
  const services = (servicesData as { services: Service[] }).services;
  const branches = branchesData.branches;

  const handleAddRoom = (roomId: string) => {
    const room = rooms.find(r => r.id.toString() === roomId);
    if (room && !selectedRooms.find(r => r.id === room.id)) {
      setSelectedRooms([...selectedRooms, room]);
      form.setValue('rooms', [
        ...form.getValues('rooms'),
        { id: roomId, price_per_night: room.price_per_night }
      ]);
    }
  };

  const handleRemoveRoom = (roomId: number) => {
    setSelectedRooms(selectedRooms.filter(room => room.id !== roomId));
    form.setValue('rooms', form.getValues('rooms').filter(room => room.id !== roomId.toString()));
  };

  const handleAddService = (serviceId: string) => {
    const service = services.find(s => s.id.toString() === serviceId);
    if (service && !selectedServices.find(s => s.service.id === service.id)) {
      setSelectedServices([...selectedServices, { service, quantity: 1 }]);
      form.setValue('services', [
        ...form.getValues('services'),
        { id: serviceId, quantity: 1 }
      ]);
    }
  };

  const handleRemoveService = (serviceId: number) => {
    setSelectedServices(selectedServices.filter(s => s.service.id !== serviceId));
    form.setValue('services', form.getValues('services').filter(s => s.id !== serviceId.toString()));
  };

  const handleServiceQuantityChange = (serviceId: number, quantity: number) => {
    setSelectedServices(selectedServices.map(s =>
      s.service.id === serviceId ? { ...s, quantity } : s
    ));
    form.setValue('services', form.getValues('services').map(s =>
      s.id === serviceId.toString() ? { ...s, quantity } : s
    ));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Guest Selection */}
        <FormField
          control={form.control}
          name="guest_id"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Guest</FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-primary hover:bg-transparent"
                  onClick={() => navigate(ROUTES.REGISTER_GUEST)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add guest
                </Button>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a guest" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {guests.map((guest) => (
                    <SelectItem key={guest.id} value={guest.id.toString()}>
                      {guest.first_name} {guest.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Branch Selection */}
        <FormField
          control={form.control}
          name="branch_id"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Branch</FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-primary hover:bg-transparent"
                  onClick={() => navigate(ROUTES.ADD_BRANCH)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add branch
                </Button>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Check-in Date */}
        <FormField
          control={form.control}
          name="check_in_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-in Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date(2025, 12, 31)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Check-out Date */}
        <FormField
          control={form.control}
          name="check_out_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-out Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < (form.getValues("check_in_date") || new Date()) ||
                      date > new Date(2025, 12, 31)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Room Selection */}
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Rooms</FormLabel>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-primary hover:bg-transparent"
              onClick={() => navigate(ROUTES.ADD_ROOM)}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add room
            </Button>
          </div>
          <Select onValueChange={handleAddRoom}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add room" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {rooms
                .filter(room => !selectedRooms.find(r => r.id === room.id))
                .map((room) => (
                  <SelectItem key={room.id} value={room.id.toString()}>
                    Room {room.number} - {room.type} (${room.price_per_night}/night)
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {selectedRooms.map((room) => (
            <div
              key={room.id}
              className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <span>Room {room.number} - {room.type}</span>
                <span className="text-sm text-muted-foreground">
                  ${room.price_per_night}/night
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveRoom(room.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </FormItem>

        {/* Services Selection */}
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Services</FormLabel>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-primary hover:bg-transparent"
              onClick={() => navigate(ROUTES.ADD_SERVICE)}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add service
            </Button>
          </div>
          <Select onValueChange={handleAddService}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add service" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {services
                .filter(service => !selectedServices.find(s => s.service.id === service.id))
                .map((service) => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name} (${service.price}/unit)
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {selectedServices.map(({ service, quantity }) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <span>{service.name}</span>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleServiceQuantityChange(service.id, parseInt(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">
                  ${service.price}/unit
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveService(service.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </FormItem>

        <Button type="submit" className="w-full">
          Create Reservation
        </Button>
      </form>
    </Form>
  );
};
