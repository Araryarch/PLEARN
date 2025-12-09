import { catppuccin } from '../constants'

export const ChatSkeleton = () => {
  return (
    <div className="flex gap-3 max-w-[85%] lg:max-w-2xl items-start animate-pulse">
      {/* Bot Avatar Placeholder */}
      <div
        className="w-8 h-8 rounded-full flex-shrink-0"
        style={{ backgroundColor: catppuccin.surface1 }}
      />

      {/* Message Placeholder */}
      <div className="flex flex-col gap-2 w-full max-w-[80%]">
        <div className="flex items-center gap-2 px-1">
          <div
            className="h-3 w-16 rounded mb-1"
            style={{ backgroundColor: catppuccin.surface1 }}
          />
        </div>

        <div
          className="p-4 rounded-2xl rounded-tl-none space-y-2"
          style={{ backgroundColor: catppuccin.surface1 }}
        >
          <div
            className="h-4 w-[90%] rounded"
            style={{ backgroundColor: catppuccin.overlay, opacity: 0.2 }}
          />
          <div
            className="h-4 w-[75%] rounded"
            style={{ backgroundColor: catppuccin.overlay, opacity: 0.2 }}
          />
          <div
            className="h-4 w-[60%] rounded"
            style={{ backgroundColor: catppuccin.overlay, opacity: 0.2 }}
          />
        </div>
      </div>
    </div>
  )
}
