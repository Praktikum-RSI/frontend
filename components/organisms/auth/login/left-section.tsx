import Image from "next/image";

const avatars = [
  "/images/auth/felix.svg",
  "/images/auth/felicia.svg",
  "/images/auth/aneka.svg",
] as const;

export const LoginLeftSection = () => {
  return (
    <>
      {/* Left Panel - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#0f192d] via-[#131b2e] to-[#1a2540] relative overflow-hidden flex-col justify-between p-8">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-orange-400 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-teal-400 blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-xs font-semibold text-primary-foreground mb-8 tracking-widest">
            EVENT MANAGEMENT EXCELLENCE
          </div>

          <h1 className="text-white text-5xl font-bold leading-tight mb-6">
            Connect.
            <br />
            Learn.
            <br />
            Grow.
          </h1>
          <p className="text-gray-300 text-base leading-relaxed max-w-md">
            Experience the next generation of event orchestration. Curated
            environments, seamless registration, and professional networking.
          </p>
        </div>

        {/* Social Proof */}
        <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg border border-white/20 w-fit">
          <div className="flex -space-x-3">
            {avatars.map((avatar, idx) => (
              <Image
                key={idx}
                src={avatar}
                alt="user"
                width={0}
                height={0}
                sizes="100vw"
                className="w-8 h-8 rounded-full bg-white border-2 border-none"
              />
            ))}
          </div>
          <p className="text-gray-200 text-sm">
            Joined by 10k+ professionals this month
          </p>
        </div>
      </div>
    </>
  );
};
