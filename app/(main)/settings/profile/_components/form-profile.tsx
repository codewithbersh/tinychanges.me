"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import { GetPrivateUser } from "@/types/types";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FieldImageUpload } from "./field-image-upload";

const formSchema = z.object({
  image: z.string().nullable(),
});

type FormData = z.infer<typeof formSchema>;

interface FormProfileProps {
  initialData: GetPrivateUser;
}

export const FormProfile = ({ initialData }: FormProfileProps) => {
  const { data: user, refetch } = trpc.user.private.get.useQuery(undefined, {
    initialData,
    staleTime: Infinity,
  });

  const { mutate: update } = trpc.user.private.update.useMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {
      image: "",
    },
  });

  const onSubmit = (values: FormData) => {
    update(
      { ...values, oldImage: user.image },
      {
        onSuccess: (res) => {
          if (res.ok) {
            toast.success(res.message);
            refetch();
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
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </form>
    </Form>
  );
};
