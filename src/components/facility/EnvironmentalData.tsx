import { Leaf } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface EnvironmentalMetric {
  name: string;
  value: string;
  unit: string;
  trend?: "up" | "down" | "stable";
  source: string;
  sourceUrl?: string;
  provider?: string;
  providerUrl?: string;
  year?: string;
  benchmark?: string;
  contributor?: string;
  contributorUrl?: string;
  contributedAt?: string;
}

interface EnvironmentalDataProps {
  metrics: EnvironmentalMetric[];
  embedded?: boolean;
}

export function EnvironmentalData({ metrics, embedded = false }: EnvironmentalDataProps) {
  const emptyContent = (
    <div className="text-center py-8 text-muted-foreground">
      <Leaf className="w-10 h-10 mx-auto mb-2 opacity-30" />
      <p className="text-sm">No environmental data available</p>
      <p className="text-xs mt-1">Data partners are working to add this information</p>
    </div>
  );

  const metricsContent = (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            {/* Label title */}
            <p className="text-xs font-bold text-foreground uppercase tracking-wide">
              {metric.name}
            </p>
            
            {/* Data shown - value with unit */}
            <div className="font-medium">
              <span>{metric.value}</span>
              <span className="text-muted-foreground ml-1">{metric.unit}</span>
              {metric.trend && (
                <span className={`ml-2 text-xs ${
                  metric.trend === "down" ? "text-verified" : 
                  metric.trend === "up" ? "text-destructive" : 
                  "text-muted-foreground"
                }`}>
                  ({metric.trend === "down" ? "↓ Improving" : metric.trend === "up" ? "↑ Increasing" : "→ Stable"})
                </span>
              )}
            </div>
            
            {/* Attribution line */}
            <p className="text-sm text-foreground">
              Based on{" "}
              {metric.sourceUrl ? (
                <a 
                  href={metric.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {metric.source}
                </a>
              ) : (
                metric.source
              )}
            </p>
            
            {/* Contribution line */}
            {(metric.contributedAt || metric.contributor) && (
              <p className="text-sm text-muted-foreground">
                {metric.contributedAt && <span>{metric.contributedAt}</span>}
                {metric.contributor && (
                  <>
                    {metric.contributedAt && " by "}
                    {metric.contributorUrl ? (
                      <a 
                        href={metric.contributorUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {metric.contributor}
                      </a>
                    ) : (
                      <span>{metric.contributor}</span>
                    )}
                  </>
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border bg-muted/50 -mx-4 px-4 py-3 rounded-md space-y-2">
        <p className="text-base text-muted-foreground">
          <span className="font-bold text-primary">Disclaimer:</span> Environmental data is often self-reported or estimated. Methodologies may vary between sources and should be considered indicative rather than absolute.
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
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-category-environment/10">
              <Leaf className="w-5 h-5 text-category-environment" />
            </div>
            <div>
            <h3 className="section-title">
              Emissions
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="info-trigger text-[10px]">?</button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="text-xs font-medium mb-1">What is environmental data?</p>
                    <p className="text-xs text-muted-foreground">
                      Metrics like carbon emissions, water usage, and waste management that show a facility's environmental footprint.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </h3>
              <span className="category-badge environment">Environment</span>
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
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-category-environment/10">
            <Leaf className="w-5 h-5 text-category-environment" />
          </div>
          <div>
            <h3 className="section-title">
              Emissions
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="info-trigger text-[10px]">?</button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs font-medium mb-1">What is environmental data?</p>
                  <p className="text-xs text-muted-foreground">
                    Metrics showing a facility's environmental footprint, sourced from data partners and self-reported data.
                  </p>
                </TooltipContent>
              </Tooltip>
            </h3>
            <span className="category-badge environment">Environment</span>
          </div>
        </div>
      </div>

      {metricsContent}
    </div>
  );
}