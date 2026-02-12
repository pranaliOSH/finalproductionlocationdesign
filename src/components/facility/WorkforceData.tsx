import { Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface WorkforceMetric {
  name: string;
  value?: string;
  description?: string;
  source: string;
  updatedAt: string;
  isSensitive?: boolean;
}

interface WorkforceDataProps {
  metrics: WorkforceMetric[];
  totalWorkers?: number;
  embedded?: boolean;
}


export function WorkforceData({ metrics, totalWorkers, embedded = false }: WorkforceDataProps) {
  // Check if any metrics are sensitive
  const hasSensitiveData = metrics.some(m => 
    m.name === "Grievance Mechanism" || m.isSensitive
  );

  const emptyContent = (
    <div className="text-center py-8 text-muted-foreground">
      <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
      <p className="text-sm">No worker welfare data available</p>
      <p className="text-xs mt-1">Data partners are working to add this information</p>
    </div>
  );

  const metricsContent = (
    <>
      {/* Wage Data Section */}
      <div className="grid gap-6 sm:grid-cols-2 mb-6">
        {/* Country Wages */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-foreground uppercase tracking-wide">
            Country Wages
          </p>
          <div className="space-y-1">
            <a 
              href="https://wageindicator.org/salary/living-wage"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline block"
            >
              View Living Wages in national language
            </a>
            <a 
              href="https://wageindicator.org/salary/minimum-wage"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline block"
            >
              View Minimum Wage in English
            </a>
            <a 
              href="https://wageindicator.org/salary/minimum-wage/national-language"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline block"
            >
              View Minimum Wage in national language
            </a>
          </div>
          <p className="text-sm text-foreground">
            2025 Minimum and Living Wages Database
          </p>
          <p className="text-sm text-muted-foreground">
            January 17, 2026 by{" "}
            <a 
              href="https://wageindicator.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              WageIndicator Foundation
            </a>
          </p>
        </div>

        {/* Local Living Wage */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-foreground uppercase tracking-wide">
            Local Living Wage
          </p>
          <a 
            href="https://livingwage.mit.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline block"
          >
            View local living wage
          </a>
          <p className="text-sm text-foreground">
            Living Wage data
          </p>
          <p className="text-sm text-muted-foreground">
            January 17, 2026 by{" "}
            <a 
              href="https://livingwage.mit.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Living Wage Institute
            </a>
          </p>
        </div>
      </div>

      {/* Separator line */}
      <div className="border-t border-border my-6"></div>

      {/* Grievance Mechanism Section */}
      {hasSensitiveData && (
        <div className="mb-6">
          <div className="grid gap-6 sm:grid-cols-2 mb-4">
            {/* Ulula Grievance Mechanism */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                Ulula Grievance Mechanism
              </p>
              <p className="font-medium">
                <span>Status: </span>
                <span className="text-muted-foreground">Active</span>
              </p>
              <p className="font-medium">
                <span>Type: </span>
                <span className="text-muted-foreground">Third Party Grievance Mechanism</span>
              </p>
              <p className="font-medium">
                <span>Established Date: </span>
                <span className="text-muted-foreground">March 15, 2023</span>
              </p>
              <p className="text-sm text-muted-foreground">
                November 10, 2025 by{" "}
                <a 
                  href="https://ulula.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ulula
                </a>
              </p>
            </div>

            {/* Labor Solutions Wovo Connect */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                Wovo Connect
              </p>
              <p className="font-medium">
                <span>Status: </span>
                <span className="text-muted-foreground">Active</span>
              </p>
              <p className="font-medium">
                <span>Type: </span>
                <span className="text-muted-foreground">Third Party Grievance Mechanism</span>
              </p>
              <p className="font-medium">
                <span>Established Date: </span>
                <span className="text-muted-foreground">June 1, 2022</span>
              </p>
              <p className="text-sm text-muted-foreground">
                November 10, 2025 by{" "}
                <a 
                  href="https://laborsolutions.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Labor Solutions
                </a>
              </p>
            </div>
          </div>
        </div>
      )}


      <div className="mt-4 pt-4 border-t border-border bg-amber-50 dark:bg-amber-950/20 -mx-4 px-4 py-3 rounded-md">
        <p className="text-base text-amber-800 dark:text-amber-200 font-medium">
          ⚠️ Warning: Open Supply Hub does not operate a grievance mechanism and cannot receive or investigate complaints. Information shown is based on partner-submitted sources and may not reflect all available mechanisms, including government or state-based processes. Open Supply Hub does not verify the effectiveness, accessibility, or outcomes of any listed mechanism.
        </p>
      </div>
    </>
  );

  if (embedded) {
    return metrics.length === 0 ? emptyContent : metricsContent;
  }

  if (metrics.length === 0) {
    return (
      <div className="data-card animate-fade-in">
        <div className="section-header border-0 pb-0 mb-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-category-workforce/10">
              <Users className="w-5 h-5 text-category-workforce" />
            </div>
            <div>
              <h3 className="section-title">
                Worker Welfare
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="info-trigger text-[10px]">?</button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="text-xs font-medium mb-1">What is worker welfare data?</p>
                    <p className="text-xs text-muted-foreground">
                      Information about working conditions, wages, hours, and worker rights at this production location.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </h3>
              <span className="category-badge workforce">Workforce</span>
            </div>
          </div>
        </div>
        {emptyContent}
      </div>
    );
  }

  return (
    <div className="data-card animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-category-workforce/10">
            <Users className="w-5 h-5 text-category-workforce" />
          </div>
          <div>
            <h3 className="section-title">
              Worker Welfare
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="info-trigger text-[10px]">?</button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs font-medium mb-1">What is worker welfare data?</p>
                  <p className="text-xs text-muted-foreground">
                    Information about working conditions, wages, and worker rights, sourced from audits and worker voice platforms.
                  </p>
                </TooltipContent>
              </Tooltip>
            </h3>
            <span className="category-badge workforce">Workforce</span>
          </div>
        </div>
        {totalWorkers && (
          <div className="text-right">
            <p className="text-2xl font-bold">{totalWorkers.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Workers</p>
          </div>
        )}
      </div>

      {metricsContent}
    </div>
  );
}
