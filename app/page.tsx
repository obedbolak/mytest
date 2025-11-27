import Image from "next/image";
import { DemoSection } from "./components/demo-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Server Actions & API Routes
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Demo comparing server actions vs API routes
          </p>
        </div>
        <DemoSection />
      </div>
    </div>
  );
}
