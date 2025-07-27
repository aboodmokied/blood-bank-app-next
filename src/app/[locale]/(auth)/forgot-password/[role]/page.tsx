"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import axios from "axios";
import { toast } from "sonner";

import {
  Mail,
  Lock,
  Heart,
  ArrowRight,
  Loader2,
  User2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
});

export default function EnterEmailPage() {
  const t = useTranslations("forgotPassword");
  const router = useRouter();
  const params = useParams();
  const role = params.role as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading(t("loading"));

    try {
      await axios.post("/api/forgot-password", {
        ...values,
        role,
      });

      toast.dismiss(toastId);
      toast.success(t("success"));
      localStorage.setItem("resetEmail", values.email);
      router.push(`/forgot-password/${role}/code`);
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.error || t("error"));
      if (error.status == 404) {
        form.setError("email", {
          type: "manual",
          message: error.response?.data?.error || t("invalid"),
        });
      }
    }
  }

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 min-h-screen flex flex-col relative">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* forgot pass Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">
                        {t("email")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            placeholder="you@example.com"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t("loading")}
                    </>
                  ) : (
                    <>
                      {t("submit")}
                      <ArrowRight className="ml-2 h-5 w-5" />
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
