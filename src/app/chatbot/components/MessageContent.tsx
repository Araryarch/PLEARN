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
        [&_thead]:bg-[#313244]
        [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:text-[#cdd6f4] [&_th]:uppercase [&_th]:tracking-wider [&_th]:border-b-2 [&_th]:border-[#45475a]
        [&_tbody_tr]:border-b [&_tbody_tr]:border-[#313244] [&_tbody_tr]:hover:bg-[#313244]/30 [&_tbody_tr]:transition-colors
        [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-[#a6adc8]"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            a: ({ ...props }) => (
              <a
                {...props}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            code({ inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <div className="relative rounded-md overflow-hidden my-3 max-w-full overflow-x-auto">
                  <div className="absolute right-2 top-2 z-10 text-xs text-white/50 bg-black/20 px-2 py-1 rounded select-none">
                    {match[1]}
                  </div>
                  <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      padding: '1.25rem',
                      backgroundColor: '#1e1e2e', // Match theme layout
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
                  className={`${className} bg-white/10 text-catppuccin-text rounded px-1.5 py-0.5 font-mono text-sm`}
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
