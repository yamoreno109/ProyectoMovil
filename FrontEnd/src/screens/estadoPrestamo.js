import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

function EstadoPrestamo() {
    const route = useRoute();
    const { UsuarioId } = route.params || {};
    const [prestamos, setPrestamos] = useState([]);

    const getPrestamos = async () => {
        try {
            const response = await fetch(`http://localhost:3000/getprestamouno/${UsuarioId}`);
            if (!response.ok) {
                throw new Error('Error al obtener los préstamos');
            }
            const data = await response.json();
            setPrestamos(data.transactions);
        } catch (error) {
            console.log('Error al obtener los préstamos: ', error);
        }
    };

    useEffect(() => {
        if (UsuarioId) {
            getPrestamos();
        }
    }, [UsuarioId]);

    const renderItem = ({ item }) => (
        <View style={styles.rect}>
            <Text style={styles.prestamos}>Préstamo: {item.Monto}</Text>
            <Text style={styles.estado}>Estado: {item.Estado}</Text>
            <Text style={styles.fecha}>Fecha de solicitud: {item.FechaSolicitud}</Text>
            <Text style={styles.plazo}>Plazo: {item.Plazo}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={prestamos}
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
        backgroundColor: "#fff",
    },
    listContent: {
        padding: 20,
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
        elevation: 5,
    },
    prestamos: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    estado: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 16,
        marginBottom: 5,
    },
    fecha: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 16,
        marginBottom: 5,
    },
    plazo: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 16,
        marginBottom: 5,
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginTop: 20,
    },
});

export default EstadoPrestamo;
