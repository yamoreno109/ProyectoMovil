import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

function General(props) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <View style={styles.loremIpsumStack}>
            <Text style={styles.loremIpsum}>
              Alam Brito Delgado{"\n"}
              {"\n"}$$$$$$$$$$$$$$${"\n"}
              {"\n"}N° - CUENTA
            </Text>
            <Image
              source={require("../components/usuario.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>
          </View>
        </View>
        <Text style={styles.hola}>¡Hola!</Text>
      </View>
      <Image
        source={require("../components/oji.png")}
        resizeMode="contain"
        style={styles.image2}
      ></Image>
      <TouchableOpacity onPress={() => navigation.navigate("Cerrar")}>
        <Icon name="account" style={styles.icon}></Icon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12
  },
  rect: {
    top: 58,
    width: 303,
    height: 138,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    left: 0,
  },
  loremIpsum: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 108,
    width: 295,
  },
  image: {
    top: 4,
    left: 175,
    width: 113,
    height: 100,
    position: "absolute",
  },
  loremIpsumStack: {
    width: 295,
    height: 108,
    marginTop: 13,
    marginLeft: 4,
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
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: -524,
    marginLeft: 305,
  },
});

export default General;