import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: 23.685,
  lng: 90.3563,
};

interface GoogleMapComponentProps {
  onLocationSelect: (data:{lat?: number, lng?: number, address:string}) => void;
}
interface Coordinates { lat: number; lng: number;}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({onLocationSelect}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Coordinates | null>(null);
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

  useEffect(() => {
  }, [selectedPosition, address])

  const onPlaceChanged = (place: google.maps.places.PlaceResult | null) => {
    if (!place) return;
    console.log(place);
    setAddress(place.formatted_address as string);
    setSelectedPosition({lat:place.geometry?.location?.lat() || center.lat, lng: place.geometry?.location?.lng() || center.lng})
  };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    
    setAddress(response.results[0]?.formatted_address);
    setSelectedPosition({ lat, lng });
  };

  function addAddress() {
    onLocationSelect({...selectedPosition, address});
    setAddress("");
    setSelectedPosition(null);
  }
  if (!apiKey) {
    console.error("Google Maps API key is not defined.");
    return <div>Error: Google Maps API key is not available.</div>;
  }

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <p className="text-sm pt-4"> Search your area or mark on the map</p>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          restrictions={{ country: "bd" }}
          fields={["geometry", "name", "formatted_address"]}
        >
          <div className="flex justify-center items-center gap-4">
            <input
              type="search"
              id="place"
              ref={inputRef}
              placeholder="Search City, District..."
              className="shadow border w-full rounded-md outline-none px-4 py-2 my-3"
            />
            {
              address && selectedPosition?.lat && selectedPosition?.lng && (<button onClick={addAddress} className="px-4 py-1 bg-primary rounded" type="button">Add</button>)
            }
          </div>
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
          onClick={handleMapClick}
        >
          {selectedPosition && <Marker position={selectedPosition} />}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default GoogleMapComponent;
