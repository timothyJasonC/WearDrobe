import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ToolTip({ children, content, className }: { children: React.ReactNode, content: any, className?: string }) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                <div className={`${ className }`}>
                    { children }
                </div>
                </TooltipTrigger>
                <TooltipContent>
                    { content }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
