"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import axios from "axios";
import { toast } from "sonner";
import { handleApiError, setFormErrors } from "@/lib/api-error";

import { Lock, CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm({ role }: { role: string }) {
  const t = useTranslations("resetPassword");
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.replace(`/forgot-password/${role}`);
    }
  }, [role, router]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const toastId = toast.loading(t("loading"));

    try {
      const res = await axios.post("/api/forgot-password/reset-password", {
        email,
        role,
        newPassword: values.password,
      });

      toast.dismiss(toastId);
      toast.success(res.data?.message || t("success"));

      localStorage.removeItem("resetEmail");
      router.push("/login");
    } catch (error: any) {
      toast.dismiss(toastId);
      const { message, errors } = handleApiError(error);
      toast.error(message || t("error"));
      
      if (errors) {
        setFormErrors(errors, form.setError);
      } else if (error.response?.status === 400) {
         // Fallback for current behaviour if backend doesn't send structured errors
         form.setError("password", {
           type: "manual",
           message: message,
         });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white border rounded-xl shadow-xl p-8 max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {t("title")}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    {t("new")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    {t("confirm")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold transition-transform duration-300 hover:scale-105"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t("loading")}
                </>
              ) : (
                t("submit")
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
