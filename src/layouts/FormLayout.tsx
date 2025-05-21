import type { ReactNode } from "react";

interface FormLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const FormLayout = ({ title, description, children }: FormLayoutProps) => {
  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="space-y-10 w-[500px] max-w-full">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default FormLayout;
