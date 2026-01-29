"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import * as z from "zod";
import { MailCheck, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [emailSent, setEmailSent] = React.useState(false);

  const handleGoogleLogin = async () => {
    const origin = process.env.NEXT_PUBLIC_CLIENT_URL;
    await authClient.signIn.social({
      provider: "google",
      callbackURL: origin,
    });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Account created successfully", { id: toastId });
        setEmailSent(true);
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  if (emailSent) {
    return (
      <Card className="border-2 rounded-[2.5rem] shadow-2xl overflow-hidden bg-card/40 backdrop-blur-md border-white/5 text-center animate-in fade-in zoom-in duration-500" {...props}>
        <CardHeader className="pt-10 pb-4">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 animate-bounce">
            <MailCheck className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-4xl font-black tracking-tighter uppercase leading-none">
            Check your <span className="text-primary italic">Inbox</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground font-bold text-sm mt-4 max-w-[280px] mx-auto">
            We've sent a verification link to your email address. Please click it to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-10 pb-10">
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-8">
            <p className="text-xs font-medium text-primary">
              Didn't receive it? Check your spam folder or try re-registering.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full h-12 rounded-2xl border-2 border-border/50 font-black hover:bg-muted transition-all uppercase text-xs tracking-wider flex gap-2"
            onClick={() => router.push("/login")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 rounded-[2.5rem] shadow-2xl overflow-hidden bg-card/40 backdrop-blur-md border-white/5" {...props}>
      <CardHeader className="space-y-1 pt-4 pb-1 text-center">
        <CardTitle className="text-3xl font-black tracking-tighter uppercase leading-none">
          Join <span className="text-primary italic">GrabABite</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground font-bold text-[9px] uppercase tracking-widest opacity-60">
          Delicious meals await
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 py-1">
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-2.5"
        >
          <FieldGroup className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="name"
                children={(field: any) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-1">
                      <FieldLabel className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/80 ml-1" htmlFor={field.name}>Full Name</FieldLabel>
                      <Input
                        className="rounded-2xl border-2 border-border/50 focus-visible:ring-primary h-11 bg-background/30 font-bold text-sm"
                        type="text"
                        id={field.name}
                        placeholder="Alex J."
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError className="text-[10px] font-black text-destructive uppercase tracking-tight ml-1" errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="email"
                children={(field: any) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-1">
                      <FieldLabel className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/80 ml-1" htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        className="rounded-2xl border-2 border-border/50 focus-visible:ring-primary h-11 bg-background/30 font-bold text-sm"
                        type="email"
                        id={field.name}
                        placeholder="alex@gm.com"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError className="text-[10px] font-black text-destructive uppercase tracking-tight ml-1" errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>
            <form.Field
              name="password"
              children={(field: any) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="space-y-1">
                    <FieldLabel className="font-black text-[9px] uppercase tracking-[0.2em] text-primary/80 ml-1" htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      className="rounded-2xl border-2 border-border/50 focus-visible:ring-primary h-11 bg-background/30 font-bold text-sm"
                      type="password"
                      id={field.name}
                      placeholder="••••••••"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError className="text-[9px] font-black text-destructive uppercase tracking-tight ml-1" errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2.5 px-10 pb-6 pt-1">
        <Button form="register-form" type="submit" className="w-full h-11 rounded-2xl font-black text-lg bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.97] uppercase italic tracking-tighter">
          Join Now
        </Button>
        <div className="relative w-full py-0.5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em]">
            <span className="bg-transparent backdrop-blur-sm px-2 text-muted-foreground font-black italic">Social</span>
          </div>
        </div>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full h-10 rounded-2xl border-2 border-border/50 font-black hover:bg-muted transition-all active:scale-[0.97] uppercase text-[10px] tracking-wider flex gap-2"
        >
          <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          Google login
        </Button>
        <p className="text-[11px] text-center text-muted-foreground mt-0 font-medium">
          Member?{" "}
          <Link href="/login" className="text-primary font-black hover:underline italic uppercase tracking-tighter">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
