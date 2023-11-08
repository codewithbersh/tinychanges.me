"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, Loader } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
//@ts-ignore
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

export const WaitlistForm = () => {
  const { mutate: addToWaitlist, isLoading } = trpc.waitlist.add.useMutation();
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const disabled = isLoading;

  const onSubmit = (values: FormData) => {
    addToWaitlist(values, {
      onSuccess: (response) => {
        setShowSuccess(response.message);
        confetti({
          particleCount: 200,
          spread: 360,
          origin: { y: 0.4 },
          colors: ["#facc15"],
        });
      },
    });
  };

  if (showSuccess) {
    return (
      <div
        className="grid h-[88px] w-full animate-fade-up place-items-center text-green-500 opacity-0"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        {showSuccess}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 sm:px-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem
              className="animate-fade-up opacity-0"
              style={{ animationDelay: "0.70s", animationFillMode: "forwards" }}
            >
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={disabled}
          className={cn(
            "w-full animate-fade-up opacity-0",
            disabled && "bg-primary/50",
          )}
          style={{ animationDelay: "0.85s", animationFillMode: "forwards" }}
          size="lg"
        >
          {disabled && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Get Notified <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};
