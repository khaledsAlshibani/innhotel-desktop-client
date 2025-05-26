import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FormLayout from "@/layouts/FormLayout";
import { ReservationForm } from "@/components/reservations/ReservationForm";
import { reservationService } from "@/services/reservationService";
import type { Reservation } from "@/types/api/reservation";

const AddReservation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Reservation) => {
    try {
      setIsLoading(true);
      await reservationService.create(data);
      toast.success("Reservation created successfully");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to create reservation");
      console.error("Error creating reservation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout
      title="New Reservation"
      description="Create a new reservation for a guest."
    >
      <ReservationForm onSubmit={handleSubmit} isLoading={isLoading} />
    </FormLayout>
  );
};
export default AddReservation; 
