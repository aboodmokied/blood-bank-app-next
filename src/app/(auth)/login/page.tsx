"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

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
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Icons } from "@/components/icons";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
  // Show loading state
  const loadingToast = toast.loading("Signing in...");
  try {
    // Make API call
    const response = await axios.post('/api/login', {
      email: values.email,
      password: values.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Handle successful login
    toast.dismiss(loadingToast);
    toast.success("Login successful!");

    // Redirect to dashboard or home page
    window.location.href = '/dashboard'; // Or use Next.js router
    
    // Alternatively, you could return the user data
    return response.data;

  } catch (error) {
    // Handle errors
    toast.dismiss(loadingToast);
    
    if (axios.isAxiosError(error)) {
      // Axios-specific error
      const message = error.response?.data?.message || error.message;
      toast.error(message || "Login failed");
    } else {
      // Generic error
      toast.error("An unexpected error occurred");
    }
    
    // You can also update form errors
    form.setError('email', {
      type: 'manual',
      message: 'Invalid credentials'
    });
    form.setError('password', {
      type: 'manual',
      message: 'Invalid credentials'
    });
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-8 shadow-lg border">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign in
            </Button>
          </form>
        </Form>

        <Separator className="my-6" />

        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            <Icons.github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}