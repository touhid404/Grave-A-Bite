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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in Successfully", { id: toastId });
        router.push("/dashboard");
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card className="border-2 rounded-[2.5rem] shadow-2xl overflow-hidden bg-card/40 backdrop-blur-md border-white/5" {...props}>
      <CardHeader className="space-y-1 pt-4 pb-1 text-center">
        <CardTitle className="text-3xl font-black tracking-tighter uppercase leading-none">
          Welcome <span className="text-primary italic">Back</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground font-bold text-[9px] uppercase tracking-widest opacity-60">
          Access your vault
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 pb-1">
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-2.5"
        >
          <FieldGroup className="space-y-2.5">
            <form.Field
              name="email"
              children={(field: any) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="space-y-1">
                    <FieldLabel className="font-black text-[9px] uppercase tracking-[0.2em] text-primary/80 ml-1" htmlFor={field.name}>Email Address</FieldLabel>
                    <Input
                      className="rounded-2xl border-2 border-border/50 focus-visible:ring-primary h-11 bg-background/30 font-bold text-sm"
                      type="email"
                      id={field.name}
                      placeholder="alex@example.com"
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
            <form.Field
              name="password"
              children={(field: any) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                      <FieldLabel className="font-black text-[9px] uppercase tracking-[0.2em] text-primary/80" htmlFor={field.name}>Password</FieldLabel>
                      <Link href="#" className="text-[9px] font-black text-muted-foreground hover:text-primary uppercase tracking-wider transition-colors">Forgot?</Link>
                    </div>
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
        <Button form="login-form" type="submit" className="w-full h-12 rounded-2xl font-black text-lg bg-primary text-black hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-[0.97] uppercase italic tracking-tighter">
          Login Now
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
          className="w-full h-11 rounded-2xl border-2 border-border/50 font-black hover:bg-muted transition-all active:scale-[0.97] uppercase text-[10px] tracking-wider flex gap-2"
        >
          <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          Google login
        </Button>
        <p className="text-[11px] text-center text-muted-foreground mt-0 font-medium">
          New here?{" "}
          <Link href="/register" className="text-primary font-black hover:underline italic uppercase tracking-tighter">
            Create Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
