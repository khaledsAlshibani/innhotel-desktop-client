import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
import type { GuestResponse } from "@/types/api/guest";
import type { Service } from "@/types/service";
import type { Reservation } from "@/types/api/reservation";
import type { RoomResponse } from "@/types/api/room";
import servicesData from "@/mocks/services.json";
import { roomService } from "@/services/roomService";
import { guestService } from "@/services/guestService";
import { toast } from "sonner";

interface ReservationFormProps {
  onSubmit: (data: Reservation) => void;
  isLoading?: boolean;
}

export const ReservationForm = ({ onSubmit, isLoading }: ReservationFormProps) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState<RoomResponse[]>([]);
  const [selectedServices, setSelectedServices] = useState<Array<{ service: Service; quantity: number }>>([]);
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [guests, setGuests] = useState<GuestResponse[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLoadingGuests, setIsLoadingGuests] = useState(true);

  const form = useForm<Reservation>({
    defaultValues: {
      guestId: 0,
      checkInDate: "",
      checkOutDate: "",
      rooms: [],
      services: [],
    },
  });

  const services = (servicesData as { services: Service[] }).services;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingRooms(true);
        setIsLoadingGuests(true);
        
        const [roomsResponse, guestsResponse] = await Promise.all([
          roomService.getAll(),
          guestService.getAll()
        ]);
        
        setRooms(roomsResponse.items);
        setGuests(guestsResponse.items);
      } catch (error) {
        toast.error("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingRooms(false);
        setIsLoadingGuests(false);
      }
    };

    fetchData();
  }, []);

  const handleAddRoom = (roomId: string) => {
    const room = rooms.find(r => r.id.toString() === roomId);
    if (room && !selectedRooms.find(r => r.id === room.id)) {
      setSelectedRooms([...selectedRooms, room]);
      form.setValue('rooms', [
        ...form.getValues('rooms'),
        { roomId: parseInt(roomId), pricePerNight: room.basePrice }
      ]);
    }
  };

  const handleRemoveRoom = (roomId: number) => {
    setSelectedRooms(selectedRooms.filter(room => room.id !== roomId));
    form.setValue('rooms', form.getValues('rooms').filter(room => room.roomId !== roomId));
  };

  const handleAddService = (serviceId: string) => {
    const service = services.find(s => s.id.toString() === serviceId);
    if (service && !selectedServices.find(s => s.service.id === service.id)) {
      setSelectedServices([...selectedServices, { service, quantity: 1 }]);
      form.setValue('services', [
        ...form.getValues('services'),
        { serviceId: parseInt(serviceId), quantity: 1, unitPrice: service.price }
      ]);
    }
  };

  const handleRemoveService = (serviceId: number) => {
    setSelectedServices(selectedServices.filter(s => s.service.id !== serviceId));
    form.setValue('services', form.getValues('services').filter(s => s.serviceId !== serviceId));
  };

  const handleServiceQuantityChange = (serviceId: number, quantity: number) => {
    setSelectedServices(selectedServices.map(s =>
      s.service.id === serviceId ? { ...s, quantity } : s
    ));
    form.setValue('services', form.getValues('services').map(s =>
      s.serviceId === serviceId ? { ...s, quantity } : s
    ));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Guest Selection */}
        <FormField
          control={form.control}
          name="guestId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Guest</FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-primary hover:bg-transparent"
                  onClick={() => navigate(ROUTES.ADD_GUEST)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add guest
                </Button>
              </div>
              <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={isLoadingGuests ? "Loading guests..." : "Select a guest"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {guests.map((guest) => (
                    <SelectItem key={guest.id} value={guest.id.toString()}>
                      {guest.firstName} {guest.lastName}
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
          name="checkInDate"
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
                        format(new Date(field.value), "PPP")
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
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString().split('T')[0])}
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
          name="checkOutDate"
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
                        format(new Date(field.value), "PPP")
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
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString().split('T')[0])}
                    disabled={(date) =>
                      date < (form.getValues("checkInDate") ? new Date(form.getValues("checkInDate")) : new Date()) ||
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
          <Select onValueChange={handleAddRoom} disabled={isLoadingRooms}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={isLoadingRooms ? "Loading rooms..." : "Add room"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {rooms
                .filter(room => !selectedRooms.find(r => r.id === room.id))
                .map((room) => (
                  <SelectItem key={room.id} value={room.id.toString()}>
                    Room {room.roomNumber} - {room.roomTypeName} (${room.basePrice}/night)
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
                <span>Room {room.roomNumber} - {room.roomTypeName}</span>
                <span className="text-sm text-muted-foreground">
                  ${room.basePrice}/night
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Reservation..." : "Create Reservation"}
        </Button>
      </form>
    </Form>
  );
};
