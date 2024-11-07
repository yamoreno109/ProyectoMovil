import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

function Reportes() {
  const route = useRoute();
  const { UsuarioId, Nombre, Saldo, NumeroCuenta } = route.params || {};
  const [reportes, setReportes] = useState(null);

  const getReportes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/reporte/${UsuarioId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los reportes');
      }
      const data = await response.json();
      setReportes(data.reportes);
    } catch (error) {
      console.log('Error al obtener los reportes:', error);
    }
  };

  useEffect(() => {
    if (UsuarioId) {
      getReportes();
    }
  }, [UsuarioId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${year}/${month}/${day}`;
  };

  const formatReport = (report) => {
    return `${report.Monto} - ${report.Descripcion} - ${formatDate(report.Fecha)}`;
  };

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
          <Text style={styles.valueText}>
            {reportes ? reportes.Ingresos.map((ingreso, index) => (
              <Text key={index}>{formatReport(ingreso)}{index < reportes.Ingresos.length - 1 ? '\n' : ''}</Text>
            )) : "Cargando..."}
          </Text>
        </View>

        <Text style={styles.egresos}>Egresos:</Text>
        <View style={styles.infoBox}>
          <Text style={styles.valueText}>
            {reportes ? reportes.Egresos.map((egreso, index) => (
              <Text key={index}>{formatReport(egreso)}{index < reportes.Egresos.length - 1 ? '\n' : ''}</Text>
            )) : "Cargando..."}
          </Text>
        </View>

        <Text style={styles.deudas}>Deudas:</Text>
        <View style={styles.infoBox}>
          <Text style={styles.valueText}>
            {reportes ? reportes.Deudas.map((deuda, index) => (
              <Text key={index}>{formatReport(deuda)}{index < reportes.Deudas.length - 1 ? '\n' : ''}</Text>
            )) : "Cargando..."}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  hola: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  rectStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  rect: {
    width: '70%',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginRight: 15,
    borderColor: 'black',
    borderWidth: 2,
  },
  cardHolder: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardBalance: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  cardNumber: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    marginTop: 20,
  },
  ingresos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "rgba(126,188,53,1)",
    marginBottom: 10,
  },
  egresos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "rgba(126,188,53,1)",
    marginBottom: 10,
  },
  deudas: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "rgba(126,188,53,1)",
    marginBottom: 10,
  },
  infoBox: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginVertical: 5,
    borderColor: 'rgba(126,188,53,1)',
    borderWidth: 2,
    borderRadius: 7
  },
  valueText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Reportes;

