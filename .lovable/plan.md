

# Partner Data Section Redesign: Accordion Layout

## Overview

Transform the Partner Data section from the current tab-based layout into an accordion-style layout where each data category (Assessments, Certifications, Environment, Social & Labor) appears as a separate collapsible container.

## Current State

The Partner Data section currently uses:
- A single card container with tabs at the top
- Tab navigation to switch between: Assessments, Certifications, Environment, Social & Labor
- Only one tab's content is visible at a time

## Proposed Design

Each category becomes its own clickable horizontal bar that expands/collapses:

```text
+----------------------------------------------------------------+
|  Partner Data                                                   |
|  Third-party data from integration partners                     |
|  Need this data programmatically? Use our API                   |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
|  [Icon] Assessments                              [Chevron Down] |
+----------------------------------------------------------------+
   (When expanded, assessment data appears here)

+----------------------------------------------------------------+
|  [Icon] Certifications                           [Chevron Down] |
+----------------------------------------------------------------+
   (When expanded, certification data appears here)

+----------------------------------------------------------------+
|  [Icon] Environment                              [Chevron Down] |
+----------------------------------------------------------------+
   (When expanded, environmental metrics appear here)

+----------------------------------------------------------------+
|  [Icon] Social & Labor                           [Chevron Down] |
+----------------------------------------------------------------+
   (When expanded, workforce data appears here)
```

## User Experience

1. **Collapsed State**: Each category shows as a horizontal bar with an icon, title, and chevron indicator
2. **Click to Expand**: Clicking a bar expands that section to reveal its content
3. **Click Again to Collapse**: Clicking the same bar collapses it
4. **Multiple Open**: Users can have multiple sections open at the same time (unlike tabs)
5. **Smooth Animation**: Accordion uses built-in animation for open/close transitions

---

## Technical Details

### Files to Modify

1. **`src/components/facility/EnrichedDataPartnerships.tsx`** - Complete rewrite to use Accordion pattern

### Implementation Approach

**Replace Tabs with Accordion Component**

The existing Radix UI Accordion component (`@radix-ui/react-accordion`) is already installed and available at `src/components/ui/accordion.tsx`.

**Component Structure**:
```
EnrichedDataPartnerships
  - Header section (Partner Data title, description, API link)
  - Accordion (type="multiple" to allow multiple open)
    - AccordionItem: Assessments
      - AccordionTrigger (icon + title)
      - AccordionContent (AssessmentsData component)
    - AccordionItem: Certifications
      - AccordionTrigger (icon + title)
      - AccordionContent (CertificationCard component)
    - AccordionItem: Environment
      - AccordionTrigger (icon + title)
      - AccordionContent (EnvironmentalData component)
    - AccordionItem: Social & Labor
      - AccordionTrigger (icon + title)
      - AccordionContent (WorkforceData component)
```

**Styling**:
- Each accordion item styled as a bordered horizontal bar with rounded corners
- Items have subtle background and hover state
- Icons (ClipboardCheck, Award, Leaf, Users) placed before titles
- Chevron rotates 180 degrees when section is open
- Small gap between accordion items for visual separation

### Key Considerations

- **Accessibility**: Radix Accordion provides keyboard navigation and ARIA attributes automatically
- **State Persistence**: No state persistence needed (sections reset on page refresh)
- **Mobile Responsive**: Accordion pattern works better on mobile than tabs (full-width clickable areas)
- **Existing Components Reused**: AssessmentsData, CertificationCard, EnvironmentalData, and WorkforceData components continue to be used with `embedded={true}` prop

