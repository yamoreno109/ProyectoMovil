import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";

function ActualizarUsuario(props) {
    const route = useRoute();
    const { UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo, Saldo } = route.params || {};
    const [nombre,setNombre] = useState()
    const [email,setEmail] = useState()
    const [contraseña,setContraseña] = useState()
    const [tipo,setTipo] = useState()

    const updateUsuario = async () =>{
        try {
            const response = await fetch(`http://localhost:3000/updateusuarios/${UsuarioId}`,{
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    Nombre: nombre,
                    Email: email,
                    Contraseña: contraseña,
                    Tipo: tipo
                })
            })
    
            const result = await response.json()
            if(response.ok){
                window.alert("Exito","Información actualizada correctamente")
                setNombre('');
                setEmail('');
                setContraseña('');
                setTipo('');
            }
            else{
                window.alert("Error",result.message || "No se pudo actualizar la información")
            }
        } catch (error) {
            console.log(error)
            window.alert("Error", "Hubo un problema con la actualización");
        }
    } 

  return (
    <View style={styles.container}>
      <Text style={styles.hola}>Actualizar Información</Text>
      
      <Text style={styles.nombre}>Nombre:</Text>
      <TextInput style={styles.input} placeholder="Ingrese su nombre" value={nombre} onChangeText={setNombre}/>

      <Text style={styles.email}>Email:</Text>
      <TextInput style={styles.input} placeholder="Ingrese su email" keyboardType="email-address" value={email} onChangeText={setEmail}/>

      <Text style={styles.contrasena}>Contraseña:</Text>
      <TextInput style={styles.input} placeholder="Ingrese su contraseña" secureTextEntry={true} value={contraseña} onChangeText={setContraseña} />

      <Text style={styles.tipo}>Tipo Cuenta:</Text>
      <TextInput style={styles.input} placeholder="Ingrese el tipo de cuenta" value={tipo} onChangeText={setTipo} />

      <CupertinoButtonInfo4 style={styles.cupertinoButtonInfo} onPress={updateUsuario}/>
    </View>
  );
}

function CupertinoButtonInfo4(props) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, props.style]} onPress={props.onPress}>
      <Text style={styles.cerrarSesion}>Actualizar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  hola: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 20,
  },
  nombre: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginBottom: 5,
  },
  email: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginBottom: 5,
    marginTop: 20,
  },
  contrasena: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginBottom: 5,
    marginTop: 20,
  },
  tipo: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginBottom: 5,
    marginTop: 20,
  },
  input: {
    width: 308,
    height: 39,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#E6E6E6",
    color: "#121212",
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1, 
    borderColor: "rgba(126,188,53,1)" 
  },
  cupertinoButtonInfo: {
    height: 45,
    width: "50%",
    backgroundColor: "rgba(126,188,53,1)",
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 7,
    alignSelf: "center",
    marginTop: 30,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  cerrarSesion: {
    color: "black",
    fontSize: 16,
  },
});

export default ActualizarUsuario;
