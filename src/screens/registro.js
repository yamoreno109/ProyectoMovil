import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

function Registro(props) {
  return (
    <View style={styles.container}>

      <Text style={styles.nombreCompleto}>Nombre completo:</Text>
      <View style={styles.rect}>
        <TextInput style={styles.input} placeholder="Ingrese su nombre completo" />
      </View>

      <Text style={styles.email}>Email:</Text>
      <View style={styles.rect1}>
        <TextInput style={styles.input} placeholder="Ingrese su email" keyboardType="email-address" />
      </View>

      <Text style={styles.contrasena}>Contraseña:</Text>
      <View style={styles.rect2}>
        <TextInput style={styles.input} placeholder="Ingrese su contraseña" secureTextEntry />
      </View>

      <Text style={styles.numeroDeCuenta}>Número de cuenta o celular:</Text>
      <View style={styles.rect3}>
        <TextInput style={styles.input} placeholder="Ingrese su número de cuenta o celular" keyboardType="phone-pad" />
      </View>

      <Text style={styles.tipoDeCuenta}>Tipo de cuenta:</Text>
      <View style={styles.rect4}>
        <TextInput style={styles.input} placeholder="Ingrese el tipo de cuenta" />
      </View>

      <View style={styles.cupertinoButtonInfo2Row}>
        <CupertinoButtonInfo2 style={styles.cupertinoButtonInfo2}></CupertinoButtonInfo2>
      </View>
    </View>
  );
}

function CupertinoButtonInfo2(props) {
  return (
    <TouchableOpacity style={[styles.containerButton, props.style]}>
      <Text style={styles.completar}>Completar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  nombreCompleto: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: "100%",
    marginTop: 25,
    marginBottom: 5,
  },
  email: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: "100%",
    marginTop: 25,
    marginBottom: 5,
  },
  contrasena: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: "100%",
    marginTop: 25,
    marginBottom: 5,
  },
  numeroDeCuenta: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: "100%",
    marginTop: 25,
    marginBottom: 5,
  },
  tipoDeCuenta: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: "100%",
    marginTop: 25,
    marginBottom: 5,
  },
  rect: {
    width: "100%",
    height: 33,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    alignSelf: "center",
  },
  rect1: {
    width: "100%",
    height: 33,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    alignSelf: "center",
  },
  rect2: {
    width: "100%",
    height: 33,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    alignSelf: "center",
  },
  rect3: {
    width: "100%",
    height: 33,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    alignSelf: "center",
  },
  rect4: {
    width: "100%",
    height: 33,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    alignSelf: "center",
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: "transparent",
    paddingHorizontal: 10,
  },
  cupertinoButtonInfo2: {
    height: 45,
    width: 166,
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
  },
  cupertinoButtonInfo2Row: {
    height: 49,
    flexDirection: "row",
    justifyContent: "center", // Centrar el botón horizontalmente
    marginTop: 30, // Ajustar el margen superior para separar del último campo
  },
  cupertinoHeaderWithAddButton1: {
    height: 35,
    width: "100%",
    marginTop: 20,
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
  completar: {
    color: "rgba(0,0,0,1)",
    fontSize: 17
  }
});

export default Registro;
