import { catppuccin } from '../constants'

export const ChatSkeleton = () => {
  return (
    <div className="flex gap-3 max-w-[85%] lg:max-w-2xl items-start animate-pulse p-4">
      {/* Bot Avatar Placeholder */}
      <div
        className="w-8 h-8 rounded-full flex-shrink-0"
        style={{ backgroundColor: catppuccin.surface1 }}
      />

      {/* Message Placeholder */}
      <div className="flex flex-col gap-2 w-full max-w-[80%]">
        <div className="flex items-center gap-2 px-1">
          <div
            className="h-3 w-16 rounded mb-1 bg-opacity-50"
            style={{ backgroundColor: catppuccin.surface1 }}
          />
        </div>

        <div className="space-y-2.5">
          {/* Varied width lines for natural look without blocky background */}
          <div
            className="h-4 w-[92%] rounded-md"
            style={{ backgroundColor: catppuccin.surface0 }}
          />
          <div
            className="h-4 w-[78%] rounded-md"
            style={{ backgroundColor: catppuccin.surface0 }}
          />
          <div
            className="h-4 w-[85%] rounded-md"
            style={{ backgroundColor: catppuccin.surface0 }}
          />
          <div
            className="h-4 w-[65%] rounded-md"
            style={{ backgroundColor: catppuccin.surface0 }}
          />
        </div>
      </div>
    </div>
  )
}
