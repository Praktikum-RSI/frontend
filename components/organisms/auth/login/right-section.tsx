"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { LoginSuccessResponse } from "@/types/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Ticket, User } from "lucide-react";
import Link from "next/link";
import { Suspense, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { LoginFormSchema } from "../types/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

async function login(url: string, { arg }: { arg: LoginFormSchema }) {
  const response = await api.post<LoginSuccessResponse>(url, {
    body: JSON.stringify(arg),
  });
  return response;
}

export const LoginRightSection = () => {
  const { control, handleSubmit } = useForm<LoginFormSchema>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation<
    LoginSuccessResponse,
    Error,
    string,
    LoginFormSchema
  >(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, login, {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Login successful");
      router.push("/dashboard");
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginFormSubmit = useCallback(
    (value: LoginFormSchema) => {
      if (value.identifier && value.password) {
        trigger(value);
      }
    },
    [trigger],
  );

  return (
    <>
      <section className="w-full lg:w-1/2 bg-white dark:bg-[#0f192d] flex flex-col justify-center px-6 sm:px-8 md:px-12 py-8">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-xl font-bold">
                <Ticket />
              </span>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Selamat Datang Kembali
            </h2>
            <p className="text-muted-foreground">
              Please enter your credentials to access the panel.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            id="login-form"
            onSubmit={handleSubmit(handleLoginFormSubmit)}
          >
            <FieldGroup>
              <Controller
                control={control}
                name="identifier"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email-username">Email/Username</FieldLabel>
                    <InputGroup className="h-10 has-[>[data-align=inline-start]]:[&>input]:pl-3">
                      <InputGroupInput
                        aria-invalid={fieldState.invalid}
                        id="email-username"
                        placeholder="Username/Email"
                        {...field}
                      />
                      <InputGroupAddon>
                        <User className="size-5" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup className="h-10 has-[>[data-align=inline-start]]:[&>input]:pl-3">
                      <InputGroupInput
                        aria-invalid={fieldState.invalid}
                        id="password"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <InputGroupAddon>
                        <Lock className="size-5" />
                      </InputGroupAddon>
                      <InputGroupAddon
                        align="inline-end"
                        className="cursor-pointer"
                        onClick={handleToggleShowPassword}
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          {/* Submit Button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            disabled={isMutating}
            form="login-form"
            type="submit"
          >
            <Suspense
              fallback={
                <>
                  <Spinner />
                  Signing in
                </>
              }
            >
              <>
                Sign In
                <span className="text-lg">→</span>
              </>
            </Suspense>
          </Button>

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <p className="text-muted-foreground text-sm">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/auth/register"
                className="text-primary font-semibold hover:underline"
              >
                Register your interest
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
