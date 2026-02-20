import { ShieldAlert } from "lucide-react";

interface GrievanceMechanismDataProps {
  embedded?: boolean;
}

export function GrievanceMechanismData({ embedded = false }: GrievanceMechanismDataProps) {
  const content =
  <>
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
                <span>Attributes: </span>
                <span className="text-muted-foreground">Coming Soon</span>
              </p>
             <p className="font-medium">
               <span>Active since: </span>
               <span className="text-muted-foreground">March 15, 2023</span>
             </p>
             <p className="text-sm text-muted-foreground">
               November 10, 2025 by{" "}
               <a
              href="https://ulula.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline">

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
               <span>Attributes: </span>
               <span className="text-muted-foreground">Coming Soon</span>
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
              className="text-primary hover:underline">

                 Labor Solutions
               </a>
             </p>
           </div>
         </div>
       </div>
 
       <div className="mt-6 pt-4 border-t border-border bg-muted/50 -mx-4 px-4 py-3 rounded-md space-y-2">
           <p className="text-base text-muted-foreground">
             <span className="font-bold text-primary">Disclaimer:</span> Due to the sensitive nature of this issue area, this set of partner data is actively in development and open to feedback. Please <a href="https://info.opensupplyhub.org/contact-us" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">contact us</a> if you have feedback to share.
           </p>
           <p className="text-base text-muted-foreground">
             Open Supply Hub <strong>does not operate a grievance mechanism</strong> and cannot receive or investigate complaints. Datasets listed here are <strong>only inclusive of organizations who have opted into sharing certain additional information</strong> on Open Supply Hub at this time and do not reflect all available mechanisms, including other third party, internal, and government or state-based processes. Open Supply Hub <strong>does not verify the effectiveness, accessibility, or outcomes of any listed mechanism</strong>. The presence of grievance mechanism-related information on Open Supply Hub <strong>is not an endorsement</strong> of and should not be assumed to necessarily be an indicator of positive working conditions or effective access to remedy.
           </p>
        </div>
     </>;


  if (embedded) {
    return content;
  }

  return (
    <div className="data-card animate-fade-in">
       <div className="section-header">
         <div className="flex items-center gap-3">
           <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-category-workforce/10">
             <ShieldAlert className="w-5 h-5 text-category-workforce" />
           </div>
           <div>
             <h3 className="section-title">Grievance Mechanism Placeholder Title</h3>
             <span className="category-badge workforce">Workforce</span>
           </div>
         </div>
       </div>
       {content}
     </div>);

}