import { GuestForm } from "@/components/guests/GuestForm";
import type { Guest } from "@/types/api/guest";
import { useNavigate } from "react-router-dom";
import FormLayout from "@/layouts/FormLayout";
import { guestService } from "@/services/guestService";
import { useState } from "react";
import { toast } from "sonner";

const AddGuest = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Guest) => {
    try {
      setIsLoading(true);
      await guestService.create(data);
      toast.success("Guest added successfully");
      navigate(-1);
    } catch (error) {
      console.error("Failed to create guest:", error);
      toast.error("Failed to create guest");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout
      title="Add New Guest"
      description="Register a new guest in the system."
    >
      <GuestForm onSubmit={handleSubmit} isLoading={isLoading} />
    </FormLayout>
  );
};

export default AddGuest;
