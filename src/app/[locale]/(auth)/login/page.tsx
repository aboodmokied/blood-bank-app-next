"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Mail, Lock, Heart, ArrowRight, Loader2, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleApiError } from "@/lib/api-error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { LocaleSwitcher } from "@/components/locale-switcher";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["donor", "hospital", "doctor", "admin"], {
    required_error: "Please select a role",
  }),
});

export default function LoginPage() {
  const t = useTranslations("login");
  const tRoles = useTranslations("roles");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "donor",
    },
  });

  const fillCredentials = (email: string, role: "donor" | "hospital" | "doctor" | "admin") => {
    form.setValue("email", email, { shouldValidate: true });
    form.setValue("password", "password123", { shouldValidate: true });
    form.setValue("role", role, { shouldValidate: true });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading(t("loading"));

    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.dismiss(toastId);
      toast.success(t("success"));
      router.push("/dashboard");
    } catch (error: any) {
      toast.dismiss(toastId);
      const { message } = handleApiError(error);
      toast.error(message || t("error"));

      if (message.includes("Credential") || message.includes("Invalid")) {
         form.setError("email", {
           type: "manual",
           message: t("invalid"),
         });
         form.setError("password", {
           type: "manual",
           message: t("invalid"),
         });
      }
    }
  }

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 min-h-screen flex flex-col relative">
      {/* Language Switcher */}
      <div className="absolute top-4 end-4 z-20">
        <LocaleSwitcher />
      </div>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="bg-red-600 p-3 rounded-lg">
                  <Heart className="h-8 w-8 text-white fill-current" />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-gray-900">LifeBank</h1>
                  <p className="text-sm text-gray-600">{t("system")}</p>
                </div>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t("welcome")}
            </h2>
            <p className="text-gray-600">{t("description")}</p>
          </div>

          {/* Login Form */}
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

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-gray-900 font-medium">
                          {t("password")}
                        </FormLabel>
                        <Link
                          href="/forgot-password"
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          {t("forgot")}
                        </Link>
                      </div>
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

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">
                        {t("role")}
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          {(
                            ["donor", "hospital", "doctor", "admin"] as const
                          ).map((role) => (
                            <Button
                              key={role}
                              type="button"
                              variant={"outline"}
                              onClick={() => field.onChange(role)}
                              className={`capitalize flex items-center gap-2 cursor-pointer ${
                                field.value === role
                                  ? "bg-red-400 text-white hover:bg-red-600 hover:text-white"
                                  : ""
                              }`}
                            >
                              {role === "donor" && "🧑‍💉"}
                              {role === "hospital" && "🏥"}
                              {role === "doctor" && "🩺"}
                              {role === "admin" && "🔐"}
                              {tRoles(role)}
                            </Button>
                          ))}
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

            {/* Test Credentials Box */}
            <div className="mt-6 p-4 bg-red-50/50 rounded-lg border border-red-200/50 text-sm">
              <div className="flex items-center gap-2 font-semibold text-red-800 mb-2">
                <Info className="h-4 w-4" />
                <span>{t("testAccountHint")}</span>
              </div>
              <div className="space-y-2 text-gray-700">
                {[
                  { role: "donor", email: "donor0@test.com", icon: "🧑‍💉" },
                  { role: "hospital", email: "city@hospital.com", icon: "🏥" },
                  { role: "doctor", email: "house@hospital.com", icon: "🩺" },
                  { role: "admin", email: "admin@test.com", icon: "🔐" },
                ].map((item) => (
                  <div
                    key={item.role}
                    onClick={() => fillCredentials(item.email, item.role as any)}
                    className="flex justify-between items-center p-1.5 hover:bg-red-100/50 rounded cursor-pointer transition-colors duration-200"
                    title={t("testAccountHint")}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span className="font-medium text-xs capitalize">{tRoles(item.role)}:</span>
                    </span>
                    <code className="text-xs text-red-900 bg-red-100 px-1.5 py-0.5 rounded font-mono">{item.email}</code>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center border-t pt-1.5 border-dashed border-red-200/50">
                {t("testPasswordHint")}
              </p>
            </div>

            <Separator className="my-8" />

            <div className="text-center text-sm text-gray-600">
              {t("noAccount")}{" "}
              <Link
                href="/register"
                className="font-medium text-red-600 hover:text-red-700 hover:underline"
              >
                {t("signup")}
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            {t("footerNote")}
          </div>
        </div>
      </main>
    </div>
  );
}
