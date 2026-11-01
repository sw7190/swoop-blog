import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";

const navItems = [
  { href: "/", label: "글" },
  { href: "/tags", label: "태그" },
  { href: "/about", label: "소개" },
];

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="truncate font-semibold">
          {site.name}
        </Link>
        <nav aria-label="주요 메뉴" className="flex shrink-0 items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
