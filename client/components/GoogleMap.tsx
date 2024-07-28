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
  onLocationSelect: (data:{lat?: number, lng?: number, name:string}) => void;
  mapVisible?:boolean;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({onLocationSelect, mapVisible}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number[]>([]);
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
    setSelectedPosition([place.geometry?.location?.lng() || center.lng, place.geometry?.location?.lat() || center.lat])
  };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    
    setAddress(response.results[0]?.formatted_address);
    setSelectedPosition([lng, lat]);
  };

  function addAddress() {
    onLocationSelect({...selectedPosition, name:address});
    setAddress("");
    setSelectedPosition([]);
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
              address && selectedPosition?.length && (<button onClick={addAddress} className="px-4 py-1 bg-primary rounded" type="button">Add</button>)
            }
          </div>
        </Autocomplete>
        {
          mapVisible && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
          onClick={handleMapClick}
        >
          {selectedPosition?.length && <Marker position={{lng: selectedPosition[0], lat: selectedPosition[1]}} />}
        </GoogleMap>
          )
        }
      </LoadScript>
    </>
  );
};

export default GoogleMapComponent;
