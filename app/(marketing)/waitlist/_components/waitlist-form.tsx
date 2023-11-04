"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

export const WaitlistForm = () => {
  const { mutate: addToWaitlist } = trpc.waitlist.add.useMutation();
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: FormData) => {
    addToWaitlist(values, {
      onSuccess: (response) => {
        setShowSuccess(response.message);
      },
    });
  };

  if (showSuccess) {
    return (
      <div className="h-[88px] w-full grid place-items-center">
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
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Get Notified <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </Form>
  );
};
