import { Info, User, Clock, Users, ExternalLink, List, Calendar } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface ContributorEntry {
  name: string;
  type: string;
  contributedAt: string;
  sortValue: number;
  value: string;
  listTitle?: string;
}

interface DataContributorsDrawerProps {
  label: string;
  totalCount: number;
  promotedValue: string | null;
  promotedContributor?: string;
  promotedDate?: string;
  contributors: ContributorEntry[];
}

// Mock list titles for contributors
const mockListTitles: Record<string, string> = {
  "Marks & Spencer": "M&S Supplier Network 2025",
  "Sainsbury's": "Sainsbury's Global Suppliers 2025",
  "JD Williams": "JD Williams Factory List",
  "SLCP": "SLCP Verified Facilities Q1 2025",
  "International Accord Foundation": "Accord Signatory Factory List",
  "OS Hub Research Team": "OS Hub Research Database",
  "Worldly": "Higg FEM Verified Facilities",
  "amfori": "amfori BSCI Audit Reports",
  "H&M Group": "H&M Supplier Disclosure 2025",
  "Inditex": "Inditex Supplier List 2025",
  "Target Corporation": "Target Responsible Sourcing",
  "Walmart": "Walmart Supplier Disclosure",
  "Gap Inc.": "Gap Inc. Factory List",
  "Primark": "Primark Factory Disclosure",
  "C&A": "C&A Supplier List 2025",
};

function getListTitle(name: string): string | undefined {
  return mockListTitles[name];
}

export function DataContributorsDrawer({
  label,
  totalCount,
  promotedValue,
  promotedContributor,
  promotedDate,
  contributors,
}: DataContributorsDrawerProps) {
  return (
    <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
      <SheetHeader className="mb-4 pb-4 border-b border-border">
        <SheetTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          All Data Contributions
        </SheetTitle>
        <p className="text-sm text-muted-foreground">
          {totalCount} organizations have contributed data for{" "}
          <span className="font-medium text-foreground">{label}</span>
        </p>
      </SheetHeader>

      {/* Promoted contribution */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Promoted Contribution
        </h4>
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="font-medium mb-3">{promotedValue || "Multiple values"}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {promotedContributor && (
              <a
                href={`/contributor/${encodeURIComponent(promotedContributor)}`}
                className="font-medium text-primary hover:underline flex items-center gap-1"
              >
                {promotedContributor}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {promotedDate && (
              <>
                <span className="text-muted-foreground/50">•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{promotedDate}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Why this data is displayed */}
      <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <h4 className="text-xs font-medium text-primary mb-1.5">
          Why is this data displayed over other contributions?
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          OS Hub prioritizes data from claimed production location owners and verified
          sources. When multiple entries exist, we display the most recently verified data
          from the highest-confidence source.
        </p>
      </div>

      {/* Explanation box */}
      <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
        <div className="flex gap-2">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p>
              Multiple organizations may contribute data about the same production location.
              Each contributor uploads data via a named list — use list names to understand
              the context and source of the data.
            </p>
            <a
              href="https://info.opensupplyhub.org/resources/an-open-data-model"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-1.5 font-medium text-blue-700 hover:underline"
            >
              Learn more about our open data model →
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Other contributions */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Contributions ({contributors.length})
          </h4>
          <div className="space-y-2">
            {contributors.map((c, i) => {
              const listTitle = c.listTitle || getListTitle(c.name);
              return (
                <div
                  key={i}
                  className="rounded-lg border border-border hover:bg-muted/30 transition-colors overflow-hidden"
                >
                  {/* Value + contributor */}
                  <div className="p-3 pb-2">
                    <div className="text-sm font-medium mb-2 text-foreground">{c.value}</div>
                    <div className="flex items-center justify-between">
                      <a
                        href={`/contributor/${encodeURIComponent(c.name)}`}
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        {c.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{c.contributedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* List name */}
                  {listTitle && (
                    <div className="mx-3 mb-3 p-2.5 bg-muted/50 rounded-md border border-border/50">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
                        <List className="w-3 h-3" />
                        <span>Uploaded via list</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{listTitle}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
