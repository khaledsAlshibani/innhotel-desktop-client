import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService";
import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { loginSchema, type loginFormValues } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const { setAuth, setLoading, isLoading } = useAuthStore();
  const navigate = useNavigate();

  // const form = useForm({
  //   defaultValues: {
  //     email: "super@innhotel.com",
  //     password: "Sup3rP@ssword!",
  //   },
  // });

  const form = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "super@innhotel.com",
      password: "Sup3rP@ssword!",
    },
  });

  const onSubmit = async (data: loginFormValues) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(data);
      setAuth(response);
      navigate("/rooms");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 space-y-10 min-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-muted-foreground max-w-[400px] mx-auto">Enter your credentials to access your account</p>
      </div>
      
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error || "Something went wrong"}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
