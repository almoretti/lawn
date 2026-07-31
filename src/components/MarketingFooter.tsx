import { Link } from "@tanstack/react-router";

export function MarketingFooter() {
  return (
    <footer className="border-t-2 border-[#272357] bg-[#272357] px-6 py-16 text-[#f5f5f9]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-black tracking-widest text-[#6b6b8a] uppercase">
              Product
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <Link to="/dashboard" className="transition-colors hover:text-[#8c8cf0]">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="transition-colors hover:text-[#8c8cf0]">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-black tracking-widest text-[#6b6b8a] uppercase">
              Compare
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <Link to="/compare/frameio" className="transition-colors hover:text-[#8c8cf0]">
                  Nu-Create vs Frame.io
                </Link>
              </li>
              <li>
                <Link to="/compare/wipster" className="transition-colors hover:text-[#8c8cf0]">
                  Nu-Create vs Wipster
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-black tracking-widest text-[#6b6b8a] uppercase">
              Use cases
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <Link to="/for/video-editors" className="transition-colors hover:text-[#8c8cf0]">
                  For video editors
                </Link>
              </li>
              <li>
                <Link to="/for/agencies" className="transition-colors hover:text-[#8c8cf0]">
                  For agencies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-black tracking-widest text-[#6b6b8a] uppercase">
              Open source
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <a
                  href="https://github.com/pingdotgg/lawn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#8c8cf0]"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#38366d] pt-8 md:flex-row">
          <span className="text-3xl font-black tracking-tighter">Nu-Create</span>
          <span className="text-sm text-[#6b6b8a]">Creative review for Numan marketing.</span>
        </div>
      </div>
    </footer>
  );
}
