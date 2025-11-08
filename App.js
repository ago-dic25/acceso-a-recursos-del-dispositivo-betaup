import { StyleSheet, Text, View, Button, TextInput, FlatList, ListView, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
// Importamos los estilos desde tu archivo misEstilos.js
import { styles } from './misEstilos'; 

export default function App() {

  const [permisos, setPermisos] = useState(null);
  const [foto, setFoto] = useState(null);
  const [tipoCamara, setTipoCamera] = useState(CameraType.back); // Usamos CameraType.back
  const [camaraRef, setCamaraRef] = useState(null);


  useEffect(() => {
    (async () => {
      // Pedimos permisos de cámara
      const { status: camaraStatus } = await Camera.requestCameraPermissionsAsync();
      // Pedimos permisos de galería (carpeta)
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

      // Guardamos en el estado si ambos permisos fueron concedidos
      if (camaraStatus === 'granted' && mediaStatus === 'granted') {
        setPermisos(true);
      } else {
        setPermisos(false);
        Alert.alert(
          "Permisos requeridos",
          "Se necesitan permisos de cámara y galería para usar esta función."
        );
      }
    })();
  }, []);


  if (permisos === null) {
    // Vista de carga mientras se solicitan permisos
    return <View />;
  }
  if (permisos === false) {
    // Vista de error si se denegaron los permisos
    return <Text style={styles.textoError}>No se tienen permisos para acceder a la cámara o galería.</Text>;
  }

  const tomarFoto = async () => {
    if (camaraRef) {
      try {
        const datosFoto = await camaraRef.takePictureAsync();
        setFoto(datosFoto.uri); // Guardamos la URI de la foto en el estado
        console.log(datosFoto);
      } catch (error) {
        console.log('Error al tomar foto: ' + error);
      }
    }
  };

  const guardarFoto = async () => {
    if (foto) {
      try {
        // Usamos MediaLibrary para guardar la foto en la galería
        await MediaLibrary.createAssetAsync(foto);
        Alert.alert('¡Guardada!', 'La foto ha sido guardada en tu galería.');
        setFoto(null); // Limpiamos la foto para volver a la cámara
      } catch (error) {
        console.log('Error al guardar foto: ' + error);
        Alert.alert('Error', 'No se pudo guardar la foto.');
      }
    }
  };

  const descartarFoto = () => {
    setFoto(null); // Simplemente descartamos la foto y volvemos a la cámara
  };

  // ---- RENDERIZADO ----
  
  // Si NO hay foto, mostramos la cámara
  if (!foto) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Camera 
          style={styles.camera} 
          type={tipoCamara} 
          ref={ref => setCamaraRef(ref)}
        >
          <View style={styles.botonesCamara}>
            {/* Botón para voltear cámara */}
            <TouchableOpacity
              style={styles.botonFlip}
              onPress={() => {
                setTipoCamera(
                  tipoCamara === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}>
              <Text style={styles.textoBoton}> Voltear </Text>
            </TouchableOpacity>

            {/* Botón de captura */}
            <TouchableOpacity style={styles.botonCaptura} onPress={tomarFoto} />
            
            {/* Dejamos un espacio en blanco para centrar el botón de captura */}
            <View style={styles.botonFlip} /> 
          </View>
        </Camera>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  // Si SÍ hay foto, mostramos la VISTA PREVIA
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Mostramos la imagen usando la URI guardada en el estado 'foto' */}
        <Image source={{ uri: foto }} style={styles.preview} />

        <View style={styles.botonesPreview}>
          <TouchableOpacity 
            onPress={guardarFoto} 
            style={[styles.button, styles.blueButton]}
          >
            <Text style={styles.buttonText}>Guardar Foto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={descartarFoto} 
            style={[styles.button, { backgroundColor: '#cc0000' }]} // Estilo rápido para botón de descartar
          >
            <Text style={styles.buttonText}>Tomar Otra</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
