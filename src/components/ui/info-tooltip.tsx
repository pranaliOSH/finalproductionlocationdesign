import * as React from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface InfoTooltipProps {
  description: string;
  learnMoreHref?: string;
  learnMoreLabel?: string;
  className?: string;
  iconClassName?: string;
}

export function InfoTooltip({
  description,
  learnMoreHref,
  learnMoreLabel = "Learn more",
  className,
  iconClassName,
}: InfoTooltipProps) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
            className
          )}
          aria-label="More information"
        >
          <Info className={cn("w-4 h-4", iconClassName)} />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="start"
        className="max-w-xs p-3 space-y-2 font-normal"
      >
        <p className="text-sm text-popover-foreground">{description}</p>
        {learnMoreHref && (
          <a
            href={learnMoreHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {learnMoreLabel} →
          </a>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
