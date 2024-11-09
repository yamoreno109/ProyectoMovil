import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

function Registro(props) {
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState(""); 
  const [contraseña, setContraseña] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");

  const RegistrarUsuario = async () => {
    const data = {
      UsuarioId: numeroDocumento,
      Nombre: nombreCompleto,
      Email: email,
      Contraseña: contraseña,
      NumeroCuenta: numeroCuenta,
      Tipo: tipoCuenta,
    };

    console.log("Datos que se envían al servidor:", data);

    try {
      const response = await fetch('http://localhost:3000/postusuario', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        window.alert("Registro exitoso", "Tus datos fueron enviados correctamente.");
        setNumeroCuenta('');
        setNombreCompleto('');
        setEmail('');
        setContraseña('');
        setNumeroCuenta('');
        setTipoCuenta('');
      } else {
        window.alert("Error en el registro", result.message || "Hubo un problema al enviar los datos.");
      }
    } catch (error) {
      window.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Número de documento:</Text>
      <View style={styles.rect}>
        <TextInput 
          style={styles.input} 
          placeholder="Ingrese su número de documento"
          value={numeroDocumento}
          onChangeText={setNumeroDocumento} 
        />
      </View>

      <Text style={styles.label}>Nombre completo:</Text>
      <View style={styles.rect}>
        <TextInput 
          style={styles.input} 
          placeholder="Ingrese su nombre completo"
          value={nombreCompleto}
          onChangeText={setNombreCompleto} 
        />
      </View>

      <Text style={styles.label}>Email:</Text>
      <View style={styles.rect}>
        <TextInput 
          style={styles.input} 
          placeholder="Ingrese su email" 
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} 
        />
      </View>

      <Text style={styles.label}>Contraseña:</Text>
      <View style={styles.rect}>
        <TextInput 
          style={styles.input} 
          placeholder="Ingrese su contraseña" 
          secureTextEntry
          value={contraseña}
          onChangeText={setContraseña} 
        />
      </View>

      <Text style={styles.label}>Número de cuenta o celular:</Text>
      <View style={styles.rect}>
        <TextInput 
          style={styles.input} 
          placeholder="Ingrese su número de cuenta o celular" 
          keyboardType="phone-pad" 
          value={numeroCuenta}
          onChangeText={setNumeroCuenta} 
        />
      </View>

      <Text style={styles.label}>Tipo de cuenta:</Text>
      <View style={styles.rect}>
        <TextInput 
          style={styles.input} 
          placeholder="Ingrese el tipo de cuenta"
          value={tipoCuenta}
          onChangeText={setTipoCuenta} 
        />
      </View>

      <View style={styles.cupertinoButtonInfo2Row}>
        <CupertinoButtonInfo2 style={styles.cupertinoButtonInfo2} onPress={RegistrarUsuario} />
      </View>
    </View>
  );
}

function CupertinoButtonInfo2(props) {
  return (
    <TouchableOpacity style={[styles.containerButton, props.style]} onPress={props.onPress}>
      <Text style={styles.completar}>Completar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: "100%",
    marginTop: 10, 
    marginBottom: 2, 
  },
  rect: {
    width: 313,
    height: 53,
    backgroundColor: "#E6E6E6",
    marginTop: -8, 
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(126,188,53,1)",
    borderRadius: 5,
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
    justifyContent: "center",
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

