"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import { GetPrivateUser } from "@/types/types";
import { toast } from "sonner";
import slugify from "@sindresorhus/slugify";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name should not be left blank.").nullable(),
  bio: z.string().max(128, "Bio should not exceed 128 characters.").nullable(),
  slug: z
    .string()
    .trim()
    .min(6, { message: "Link should be at least 6 characters." })
    .max(16, { message: "Link should not exceed 12 characters." }),
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
    update(values, {
      onSuccess: (res) => {
        if (res.ok) {
          toast.success(res.message);
          utils.user.private.get.invalidate();
        } else {
          toast.error(res.message);
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Bio{" "}
                <div className="text-muted-foreground/50">
                  {field.value?.length}/128
                </div>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? undefined}
                  className="resize-none"
                  placeholder="Add a short bio"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">Link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? undefined}
                  placeholder="Unique link"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
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
