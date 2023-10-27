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
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

interface ProfileFormProps {
  profile: Profile;
}

function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const form = useForm<profileSchemaType>({
    defaultValues: profile,
    resolver: zodResolver(profileSchema),
  });

  const { getByValue } = useCountries();

  async function onSubmit(values: profileSchemaType) {
    // console.log(values);
    try {
      await updateProfile(values);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className="font-bold text-lg mb-1">User details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name*</FormLabel>
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
                  <FormLabel>Last Name</FormLabel>
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
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Company Name</FormLabel>
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
                      Company identification number
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
                  <FormLabel>GLN</FormLabel>
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
                  <FormLabel>Address</FormLabel>
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
                  <FormLabel>ZIP</FormLabel>
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
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Country</FormLabel>
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
        <span>Update details</span>
      </Button>
    </div>
  );
}

export default ProfileForm;
