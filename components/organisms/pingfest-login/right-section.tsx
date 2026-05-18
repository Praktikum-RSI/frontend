"use client";

import { AlertCircle, CheckCircle2, Eye, EyeOff, HelpCircle, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api, API_BASE_URL, ApiError } from "@/lib/api";
import { setSession } from "@/lib/auth";

export function PingfestLoginRightSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams?.get("next") ?? null;
  const justRegistered = searchParams?.get("registered") === "1";
  const prefillIdentifier = searchParams?.get("identifier") ?? "";
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ identifier: prefillIdentifier, password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(
    justRegistered ? "Pendaftaran berhasil. Silakan login dengan akun Anda." : null,
  );

  useEffect(() => {
    if (prefillIdentifier) setFormData((prev) => ({ ...prev, identifier: prefillIdentifier }));
  }, [prefillIdentifier]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.identifier.trim()) newErrors.identifier = "Email atau username diperlukan";
    if (!formData.password) newErrors.password = "Password diperlukan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setInfoMessage(null);
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const res = await api.post<{
        code: number;
        message: string;
        data: { access_token: string; refresh_token: string };
      }>("/login", { identifier: formData.identifier.trim(), password: formData.password }, { auth: false });
      const session = setSession(res?.data?.access_token ?? "", res?.data?.refresh_token);
      if (nextPath) { router.push(nextPath); return; }
      if (session?.role === "ADMIN") { router.push("/admin"); } else { router.push("/"); }
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.message);
      } else if (err instanceof TypeError) {
        setServerError(`Tidak bisa terhubung ke server (${API_BASE_URL}). Pastikan backend sedang berjalan dan CORS mengizinkan origin ini.`);
      } else {
        setServerError(err instanceof Error ? err.message : "Login gagal. Periksa kembali kredensial Anda.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="w-full lg:w-1/2 bg-white dark:bg-[#0f192d] flex flex-col justify-center px-6 sm:px-8 md:px-12 py-8">
      <div className="max-w-md mx-auto w-full">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground text-xl font-bold">⊞</span>
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Selamat Datang Kembali</h2>
          <p className="text-muted-foreground">Please enter your credentials to access the panel.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {serverError && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{serverError}</p>
            </div>
          )}
          {infoMessage && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{infoMessage}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email atau Username</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                name="identifier"
                autoComplete="username"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="name@company.com atau username"
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {errors.identifier && <p className="text-destructive text-sm mt-1">{errors.identifier}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-foreground">Password</label>
              <Link href="/forgot-password" className="text-primary text-sm font-semibold hover:underline">Lupa Password</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-border bg-muted/30 text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
              Ingat saya di perangkat ini
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>Sign In <span className="text-lg">→</span></>
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-muted-foreground text-sm">
              Don&apos;t have an account yet?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">Register your interest</Link>
            </p>
          </div>
        </form>

        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8">
          <button className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
