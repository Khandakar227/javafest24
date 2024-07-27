import React, { useEffect, useRef, useState } from "react";
import useLoadScript from "@/hooks/useLoadScript";
import { GOOGLE_MAP_API_KEY } from "@/lib/const";

declare global {
  interface Window {
    googleMap: google.maps.Map;
  }
}

const GoogleMap = () => {
  const url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
  const searchRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef(null);
  const scriptLoaded = useLoadScript(url, url.slice(0, 16));

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (scriptLoaded && mapRef.current) {
      window.googleMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 23.7810672, lng: 90.2548755 },
        zoom: 8,
      });

      new window.google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: window.googleMap,
      });

      const autocomplete = new google.maps.places.Autocomplete(
        searchRef.current as HTMLInputElement, {fields: [ "geometry", "name", "formatted_address" ], componentRestrictions: { country: "bd" }}
      );

      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        console.log(autocomplete.getPlace())
      });

    }
  }, [scriptLoaded]);

  return (
    <>
      <input ref={searchRef} className="shadow border w-full rounded-md outline-none px-4 py-2 my-3"/>
      <div ref={mapRef} />
    </>
  );
};

export default GoogleMap;
