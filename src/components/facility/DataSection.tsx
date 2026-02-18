import { ReactNode } from "react";
import { HelpCircle, ChevronRight, ShieldCheck, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
type CategoryType = "identity" | "operations" | "compliance" | "environment" | "workforce";
interface DataSectionProps {
  title: string;
  category: CategoryType;
  icon: ReactNode;
  explanation?: ReactNode;
  subtitle?: string;
  whyItMatters?: string;
  children: ReactNode;
  isEmpty?: boolean;
  showClaimedBadge?: boolean;
  singleColumn?: boolean;
}
const categoryLabels: Record<CategoryType, string> = {
  identity: "Identity",
  operations: "Operations",
  compliance: "Compliance",
  environment: "Environment",
  workforce: "Workforce"
};
export function DataSection({
  title,
  category,
  icon,
  explanation,
  subtitle,
  whyItMatters,
  children,
  isEmpty,
  showClaimedBadge,
  singleColumn
}: DataSectionProps) {
  return <div className="data-card">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{icon}</span>
          <div>
            <h3 className="section-title flex items-center gap-1">
              {title}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Info className="w-4 h-4" /></button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs">{explanation || "Placeholder for tooltip text."}</p>
                </TooltipContent>
              </Tooltip>
            </h3>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        {showClaimedBadge && <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-source-claimed flex-shrink-0" />
            <span className="text-base font-medium text-source-claimed">Claimed</span>
          </div>}
      </div>

      {isEmpty ? <div className="text-center py-6 text-muted-foreground text-sm">
          No data available
        </div> : <div className={singleColumn ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
          {children}
        </div>}
    </div>;
}