import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

function TransaccionReporte() {
    const route = useRoute();
    const { NumeroCuenta } = route.params || {};
    const [reportes, setReportes] = useState([]); 

    const getTranssacion = async () => {
        try {
            const response = await fetch(`http://localhost:3000/transaccion_reporte/${NumeroCuenta}`);
            if (!response.ok) {
                throw new Error('Error al obtener los reportes');
            }
            const data = await response.json();
            setReportes(data.transactions); 
        } catch (error) {
            console.log('Error al obtener los reportes: ', error);
        }
    };

    useEffect(() => {
        if (NumeroCuenta) {
            getTranssacion();
        }
    }, [NumeroCuenta]);

    const renderItem = ({ item }) => (
        <View style={styles.rect}>
            <Text style={styles.tipoTransaccion}>Tipo: {item.TipoTransaccion}</Text>
            <Text style={styles.monto}>Monto: ${item.Monto}</Text>
            <Text style={styles.fecha}>Fecha: {item.Fecha}</Text>
            <Text style={styles.mensaje}>Mensaje: {item.Mensaje}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={reportes} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()} 
                contentContainerStyle={styles.listContent}
            />
            <Image
                source={require("../components/oji.png")}
                resizeMode="contain"
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listContent: {
    padding: 20
  },
  rect: {
    width: '100%',
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  tipoTransaccion: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  monto: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    marginBottom: 5
  },
  fecha: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    marginBottom: 5
  },
  mensaje: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    marginBottom: 5
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20
  }
});

export default TransaccionReporte;
