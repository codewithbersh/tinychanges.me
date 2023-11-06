"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { Icons } from "@/components/ui/icons";

const formSchema = z.object({
  email: z.string().email("Email is required."),
});

type FormData = z.infer<typeof formSchema>;

export const UserAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: values.email.toLocaleLowerCase(),
      redirect: false,
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      toast.error("An error has occured.");
      return;
    }

    return setIsSent(true);
  }

  return (
    <div className="min-w-[350px] space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input placeholder="hello@brucesalcedo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSent ? (
            <div
              className="grid h-9 w-full animate-fade-up place-items-center text-sm font-medium text-green-400 opacity-0"
              style={{ animationDelay: "0.15", animationFillMode: "forwards" }}
            >
              Email sent. Kindly check your inbox.
            </div>
          ) : (
            <Button
              type="submit"
              className="w-full items-center gap-2"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in with email
            </Button>
          )}
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google");
        }}
        variant="outline"
        className="w-full items-center gap-2"
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        <Icons.google />
        Continue with Google
      </Button>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};
