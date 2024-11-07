import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

function General(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const { UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo, Saldo } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <View style={styles.chip} />
          <Text style={styles.cardNumber}>
            {NumeroCuenta}
          </Text>
          <Text style={styles.cardHolder}>
            {Nombre}
          </Text>
          <Text style={styles.cardType}>
            {Tipo}
          </Text>
          <Text style={styles.cardBalance}>
            Saldo: ${Saldo}
          </Text>
          <Text style={styles.expiryDate}>
            Exp: 12/25
          </Text>
        </View>
        <Image
          source={require("../components/usuario.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.hola}>¡Hola!</Text>
      </View>
      <Image
        source={require("../components/oji.png")}
        resizeMode="contain"
        style={styles.image2}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Cerrar",{
        UsuarioId,
        Nombre,
        Email,
        Contraseña,
        NumeroCuenta,
        Tipo,
        Saldo
      })}>
        <Icon name="account" style={styles.icon}></Icon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: '#f7f7f7', 
  },
  rect: {
    width: 303,
    height: 180,
    backgroundColor: "#ffffff", 
    borderRadius: 12, 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    padding: 16, 
    position: "absolute",
    top: 100,
    left: 0,
  },
  chip: {
    width: 40,
    height: 25,
    backgroundColor: "#ccc",
    borderRadius: 5,
    position: "absolute",
    top: 10,
    left: 20,
  },
  cardNumber: {
    marginTop: 30,
    fontFamily: "roboto-bold",
    fontSize: 22,
    color: "#121212",
    letterSpacing: 2,
  },
  cardHolder: {
    position: "absolute",
    bottom: 40, 
    left: 20,
    fontFamily: "roboto-regular",
    color: "#121212",
  },
  cardType: {
    position: "absolute",
    bottom: 20, 
    left: 20,
    fontFamily: "roboto-regular",
    color: "#121212",
  },
  cardBalance: {
    position: "absolute",
    bottom: 5, 
    left: 20,
    fontFamily: "roboto-regular",
    color: "#121212",
  },
  expiryDate: {
    position: "absolute",
    bottom: 20,
    right: 20,
    fontFamily: "roboto-regular",
    color: "#121212",
  },
  image: {
    position: "absolute",
    top: 70, 
    left: 240, 
    width: 60, 
    height: 60,
    borderRadius: 30, 
    borderWidth: 2,
    borderColor: "#ccc", 
    backgroundColor: "#fff", 
    elevation: 4, 
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hola: {
    top: 0,
    left: 1,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 71,
    width: 187,
    fontSize: 40,
  },
  rectStack: {
    width: 303,
    height: 196,
    marginTop: 113,
    marginLeft: 28,
  },
  image2: {
    width: 200,
    height: 200,
    marginTop: 71,
    marginLeft: 80,
  },
  icon: {
    color: "rgba(126,188,53,1)",
    fontSize: 40,
    marginTop: -524,
    marginLeft: 305,
  },
});

export default General;




