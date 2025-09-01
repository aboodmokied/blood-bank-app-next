"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import axios from "axios";
import { toast } from "sonner";

import { User, MapPin, Calendar, Droplet, Loader2, Pencil } from "lucide-react";

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

const formSchema = z.object({
  name: z.string().min(3),
  gender: z.enum(["male", "female", "other"]),
  birthdate: z.string().nonempty(),
  address: z.string().min(3),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
  image: z.string().optional(),
});

export default function FillProfilePage() {
  //   const t = useTranslations("profile");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "male",
      birthdate: "",
      address: "",
      bloodType: "O+",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("loading");

    try {
      await axios.post("/api/profile", values);
      toast.dismiss(toastId);
      toast.success("success");
      router.push("/dashboard");
    } catch (_) {
      toast.dismiss(toastId);
      toast.error("error");
    }
  }

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 min-h-screen flex flex-col relative">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {/* {t("completeProfile")} */}
              Complete Profile
            </h2>
            <p className="text-gray-600">{"description"}</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Image Upload */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <img
                      src={form.watch("image") || "/default-avatar.png"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => alert("Upload image here")}
                      className="absolute bottom-0 right-0 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{"upload"}</p>
                </div>

                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"name"}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            placeholder={"namePlaceholder"}
                            className="pl-10 h-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"gender"}</FormLabel>
                      <FormControl>
                        <div className="flex gap-4">
                          {["male", "female", "other"].map((g) => (
                            <Button
                              key={g}
                              type="button"
                              variant="outline"
                              onClick={() => field.onChange(g)}
                              className={`capitalize ${
                                field.value === g ? "bg-red-400 text-white" : ""
                              }`}
                            >
                              {g}
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Birthdate */}
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"birthdate"}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="date"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"address"}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            placeholder={"addressPlaceholder"}
                            className="pl-10 h-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Blood Type */}
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"bloodType"}</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "O+",
                            "O-",
                            "AB+",
                            "AB-",
                          ].map((type) => (
                            <Button
                              key={type}
                              type="button"
                              variant="outline"
                              onClick={() => field.onChange(type)}
                              className={`${
                                field.value === type
                                  ? "bg-red-400 text-white"
                                  : ""
                              }`}
                            >
                              <Droplet className="h-4 w-4 mr-1" />
                              {type}
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
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg shadow-lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {"loading"}
                    </>
                  ) : (
                    "save"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
