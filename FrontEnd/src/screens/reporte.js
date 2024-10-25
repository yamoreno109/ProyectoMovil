import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function Reportes(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.usuario}>Usuario:</Text>
      <View style={styles.rect}>
        <View style={styles.alambritoDelgadoStack}>
          <Text style={styles.alambritoDelgado}>
            Alambrito Delgado{"\n"}
            {"\n"}$$$$$$$$$${"\n"}
            {"\n"}N° - CUENTA
          </Text>
          <Image
            source={require("../components/usuario.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>
      <Text style={styles.ingresos}>Ingresos:</Text>
      <View style={styles.rect2} />  
      <Text style={styles.egresos}>Egresos:</Text>
      <View style={styles.rect3} />
      <Text style={styles.deudas}>Deudas:</Text>
      <View style={styles.rect4} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", 
    marginTop: 5, 
  },
  rect: {
    width: 300,
    height: 134,
    backgroundColor: "#E6E6E6",
    marginTop: 20, 
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  alambritoDelgado: {
    top: 2,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 107,
    width: 282,
  },
  image: {
    top: 0,
    left: 175,
    width: 88,
    height: 109,
    position: "absolute",
  },
  alambritoDelgadoStack: {
    width: 282,
    height: 109,
    marginTop: 15,
    marginLeft: 8,
  },
  usuario: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 30, 
    alignSelf: "flex-start", 
    marginLeft: 32,
  },
  rect2: {
    width: 300,
    height: 92,
    backgroundColor: "#E6E6E6",
    marginTop: 10, 
  },
  ingresos: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20, 
    alignSelf: "flex-start", 
    marginLeft: 32,
  },
  rect3: {
    width: 300,
    height: 92,
    backgroundColor: "#E6E6E6",
    marginTop: 10,
  },
  egresos: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20, 
    alignSelf: "flex-start", 
    marginLeft: 32,
  },
  rect4: {
    width: 300,
    height: 91,
    backgroundColor: "#E6E6E6",
    marginTop: 10, 
  },
  deudas: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20, 
    alignSelf: "flex-start", 
    marginLeft: 32,
  },
});

export default Reportes;