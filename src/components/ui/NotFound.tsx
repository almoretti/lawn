import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f5f5f9] p-6 font-sans text-[#272357]">
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-start border-2 border-[#272357] bg-white p-8 shadow-[12px_12px_0_0_#272357] md:p-16">
        <div className="mb-4 w-full border-b-2 border-[#272357] pb-2 font-mono text-sm tracking-widest text-[#6b6b8a] uppercase md:text-base">
          Status Code // 404
        </div>

        <h1 className="mb-6 text-7xl leading-none font-black tracking-tighter md:text-[10rem]">
          NOT FOUND.
        </h1>

        <p className="mb-12 max-w-2xl text-xl leading-relaxed md:text-2xl">
          The requested path doesn't exist. It might have been moved, deleted, or you typed the URL
          incorrectly.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center bg-[#272357] px-10 py-5 text-lg font-bold tracking-wide text-[#f5f5f9] uppercase transition-colors hover:bg-[#5252e6]"
        >
          Return to Base
        </Link>
      </div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden text-center text-[35vw] font-black tracking-tighter text-[#272357] opacity-[0.03] select-none">
        404
      </div>
    </div>
  );
}
