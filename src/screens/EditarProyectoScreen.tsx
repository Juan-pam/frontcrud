import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import { apiGet, apiPut } from "../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { RootStackParamList } from "../navigation/AppNavigator";

type EditarProyectoRouteProp = RouteProp<RootStackParamList, "EditarProyecto">;

const EditarProyectoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<EditarProyectoRouteProp>();
  const { proyectoId } = route.params;

  const [formData, setFormData] = useState({
    nombreProyecto: "",
    ubicacion: { provincia: "", distrito: "" },
    presupuesto: "",
    beneficiariosDirectos: "",
    plazoEjecucion: "",
    entidadEjecutora: "",
    estado: "planificación",
  });

  useEffect(() => {
    const cargarProyecto = async () => {
      try {
        const data = await apiGet(`/consultar?id=${proyectoId}`);
        setFormData({
          nombreProyecto: data.nombreProyecto || "",
          ubicacion: {
            provincia: data.ubicacion?.provincia || "",
            distrito: data.ubicacion?.distrito || "",
          },
          presupuesto: data.presupuesto?.toString() || "",
          beneficiariosDirectos: data.beneficiariosDirectos?.toString() || "",
          plazoEjecucion: new Date(data.plazoEjecucion)
            .toISOString()
            .split("T")[0],
          entidadEjecutora: data.entidadEjecutora || "",
          estado: data.estado || "planificación",
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        Alert.alert("Error", "No se pudo cargar el proyecto: " + errorMessage);
      }
    };

    cargarProyecto();
  }, [proyectoId]);

  const handleSubmit = async () => {
    if (
      isNaN(Number(formData.presupuesto)) ||
      isNaN(Number(formData.beneficiariosDirectos))
    ) {
      Alert.alert("Error", "Presupuesto y Beneficiarios deben ser números");
      return;
    }

    if (!formData.plazoEjecucion.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert(
        "Error",
        "La fecha debe estar en formato AAAA-MM-DD (por ejemplo: 2025-12-01)"
      );
      return;
    }

    const dataAEnviar = {
      ...formData,
      presupuesto: Number(formData.presupuesto),
      beneficiariosDirectos: Number(formData.beneficiariosDirectos),
      plazoEjecucion: new Date(formData.plazoEjecucion).toISOString(),
    };

    try {
      await apiPut(`/actualizar/${proyectoId}`, dataAEnviar);
      Toast.show("Proyecto actualizado", {
        duration: Toast.durations.SHORT,
      });
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al actualizar";
      Toast.show(errorMessage, { duration: Toast.durations.SHORT });
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/fondo.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Editar Proyecto</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del proyecto"
          value={formData.nombreProyecto}
          onChangeText={(text) =>
            setFormData({ ...formData, nombreProyecto: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Provincia"
          value={formData.ubicacion.provincia}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              ubicacion: { ...formData.ubicacion, provincia: text },
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Distrito"
          value={formData.ubicacion.distrito}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              ubicacion: { ...formData.ubicacion, distrito: text },
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Presupuesto"
          keyboardType="numeric"
          value={formData.presupuesto}
          onChangeText={(text) =>
            setFormData({ ...formData, presupuesto: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Beneficiarios"
          keyboardType="numeric"
          value={formData.beneficiariosDirectos}
          onChangeText={(text) =>
            setFormData({ ...formData, beneficiariosDirectos: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha de ejecución (AAAA-MM-DD)"
          value={formData.plazoEjecucion}
          onChangeText={(text) =>
            setFormData({ ...formData, plazoEjecucion: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Entidad Ejecutora"
          value={formData.entidadEjecutora}
          onChangeText={(text) =>
            setFormData({ ...formData, entidadEjecutora: text })
          }
        />

        <Button title="Guardar Cambios" onPress={handleSubmit} />
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
  formContainer: {
    padding: 20,
    marginTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 15,
    marginHorizontal: 20,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});

export default EditarProyectoScreen;