"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import { GetPrivateUser } from "@/types/types";
import { toast } from "sonner";
import slugify from "@sindresorhus/slugify";
import { Loader, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldImageUpload } from "./field-image-upload";

const formSchema = z.object({
  image: z.string().nullable(),
  name: z.string().trim().nullable(),
  bio: z.string().nullable(),
  slug: z.string().trim(),
});

type FormData = z.infer<typeof formSchema>;

interface FormProfileProps {
  initialData: GetPrivateUser;
}

export const FormProfile = ({ initialData }: FormProfileProps) => {
  const utils = trpc.useUtils();

  const { data: user } = trpc.user.private.get.useQuery(undefined, {
    initialData,
    staleTime: Infinity,
  });

  const { mutate: update, isLoading } = trpc.user.private.update.useMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {
      image: "",
      name: "",
      bio: "",
      slug: "",
    },
  });

  const onSubmit = (values: FormData) => {
    update(
      { ...values, oldImage: user.image },
      {
        onSuccess: (res) => {
          if (res.ok) {
            toast.success(res.message);
            utils.user.private.get.invalidate();
          } else {
            toast.error(res.message);
          }
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FieldImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  email={user.email!}
                  trigger={form.handleSubmit(onSubmit)}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  {...field}
                  value={field.value ?? undefined}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? undefined}
                  className="resize-none"
                  placeholder="Add a short bio"
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Link <Lock className="h-3 w-3" />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? undefined}
                  placeholder="Unique link"
                  autoComplete="off"
                  // disabled={true}
                />
              </FormControl>
              <FormDescription>
                tinychanges.me/{slugify(field.value ?? "")}
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save changes
        </Button>
      </form>
    </Form>
  );
};
