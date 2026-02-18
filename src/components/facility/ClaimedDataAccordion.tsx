import { ReactNode, useState } from "react";
import { ShieldCheck, Info } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

interface ClaimedDataAccordionProps {
  children: ReactNode;
  explanation?: string;
  subtitle?: string;
}

export function ClaimedDataAccordion({
  children,
  explanation = "Data provided by the production location owner or manager through the claim process.",
  subtitle = "Verified information from the facility"
}: ClaimedDataAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <AccordionPrimitive.Root 
      type="single" 
      collapsible 
      value={isOpen ? "claimed" : ""}
      onValueChange={(value) => setIsOpen(value === "claimed")}
    >
      <AccordionPrimitive.Item 
        value="claimed" 
        className="border-2 border-border rounded-lg bg-card overflow-hidden"
      >
        <div 
          className="px-5 py-4 bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
          onClick={toggleOpen}
        >
          <div className="flex items-start justify-between w-full gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-verified" />
                <span className="font-medium text-lg">
                  Additional Information provided by production location
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-2"><Info className="w-4 h-4" /></button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-xs">{explanation}</p>
                    </TooltipContent>
                  </Tooltip>
                </span>
              </div>
             </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOpen();
                }}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {isOpen ? "Close" : "Open"}
              </button>
              <Switch 
                checked={isOpen} 
                onCheckedChange={toggleOpen}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
        <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="px-5 pb-5 pt-4">
            <div className="grid gap-4">
              {children}
            </div>
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
