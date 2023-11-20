"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FieldImageUpload } from "./field-image-upload";

const formSchema = z.object({
  image: z.string().nullable(),
});

type FormData = z.infer<typeof formSchema>;

interface FormImageProps {
  initialData: {
    image: string | null;
    email: string | null;
  };
}

export const FormImage = ({ initialData }: FormImageProps) => {
  const utils = trpc.useUtils();

  const { data } = trpc.user.private.getImage.useQuery(undefined, {
    initialData,
    staleTime: Infinity,
  });

  const { mutate: update, isLoading } =
    trpc.user.private.updateImage.useMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      image: "",
    },
  });

  const onSubmit = (values: FormData) => {
    update(
      { ...values, oldImage: initialData.image },
      {
        onSuccess: (res) => {
          if (res.ok) {
            toast.success(res.message);
            utils.user.private.getImage.invalidate();
            // utils.user.private.get.invalidate();
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
                  email={data.email!}
                  trigger={form.handleSubmit(onSubmit)}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
