"use client";

import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, API_BASE_URL, ApiError } from "@/lib/api";

export function PingfestRegisterRightSection() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", username: "", email: "", whatsapp: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Nama lengkap diperlukan";
    if (!formData.username.trim()) newErrors.username = "Username diperlukan";
    else if (!/^[a-zA-Z0-9._-]{3,30}$/.test(formData.username))
      newErrors.username = "Username 3-30 karakter, hanya huruf, angka, titik, garis bawah, atau strip";
    if (!formData.email.trim()) newErrors.email = "Email diperlukan";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email tidak valid";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "Nomor WhatsApp diperlukan";
    if (formData.password.length < 8) newErrors.password = "Password minimal 8 karakter";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Password tidak cocok";
    if (!agreeToTerms) newErrors.terms = "Anda harus menyetujui syarat dan ketentuan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const nameParts = formData.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] ?? formData.fullName.trim();
      const lastName = nameParts.slice(1).join(" ") || firstName;
      await api.post(
        "/register",
        {
          first_name: firstName,
          last_name: lastName,
          whatsapp_number: formData.whatsapp.trim(),
          username: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        },
        { auth: false },
      );
      setSuccessMessage("Pendaftaran berhasil! Mengalihkan ke halaman login...");
      setTimeout(() => {
        router.push(`/login?registered=1&identifier=${encodeURIComponent(formData.email.trim().toLowerCase())}`);
      }, 1200);
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.message);
      } else if (err instanceof TypeError) {
        setServerError(`Tidak bisa terhubung ke server (${API_BASE_URL}). Pastikan backend sedang berjalan dan CORS mengizinkan origin ini.`);
      } else {
        setServerError(err instanceof Error ? err.message : "Gagal mendaftar. Silakan coba lagi.");
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
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Daftar Akun Baru</h2>
          <p className="text-muted-foreground">Bergabunglah dengan P!NGFEST untuk mulai menjelajahi event luar biasa.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {serverError && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{serverError}</p>
            </div>
          )}
          {successMessage && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{successMessage}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Nama Lengkap</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors" />
            {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="johndoe" autoComplete="username"
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors" />
            {errors.username && <p className="text-destructive text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="nama@email.com"
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors" />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Nomor WhatsApp</label>
            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+62 8123456789"
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors" />
            {errors.whatsapp && <p className="text-destructive text-sm mt-1">{errors.whatsapp}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Konfirmasi Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input type="checkbox" id="terms" checked={agreeToTerms}
              onChange={(e) => { setAgreeToTerms(e.target.checked); if (e.target.checked && errors.terms) setErrors((prev) => ({ ...prev, terms: "" })); }}
              className="mt-1 w-5 h-5 rounded border-2 border-border bg-muted/30 text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              Saya menyetujui{" "}
              <a href="#" className="text-primary hover:underline font-semibold">Syarat dan Ketentuan</a>.
            </label>
          </div>
          {errors.terms && <p className="text-destructive text-sm -mt-2">{errors.terms}</p>}

          <button type="submit" disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6">
            {isLoading ? (
              <><div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>Mendaftar...</>
            ) : (
              <>Daftar Sekarang <span className="text-lg">→</span></>
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-muted-foreground text-sm">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">Masuk di sini</Link>
            </p>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-border">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            <span>←</span>
            KEMBALI KE BERANDA
          </Link>
        </div>
      </div>
    </div>
  );
}
