import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import FormLayout from "@/layouts/FormLayout";
import { ReservationForm } from "@/components/reservations/ReservationForm";

const AddReservation = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("New reservation data:", data);
    navigate(ROUTES.RESERVATIONS);
  };

  return (
    <FormLayout
      title="New Reservation"
      description="Create a new reservation for a guest."
    >
      <ReservationForm onSubmit={handleSubmit} />
    </FormLayout>
  );
};

export default AddReservation; 