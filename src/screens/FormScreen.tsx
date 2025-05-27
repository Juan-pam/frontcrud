import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "Context/AuthContext";
import { RootStackParamList } from "../navigation/AppNavigator";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, signIn, signOut } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = () => {
    setError(""); // Resetear error
    if (username.trim() === "admin" && password === "123456789") {
      signIn(username.trim());
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/fondo.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {user ? (
        <View style={styles.authContainer}>
          <Text style={styles.welcomeText}>Gestión de proyectos</Text>
          <Text style={styles.userText}>{user}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionText}>         Un gran proyecto comienza con </Text>
            <Text style={styles.sectionText}>                   una pequeña acción</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={signOut}
            >
              <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Form")}
            >
              <Text style={styles.buttonText}>Agregar proyecto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Proyectos")}
            >
              <Text style={styles.buttonText}>Ver Todos los proyectos</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Inicio de sesión</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#666"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  authContainer: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 5,
    textAlign: "center",
  },
  userText: {
    fontSize: 18,
    color: "#3498db",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionText: {
    fontSize: 16,
    color: "#34495e",
    marginVertical: 5,
  },
  buttonGroup: {
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#1e1c91",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default HomeScreen;