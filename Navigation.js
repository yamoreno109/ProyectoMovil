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
import Transaccion from './src/screens/transaccion';
import EstadoPrestamo from './src/screens/estadoPrestamo';
import CerrarSesion from './src/screens/cerrarsesion';

const StackNav = createNativeStackNavigator();
const TabNav = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <TabNav.Navigator initialRouteName='General'>
      <TabNav.Screen 
        name='General' 
        component={General} 
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="house-user" size={24} color="green" />
          ),
          headerShown: false,
        }}
      />
      <TabNav.Screen 
        name='Transacciones' 
        component={Transaccion} 
        options={{
          tabBarLabel: 'Transacciones',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="money-bill-transfer" size={24} color="green" />
          ),
          headerTintColor: 'green',
        }}
      />
      <TabNav.Screen 
        name='Prestamos' 
        component={Prestamos} 
        options={{
          tabBarLabel: 'Préstamos',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="creditcard" size={24} color="green" />
          ),
          headerTintColor: 'green',
        }}
      />
      <TabNav.Screen 
        name='Reporte' 
        component={Reporte} 
        options={{
          tabBarLabel: 'Reporte',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="report" size={24} color="green" />
          ),
          headerTintColor: 'green',
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
      />
      <StackNav.Screen 
        name="Home" 
        component={HomeStackScreen} 
        options={{ headerShown: false }} 
      />
      <StackNav.Screen 
        name="Cerrar" 
        component={CerrarSesion} 
      />
      <StackNav.Screen 
        name="Estado" 
        component={EstadoPrestamo} 
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