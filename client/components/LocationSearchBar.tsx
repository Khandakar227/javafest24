import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

type LocationSearchBarProps = {
    handleLocation: (data:{lat?: number, lng?: number, name:string}) => void
}

export default function LocationSearchBar({handleLocation}:LocationSearchBarProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<(number | null)[]>([]);
  const [address, setAddress] = useState("");
  const inputRef = useRef({} as HTMLInputElement);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace() || null;

        onPlaceChanged(place);
      });
    }
  }, [autocompleteRef.current]);


  useEffect(() => {
    if(!inputRef.current) return;
    inputRef.current.value = address;
  }, [inputRef, address])

  const onPlaceChanged = (place: google.maps.places.PlaceResult | null) => {
    if (!place) return;
    console.log(place);
    setAddress(place.formatted_address as string);
    setSelectedPosition([place.geometry?.location?.lng() || null, place.geometry?.location?.lat() || null])
    handleLocation({lat: place.geometry?.location?.lat(), lng: place.geometry?.location?.lng(), name: place.formatted_address as string})
  };

  if (!apiKey) {
    console.error("Google Maps API key is not defined.");
    return <div>Error: Google Maps API key is not available.</div>;
  }

  return (
    <>
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <Autocomplete
        className="w-full shadow border rounded-md"
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        restrictions={{ country: "bd" }}
        fields={["geometry", "name", "formatted_address"]}
      >
          <input
            type="search"
            id="place"
            ref={inputRef}
            placeholder="Search Area, City, District..."
            className="w-full rounded-md outline-none px-4 py-1"
          />
      </Autocomplete>
      </LoadScript>
      </>
  )
}
