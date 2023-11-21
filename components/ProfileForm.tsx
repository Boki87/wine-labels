"use client";
import { Profile } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { profileSchema, profileSchemaType } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { updateProfile } from "@/actions/profile";
import CountrySelect from "@/components/CountrySelect";
import useCountries from "@/hooks/useCountries";
import { Save } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProfileFormProps {
  profile: Profile;
}

function ProfileForm({ profile }: ProfileFormProps) {
  const t = useTranslations("Profile");
  const form = useForm<profileSchemaType>({
    defaultValues: profile,
    resolver: zodResolver(profileSchema),
  });

  const { getByValue } = useCountries();

  async function onSubmit(values: profileSchemaType) {
    try {
      await updateProfile(values);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className="font-bold text-lg mb-1 mt-6">User details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("first_name")}*</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("last_name")}</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h2 className="font-bold text-lg mb-1">Company details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("company_name")}</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyIdentificationNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="truncate">
                    <FormLabel className="truncate">
                      {t("company_id")}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gln"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("gln")}</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("address")}</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("zip")}</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("city")}</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>{t("country")}</FormLabel>
              <FormControl>
                <CountrySelect
                  value={getByValue(form.getValues().country ?? "")}
                  onChange={(val) => {
                    if (!val) return;
                    form.setValue("country", val.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </form>
      </Form>
      <Button
        className="min-w-[120px] gap-2"
        onClick={form.handleSubmit(onSubmit)}
        disabled={form.formState.isSubmitting}
        loading={form.formState.isSubmitting}
      >
        <Save />
        <span>{t("submit_btn")}</span>
      </Button>
    </div>
  );
}

export default ProfileForm;
