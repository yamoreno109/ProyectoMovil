import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

function CerrarSesion(props) {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Text style={styles.loremIpsum}>
          Alam Brito Delgado{"\n"}
          {"\n"}N° - CUENTA
        </Text>
      </View>
      <Image
        source={require("../components/usuario.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <CupertinoButtonInfo4 style={styles.cupertinoButtonInfo4} onPress = {() => navigation.navigate('Login')}/>
    </View>
  );
}

function CupertinoButtonInfo4(props) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, props.style]} onPress={props.onPress}>
      <Text style={styles.cerrarSesion}>Cerrar Sesion</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    width: 314,
    height: 139,
    backgroundColor: "#E6E6E6",
    marginTop: 231,
    marginLeft: 28
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 59,
    width: 284,
    marginTop: 19,
    marginLeft: 16
  },
  image: {
    width: 131,
    height: 143,
    marginTop: -314,
    marginLeft: 119
  },
  cupertinoButtonInfo4: {
    height: 45,
    width: 166,
    backgroundColor: "rgba(126,188,53,1)",
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
    marginTop: 376,
    marginLeft: 103
  },
  cerrarSesion: {
    color: "rgba(0,0,0,1)",
    fontSize: 17
  },
  buttonContainer: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
});

export default CerrarSesion;