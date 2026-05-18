const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felicia",
];

export function PingfestRegisterLeftSection() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#0f192d] via-[#131b2e] to-[#1a2540] relative overflow-hidden flex-col justify-between p-8">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-orange-400 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-teal-400 blur-2xl"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-16">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-[#131b2e]">⊞</div>
          <span className="text-white font-semibold text-lg">P!NGFEST</span>
        </div>
        <div className="mb-12">
          <h1 className="text-white text-5xl font-bold leading-tight mb-6">
            Connect. Learn.<br />Grow.
          </h1>
          <p className="text-gray-300 text-base leading-relaxed">
            Masuki dunia di mana setiap pertemuan adalah peluang untuk berkembang.
            Bergabunglah dengan komunitas eksklusif kami dan temukan pengalaman yang dirancang khusus untuk Anda.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg border border-white/20 w-fit">
        <div className="flex -space-x-3">
          {avatars.map((avatar, idx) => (
            <img key={idx} src={avatar} alt="user" className="w-8 h-8 rounded-full border-2 border-[#131b2e]" />
          ))}
        </div>
        <p className="text-gray-200 text-sm">Bergabung dengan 12,000+ anggota aktif</p>
      </div>
    </div>
  );
}
