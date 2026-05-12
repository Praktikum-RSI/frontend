"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Ticket, User, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Suspense, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RegisterSuccessResponse } from "@/types/auth/register";
import { RegisterFormSchema } from "../types/register";

async function register(url: string, { arg }: { arg: RegisterFormSchema }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return (await response.json()) as RegisterSuccessResponse;
}

export const RegisterRightSection = () => {
  const { control, handleSubmit } = useForm<RegisterFormSchema>({
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      username: "",
      whatsapp_number: "",
    },
    resolver: zodResolver(RegisterFormSchema),
  });
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation<
    RegisterSuccessResponse,
    Error,
    string,
    RegisterFormSchema
  >(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, register, {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      toast.success("Registration successful, redirecting to login page...");
      router.push("/auth/login");
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegisterFormSubmit = useCallback(
    (value: RegisterFormSchema) => {
      if (
        value.first_name &&
        value.email &&
        value.password &&
        value.whatsapp_number &&
        value.username
      ) {
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
              Selamat Datang
            </h2>
            <p className="text-muted-foreground">
              Please enter your credentials to join.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            id="register-form"
            onSubmit={handleSubmit(handleRegisterFormSubmit)}
          >
            <FieldGroup>
              <FieldGroup className="grid grid-cols-2">
                {/*First Name*/}
                <Controller
                  control={control}
                  name="first_name"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                      <InputGroup className="h-10 has-[>[data-align=inline-start]]:[&>input]:pl-3">
                        <InputGroupInput
                          aria-invalid={fieldState.invalid}
                          id="first_name"
                          placeholder="John"
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

                {/*Last Name*/}
                <Controller
                  control={control}
                  name="last_name"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                      <InputGroup className="h-10 has-[>[data-align=inline-start]]:[&>input]:pl-3">
                        <InputGroupInput
                          aria-invalid={fieldState.invalid}
                          id="last_name"
                          placeholder="Doe"
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
              </FieldGroup>

              {/*Username*/}
              <Controller
                control={control}
                name="username"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <InputGroup className="h-10 has-[>[data-align=inline-start]]:[&>input]:pl-3">
                      <InputGroupInput
                        aria-invalid={fieldState.invalid}
                        id="username"
                        placeholder="johndoe"
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

              {/*Email*/}
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <InputGroup className="h-10 has-[>[data-align=inline-start]]:[&>input]:pl-3">
                      <InputGroupInput
                        aria-invalid={fieldState.invalid}
                        id="email"
                        placeholder="johndoe@example.com"
                        {...field}
                      />
                      <InputGroupAddon>
                        <Mail className="size-5" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/*Whatsapp Number*/}
              <Controller
                control={control}
                name="whatsapp_number"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="whatsapp_number">Whatsapp Number</FieldLabel>
                    <InputGroup className="h-10 has-[>[data-align=inline-start]]:[&>input]:pl-3">
                      <InputGroupInput
                        aria-invalid={fieldState.invalid}
                        id="whatsapp_number"
                        type="tel"
                        placeholder="+1234567890"
                        {...field}
                      />
                      <InputGroupAddon>
                        <Phone className="size-5" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/*Password*/}
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
            form="register-form"
            type="submit"
          >
            <Suspense
              fallback={
                <>
                  <Spinner />
                  Signing up
                </>
              }
            >
              <>
                Sign Up
                <span className="text-lg">→</span>
              </>
            </Suspense>
          </Button>

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary font-semibold hover:underline"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
