import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { GuestResponse, Guest, UpdateGuestResponse } from "@/types/api/guest";
import { guestService } from "@/services/guestService";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { User, Mail, Trash } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/Dialog/DeleteConfirmationDialog";
import SingleItemLayout from "@/layouts/SingleItemLayout";
import { GuestForm } from "@/components/guests/GuestForm";

const GuestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [guest, setGuest] = useState<GuestResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await guestService.getById(+id);
        setGuest(data);
      } catch {
        navigate(ROUTES.GUESTS);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleUpdate = async (values: Guest) => {
    if (!guest) return;
    setIsUpdating(true);
    try {
      const response: UpdateGuestResponse = await guestService.update(guest.id, values);
      setGuest(response.data);
      toast.success("Guest updated successfully");
    } catch {
      toast.error("Failed to update guest");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!guest) return;
    setIsDeleting(true);
    try {
      await guestService.delete(guest.id);
      toast.success("Guest deleted successfully");
      navigate(ROUTES.GUESTS);
    } catch {
      toast.error("Failed to delete guest");
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading || !guest) {
    return <div className="text-center py-10">Loading guest details…</div>;
  }

  const deleteButton = (
    <Button
      variant="destructive"
      className="gap-2"
      onClick={() => setShowDeleteDialog(true)}
      disabled={isDeleting}
    >
      <Trash className="h-4 w-4" />
      Delete Guest
    </Button>
  );

  const overview = (
    <>
      <CardTitle className="flex items-center gap-2">
        <User className="h-5 w-5" />
        {guest.firstName} {guest.lastName}
      </CardTitle>
      <CardDescription className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        {guest.email}
      </CardDescription>
    </>
  );

  return (
    <>
      <SingleItemLayout
        title="Guest Details"
        description="View and manage guest information"
        backHref={ROUTES.GUESTS}
        onBackClick={() => navigate(ROUTES.GUESTS)}
        actionButton={deleteButton}
        overview={overview}
      >
        <GuestForm
          onSubmit={handleUpdate}
          defaultValues={guest}
          isLoading={isUpdating}
          mode="update"
        />
      </SingleItemLayout>

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Guest"
        description="Are you sure you want to delete this guest? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
};

export default GuestDetails;
