import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


function Transacciones(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [mensaje, setMensaje] = useState('');

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
        onChangeText={setMonto}
      />

      <Text style={styles.cuenta}>Cuenta:</Text>
      <TextInput
        style={styles.rect3}
        placeholder="Ingrese la cuenta"
        value={cuenta}
        onChangeText={setCuenta}
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

      <CupertinoButtonInfo2 style={styles.cupertinoButtonInfo2} />
    </View>
  );
}


function CupertinoRadio({ selected, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.radioContainer, style]} onPress={onPress}>
      <Icon
        name={selected ? "radio-button-on-outline" : "radio-button-off-outline"}
        style={[styles.radioIcon, { color: selected ? "#007AFF" : "#ccc" }]}
      />
    </TouchableOpacity>
  );
}

function CupertinoButtonInfo2(props) {
  return (
    <TouchableOpacity style={[styles.cupertinoButtonInfo2, props.style]}>
      <Text style={styles.buttonText}>Completar</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: -90,
    marginLeft: 20
  },
  spacing: {
    height: 90, 
  },
  rect1: {
    width: 308,
    height: 39,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  rect2: {
    width: 308,
    height: 39,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  rect3: {
    width: 308,
    height: 39,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  rect4: {
    width: 308,
    height: 76,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
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
      height: 3
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
});

export default Transacciones;