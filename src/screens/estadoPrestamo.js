import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function EstadoPrestamo(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}></View>
        <Text style={styles.prestamos}>Prestamos:</Text>
      </View>
      <View style={styles.rect1Stack}>
        <View style={styles.rect1}></View>
        <Text style={styles.estado}>Estado:</Text>
      </View>
      <View style={styles.fechaStack}>
        <Text style={styles.fecha}>Fecha:</Text>
        <View style={styles.rect2}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -30 
  },
  rect: {
    top: 27,
    width: 279,
    height: 143,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    left: 2
  },
  prestamos: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 33,
    width: 283
  },
  rectStack: {
    width: 283,
    height: 170,
    marginTop: 66,
    marginLeft: 38
  },
  rect1: {
    top: 26,
    width: 279,
    height: 143,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    left: 2
  },
  estado: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 33,
    width: 283
  },
  rect1Stack: {
    width: 283,
    height: 169,
    marginTop: 11,
    marginLeft: 38
  },
  fecha: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 33,
    width: 283
  },
  rect2: {
    top: 26,
    width: 279,
    height: 143,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    left: 2
  },
  fechaStack: {
    width: 283,
    height: 169,
    marginTop: 29,
    marginLeft: 38
  }
});

export default EstadoPrestamo;
