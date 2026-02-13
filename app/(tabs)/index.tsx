import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { restaurants } from "../../data/restaurants";
import { useRouter } from "expo-router";
import HomeScreen from "@/screens/HomeScreen";

export default function Index() {
  const router = useRouter();

  return (
    <HomeScreen/>
  );
}
