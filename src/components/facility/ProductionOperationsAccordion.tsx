import { ReactNode, useState } from "react";
import { Factory } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

interface ProductionOperationsAccordionProps {
  children: ReactNode;
  explanation?: string;
  subtitle?: string;
}

export function ProductionOperationsAccordion({
  children,
  explanation = "What this production location produces and how it operates.",
  subtitle = "Manufacturing capabilities and workforce"
}: ProductionOperationsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <AccordionPrimitive.Root 
      type="single" 
      collapsible 
      value={isOpen ? "production" : ""}
      onValueChange={(value) => setIsOpen(value === "production")}
    >
      <AccordionPrimitive.Item 
        value="production" 
        className="border-2 border-border rounded-lg bg-card overflow-hidden"
      >
        <div 
          className="px-5 py-4 bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
          onClick={toggleOpen}
        >
          <div className="flex items-start justify-between w-full gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Factory className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-lg">
                  Production & Operations
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="info-trigger ml-2">?</button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-xs">{explanation}</p>
                    </TooltipContent>
                  </Tooltip>
                </span>
              </div>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1 pl-8">{subtitle}</p>
              )}
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
