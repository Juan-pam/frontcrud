import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importación añadida
import { apiPost } from "../services/api";
import Toast from 'react-native-root-toast';

const FormScreen: React.FC = () => {
  const [proyecto, setProyecto] = useState({
    nombreProyecto: "",
    ubicacion: { ubicacionProvincia: "", ubicacionDistrito: "" },
    presupuesto: "",
    beneficiariosDirectos: "",
    plazoEjecucion: "",
    entidadEjecutora: "",
    estado: "planificación"
  });
  
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const estados = ["planificación", "en ejecución", "finalizado", "suspendido"];

  const handleSubmit = async () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!proyecto.nombreProyecto) nuevosErrores.nombreProyecto = "Nombre del proyecto requerido";
    if (!proyecto.ubicacion.ubicacionProvincia) nuevosErrores.provincia = "Provincia requerida";
    if (!proyecto.ubicacion.ubicacionDistrito) nuevosErrores.distrito = "Distrito requerido";
    if (!proyecto.presupuesto) nuevosErrores.presupuesto = "Presupuesto requerido";
    if (!proyecto.plazoEjecucion) nuevosErrores.plazoEjecucion = "Fecha de plazo requerida";
    if (!proyecto.entidadEjecutora) nuevosErrores.entidadEjecutora = "Entidad ejecutora requerida";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    setLoading(true);

    try {
      const nuevoProyecto = {
        ...proyecto,
        presupuesto: Number(proyecto.presupuesto),
        beneficiariosDirectos: Number(proyecto.beneficiariosDirectos),
        plazoEjecucion: new Date(proyecto.plazoEjecucion).toISOString()
      };
      console.log("🚀 ~ handleSubmit ~ nuevoProyecto:", nuevoProyecto)

      await apiPost("/crear", nuevoProyecto);
      Alert.alert("Éxito", "Proyecto registrado exitosamente");
      
      setProyecto({
        nombreProyecto: "",
        ubicacion: { ubicacionProvincia: "", ubicacionDistrito: "" },
        presupuesto: "",
        beneficiariosDirectos: "",
        plazoEjecucion: "",
        entidadEjecutora: "",
        estado: "planificación"
      });

    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el proyecto");
    } finally {
      setLoading(false);
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
        <Text style={styles.title}>Formulario de Proyecto</Text>

        <TextInput
          style={[styles.input, errores.nombreProyecto && styles.inputError]}
          placeholder="Nombre del proyecto"
          value={proyecto.nombreProyecto}
          onChangeText={text => setProyecto({...proyecto, nombreProyecto: text})}
        />
        {errores.nombreProyecto && <Text style={styles.error}>{errores.nombreProyecto}</Text>}

        <TextInput
          style={[styles.input, errores.provincia && styles.inputError]}
          placeholder="Provincia"
          value={proyecto.ubicacion.ubicacionProvincia}
          onChangeText={text => setProyecto({...proyecto, ubicacion: {...proyecto.ubicacion, ubicacionProvincia: text}})}
        />
        {errores.provincia && <Text style={styles.error}>{errores.provincia}</Text>}

        <TextInput
          style={[styles.input, errores.distrito && styles.inputError]}
          placeholder="Distrito"
          value={proyecto.ubicacion.ubicacionDistrito}
          onChangeText={text => setProyecto({...proyecto, ubicacion: {...proyecto.ubicacion, ubicacionDistrito: text}})}
        />
        {errores.distrito && <Text style={styles.error}>{errores.distrito}</Text>}

        <TextInput
          style={[styles.input, errores.presupuesto && styles.inputError]}
          placeholder="Presupuesto"
          keyboardType="numeric"
          value={proyecto.presupuesto}
          onChangeText={text => setProyecto({...proyecto, presupuesto: text})}
        />
        {errores.presupuesto && <Text style={styles.error}>{errores.presupuesto}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Beneficiarios directos"
          keyboardType="numeric"
          value={proyecto.beneficiariosDirectos}
          onChangeText={text => setProyecto({...proyecto, beneficiariosDirectos: text})}
        />

        <TextInput
          style={[styles.input, errores.plazoEjecucion && styles.inputError]}
          placeholder="Plazo de ejecución (YYYY-MM-DD)"
          value={proyecto.plazoEjecucion}
          onChangeText={text => setProyecto({...proyecto, plazoEjecucion: text})}
        />
        {errores.plazoEjecucion && <Text style={styles.error}>{errores.plazoEjecucion}</Text>}

        <TextInput
          style={[styles.input, errores.entidadEjecutora && styles.inputError]}
          placeholder="Entidad ejecutora"
          value={proyecto.entidadEjecutora}
          onChangeText={text => setProyecto({...proyecto, entidadEjecutora: text})}
        />
        {errores.entidadEjecutora && <Text style={styles.error}>{errores.entidadEjecutora}</Text>}

        <Text style={styles.label}>Estado del Proyecto</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={proyecto.estado}
            onValueChange={(itemValue: string) => setProyecto({...proyecto, estado: itemValue})}
          >
            {estados.map(estado => (
              <Picker.Item 
                key={estado} 
                label={estado.toUpperCase()} 
                value={estado} 
              />
            ))}
          </Picker>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
        ) : (
          <Text style={styles.button} onPress={handleSubmit}>
            Guardar Proyecto
          </Text>
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
  formContainer: {
    padding: 20,
    marginTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 15,
    marginHorizontal: 20,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  pickerWrapper: {
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    padding: 15,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default FormScreen;