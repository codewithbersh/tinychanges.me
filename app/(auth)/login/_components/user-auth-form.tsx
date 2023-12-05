"use client";

import { useState } from "react";
import { Loader, Loader2, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
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
    try {
      setIsLoading(true);
      const signInResult = await signIn("email", {
        email: values.email.toLocaleLowerCase(),
        redirect: false,
      });
      if (signInResult?.error) {
        toast.error("An error has occured.");
      } else {
        setIsSent(true);
      }
    } catch (error) {
      toast.error("An error has occured.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-w-[350px] space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          {isSent ? (
            <div
              className="grid h-24 w-full animate-fade-up place-items-center text-sm font-medium text-green-400 opacity-0"
              style={{ animationDelay: "0.15", animationFillMode: "forwards" }}
            >
              Email sent. Kindly check your inbox.
            </div>
          ) : (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="hello@brucesalcedo.com"
                        {...field}
                        className="h-10 animate-fade-up opacity-0"
                        style={{
                          animationDelay: "0.45s",
                          animationFillMode: "forwards",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full animate-fade-up items-center opacity-0"
                disabled={isLoading || isGoogleLoading}
                size="lg"
                variant="secondary"
                style={{
                  animationDelay: "0.60s",
                  animationFillMode: "forwards",
                }}
              >
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                <Mail className="mr-2 h-4 w-4" />
                Sign in with email
              </Button>
            </>
          )}
        </form>
      </Form>
      <div
        className="relative animate-fade-up opacity-0"
        style={{ animationDelay: "0.75s", animationFillMode: "forwards" }}
      >
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Button
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google");
        }}
        variant="outline"
        className="w-full animate-fade-up items-center gap-2 opacity-0"
        disabled={isLoading || isGoogleLoading}
        size="lg"
        style={{ animationDelay: "0.90s", animationFillMode: "forwards" }}
      >
        {isGoogleLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        <Icons.google />
        Continue with Google
      </Button>
    </div>
  );
};
