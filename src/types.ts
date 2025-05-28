// src/types.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  GenerarProyecto: undefined;
  ModificarProyecto: { id: string };
  VerProyectos: undefined;
  // Agrega otras rutas aquí
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, T>;

export type Proyecto = {
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
};