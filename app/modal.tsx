import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/welcome" dismissTo style={styles.link}>
        <ThemedText type="link">Go to welcome screen</ThemedText>
      </Link>
    </ThemedView>
  );
}
