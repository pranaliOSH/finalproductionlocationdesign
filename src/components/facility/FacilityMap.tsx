 import { useState } from "react";
 import { MapPin, ExternalLink, ZoomIn, ZoomOut, Crosshair } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { DataField } from "./DataField";
 import { Button } from "@/components/ui/button";

interface FacilityMapProps {
  latitude: number;
  longitude: number;
  satelliteImageUrl?: string;
  contributorCount: number;
  lastVerified?: string;
  address?: string;
}
export function FacilityMap({
  latitude,
  longitude,
  satelliteImageUrl,
  contributorCount,
  lastVerified,
  address
}: FacilityMapProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
   const [zoomLevel, setZoomLevel] = useState(16);
   const [offset, setOffset] = useState({ x: 0, y: 0 });
   const [isDragging, setIsDragging] = useState(false);
   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
   
   // Calculate bounding box based on zoom level
   const getZoomDelta = (zoom: number) => {
     const base = 0.006;
     const factor = Math.pow(2, 16 - zoom);
     return base * factor;
   };
   
   const delta = getZoomDelta(zoomLevel);
   const bbox = `${longitude - delta + offset.x},${latitude - delta / 1.5 + offset.y},${longitude + delta + offset.x},${latitude + delta / 1.5 + offset.y}`;
   const satelliteUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${bbox}&bboxSR=4326&size=800,450&format=jpg&f=image`;
   
   const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 19));
   const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 12));
   const handleReset = () => { setZoomLevel(16); setOffset({ x: 0, y: 0 }); };
   
   const handleMouseDown = (e: React.MouseEvent) => {
     setIsDragging(true);
     setDragStart({ x: e.clientX, y: e.clientY });
   };
   
   const handleMouseMove = (e: React.MouseEvent) => {
     if (!isDragging) return;
     const dx = (e.clientX - dragStart.x) * delta * 0.001;
     const dy = (dragStart.y - e.clientY) * delta * 0.001;
     setOffset(prev => ({ x: prev.x - dx, y: prev.y - dy }));
     setDragStart({ x: e.clientX, y: e.clientY });
   };
   
   const handleMouseUp = () => setIsDragging(false);
 
  return <div className="data-card overflow-hidden animate-fade-in" style={{
    animationDelay: "0.2s"
  }}>
      {/* Section header - matches DataSection styling */}
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground"><MapPin className="w-5 h-5" /></span>
          <div>
            <h3 className="section-title flex items-center gap-1">
              Geographic Information
              <InfoTooltip description="Physical address and geographic coordinates for this production location." />
            </h3>
            
          </div>
        </div>
      </div>

      {/* Map/Satellite image */}
       <div 
         className={`relative aspect-video bg-muted rounded-lg overflow-hidden border border-border ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseUp}
       >
         <img 
           src={satelliteUrl}
           alt="Production location satellite view" 
           className="w-full h-full object-cover select-none pointer-events-none"
           draggable={false}
         />
         
         {/* Center marker */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="relative">
             <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center">
               <MapPin className="w-4 h-4 text-white" />
             </div>
             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45 border-r-2 border-b-2 border-white"></div>
           </div>
         </div>
         
         {/* Zoom controls */}
         <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
           <Button
             variant="secondary"
             size="icon"
             className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
             onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
           >
             <ZoomIn className="w-4 h-4" />
           </Button>
           <Button
             variant="secondary"
             size="icon"
             className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
             onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
           >
             <ZoomOut className="w-4 h-4" />
           </Button>
           <Button
             variant="secondary"
             size="icon"
             className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
             onClick={(e) => { e.stopPropagation(); handleReset(); }}
           >
             <Crosshair className="w-4 h-4" />
           </Button>
         </div>
         
         {/* Open in Google Maps button */}
         <div className="absolute bottom-3 right-3 z-10">
           <Button
             variant="secondary"
             size="sm"
             className="gap-2 bg-white/90 hover:bg-white shadow-md"
             onClick={(e) => { e.stopPropagation(); window.open(googleMapsUrl, "_blank"); }}
           >
             <ExternalLink className="w-4 h-4" />
             Open in Google Maps
           </Button>
         </div>
         
         {/* Drag hint */}
         <div className="absolute bottom-3 left-3 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded">
           Drag to pan
         </div>
      </div>

      {/* Address and Coordinates fields */}
      <div className="grid gap-4 mt-4">
        {address && (
          <DataField 
            label="Address"
            value={address}
            explanation="The company address for this production location."
            contributor="Zaber and Zubair Fabrics Ltd"
            contributedAt="November 12, 2022"
            moreEntries={3}
            confidenceLevel="high"
            tableRow={true}
            twoLineProvenance={true}
            labelWidth="100px"
          />
        )}
        <DataField 
          label="Coordinates"
          value={`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`}
          explanation="The geographic coordinates (latitude, longitude) of this production location generated with Google's geocoding API."
          contributor="OS Hub Data Team"
          contributedAt="April 7, 2025"
          moreEntries={122}
          confidenceLevel="high"
          tableRow={true}
          twoLineProvenance={true}
          labelWidth="100px"
        />
      </div>
    </div>;
}