import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={require("../img/91bb7ba34bf5caab93e4.jpg")}
        style={styles.avatar}
      />

      {/* Info */}
      <Text style={styles.name}>Nguyễn Thế Vinh</Text>
      <Text style={styles.mssv}>MSSV: 0308231082</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/weather")}
        >
          <Text style={styles.buttonText}>Bài 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/countries")}
        >
          <Text style={styles.buttonText}>Bài 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/bai3")}
        >
          <Text style={styles.buttonText}>Bài 3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f2027", // nền đẹp hơn
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#00c6ff",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  mssv: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 25,
  },

  buttonContainer: {
    width: "80%",
  },

  button: {
    backgroundColor: "#00c6ff",
    padding: 14,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",

    // shadow (Android + iOS)
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});