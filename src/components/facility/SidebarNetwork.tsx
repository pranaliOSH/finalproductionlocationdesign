import React, { useState, useMemo } from "react";
import { Users, Building2, ExternalLink, Factory, GraduationCap, ClipboardCheck, Handshake, HelpCircle, Info, List, Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ContributorType = "academic" | "auditor" | "brand" | "cso" | "supplier" | "msi" | "union" | "other";

interface ListUpload {
  listTitle: string;
  dateContributed: string;
}

interface Contributor {
  name: string;
  type: ContributorType;
  dataPoints: number;
  lastContributed: string;
  relationship?: string;
  listUploads?: ListUpload[];
}

interface SidebarNetworkProps {
  contributors: Contributor[];
  totalContributors: number;
  typeCounts?: Partial<Record<ContributorType, number>>;
}

const typeLabels: Record<ContributorType, string> = {
  academic: "Academic",
  auditor: "Auditor",
  brand: "Brand",
  cso: "Civil Society Organization",
  supplier: "Supplier",
  msi: "Multi-Stakeholder Initiative",
  union: "Union",
  other: "Other"
};

const typeColors: Record<ContributorType, string> = {
  academic: "bg-purple-50 text-purple-600",
  auditor: "bg-amber-50 text-amber-600",
  brand: "bg-blue-50 text-blue-600",
  cso: "bg-emerald-50 text-emerald-600",
  supplier: "bg-orange-50 text-orange-600",
  msi: "bg-teal-50 text-teal-600",
  union: "bg-rose-50 text-rose-600",
  other: "bg-slate-50 text-slate-600"
};

const typeIcons: Record<ContributorType, React.ReactNode> = {
  academic: <GraduationCap className="w-3.5 h-3.5" />,
  auditor: <ClipboardCheck className="w-3.5 h-3.5" />,
  brand: <Building2 className="w-3.5 h-3.5" />,
  cso: <Users className="w-3.5 h-3.5" />,
  supplier: <Factory className="w-3.5 h-3.5" />,
  msi: <Handshake className="w-3.5 h-3.5" />,
  union: <Users className="w-3.5 h-3.5" />,
  other: <HelpCircle className="w-3.5 h-3.5" />
};

const parseDate = (dateStr: string): Date => {
  const months: Record<string, number> = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  const parts = dateStr.split(' ');
  if (parts.length >= 2) {
    const month = months[parts[0]] || 0;
    const year = parseInt(parts[parts.length - 1]) || 2020;
    const day = parts.length === 3 ? parseInt(parts[1].replace(',', '')) || 1 : 1;
    return new Date(year, month, day);
  }
  return new Date(dateStr);
};

export function SidebarNetwork({ contributors, totalContributors, typeCounts }: SidebarNetworkProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const sortedTypeCounts = typeCounts ?
  Object.entries(typeCounts).
  filter(([_, count]) => count && count > 0).
  sort(([, a], [, b]) => (b || 0) - (a || 0)).
  map(([type, count]) => ({ type: type as ContributorType, count: count || 0 })) :
  [];

  const topContributors = useMemo(() => {
    return [...contributors].
    sort((a, b) => parseDate(b.lastContributed).getTime() - parseDate(a.lastContributed).getTime()).
    slice(0, 7);
  }, [contributors]);

  // All contributors sorted by most recent for the drawer
  const sortedContributors = useMemo(() => {
    return [...contributors].sort((a, b) => {
      // Use most recent list upload date if available, otherwise lastContributed
      const aDate = a.listUploads?.[0]?.dateContributed || a.lastContributed;
      const bDate = b.listUploads?.[0]?.dateContributed || b.lastContributed;
      return parseDate(bDate).getTime() - parseDate(aDate).getTime();
    });
  }, [contributors]);

  return (
    <>
      <div className="rounded-lg border border-border p-3 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Supply Chain Network</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Organizations that have shared data about this production location.
        </p>

        {/* Type counts */}
        <div className="flex flex-wrap gap-1.5">
          {sortedTypeCounts.map(({ type, count }) =>
          <div
            key={type}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/50 text-xs">

              <span className="font-semibold text-foreground">{count}</span>
              <span className="text-muted-foreground">{typeLabels[type]}{count > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Top contributors list */}
        <div className="space-y-1">
          {topContributors.map((contributor) =>
          <a
            key={contributor.name}
            href={`/contributor/${encodeURIComponent(contributor.name)}`}
            className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-secondary/50 transition-colors group">

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary truncate">
                    {contributor.name}
                  </p>
                </div>
            </a>
          )}
        </div>

        {totalContributors > 7 &&
        <button
          onClick={() => setIsSheetOpen(true)}
          className="w-full py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium">

            View all {totalContributors} contributors
          </button>
        }
      </div>

      {/* Full contributors sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              All Data Sources
            </SheetTitle>
            <SheetDescription>
              {totalContributors} organizations have shared data about this production location
            </SheetDescription>
          </SheetHeader>

          {/* Explanation box */}
          <div className="mx-0 my-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p>
                  Multiple organizations may have shared data for this production location. Sharing data often indicates a relationship between the organization (e.g., a brand) and the production location (e.g., a supplier). The list name may provide additional context about the relationship type and timeframe. Click on the organization name to learn more about them and the data they have shared.
                </p>
                <a
                  href="https://info.opensupplyhub.org/resources/an-open-data-model"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1.5 font-medium text-blue-700 hover:underline">

                  Learn more about our open data model →
                </a>
              </div>
            </div>
          </div>

          {/* Type summary badges */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
            {sortedTypeCounts.map(({ type, count }) =>
            <div
              key={type}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-secondary/30">

                <span className="text-sm font-medium text-foreground">{count}</span>
                <span className="text-xs text-muted-foreground">{typeLabels[type]}{count > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Contributors list sorted by most recent */}
          <div className="py-4 space-y-3">
            {sortedContributors.map((contributor) =>
            <div
              key={contributor.name}
              className="rounded-lg bg-secondary/50 hover:bg-secondary transition-colors overflow-hidden">

                {/* Contributor header with icon and link */}
                <div className="flex items-center gap-3 p-3 pb-2">
                  <div className="flex-1 min-w-0">
                    <a
                    href={`/contributor/${encodeURIComponent(contributor.name)}`}
                    className="font-medium text-primary hover:underline flex items-center gap-1">

                      <span className="truncate">{contributor.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                    </a>
                    <p className="text-xs text-muted-foreground">
                      {typeLabels[contributor.type]}
                    </p>
                  </div>
                </div>

                {/* List uploads */}
                {contributor.listUploads && contributor.listUploads.length > 0 &&
              <div className="px-3 pb-3 space-y-1.5">
                    {contributor.listUploads.map((listUpload, idx) =>
                <div key={idx} className="ml-11 p-2.5 bg-background rounded-md border border-border/50">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
                          <List className="w-3 h-3" />
                          <span>Uploaded via list</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{listUpload.listTitle}</p>
                      </div>
                )}
                  </div>
              }

              {/* No list uploads — just show last contributed in the header */}
              </div>
            )}
          </div>

          {/* Other Contributors summary at bottom */}
          {sortedTypeCounts.length > 0 &&
          <div className="border-t border-border pt-4 pb-2">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-foreground" />
                <h3 className="text-lg font-bold text-foreground">Anonymized Data Sources</h3>
              </div>
              <div className="divide-y divide-border">
                {sortedTypeCounts.map(({ type, count }) =>
              <div key={type} className="py-3 text-sm text-foreground">
                    {count === 1 ? 'A' : count} {typeLabels[type]}{count > 1 ? 's' : ''}{count === 1 ? '' : ''}
                  </div>
              )}
              </div>
            </div>
          }
        </SheetContent>
      </Sheet>
    </>);

}