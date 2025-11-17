import { GiftExperience } from "./components/GiftExperience";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-cyan-50 px-4 py-12 sm:px-6 overflow-hidden">
      {/* Soft pastel doodles in the background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Blobs */}
        <div className="absolute -top-20 -left-12 h-44 w-44 rounded-full bg-cyan-100 opacity-80 blur-3xl" />
        <div className="absolute -bottom-28 -right-10 h-56 w-56 rounded-full bg-cyan-200 opacity-80 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-36 w-36 rounded-full bg-emerald-100 opacity-80 blur-2xl" />
        {/* Tiny stars / sparkles */}
        <div className="absolute top-10 right-12 text-lg text-cyan-300">
          ✧
        </div>
        <div className="absolute bottom-16 left-10 text-xl text-cyan-300">
          ✦
        </div>
        <div className="absolute top-1/2 left-1/4 text-sm text-emerald-200">
          ✺
        </div>
      </div>

      <main className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <div className="mb-8 flex flex-col items-center gap-2">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-700/80">
            Boxie
          </p>
          <h1 className="text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
            dont expect too much .x.
          </h1>
        </div>
        <GiftExperience />
      </main>
    </div>
  );
}

