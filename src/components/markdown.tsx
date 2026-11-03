import { MarkdownAsync } from "react-markdown";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";

// 코드 하이라이트(Shiki)는 서버에서 미리 처리하므로 브라우저에 추가 부담이 없습니다.
// 같은 본문은 결과가 같으므로 캐시해서 빌드 때 정적 페이지로 만들어지게 합니다.
export async function Markdown({ content }: { content: string }) {
  "use cache";
  return (
    <div className="prose prose-neutral max-w-none wrap-break-word dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-img:rounded-lg">
      {await MarkdownAsync({
        children: content,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: { light: "github-light", dark: "github-dark-dimmed" },
              keepBackground: false,
              // 문장 속 인라인 코드는 그대로 두고, 코드 블록에만 적용합니다.
              defaultLang: { block: "plaintext" },
            },
          ],
        ],
        components: {
          // 넓은 표가 모바일에서 페이지 전체를 밀어내지 않도록 합니다.
          table: (props) => (
            <div className="overflow-x-auto">
              <table {...withoutNode(props)} />
            </div>
          ),
          pre: (props) => <CodeBlock {...withoutNode(props)} />,
          // 하이라이트 결과를 감싸는 <figure>는 여백만 만들므로 벗겨 냅니다.
          figure: (props) =>
            "data-rehype-pretty-code-figure" in props ? (
              <>{props.children}</>
            ) : (
              <figure {...withoutNode(props)} />
            ),
        },
      })}
    </div>
  );
}

// react-markdown이 넘기는 node(구문 트리)는 HTML 속성이 아니므로 빼고 넘깁니다.
function withoutNode<T extends { node?: unknown }>(props: T): Omit<T, "node"> {
  const rest = { ...props };
  delete rest.node;
  return rest;
}
