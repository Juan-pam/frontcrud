import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "Context/AuthContext";
import { RootStackParamList } from "../navigation/AppNavigator";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, signIn, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/fondo.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {user ? (
        <View style={styles.authContainer}>
          <Text style={styles.welcomeText}>Bienvenido a Programación de Dispositivos Móviles</Text>
          <Text style={styles.userText}>{user}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionText}></Text>
            <Text style={styles.sectionText}></Text>
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
          <Text style={styles.loginText}>No has iniciado sesión</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => signIn("UsuarioDemo")}
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
    padding: 20,
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "600",
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
    elevation: 2,
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
    backgroundColor: "#fa3232",
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
  loginText: {
    fontSize: 18,
    color: "#34495e",
    marginBottom: 30,
  },
  loginButton: {
    width: "60%",
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#27ae60",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;