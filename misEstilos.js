import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#000',
    },
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
    },
    titulo: {
      color: '#ccd6f6',
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      borderColor: '#304a6e',
      backgroundColor: '#172a45',
      borderWidth: 1,
      borderRadius: 20, 
      padding: 12,
      marginBottom: 10,
      color: '#ccd6f6',
      textAlign: 'center',
      fontSize: 16,
    },
    button: {
      borderRadius: 25, 
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 10,
    },
    blueButton: {
      backgroundColor: '#367AF6',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    list: {
      flex: 1,
    },
    listItem: {
      backgroundColor: '#172a45',
      padding: 15,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    listItemText: {
      color: '#ccd6f6',
      fontSize: 18,
    },
    deleteIcon: {
      fontSize: 20,
    },
    emptyListText: {
      color: '#8892b0',
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
    },
    camera: {
      flex: 1,
    },
    preview: {
      flex: 1,
      resizeMode: 'contain',
    },
    botonesCamara: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      paddingBottom: 40,
      backgroundColor: 'transparent',
    },
    botonCaptura: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#fff',
    },
    botonFlip: {
      padding: 10,
    },
    textoBoton: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    botonesPreview: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
      backgroundColor: '#000',
    },
    textoError: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      padding: 20,
    },
});