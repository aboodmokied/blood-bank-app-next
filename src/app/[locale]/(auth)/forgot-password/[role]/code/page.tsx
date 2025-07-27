"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter, useParams, notFound } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

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
import { ShieldCheck, Loader2, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z.object({
  code: z.string().min(4, "Code must be at least 4 characters"),
});

export default function EnterCodePage() {
  const t = useTranslations("resetCode");
  const router = useRouter();
  const params = useParams();
  const role = params.role as string;
  const [email, setEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading(t("verifying"));

    try {
      await axios.post("/api/verify-code", {
        role,
        code: values.code,
        email,
      });

      toast.dismiss(toastId);
      toast.success(t("success"));

      router.push(`/forgot-password/${role}/reset`);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(t("error"));

      form.setError("code", {
        type: "manual",
        message: t("invalid"),
      });
    }
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      notFound();
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 min-h-screen flex flex-col relative">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Code Verification Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Code Input */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">
                        {t("code")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            placeholder="Enter code"
                            className="pl-10 h-12 tracking-widest"
                            maxLength={6}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t("verifying")}
                    </>
                  ) : (
                    <>
                      {t("verify")}
                      <ShieldCheck className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            {t("footerNote")}
          </div>
        </div>
      </main>
    </div>
  );
}
