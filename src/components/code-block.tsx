"use client";

import { Check, Copy } from "lucide-react";
import { type ComponentProps, useRef, useState } from "react";

const languageNames: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  jsx: "JSX",
  sh: "Shell",
  bash: "Bash",
  json: "JSON",
  md: "Markdown",
  css: "CSS",
  html: "HTML",
  py: "Python",
};

// rehype-pretty-code가 만든 <pre>를 감싸 언어 이름과 복사 버튼을 붙입니다.
export function CodeBlock(props: ComponentProps<"pre"> & { "data-language"?: string }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = props["data-language"];
  const label =
    language && language !== "plaintext"
      ? (languageNames[language] ?? language)
      : "코드";

  async function copy() {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 권한이 없으면 조용히 넘어갑니다.
    }
  }

  return (
    <div className="code-block not-prose my-6 overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b bg-muted px-4 py-1.5 text-xs text-muted-foreground">
        <span className="font-mono">{label}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "복사됨" : "코드 복사"}
          className="inline-flex items-center gap-1 rounded px-1.5 py-1 transition-colors hover:bg-background hover:text-foreground"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
      <pre ref={preRef} {...props} />
    </div>
  );
}
