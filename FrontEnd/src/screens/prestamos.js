import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';


function Prestamos(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
      <TextInput style={styles.input} placeholder="Ingrese su usuario"/>
      </View>
      <View style={styles.rect1}>
      <TextInput style={styles.input} placeholder="Ingrese el monto" />
      </View>
      <View style={styles.rect2}>
      <TextInput style={styles.input} placeholder="Ingrese el plazo" />
      </View>
      <Text style={styles.usuario}>Usuario:</Text>
      <Text style={styles.monto}>Monto:</Text>
      <Text style={styles.plazo}>Plazo:</Text>
      <View style={styles.cupertinoButtonInfo2Row}>
        <CupertinoButtonInfo2
          style={styles.cupertinoButtonInfo2}
        ></CupertinoButtonInfo2>
        <CupertinoButtonInfo3
          style={styles.cupertinoButtonInfo3}
          onPress = {() => navigation.navigate('Estado')}
        ></CupertinoButtonInfo3>
      </View>
    </View>
  );
}

function CupertinoButtonInfo2(props) {
  return (
    <TouchableOpacity style={[styles.containerButton, props.style]} >
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
  usuario: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 36,
    width: 283,
    marginTop: -246,
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
  },
});

export default Prestamos;