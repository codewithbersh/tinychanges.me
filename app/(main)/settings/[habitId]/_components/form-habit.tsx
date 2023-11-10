"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { GetPrivateHabit } from "@/types/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldEmoji } from "./field-emoji";
import { FieldColor } from "./field-color";

const formSchema = z.object({
  emoji: z.string().min(1),
  color: z.string().min(1),
  habit: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

interface FormHabitProps {
  initialData: GetPrivateHabit;
}

export const FormHabit = ({ initialData }: FormHabitProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const utils = trpc.useUtils();

  const { mutate, isLoading } = trpc.habit.add.useMutation();
  const { mutate: deleteHabit, isLoading: isDeleting } =
    trpc.habit.delete.useMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      emoji: "",
      color: "",
      habit: "",
    },
  });

  const successMessage = initialData ? "Habit updated." : "Habit ";
  const submitText = initialData ? "Save Changes" : "Save Habit";

  const onSubmit = (values: FormData) => {
    mutate(
      { ...values, initialData: initialData?.id },
      {
        onSuccess: ({ id }) => {
          toast.success(successMessage);

          if (
            pathname.toLowerCase() !== `/settings/${id.toLowerCase()}` &&
            !initialData
          ) {
            console.log("routed");
            router.push(`/settings/${id}`);
          }

          utils.habit.get.invalidate({ id });
        },
        onError: () => {
          toast.error("An error has occured.");
        },
      },
    );
  };

  const onDelete = (id: string) => {
    deleteHabit(
      { id },
      {
        onSuccess: () => {
          // invalidate habit queries
          toast.info("Habit deleted.");
          router.push("/settings");
        },
        onError: () => {
          toast.error("An error has occured.");
        },
      },
    );
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FieldEmoji
                  value={field.value}
                  onChange={field.onChange}
                  fieldError={form.formState.errors.emoji}
                  selectedColor={form.watch("color")}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <FieldColor
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="habit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habit</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Walk 15 minutes daily"
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-6 flex gap-4">
          <Button
            type="submit"
            variant="secondary"
            className="w-fit"
            disabled={isLoading}
          >
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {submitText}
          </Button>
          {initialData && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete(initialData.id)}
            >
              {isDeleting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
