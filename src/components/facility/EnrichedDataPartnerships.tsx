 import { useState } from "react";
 import * as AccordionPrimitive from "@radix-ui/react-accordion";
 import { CertificationCard } from "./CertificationCard";
 import { AssessmentsData } from "./AssessmentsData";
 import { EnvironmentalData } from "./EnvironmentalData";
 import { LivingWageData } from "./LivingWageData";
 import { GrievanceMechanismData } from "./GrievanceMechanismData";
 import { Award, ClipboardCheck, Leaf, Wallet, ShieldAlert, Handshake } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
 import { Switch } from "@/components/ui/switch";
 
 interface Certification {
   name: string;
   issuer: string;
   validUntil?: string;
   verificationUrl?: string;
   scope?: string;
 }
 
interface Assessment {
  name?: string;
  provider?: string;
  completedDate?: string;
  validUntil?: string;
  scope?: string;
  link?: string;
  groupTitle?: string;
  groupSingleColumn?: boolean;
  groupContribution?: string;
  contributor?: string;
  contributorUrl?: string;
  contributedAt?: string;
}
 
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
   contributedAt?: string;
 }
 
 interface EnrichedDataPartnershipsProps {
   certifications: Certification[];
   assessments: Assessment[];
   environmentalMetrics: EnvironmentalMetric[];
 }
 
 export function EnrichedDataPartnerships({
   certifications,
   assessments,
   environmentalMetrics
 }: EnrichedDataPartnershipsProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const isOpen = (value: string) => openItems.includes(value);

  const toggleItem = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="space-y-6">
      {/* Section Divider Header */}
      <div className="border-t-2 border-primary pt-6">
        <div className="flex items-center gap-3 mb-2">
          <Handshake className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">
            Additional Information Provided by Third-parties
            <InfoTooltip
              description="Data provided by third-party partners who host additional social or environmental data related to this production location, its context, and/or its operations."
              learnMoreHref="https://info.opensupplyhub.org/data-integrations"
              learnMoreLabel="Learn more"
              className="ml-2"
            />
          </h2>
        </div>
        <p className="text-base text-muted-foreground">
          Interested in sharing data like this? <a href="#" className="text-primary hover:underline">Become an integration partner.</a> Need programmatic access? <a href="#" className="text-primary hover:underline">Explore our API</a> to pull reports from these datasets.
        </p>
      </div>

      {/* Accordion Sections */}
      <AccordionPrimitive.Root 
        type="multiple" 
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-3"
      >
        <AccordionPrimitive.Item 
          value="assessments" 
          className="border-2 border-border rounded-lg bg-card overflow-hidden"
           id="section-assessments"
        >
          <div 
            className="px-5 py-4 bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
            onClick={() => toggleItem("assessments")}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <ClipboardCheck className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-lg">
                  Assessments and Audits
                  <InfoTooltip
                    description="Learn more about this data, how it's sourced, and how to use it."
                    learnMoreHref="https://info.opensupplyhub.org/resources/assessments"
                  />
                </span>
              </div>
              <div className="flex items-center gap-3">
                 <button
                   type="button"
                   onClick={(e) => { e.stopPropagation(); toggleItem("assessments"); }}
                   className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                 >
                  {isOpen("assessments") ? "Close" : "Open"}
                 </button>
                <Switch 
                  checked={isOpen("assessments")} 
                  onCheckedChange={() => toggleItem("assessments")}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="px-5 pb-5 pt-4">
              <AssessmentsData assessments={assessments} embedded />
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>

        <AccordionPrimitive.Item 
          value="certifications" 
          className="border-2 border-border rounded-lg bg-card overflow-hidden"
           id="section-certifications"
        >
          <div 
            className="px-5 py-4 bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
            onClick={() => toggleItem("certifications")}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-lg">
                  Certifications
                  <InfoTooltip
                    description="Learn more about this data, how it's sourced, and how to use it."
                    learnMoreHref="https://info.opensupplyhub.org/resources/certifications"
                  />
                </span>
              </div>
              <div className="flex items-center gap-3">
                 <button
                   type="button"
                   onClick={(e) => { e.stopPropagation(); toggleItem("certifications"); }}
                   className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                 >
                  {isOpen("certifications") ? "Close" : "Open"}
                 </button>
                <Switch 
                  checked={isOpen("certifications")} 
                  onCheckedChange={() => toggleItem("certifications")}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="px-5 pb-5 pt-4">
              <CertificationCard certifications={certifications} embedded />
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>

        <AccordionPrimitive.Item 
          value="environment" 
          className="border-2 border-border rounded-lg bg-card overflow-hidden"
           id="section-environment"
        >
          <div 
            className="px-5 py-4 bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
            onClick={() => toggleItem("environment")}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="font-bold text-lg">
                  Emissions
                  <InfoTooltip
                    description="Learn more about this data, how it's sourced, and how to use it."
                    learnMoreHref="https://info.opensupplyhub.org/resources/emissions"
                  />
                </span>
              </div>
              <div className="flex items-center gap-3">
                 <button
                   type="button"
                   onClick={(e) => { e.stopPropagation(); toggleItem("environment"); }}
                   className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                 >
                  {isOpen("environment") ? "Close" : "Open"}
                 </button>
                <Switch 
                  checked={isOpen("environment")} 
                  onCheckedChange={() => toggleItem("environment")}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="px-5 pb-5 pt-4">
              <EnvironmentalData metrics={environmentalMetrics} embedded />
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>

         <AccordionPrimitive.Item 
           value="livingwage" 
           className="border-2 border-border rounded-lg bg-card overflow-hidden"
           id="section-living-wage"
         >
           <div 
             className="px-5 py-4 bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
             onClick={() => toggleItem("livingwage")}
           >
             <div className="flex items-center justify-between w-full">
               <div className="flex items-center gap-3">
                 <Wallet className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-lg">
                    Living Wage
                    <InfoTooltip
                      description="Learn more about this data, how it's sourced, and how to use it."
                      learnMoreHref="https://info.opensupplyhub.org/resources/living-wage"
                    />
                  </span>
               </div>
               <div className="flex items-center gap-3">
                 <button
                   type="button"
                   onClick={(e) => { e.stopPropagation(); toggleItem("livingwage"); }}
                   className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                 >
                   {isOpen("livingwage") ? "Close" : "Open"}
                 </button>
                 <Switch 
                   checked={isOpen("livingwage")} 
                   onCheckedChange={() => toggleItem("livingwage")}
                   onClick={(e) => e.stopPropagation()}
                 />
               </div>
             </div>
           </div>
           <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
             <div className="px-5 pb-5 pt-4">
               <LivingWageData embedded />
             </div>
           </AccordionPrimitive.Content>
         </AccordionPrimitive.Item>
 
         <AccordionPrimitive.Item 
           value="grievance" 
           className="border-2 border-border rounded-lg bg-card overflow-hidden"
           id="section-grievance-mechanism"
         >
           <div 
             className="px-5 py-4 bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
             onClick={() => toggleItem("grievance")}
           >
             <div className="flex items-center justify-between w-full">
               <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-lg">
                    Grievance Mechanisms
                    <InfoTooltip
                      description="Learn more about this data, how it's sourced, and how to use it."
                      learnMoreHref="https://info.opensupplyhub.org/resources/grievance-mechanisms"
                    />
                  </span>
               </div>
               <div className="flex items-center gap-3">
                 <button
                   type="button"
                   onClick={(e) => { e.stopPropagation(); toggleItem("grievance"); }}
                   className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                 >
                   {isOpen("grievance") ? "Close" : "Open"}
                 </button>
                 <Switch 
                   checked={isOpen("grievance")} 
                   onCheckedChange={() => toggleItem("grievance")}
                   onClick={(e) => e.stopPropagation()}
                 />
               </div>
             </div>
           </div>
           <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
             <div className="px-5 pb-5 pt-4">
               <GrievanceMechanismData embedded />
             </div>
           </AccordionPrimitive.Content>
         </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </div>
  );
}
