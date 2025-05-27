import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import FormScreen from "../screens/FormScreen";
import ProyectosScreen from "../screens/ProyectosScreen";
import EditarProyectoScreen from "../screens/EditarProyectoScreen";

// Exporta el tipo para uso en otros componentes
export type RootStackParamList = {
  Home: undefined;
  Form: undefined;
  Proyectos: undefined;
  EditarProyecto: { proyectoId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#f8f9fa" },
        headerTintColor: "#2c3e50",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
      <Stack.Screen name="Form" component={FormScreen} options={{ title: "Nuevo Proyecto" }} />
      <Stack.Screen name="Proyectos" component={ProyectosScreen} options={{ title: "Listado de Proyectos" }} />
      <Stack.Screen name="EditarProyecto" component={EditarProyectoScreen} options={{ title: "Editar Proyecto" }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;