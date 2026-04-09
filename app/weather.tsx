import { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function Bai1() {
  const [city, setCity] = useState('Ho Chi Minh');
  const [inputCity, setInputCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState('');

  const clockRef = useRef(null);

  const API_KEY = '46fef74ea2a821c8e97e45a9efcacd45';

  // 🔥 Lấy thời tiết
  const getWeather = (cityName) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=vi`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
          startClock(data.timezone);
        } else {
          alert('Không tìm thấy thành phố!');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // 🔥 Clock realtime theo timezone
  const startClock = (timezone) => {
    if (clockRef.current) clearInterval(clockRef.current);

    clockRef.current = setInterval(() => {
      const now = new Date();

      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const cityTime = new Date(utc + timezone * 1000);

      let hours = cityTime.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;

      const h = String(hours).padStart(2, '0');
      const m = String(cityTime.getMinutes()).padStart(2, '0');
      const s = String(cityTime.getSeconds()).padStart(2, '0');

      const d = String(cityTime.getDate()).padStart(2, '0');
      const mo = String(cityTime.getMonth() + 1).padStart(2, '0');
      const y = cityTime.getFullYear();

      setTime(`${h}:${m}:${s} ${ampm} - ${d}/${mo}/${y}`);
    }, 1000);
  };

  useEffect(() => {
    getWeather(city);

    return () => {
      if (clockRef.current) clearInterval(clockRef.current);
    };
  }, []);

  const handleSearch = () => {
    if (inputCity.trim() === '') return;

    Keyboard.dismiss(); // ✅ Ẩn bàn phím

    setCity(inputCity);
    getWeather(inputCity);
    setInputCity('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../img/pngtree-weather-after-rain-sunset-sky-meteorological-photography-map-image_834574.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>🌤️ Weather App</Text>

          {/* INPUT */}
          <TextInput
            placeholder="Nhập thành phố..."
            value={inputCity}
            onChangeText={setInputCity}
            style={styles.input}
            placeholderTextColor="#ccc"
            onSubmitEditing={handleSearch} // ✅ Enter là search
            returnKeyType="search"
            blurOnSubmit={true}
          />

          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.btnText}>Tìm</Text>
          </TouchableOpacity>

          {/* DATA */}
          {loading ? (
            <Text style={styles.loading}>Đang tải...</Text>
          ) : weather ? (
            <View style={styles.card}>
              <Text style={styles.city}>📍 {weather.name}</Text>

              <Text style={styles.time}>{time}</Text>

              <Text style={styles.temp}>
                {weather.main.temp.toFixed(1)}°C
              </Text>

              <Text style={styles.desc}>
                {weather.weather[0].description}
              </Text>

              <View style={styles.row}>
                <Text style={styles.info}>
                  💧 {weather.main.humidity}%
                </Text>
                <Text style={styles.info}>
                  🌬️ {weather.wind.speed} m/s
                </Text>
              </View>

              <Text style={styles.feel}>
                Cảm giác: {weather.main.feels_like.toFixed(1)}°C
              </Text>
            </View>
          ) : null}
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 220,
    backgroundColor: '#ffffff30',
    borderRadius: 15,
    padding: 10,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00c6ff',
    padding: 10,
    borderRadius: 15,
    width: 120,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loading: {
    color: '#fff',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#ffffff20',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: 360,
    paddingTop: 30,
  },
  city: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 5,
  },
  time: {
    color: '#ffd700',
    marginBottom: 10,
  },
  temp: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  desc: {
    color: '#ddd',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  info: {
    color: '#fff',
    fontSize: 16,
  },
  feel: {
    color: '#ccc',
    marginTop: 10,
  },
});