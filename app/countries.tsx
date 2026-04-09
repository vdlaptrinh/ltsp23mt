import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterData();
  }, [search, region, countries]);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,subregion,currencies,languages,borders,cca3"
      );
      setCountries(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log("API lỗi:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    const text = search.trim().toLowerCase();

    const result = countries.filter((item) => {
      const name = item?.name?.common?.toLowerCase() || "";
      const matchSearch = name.includes(text);
      const matchRegion = region ? item.region === region : true;
      return matchSearch && matchRegion;
    });

    setFiltered(result);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedCountry(item)}>
      <View
        style={[
          styles.card,
          { backgroundColor: darkMode ? "#1e1e1e" : "#fff" },
        ]}
      >
        <Image source={{ uri: item.flags?.png }} style={styles.flag} />
        <Text style={[styles.name, { color: darkMode ? "#fff" : "#000" }]}>
          {item.name.common}
        </Text>
        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Population: {item.population}
        </Text>
        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Region: {item.region}
        </Text>
        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Capital: {item.capital?.[0]}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // ====== DETAIL SCREEN ======
  if (selectedCountry) {
    const currencies = selectedCountry.currencies
      ? Object.values(selectedCountry.currencies)
          .map((c) => c.name)
          .join(", ")
      : "N/A";

    const languages = selectedCountry.languages
      ? Object.values(selectedCountry.languages).join(", ")
      : "N/A";

    // 🔥 xử lý borders thành object country
    const borderCountries = selectedCountry.borders
      ? selectedCountry.borders
          .map((code) =>
            countries.find((c) => c.cca3 === code)
          )
          .filter(Boolean)
      : [];

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: darkMode ? "#121212" : "#fff" },
        ]}
      >
        <TouchableOpacity onPress={() => setSelectedCountry(null)}>
          <Text style={{ color: darkMode ? "#fff" : "#000", marginBottom: 10 }}>
            ← Back
          </Text>
        </TouchableOpacity>

        <Image
          source={{ uri: selectedCountry.flags?.png }}
          style={{ width: "100%", height: 200, marginBottom: 10 }}
        />

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: darkMode ? "#fff" : "#000",
            marginBottom: 10,
          }}
        >
          {selectedCountry.name.common}
        </Text>

        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Official Name: {selectedCountry.name.official}
        </Text>

        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Population: {selectedCountry.population}
        </Text>

        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Region: {selectedCountry.region}
        </Text>

        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Subregion: {selectedCountry.subregion || "N/A"}
        </Text>

        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Capital: {selectedCountry.capital?.[0]}
        </Text>

        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Currencies: {currencies}
        </Text>

        <Text style={{ color: darkMode ? "#ddd" : "#000" }}>
          Languages: {languages}
        </Text>

        {/* 🔥 BORDER CLICK */}
        <Text style={{ color: darkMode ? "#ddd" : "#000", marginTop: 10 }}>
          Borders:
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
          {borderCountries.length > 0 ? (
            borderCountries.map((c) => (
              <TouchableOpacity
                key={c.cca3}
                onPress={() => setSelectedCountry(c)}
                style={{
                  padding: 6,
                  marginRight: 6,
                  marginBottom: 6,
                  borderWidth: 1,
                  borderRadius: 6,
                  borderColor: darkMode ? "#555" : "#000",
                }}
              >
                <Text style={{ color: darkMode ? "#fff" : "#000" }}>
                  {c.name.common}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: darkMode ? "#ddd" : "#000" }}>N/A</Text>
          )}
        </View>
      </View>
    );
  }

  // ====== LOADING ======
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ====== MAIN SCREEN ======
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#121212" : "#fff" },
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>
          Where in the world?
        </Text>

        <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
          <Text style={{ color: darkMode ? "#fff" : "#000" }}>
            {darkMode ? "☀️" : "🌙"}
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search for a country..."
        placeholderTextColor={darkMode ? "#aaa" : "#666"}
        value={search}
        onChangeText={setSearch}
        style={[
          styles.input,
          {
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#555" : "#ccc",
          },
        ]}
      />

      <View style={styles.filterRow}>
        {["Africa", "Americas", "Asia", "Europe", "Oceania"].map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => setRegion(r === region ? "" : r)}
            style={[
              styles.filterBtn,
              {
                backgroundColor:
                  region === r
                    ? darkMode
                      ? "#555"
                      : "#333"
                    : "transparent",
                borderColor: darkMode ? "#555" : "#000",
              },
            ]}
          >
            <Text
              style={{
                color:
                  region === r
                    ? "#fff"
                    : darkMode
                    ? "#fff"
                    : "#000",
              }}
            >
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.cca3}
        renderItem={renderItem}
      />
    </View>
  );
}

// ====== STYLE ======
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  filterBtn: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  card: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  flag: {
    width: "100%",
    height: 120,
    marginBottom: 6,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});