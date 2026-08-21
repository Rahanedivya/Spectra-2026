import React, { useEffect, useRef } from 'react';

export default function MapComponent({
  destinations = [],
  itineraryStops = [],
  selectedSite = null,
  onSelectSite = () => { },
  center = [18.5196, 73.8553],
  zoom = 12
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (typeof window === 'undefined' || !window.L) return;

    const L = window.L;

    // Initialize Map if not already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
      });

      // Dark Matter OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Add Zoom Control to top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      markersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;

    // Clear previous markers & polylines
    markersGroup.clearLayers();

    // Custom Icon Generator
    const createCustomIcon = (category, isItinerary = false, stopIndex = 0) => {
      const color = isItinerary ? '#f59e0b' : category === 'Forts' ? '#ef4444' : category === 'Food' ? '#f97316' : '#3b82f6';

      const svgIcon = `
        <div style="
          background-color: ${color};
          width: ${isItinerary ? '34px' : '28px'};
          height: ${isItinerary ? '34px' : '28px'};
          border-radius: 50%;
          border: 3px solid #0f172a;
          box-shadow: 0 4px 12px rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          font-weight: 800;
          font-size: ${isItinerary ? '14px' : '11px'};
          font-family: sans-serif;
        ">
          ${isItinerary ? stopIndex + 1 : '🏛️'}
        </div>
      `;

      return L.divIcon({
        html: svgIcon,
        className: 'custom-leaflet-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    // Plot Itinerary Route if present
    if (itineraryStops && itineraryStops.length > 0) {
      const latLngs = [];

      itineraryStops.forEach((stop, index) => {
        if (stop.lat && stop.lng) {
          const point = [stop.lat, stop.lng];
          latLngs.push(point);

          const marker = L.marker(point, {
            icon: createCustomIcon(stop.category, true, index),
          });

          const popupContent = `
            <div style="font-family: sans-serif; padding: 4px;">
              <span style="font-size: 10px; background: #f59e0b; color: #0f172a; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
                Stop #${index + 1} • ${stop.time || ''}
              </span>
              <h4 style="margin: 6px 0 2px 0; font-size: 14px; font-weight: 700; color: #f8fafc;">${stop.title || stop.name}</h4>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">${stop.activity || ''}</p>
            </div>
          `;

          marker.bindPopup(popupContent);
          markersGroup.addLayer(marker);
        }
      });

      if (latLngs.length > 1) {
        const polyline = L.polyline(latLngs, {
          color: '#f59e0b',
          weight: 4,
          opacity: 0.8,
          dashArray: '8, 8',
        });
        markersGroup.addLayer(polyline);
        map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
      } else if (latLngs.length === 1) {
        map.setView(latLngs[0], 14);
      }
    } else if (destinations && destinations.length > 0) {
      // Plot all Pune destinations
      const bounds = L.latLngBounds();

      destinations.forEach((dest) => {
        if (dest.lat && dest.lng) {
          const point = [dest.lat, dest.lng];
          bounds.extend(point);

          const marker = L.marker(point, {
            icon: createCustomIcon(dest.category),
          });

          const popupContent = `
            <div style="font-family: sans-serif; min-width: 160px;">
              <span style="font-size: 10px; background: rgba(245,158,11,0.2); color: #f59e0b; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
                ${dest.category} • ⭐ ${dest.rating}
              </span>
              <h4 style="margin: 6px 0 4px 0; font-size: 14px; font-weight: 700; color: #f8fafc;">${dest.name}</h4>
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #94a3b8; line-height: 1.3;">${dest.shortDescription}</p>
              <button id="btn-${dest.id}" style="width: 100%; background: #f59e0b; color: #0f172a; font-weight: 700; border: none; padding: 6px; border-radius: 6px; font-size: 11px; cursor: pointer;">
                Explore Details
              </button>
            </div>
          `;

          marker.bindPopup(popupContent);

          marker.on('popupopen', () => {
            const btn = document.getElementById(`btn-${dest.id}`);
            if (btn) {
              btn.onclick = () => onSelectSite(dest);
            }
          });

          markersGroup.addLayer(marker);
        }
      });

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    }
  }, [destinations, itineraryStops, selectedSite]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden glass-card border border-amber-500/20 shadow-xl">
      <div ref={mapContainerRef} className="w-full h-full min-h-[400px] z-10" />
    </div>
  );
}
