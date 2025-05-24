import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface SingleItemLayoutProps {
  title: string;
  description: string;
  backHref: string;
  onBackClick: () => void;
  actionButton?: ReactNode;
  overview?: ReactNode;
  children: ReactNode;
}

const SingleItemLayout = ({
  title,
  description,
  onBackClick,
  actionButton,
  overview,
  children
}: SingleItemLayoutProps) => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackClick}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        {actionButton}
      </div>

      {/* Overview Card */}
      {overview && (
        <Card>
          <CardHeader>
            {overview}
          </CardHeader>
        </Card>
      )}

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Edit {title}</CardTitle>
          <CardDescription>
            Update the {title.toLowerCase()} information using the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-2xl">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleItemLayout;