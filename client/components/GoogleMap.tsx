// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const mapContainerStyle = {
//   height: '400px',
//   width: '100%',
// };

// const center = {
//   lat: 23.685,
//   lng: 90.3563,
// };

// const GoogleMapComponent = () => {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   if (!apiKey) {
//     console.error("Google Maps API key is not defined.");
//     return <div>Error: Google Maps API key is not available.</div>;
//   }

//   return (
//     <LoadScript googleMapsApiKey={apiKey}>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={6}
//       >
//         <Marker position={center} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default GoogleMapComponent;

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const center = {
  lat: 23.685,
  lng: 90.3563,
};

interface GoogleMapComponentProps {
  onLocationSelect: (city: string) => void;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ onLocationSelect }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });

    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    const city = response.results[0].address_components.find(component => component.types.includes('locality'))?.long_name;

    if (city) {
      onLocationSelect(city);
    }
  };

  if (!apiKey) {
    console.error("Google Maps API key is not defined.");
    return <div>Error: Google Maps API key is not available.</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={6}
        onClick={handleMapClick}
      >
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
