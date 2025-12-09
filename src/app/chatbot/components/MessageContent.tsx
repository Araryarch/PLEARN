import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

interface MessageContentProps {
  content: string
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
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
      <div className="markdown-body prose prose-invert max-w-none text-sm leading-relaxed break-words [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-gray-700 [&>th]:border [&>th]:border-gray-700 [&>th]:p-2 [&>td]:border [&>td]:border-gray-700 [&>td]:p-2">
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
            code: ({ className, children, ...props }: CodeProps) => {
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <code
                  className={`${className} bg-gray-800 rounded px-1 py-0.5`}
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <code className="bg-gray-800 rounded px-1 py-0.5" {...props}>
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
