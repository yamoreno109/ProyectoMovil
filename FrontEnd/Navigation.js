import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';

import Login from './src/screens/login';
import Registro from './src/screens/registro'; 
import General from './src/screens/General';
import Prestamos from './src/screens/prestamos';
import Reporte from './src/screens/reporte';
import Reportes from './src/screens/reportes';
import Transaccion from './src/screens/transaccion';
import EstadoPrestamo from './src/screens/estadoPrestamo';
import CerrarSesion from './src/screens/cerrarsesion';
import ResporteTransaccion from './src/screens/transaccionReporte';
import ActualizarInformarcion from './src/screens/ActualizarUsuario';
import { useRoute } from '@react-navigation/native';

const StackNav = createNativeStackNavigator();
const TabNav = createBottomTabNavigator();

function HomeStackScreen() {
  const route = useRoute();
  const { UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Saldo, Tipo } = route.params || {};
  return (
    <TabNav.Navigator initialRouteName='General'>
      <TabNav.Screen 
        name='General' 
        component={General} 
        initialParams={{ UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Saldo, Tipo }}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="house-user" size={24} color="rgba(126,188,53,1)" />
          ),
          headerShown: false,
        }}
      />
      <TabNav.Screen 
        name='Transacciones' 
        component={Transaccion} 
        initialParams={{ UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Saldo, Tipo }}
        options={{
          tabBarLabel: 'Transacciones',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="money-bill-transfer" size={24} color="rgba(126,188,53,1)" />
          ),
          headerTintColor: 'rgba(126,188,53,1)',
        }}
      />
      <TabNav.Screen 
        name='Prestamos' 
        component={Prestamos}
        initialParams={{ UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Saldo, Tipo }} 
        options={{
          tabBarLabel: 'Préstamos',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="creditcard" size={24} color="rgba(126,188,53,1)" />
          ),
          headerTintColor: 'rgba(126,188,53,1)',
        }}
      />
      <TabNav.Screen 
        name='Reporte' 
        component={Reportes}
        initialParams={{ UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Saldo, Tipo }} 
        options={{
          tabBarLabel: 'Reporte',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="report" size={24} color="rgba(126,188,53,1)" />
          ),
          headerTintColor: 'rgba(126,188,53,1)',
        }}
      />
    </TabNav.Navigator>
  );
}

function MainStack() {
  return (
    <StackNav.Navigator initialRouteName="Login">
      <StackNav.Screen 
        name="Login" 
        component={Login} 
        options={{
          headerShown: false
        }} 
      />
      <StackNav.Screen 
        name="Registro" 
        component={Registro} 
        options={{
          headerTintColor : "rgba(126,188,53,1)"
        }}
        
      />
      <StackNav.Screen 
        name="Home" 
        component={HomeStackScreen} 
        options={{ headerShown: false }} 
      />
      <StackNav.Screen 
        name="Cerrar" 
        component={CerrarSesion}
        options={{
          headerTintColor : "rgba(126,188,53,1)"
        }}
        
      />
      <StackNav.Screen 
        name="Estado" 
        component={EstadoPrestamo}
        options={{
          headerTintColor : "rgba(126,188,53,1)"
        }}
      />
      <StackNav.Screen
        name="Historial"
        component={ResporteTransaccion}
        options ={{
          headerTintColor : "rgba(126,188,53,1)",
        }}
      />
      <StackNav.Screen
        name = "Actualizar"
        component={ActualizarInformarcion}
        options={{
          headerTintColor : "rgba(126,188,53,1)",
        }}
      />
    </StackNav.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}