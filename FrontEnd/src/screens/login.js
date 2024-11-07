import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Login(props) {
  const navigation = useNavigation();
  const [numeroCuenta, setNumeroCuenta] = useState("")
  const [contraseña, setContraseña] = useState("")

  const IngresarLobby = async () =>{
    if(!numeroCuenta || !contraseña){
      window.alert("Error", "Por favor, ingresa tu número de cuenta y contraseña.");
      return;
    }
    
    const info = {
      NumeroCuenta: numeroCuenta,
      Contraseña: contraseña
    }
    
    try {
      const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
      })

      const result = await response.json()

      
      if(!response.ok){
        throw new Error('Error en la autenticación')
      }
      if (result.success) {
        
        navigation.navigate('Home', {
          UsuarioId: result.user.UsuarioId,
          Nombre: result.user.Nombre,
          Email: result.user.Email,
          Contraseña: result.user.Contraseña,
          NumeroCuenta: result.user.NumeroCuenta,
          Tipo: result.user.Tipo,
          Saldo: result.user.Saldo
        });
      }
      
    } catch (error) {
      console.log(error) 
      window.alert("Error", "No se pudo iniciar sesión. Por favor, intenta nuevamente.");
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.bancoEstebanquito}>
        Le damos la bienvenida a Estebanquito
      </Text>

      <TextInput
        style={styles.numeroCuentaInput}
        placeholder="Número cuenta"
        placeholderTextColor="#121212"
        value={numeroCuenta}
        onChangeText={setNumeroCuenta}
      />

      <TextInput
        style={styles.contrasenaInput}
        placeholder="Contraseña"
        placeholderTextColor="#121212"
        secureTextEntry={true}
        value={contraseña}
        onChangeText={setContraseña}
      />

      <Text style={styles.loremIpsum}>
        Seleccione una de las siguientes opciones:
      </Text>

      <View style={styles.holaStack}>
        <Text style={styles.hola}>¡Hola!</Text>
        <Image
          source={require('../components/oji.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.cupertinoButtonInfoRow}>
        <CupertinoButtonInfo
          style={styles.cupertinoButtonInfo}
          onPress={IngresarLobby}
        />
        <View style={styles.cupertinoButtonInfoFiller}></View>
        <CupertinoButtonInfo1
          style={styles.cupertinoButtonInfo1}
          onPress={() => navigation.navigate('Registro')} 
        />
      </View>
    </View>
  );
}

function CupertinoButtonInfo(props) {
  return (
    <TouchableOpacity style={[styles.containerButton, props.style]} onPress={props.onPress}>
      <Text style={styles.ingresar}>Ingresar</Text>
    </TouchableOpacity>
  );
}

function CupertinoButtonInfo1(props) {
  return (
    <TouchableOpacity style={[styles.containerButton, props.style]} onPress={props.onPress}>
      <Text style={styles.ingresar}>Registrar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    marginLeft: 20
  },
  bancoEstebanquito: {
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "center",
    width: 313,
    height: 29,
    marginLeft: 15,
    marginTop: 237
  },
  numeroCuentaInput: {
    width: 313,
    height: 53,
    backgroundColor: "#E6E6E6",
    color: "#121212",
    paddingHorizontal: 10,
    marginLeft: -313,
    marginTop: 283,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1, 
    borderColor: "rgba(126,188,53,1)" 
  },
  contrasenaInput: {
    width: 313,
    height: 53,
    backgroundColor: "#E6E6E6",
    color: "#121212",
    paddingHorizontal: 10,
    marginLeft: -313,
    marginTop: 369,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1, 
    borderColor: "rgba(126,188,53,1)" 
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 31,
    width: 328,
    textAlign: "center",
    marginLeft: -328,
    marginTop: 490
  },
  hola: {
    top: 165,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 67,
    width: 243,
    textAlign: "center",
    lineHeight: 65,
    fontSize: 30
  },
  image: {
    top: 0,
    left: 37,
    width: 170,
    height: 166,
    position: "absolute"
  },
  holaStack: {
    width: 243,
    height: 232,
    marginLeft: -278
  },
  bancoEstebanquitoRow: {
    height: 521,
    flexDirection: "row",
    marginLeft: 17,
    marginTop: 37
  },
  cupertinoButtonInfo: {
    height: 45,
    width: 166,
    backgroundColor: "rgba(126,188,53,1)",
    borderWidth: 1,
    borderColor: "rgba(126,188,53,1)", 
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    overflow: "visible",
    borderRadius: 7
  },
  cupertinoButtonInfoFiller: {
    width: 20, 
  },
  cupertinoButtonInfo1: {
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
    borderRadius: 7
  },
  cupertinoButtonInfoRow: {
    height: 45,
    flexDirection: "row",
    flex: 1,
    marginRight: -20,
    marginLeft: -336,
    marginTop: 616,
    justifyContent: 'center' 
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
  ingresar: {
    color: "rgba(0,0,0,1)",
    fontSize: 17
  }
});

export default Login;
