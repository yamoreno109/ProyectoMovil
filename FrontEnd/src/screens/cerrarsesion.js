import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

function CerrarSesion(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const { UsuarioId, Nombre, NumeroCuenta, Tipo } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const BorrarUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:3000/borrar/${UsuarioId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage("Su cuenta ha sido eliminada exitosamente");
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }); 
      } else {
        setMessage("Error: Su cuenta no pudo ser eliminada");
      }
    } catch (error) {
      console.log('Error al eliminar la cuenta', error);
      setMessage("Error: No se pudo conectar con el servidor");
    }
  };

  const confirmarBorrado = () => {
    setMessage("¿Está seguro que desea eliminar su cuenta?");
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Text style={styles.loremIpsum}>
          {Nombre}{"\n"}
          {"\n"}N° - {NumeroCuenta}{"\n"}
          {"\n"}Tipo - {Tipo}
        </Text>
      </View>
      <Image
        source={require("../components/usuario.png")}
        resizeMode="contain"
        style={styles.image}
      />

      <CupertinoButtonInfo4 style={styles.cupertinoButtonInfo4} onPress={() => navigation.navigate('Login')} />
      <CupertinoButtonInfo style={styles.cupertinoButtonInfo} onPress={confirmarBorrado} />
      <CupertinoButtonInfo1 style={styles.cupertinoButtonInfo1} onPress={() => navigation.navigate('Actualizar', {
        UsuarioId,
        Nombre,
        NumeroCuenta,
        Tipo
      })} />


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            {message === "¿Está seguro que desea eliminar su cuenta?" ? (
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    setMessage("Procesando...");
                    BorrarUsuario();
                  }}
                >
                  <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

function CupertinoButtonInfo4(props) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, props.style]} onPress={props.onPress}>
      <Text style={styles.cerrarSesion}>Cerrar Sesion</Text>
    </TouchableOpacity>
  );
}

function CupertinoButtonInfo(props) {
  return (
    <TouchableOpacity style={[styles.buttonContainer1, props.style]} onPress={props.onPress}>
      <Text style={styles.cerrarSesion}>Eliminar Cuenta</Text>
    </TouchableOpacity>
  );
}

function CupertinoButtonInfo1(props) {
  return (
    <TouchableOpacity style={[styles.buttonContainer2, props.style]} onPress={props.onPress}>
      <Text style={styles.cerrarSesion}>Actualizar Datos</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rect: {
    width: 314,
    height: 139,
    backgroundColor: "#E6E6E6",
    marginTop: 200,
    marginLeft: 28,
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
    borderWidth: 2,
    borderColor: "rgba(126,188,53,1)",
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 59,
    width: 284,
    marginTop: 19,
    marginLeft: 16,
  },
  image: {
    width: 131,
    height: 143,
    marginTop: -314,
    marginLeft: 119,
  },
  buttonContainer: {
    marginLeft: 100,
    marginTop: 300,
    height: 45,
    width: 166,
    backgroundColor: "rgba(126,188,53,1)",
    borderWidth: 1,
    borderColor: "rgba(126,188,53,1)", 
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    overflow: "visible",
    borderRadius: 7
  },
  buttonContainer1: {
    marginTop: 10,
    marginLeft: 100,
    height: 45,
    width: 166,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "red", 
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
  },buttonContainer2: {
    marginTop: 10,
    marginLeft: 100,
    height: 45,
    width: 166,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black", 
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
  },
  cerrarSesion: {
    color: "rgba(0,0,0,1)",
    fontSize: 17,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CerrarSesion;
