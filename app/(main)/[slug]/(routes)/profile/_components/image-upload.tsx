"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FieldImage } from "./field-image";

const formSchema = z.object({
  image: z.string().nullable(),
});

type FormData = z.infer<typeof formSchema>;

export const ImageUpload = () => {
  const utils = trpc.useUtils();

  const { data } = trpc.user.getImage.useQuery(undefined, {
    staleTime: Infinity,
  });

  const { mutate: update } = trpc.user.updateImage.useMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      image: "",
    },
  });

  useEffect(() => {
    form.reset(data);
  }, [data, form]);

  const onSubmit = (values: FormData) => {
    update(
      { ...values, oldImage: data?.image },
      {
        onSuccess: () => {
          toast.success("Image uploaded.");
          utils.user.getUserBySlug.invalidate({ slug: data?.slug });
        },
        onError: () => {
          alert("error");
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
                <FieldImage
                  value={field.value}
                  onChange={field.onChange}
                  email={data?.email}
                  trigger={form.handleSubmit(onSubmit)}
                  disabled={false}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
