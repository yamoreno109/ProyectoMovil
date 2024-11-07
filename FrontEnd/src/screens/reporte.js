import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useRoute } from '@react-navigation/native';

function Reportes(props) {
  const route = useRoute();
  const { UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo, Saldo } = route.params || {};
  const [reportes, setReportes] = useState(null);

  const getReportes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/reporteuno/${UsuarioId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los reportes');
      }
      const data = await response.json();
      setReportes(data.user);
    } catch (error) {
      console.log('Error al obtener los reportes; ', error);
    }
  };

  useEffect(() => {
    if (UsuarioId) {
      getReportes();
    }
  }, [UsuarioId]);

  return (
    <View style={styles.container}>
      <Text style={styles.hola}>Tus Reportes</Text>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <Text style={styles.cardHolder}>{Nombre}</Text>
          <Text style={styles.cardBalance}>Saldo: ${Saldo}</Text>
          <Text style={styles.cardNumber}>{NumeroCuenta}</Text>
        </View>
        <Image
          source={require("../components/usuario.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.ingresos}>Ingresos:</Text>
        <View style={styles.infoBox}>
          <Text style={styles.valueText}>{reportes ? reportes.HistoricoIngresos : "Cargando..."}</Text>
        </View>

        <Text style={styles.egresos}>Egresos:</Text>
        <View style={styles.infoBox}>
          <Text style={styles.valueText}>{reportes ? reportes.HistoricoEgresos : "Cargando..."}</Text>
        </View>

        <Text style={styles.deudas}>Deudas:</Text>
        <View style={styles.infoBox}>
          <Text style={styles.valueText}>{reportes ? reportes.Deudas : "Cargando..."}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: '#f7f7f7',
  },
  rect: {
    width: 303,
    height: 140,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    padding: 16,
    position: "absolute",
    top: 50,
    left: 0,
  },
  cardHolder: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 22,
  },
  cardBalance: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    marginTop: 5,
  },
  cardNumber: {
    fontFamily: "roboto-bold",
    color: "#121212",
    fontSize: 18,
    letterSpacing: 2,
    marginTop: 5,
  },
  hola: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 40,
    marginBottom: 20,
  },
  rectStack: {
    width: 303,
    height: 196,
    marginBottom: 20,
  },
  image: {
    position: "absolute",
    top: 20,
    left: 230,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoBox: {
    width: 300,
    height: 92,
    backgroundColor: "#F5F5F5",
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2, 
    borderColor: "rgba(126,188,53,1)", 
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ingresos: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20,
    alignSelf: "flex-start",
    marginLeft: 32,
  },
  egresos: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20,
    alignSelf: "flex-start",
    marginLeft: 32,
  },
  deudas: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20,
    alignSelf: "flex-start",
    marginLeft: 32,
  },
  valueText: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
  },
});

export default Reportes;


