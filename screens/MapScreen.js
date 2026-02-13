import { ActivityIndicator, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useUserLocation from "../hooks/useUserLocation";
import { restaurants } from "../data/restaurants";

export default function MapScreen() {
  const region = useUserLocation();

  if (!region) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  // Delta controls the zoom level (~0.05 ≈ 5 km radius)
  const latitudeDelta = 0.05;
  const longitudeDelta =
    latitudeDelta * (Dimensions.get("window").width / Dimensions.get("window").height);

  // Filter restaurants nearby (~5 km radius)
  const nearbyRestaurants = restaurants.filter(
    (res) =>
      Math.abs(res.latitude - region.latitude) < latitudeDelta &&
      Math.abs(res.longitude - region.longitude) < longitudeDelta
  );

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta,
        longitudeDelta,
      }}
      showsUserLocation
    >
      {nearbyRestaurants.map((res) => (
        <Marker
          key={res.id}
          coordinate={{
            latitude: res.latitude,
            longitude: res.longitude,
          }}
          title={res.name}
          description={`⭐ ${res.rating}`}
        />
      ))}
    </MapView>
  );
}
