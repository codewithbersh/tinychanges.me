"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { FieldEmoji } from "./field-emoji";
import { FieldColor } from "./field-color";
import { DeleteModal } from "./delete-modal";

const formSchema = z.object({
  emoji: z.string().min(1),
  habit: z.string().min(1),
  color: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

interface HabitFormProps {
  habitId: string;
  slug: string;
}

export const HabitForm = ({ habitId, slug }: HabitFormProps) => {
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data: initialData, isLoading } = trpc.habit.getByHabitId.useQuery(
    {
      habitId,
    },
    {
      staleTime: Infinity,
    },
  );

  const { mutate, isLoading: isMutating } = trpc.habit.create.useMutation();
  const { mutate: deleteHabit, isLoading: isDeleting } =
    trpc.habit.delete.useMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      emoji: "",
      habit: "",
      color: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = (values: FormData) => {
    mutate(
      { ...values, id: initialData?.id },
      {
        onSuccess: (habit) => {
          toast.success(successMessage);
          utils.habit.getByHabitId.invalidate({ habitId: habit.id });
          utils.habit.getAll.invalidate();
          router.push(`/${slug}`);
        },
      },
    );
  };

  const handleDelete = () => {
    if (!initialData?.id) {
      return;
    }

    deleteHabit(
      { id: initialData.id },
      {
        onSuccess: () => {
          toast.success("Habit deleted.");
          utils.habit.getByHabitId.invalidate({ habitId: initialData.id });
          utils.habit.getAll.invalidate();
          router.push(`/${slug}`);
        },
        onError: () => {
          toast.error("Failed to delete habit.");
        },
      },
    );
  };

  if (isLoading) {
    return <HabitForm.Skeleton />;
  }

  const successMessage = initialData ? "Habit updated" : "Habit created";
  const submittingMessage = initialData ? "Saving habit" : "Adding habit";
  const submitText = initialData ? "Save habit" : "Add habit";
  const isSubmitting = form.formState.isSubmitting || isMutating;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-sm flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emoji</FormLabel>
              <FormControl>
                <FieldEmoji
                  value={field.value}
                  onChange={field.onChange}
                  selectedColor={form.watch("color")}
                  isSubmitting={isSubmitting}
                  fieldError={form.formState.errors.emoji}
                />
              </FormControl>
              <FormMessage />
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
                  placeholder="Run 15 minutes daily"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
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
                  isSubmitting={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex gap-4">
          <Button type="submit" className="w-fit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin " />
                {submittingMessage}
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                {submitText}
              </>
            )}
          </Button>

          {initialData && (
            <DeleteModal onDelete={handleDelete} isLoading={isDeleting}>
              <Button variant="destructive" className="" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </DeleteModal>
          )}
        </div>
      </form>
    </Form>
  );
};

HabitForm.Skeleton = function SkeletonHabitForm() {
  return (
    <div className="flex max-w-sm flex-col gap-8">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="mt-8 h-24 w-24 rounded-lg" />
      </div>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
      <div className="mt-4 flex gap-4">
        <Skeleton className="h-8 w-[118px] rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
};
