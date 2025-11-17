import { GiftExperience } from "./components/GiftExperience";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cyan-50 px-4 py-12 sm:px-6">
      <main className="flex w-full max-w-xl flex-col items-center text-center">
        <div className="mb-8 flex flex-col items-center gap-2">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-700/80">
            Tiara&apos;s Box
          </p>
          <h1 className="text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
            A little gift that opens,
            <br />
            one surprise at a time.
          </h1>
        </div>
        <GiftExperience />
      </main>
    </div>
  );
}
