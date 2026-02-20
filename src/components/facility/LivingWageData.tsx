 import { Wallet } from "lucide-react";
 
 interface LivingWageDataProps {
   embedded?: boolean;
 }
 
 export function LivingWageData({ embedded = false }: LivingWageDataProps) {
  const content = (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
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

      <div className="mt-6 pt-4 border-t border-border bg-muted/50 -mx-4 px-4 py-3 rounded-md space-y-2">
        <p className="text-base text-muted-foreground">
          <span className="font-bold text-primary">Disclaimer:</span> Datasets displayed include only organizations that have opted to share additional data about this location on Open Supply Hub at this time. It is not an exhaustive directory, nor does it imply an endorsement of any specific organization. OS Hub is actively expanding these offerings to showcase the diverse range of tools and platforms available for each data point.
        </p>
      </div>
    </>
  );
   if (embedded) {
     return content;
   }
 
   return (
     <div className="data-card animate-fade-in">
       <div className="section-header">
         <div className="flex items-center gap-3">
           <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-category-workforce/10">
             <Wallet className="w-5 h-5 text-category-workforce" />
           </div>
           <div>
             <h3 className="section-title">Living Wage</h3>
             <span className="category-badge workforce">Workforce</span>
           </div>
         </div>
       </div>
       {content}
     </div>
   );
 }