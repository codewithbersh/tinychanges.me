"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { CalendarIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { GetChallenge } from "@/types/types";
import { cn } from "@/lib/utils";
import { format, startOfToday } from "date-fns";

import { FieldEmoji } from "@/app/(main)/(private)/dashboard/_components/field-emoji";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  emoji: z.string().min(1),
  challenge: z.string().min(1),
  duration: z.string().min(1),
  startDate: z.coerce.date(),
});

type FormData = z.infer<typeof formSchema>;

interface FormChallengeProps {
  initialData: GetChallenge;
}

export const FormChallenge = ({
  initialData: challenge,
}: FormChallengeProps) => {
  const router = useRouter();

  const utils = trpc.useUtils();

  const { data: initialData } = trpc.challenge.get.byId.useQuery(
    { id: challenge?.id },
    {
      initialData: challenge,
      staleTime: Infinity,
    },
  );

  const { mutate, isLoading } = trpc.challenge.mutate.useMutation();
  const { mutate: deleteChallenge, isLoading: isDeleting } =
    trpc.challenge.delete.useMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      duration: initialData?.duration === 7 ? "week" : "month",
    } || {
      emoji: "",
      challenge: "",
      duration: "month",
      date: startOfToday(),
    },
  });

  const successMessage = initialData
    ? "Challenge updated."
    : "Challenge added.";
  const submitText = initialData ? "Save Changes" : "Add Challenge";

  const onSubmit = async (values: FormData) => {
    mutate(
      { ...values, initialData: initialData?.id },
      {
        onSuccess: () => {
          toast.success(successMessage);

          // utils.challenge.public.getAll.invalidate();
          utils.challenge.get.byId.invalidate({ id: initialData?.id });
          utils.challenge.get.all.invalidate();
          router.push("/dashboard");
        },
        onError: () => {
          toast.error("An error has occured.");
        },
      },
    );
  };

  const onDelete = (id: string) => {
    deleteChallenge(
      { id },
      {
        onSuccess: () => {
          toast.info("Challenge deleted.");
          // utils.challenge.public.getAll.invalidate();
          utils.challenge.get.byId.invalidate({ id: initialData?.id });
          utils.challenge.get.all
            .invalidate()
            .finally(() => router.push("/dashboard"));
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
                  selectedColor={field.value ? "#db2777" : ""}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="challenge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="30 Days Of Code"
                  disabled={isLoading}
                  autoComplete="off"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "justify-between rounded-lg bg-input-background ",
                    )}
                  >
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-input-background">
                    <SelectItem value="week">One Week</SelectItem>
                    <SelectItem value="month">One Month</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Starting Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full rounded-lg bg-input-background pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto bg-input-background p-0"
                  align="end"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < startOfToday()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
