import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BranchForm } from "@/components/branches/BranchForm";
import type { Branch, BranchResponse } from "@/types/api/branch";
import { branchService } from "@/services/branchService";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Trash } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/Dialog/DeleteConfirmationDialog";
import SingleItemLayout from "@/layouts/SingleItemLayout";
import { RoleGuard } from "@/hooks/RoleGuard";
import { UserRole } from "@/types/api/user";

const BranchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [branch, setBranch] = useState<BranchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  RoleGuard(UserRole.SuperAdmin);

  useEffect(() => {
    const fetchBranch = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await branchService.getById(parseInt(id));
        setBranch(data);
      } catch (error) {
        console.error('Failed to fetch branch:', error);
        navigate(ROUTES.BRANCHES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranch();
  }, [id, navigate]);

  const handleUpdate = async (data: Branch) => {
    if (!id || !branch) return;

    try {
      setIsUpdating(true);
      const response = await branchService.update(parseInt(id), data);
      setBranch(response.data);
      toast.success('Branch updated successfully');
    } catch (error) {
      console.error('Failed to update branch:', error);
      toast.error('Failed to update branch');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await branchService.delete(parseInt(id!));
      toast.success('Branch deleted successfully');
      navigate(ROUTES.BRANCHES);
    } catch (error) {
      console.error('Failed to delete branch:', error);
      toast.error('Failed to delete branch');
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading || !branch) {
    return <div className="text-center">Loading branch details...</div>;
  }

  const deleteButton = (
    <Button
      variant="destructive"
      className="gap-2"
      onClick={() => setShowDeleteDialog(true)}
      disabled={isDeleting}
    >
      <Trash className="h-4 w-4" />
      Delete Branch
    </Button>
  );

  const branchOverview = (
    <>
      <CardTitle className="flex items-center gap-2">
        <Building2 className="h-5 w-5" />
        {branch.name}
      </CardTitle>
      <CardDescription className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        {branch.location}
      </CardDescription>
    </>
  );

  return (
    <>
      <SingleItemLayout
        title="Branch Details"
        description="View and manage branch information"
        backHref={ROUTES.BRANCHES}
        onBackClick={() => navigate(ROUTES.BRANCHES)}
        actionButton={deleteButton}
        overview={branchOverview}
      >
        <BranchForm
          onSubmit={handleUpdate}
          defaultValues={branch}
          isLoading={isUpdating}
          mode="update"
        />
      </SingleItemLayout>

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Branch"
        description="Are you sure you want to delete this branch? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
};

export default BranchDetails;