import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

function Transacciones(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo, Saldo } = route.params || {};
  const [selectedOption, setSelectedOption] = useState(null);
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [cuentaRemitente, setCuentaRemitente] = useState('');
  const [cuentaDestinatario, setCuentaDestinatario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransferencia = async () => {
    setLoading(true); 

    try {
      const response = await fetch('http://localhost:3000/transferencias', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuentaRemitente,
          cuentaDestinatario,
          monto: parseFloat(monto), 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', data.message);

        setMonto('');
        setCuentaRemitente('');
        setCuentaDestinatario('');
        setMensaje('');
      } else {
        Alert.alert('Error', data.message || 'Hubo un problema al realizar la transferencia');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de red o servidor');
    } finally {
      setLoading(false); 
    }
  };

  const handleDeposito = async () => {
    setLoading(true); 

    try {
      const response = await fetch('http://localhost:3000/depositos', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuentaDestinatario,
          monto: parseFloat(monto), 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', data.message);
        // Limpiar los campos
        setMonto('');
        setCuentaRemitente('');
        setCuentaDestinatario('');
        setMensaje('');
      } else {
        Alert.alert('Error', data.message || 'Hubo un problema al realizar el deposito');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de red o servidor');
    } finally {
      setLoading(false); 
    }
  };

  const handleRetiro = async () => {
    setLoading(true); 

    try {
      const response = await fetch('http://localhost:3000/retiro', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuentaDestinatario,
          monto: parseFloat(monto), 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', data.message);
        // Limpiar los campos
        setMonto('');
        setCuentaRemitente('');
        setCuentaDestinatario('');
        setMensaje('');
      } else {
        Alert.alert('Error', data.message || 'Hubo un problema al realizar el retiro');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de red o servidor');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.spacing} />
  
      <Text style={styles.fecha}>Fecha:</Text>
      <TextInput
        style={styles.rect2}
        placeholder="Ingrese la fecha"
        value={fecha}
        onChangeText={setFecha}
      />
  
      <Text style={styles.monto}>Monto:</Text>
      <TextInput
        style={styles.rect1}
        placeholder="Ingrese el monto"
        value={monto}
        keyboardType="numeric"
        onChangeText={setMonto}
      />
  
      {selectedOption === "transferencia" && (
        <>
          <Text style={styles.cuenta}>Cuenta Remitente:</Text>
          <TextInput
            style={styles.rect3}
            placeholder="Ingrese la cuenta remitente"
            value={cuentaRemitente}
            onChangeText={setCuentaRemitente}
          />
        </>
      )}
  
      <Text style={styles.cuenta}>Cuenta Destinatario:</Text>
      <TextInput
        style={styles.rect3}
        placeholder="Ingrese la cuenta destinatario"
        value={cuentaDestinatario}
        onChangeText={setCuentaDestinatario}
      />
  
      <Text style={styles.mensaje}>Mensaje:</Text>
      <TextInput
        style={styles.rect4}
        placeholder="Ingrese un mensaje"
        value={mensaje}
        onChangeText={setMensaje}
      />
  
      <View style={styles.radioOptionRow}>
        <CupertinoRadio
          selected={selectedOption === "transferencia"}
          style={styles.radio}
          onPress={() => setSelectedOption("transferencia")}
        />
        <Text style={styles.radioOptionText}>Transferencia</Text>
      </View>
  
      <View style={styles.radioOptionRow}>
        <CupertinoRadio
          selected={selectedOption === "deposito"}
          style={styles.radio}
          onPress={() => setSelectedOption("deposito")}
        />
        <Text style={styles.radioOptionText}>Depósito</Text>
      </View>
  
      <View style={styles.radioOptionRow}>
        <CupertinoRadio
          selected={selectedOption === "retiro"}
          style={styles.radio}
          onPress={() => setSelectedOption("retiro")}
        />
        <Text style={styles.radioOptionText}>Retiro</Text>
      </View>
  
      <CupertinoButtonInfo2 
        style={styles.cupertinoButtonInfo2} 
        onPress={() => {
          if (selectedOption === "deposito") {
            handleDeposito();
          } else if (selectedOption === "transferencia") {
            handleTransferencia();
          } else if (selectedOption === "retiro") {
            handleRetiro();
          } else {
            Alert.alert("Seleccione una opción", "Por favor seleccione el tipo de transacción antes de continuar.");
          }
        }} 
        disabled={loading} 
      />
  
      <CupertinoButtonInfo style={styles.cupertinoButtonInfo1} onPress={() => navigation.navigate('Historial', {
        UsuarioId,
        Nombre,
        Email,
        Contraseña,
        NumeroCuenta,
        Tipo,
        Saldo
      })} />
    </View>
  );
  
}

function CupertinoRadio({ selected, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.radioContainer, style]} onPress={onPress}>
      <Icon
        name={selected ? "radio-button-on-outline" : "radio-button-off-outline"}
        style={[styles.radioIcon, { color: selected ? "rgba(126,188,53,1)" : "#ccc" }]}
      />
    </TouchableOpacity>
  );
}

function CupertinoButtonInfo2(props) {
  return (
    <TouchableOpacity style={[styles.cupertinoButtonInfo2, props.style]} onPress={props.onPress} disabled={props.disabled}>
      <Text style={styles.buttonText}>{props.disabled ? 'Cargando...' : 'Completar'}</Text>
    </TouchableOpacity>
  );
}

function CupertinoButtonInfo(props) {
  return (
    <TouchableOpacity style={[styles.buttonContainer1, props.style]} onPress={props.onPress}>
      <Text style={styles.buttonText}>Historial</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: -90,
    marginLeft: 20,
  },
  spacing: {
    height: 90,
  },
  rect1: {
    width: 308,
    height: 39,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#E6E6E6",
    color: "#121212",
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1, 
    borderColor: "rgba(126,188,53,1)" 
  },
  rect2: {
    width: 308,
    height: 39,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#E6E6E6",
    color: "#121212",
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1, 
    borderColor: "rgba(126,188,53,1)" 
  },
  rect3: {
    width: 308,
    height: 39,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#E6E6E6",
    color: "#121212",
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1, 
    borderColor: "rgba(126,188,53,1)" 
  },
  rect4: {
    width: 308,
    height: 76,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#E6E6E6",
    color: "#121212",
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1, 
    borderColor: "rgba(126,188,53,1)" 
  },
  fecha: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20,
  },
  monto: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20,
  },
  cuenta: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20,
  },
  mensaje: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 20,
  },
  radio: {
    height: 40,
    width: 40,
  },
  radioOptionText: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 5,
  },
  radioOptionRow: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  cupertinoButtonInfo2: {
    height: 45,
    width: 166,
    backgroundColor: "rgba(126,188,53,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    overflow: "visible",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioIcon: {
    fontSize: 28,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  cupertinoButtonInfo1: {
    height: 45,
    width: 166,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    overflow: "visible",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10
  },
});

export default Transacciones;
