import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { useRoute } from "@react-navigation/native";


function Prestamos(props) {
  const route = useRoute()
  const { UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo, Saldo } = route.params || {};
  const [usuarioid,setUsuarioId] = useState("")
  const [monto,setMonto] = useState("")
  const [plazo,setPlazo] = useState("")
  const [estado,setEstado] = useState('Pendiente')
  const [fechaSolicitud,setFechaSolicitud] = useState("")
  const navigation = useNavigation();

  const RegistrarPrestamo = async () =>{
    const data = {
      UsuarioId: usuarioid,
      Monto: monto,
      Plazo: plazo,
      Estado: estado,
      FechaSolicitud: fechaSolicitud
    }

    try {
      const response = await fetch('http://localhost:3000/postprestamo',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if(response.ok){
        window.alert("Registro exitoso", "Tus datos fueron enviados correctamente.");
      } else {
        window.alert("Error en el registro", result.message || "Hubo un problema al enviar los datos.");
      }
    } catch (error) {
      window.alert("Error", "No se pudo conectar con el servidor.");
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.rect}>
      <TextInput 
        style={styles.input} 
        placeholder="Ingrese su documento"
        value = {usuarioid}
        onChangeText = {setUsuarioId}/>
      </View>
      <View style={styles.rect1}>
      <TextInput 
        style={styles.input} 
        placeholder="Ingrese el monto"
        value = {monto}
        onChangeText = {setMonto} />
      </View>
      <View style={styles.rect3}>
      <TextInput 
        style={styles.input} 
        placeholder="Ingrese el plazo"
        value = {plazo}
        onChangeText = {setPlazo} />
      </View>
      <View style={styles.rect2}>
      <TextInput 
        style={styles.input} 
        placeholder="Ingrese la fecha"
        value = {fechaSolicitud}
        onChangeText = {setFechaSolicitud} />
      </View>
      <Text style={styles.usuario}>Usuario:</Text>
      <Text style={styles.monto}>Monto:</Text>
      <Text style={styles.plazo}>Plazo:</Text>
      <Text style={styles.fecha}>Fecha de la solicitud:</Text>
      <View style={styles.cupertinoButtonInfo2Row}>
        <CupertinoButtonInfo2
          style={styles.cupertinoButtonInfo2}
          onPress = {RegistrarPrestamo}
        ></CupertinoButtonInfo2>
        <CupertinoButtonInfo3
          style={styles.cupertinoButtonInfo3}
          onPress = {() => navigation.navigate('Estado',{
            UsuarioId,
            Nombre,
            Email,
            Contraseña,
            NumeroCuenta,
            Tipo,
            Saldo
          })}
        ></CupertinoButtonInfo3>
      </View>
    </View>
  );
}

function CupertinoButtonInfo2(props) {
  return (
    <TouchableOpacity style={[styles.containerButton, props.style]} onPress={props.onPress} >
      <Text style={styles.completar}>Completar</Text>
    </TouchableOpacity>
  );
}

function CupertinoButtonInfo3(props) {
  return (
    <TouchableOpacity style={[styles.containerButton, props.style]} onPress={props.onPress}>
      <Text style={styles.estado}>Estado</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -40
  },
  rect: {
    width: 283,
    height: 36,
    backgroundColor: "#E6E6E6",
    marginTop: 126,
    marginLeft: 38
  },
  rect1: {
    width: 283,
    height: 36,
    backgroundColor: "#E6E6E6",
    marginTop: 49,
    marginLeft: 38
  },
  rect2: {
    width: 283,
    height: 36,
    backgroundColor: "#E6E6E6",
    marginTop: 48,
    marginLeft: 38
  },
  rect3: {
    width: 283,
    height: 36,
    backgroundColor: "#E6E6E6",
    marginTop: 48,
    marginLeft: 38
  },
  usuario: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 36,
    width: 283,
    marginTop: -310,
    marginLeft: 38
  },
  monto: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 36,
    width: 283,
    marginTop: 54,
    marginLeft: 38
  },
  plazo: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 36,
    width: 283,
    marginTop: 48,
    marginLeft: 38
  },
  fecha: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 36,
    width: 283,
    marginTop: 48,
    marginLeft: 38
  },
  cupertinoButtonInfo2: {
    height: 45,
    width: 166,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 7,
    backgroundColor: "rgba(126,188,53,1)"
  },
  cupertinoButtonInfo3: {
    height: 45,
    width: 166,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 7,
    marginLeft: 7
  },
  cupertinoButtonInfo2Row: {
    height: 45,
    flexDirection: "row",
    marginTop: 310,
    marginLeft: 14,
    marginRight: 7
  },
  containerButton: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
    estado: {
    color: "rgba(0,0,0,1)",
    fontSize: 17
  },
    completar: {
    color: "rgba(0,0,0,1)",
    fontSize: 17
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(126,188,53,1)",
    borderRadius: 7
  },
});

export default Prestamos;