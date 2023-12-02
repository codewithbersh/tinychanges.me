"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "@/app/_trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form as FormParent,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageUpload } from "./image-upload";
import { FieldImage } from "./field-image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required.").nullable(),
  slug: z
    .string()
    .min(4, "Link too short.")
    .max(15, "Link too long.")
    .regex(/^[a-zA-Z_ ]+$/, { message: "Invalid characters in the link." }),
  twitterHandle: z
    .string()
    .max(15, { message: "Twitter handle too long." })
    .regex(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/, {
      message: "Invalid Twitter handle format.",
    })
    .nullable(),
});

type FormData = z.infer<typeof formSchema>;

export const Form = () => {
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data: user, isLoading } = trpc.user.getAuthUser.useQuery(undefined, {
    staleTime: Infinity,
  });

  const { mutate: update, isLoading: isMutating } =
    trpc.user.updateUser.useMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      twitterHandle: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(user);
  }, [user]);

  const onSubmit = (values: FormData) => {
    update(
      { ...values, oldSlug: user!.slug },
      {
        onSuccess: (res) => {
          if (res.ok) {
            console.log("RES.USER: ", res.user);
            toast.success(res.message);
            router.push(`/${res.user!.slug}/profile`);
            utils.user.getUserBySlug.invalidate({ slug: res.user?.slug });
          } else {
            toast.error(res.message);
          }
        },
        onSettled: () => {
          utils.user.getAuthUser.invalidate();
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <FieldImage.Skeleton />
        <Form.Skeleton />
      </div>
    );
  }

  return (
    <div className="flex max-w-sm flex-col gap-8">
      <ImageUpload />
      <FormParent {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isMutating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Create your personal link"
                    {...field}
                    disabled={isMutating}
                  />
                </FormControl>
                <FormDescription>
                  tinychanges.me/{slugify(field.value)}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitterHandle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter Handle</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your twitter handle"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isMutating}
                  />
                </FormControl>
                <FormDescription>twitter.com/{field.value}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-fit" disabled={isMutating}>
            {isMutating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </FormParent>
    </div>
  );
};

Form.Skeleton = function SkeletonForm() {
  return (
    <div className="flex max-w-sm flex-col gap-8">
      <div className="space-y-2">
        <Skeleton className="h-4 w-12 rounded-sm" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-12 rounded-sm" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-5 w-24 rounded-sm" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-12 rounded-sm" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-5 w-24 rounded-sm" />
      </div>
      <Skeleton className="h-8 w-[118.75px] rounded-md" />
    </div>
  );
};
