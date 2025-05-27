import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity,
  Image
} from "react-native";
import { apiGet, apiDelete } from "../services/api";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

interface Proyecto {
  _id: string;
  nombreProyecto: string;
  ubicacion: {
    provincia: string;
    distrito: string;
  };
  presupuesto: number;
  beneficiariosDirectos: number;
  plazoEjecucion: string;
  entidadEjecutora: string;
  estado: string;
}

const ProyectosScreen: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const cargarProyectos = async () => {
    try {
      setLoading(true);
      const data = await apiGet("/consultar");
      setProyectos(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los proyectos");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await cargarProyectos();
    setRefreshing(false);
  }, []);

  const eliminarProyecto = async (id: string) => {
    Alert.alert("Confirmar", "¿Deseas eliminar este proyecto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await apiDelete(`/eliminar/${id}`);
            setProyectos(prev => prev.filter(p => p._id !== id));
            Toast.show("Proyecto eliminado correctamente", {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
            });
          } catch (error) {
            Toast.show("Error al eliminar el proyecto", {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
            });
          }
        },
      },
    ]);
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/fondo.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Listado de Proyectos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : proyectos.length === 0 ? (
          <Text style={styles.mensaje}>No hay proyectos registrados</Text>
        ) : (
          <FlatList
            data={proyectos}
            keyExtractor={(item) => item._id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.nombreProyecto}>{item.nombreProyecto}</Text>
                <Text style={styles.detalle}>
                  <Text style={styles.etiqueta}>Ubicación:</Text> {item.ubicacion.provincia}, {item.ubicacion.distrito}
                </Text>
                <Text style={styles.detalle}>
                  <Text style={styles.etiqueta}>Presupuesto:</Text> ${item.presupuesto.toLocaleString()}
                </Text>
                <Text style={styles.detalle}>
                  <Text style={styles.etiqueta}>Estado:</Text> {item.estado.toUpperCase()}
                </Text>
                <Text style={styles.detalle}>
                  <Text style={styles.etiqueta}>Plazo:</Text> {new Date(item.plazoEjecucion).toLocaleDateString()}
                </Text>

                <View style={styles.botonesContainer}>
                  <TouchableOpacity
                    style={[styles.boton, styles.botonEditar]}
                    onPress={() => navigation.navigate("EditarProyecto", { proyectoId: item._id })}
                  >
                    <Text style={styles.textoBoton}>Editar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.boton, styles.botonEliminar]}
                    onPress={() => eliminarProyecto(item._id)}
                  >
                    <Text style={styles.textoBoton}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  mensaje: {
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  nombreProyecto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 10,
  },
  detalle: {
    fontSize: 14,
    color: "#34495e",
    marginVertical: 3,
  },
  etiqueta: {
    fontWeight: "600",
    color: "#2c3e50",
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    gap: 10,
  },
  boton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  botonEditar: {
    backgroundColor: "#2980b9",
  },
  botonEliminar: {
    backgroundColor: "#e74c3c",
  },
  textoBoton: {
    color: "white",
    fontWeight: "500",
  },
});

export default ProyectosScreen;