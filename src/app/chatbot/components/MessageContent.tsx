import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MessageContentProps {
  content: string
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

export const MessageContent = memo(
  ({ content }: MessageContentProps) => {
    // Preprocess content to normalize LaTeX delimiters
    const processedContent = content
      .replace(/\\\[([\s\S]*?)\\\]/g, '$$$1$$') // Normalize block math \[ ... \] to $$ ... $$
      .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$') // Normalize inline math \( ... \) to $ ... $

    return (
      <div
        className="markdown-body prose prose-invert max-w-none text-sm leading-relaxed break-words 
        [&>p]:mb-2 
        [&>ul]:list-disc [&>ul]:pl-4 
        [&>ol]:list-decimal [&>ol]:pl-4
        [&_table]:w-full [&_table]:my-4 [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-lg
        [&_thead]:bg-muted
        [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:text-foreground [&_th]:uppercase [&_th]:tracking-wider [&_th]:border-b-2 [&_th]:border-border
        [&_tbody_tr]:border-b [&_tbody_tr]:border-border [&_tbody_tr]:hover:bg-muted/50 [&_tbody_tr]:transition-colors
        [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-muted-foreground"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            a: ({ ...props }) => (
              <a
                {...props}
                className="text-primary underline decoration-muted-foreground underline-offset-4 hover:decoration-primary transition-all font-medium"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            code({ inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <div className="relative rounded-lg overflow-hidden my-3 max-w-full overflow-x-auto ring-1 ring-border">
                  <div className="absolute right-2 top-2 z-10 text-xs text-muted-foreground bg-muted/80 px-2 py-1 rounded select-none backdrop-blur-sm border border-border">
                    {match[1]}
                  </div>
                  <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      padding: '1.25rem',
                      backgroundColor: '#000000', // Black for code blocks
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      maxWidth: '100%',
                      overflowX: 'auto',
                    }}
                    showLineNumbers={true}
                    wrapLongLines={true}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className={`${className} bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm border border-border`}
                  {...props}
                >
                  {children}
                </code>
              )
            },
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    )
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content,
)

MessageContent.displayName = 'MessageContent'
