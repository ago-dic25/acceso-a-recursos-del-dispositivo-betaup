import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
// Importamos los estilos desde el archivo externo
import { styles } from './misEstilos';
// Importaciones de Expo Camera
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function App() {

  // Hook para gestionar los permisos de la camara
  const [permission, requestPermission] = useCameraPermissions();
  // Estado para el permiso de la galeria
  const [permisoGaleria, setPermisoGaleria] = useState(null);

  // Estado para almacenar la URI de la foto tomada
  const [foto, setFoto] = useState(null);
  // Estado para definir la camara (trasera o frontal)
  const [facing, setFacing] = useState('back');
  // Referencia al componente de la camara
  const [camaraRef, setCamaraRef] = useState(null);

  // Solicitar permisos al cargar el componente
  useEffect(() => {
    (async () => {
      // Pedimos permiso para la camara
      const { status: camaraStatus } = await requestPermission();

      // Pedimos permiso para la galeria
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setPermisoGaleria(mediaStatus === 'granted');

      // Verificamos si alguno de los permisos fue denegado
      if (camaraStatus !== 'granted' || mediaStatus !== 'granted') {
        Alert.alert(
          "Permisos requeridos",
          "Se necesitan permisos para la camara y la galeria para usar esta funcion."
        );
      }
    })();
  }, []); // El array vacio asegura que esto se ejecute solo una vez al montar


  if (!permission) {
    // Mientras se revisan los permisos, no mostramos nada
    return <View />;
  }

  if (!permission.granted || !permisoGaleria) {
    // Si los permisos fueron denegados, mostramos un mensaje y un boton
    return (
      <View style={styles.container}>
        <Text style={styles.textoError}>
          Se necesitan permisos para la camara y la galeria.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={[styles.button, styles.blueButton]}
        >
          <Text style={styles.buttonText}>Conceder Permisos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Funcion para tomar la fotografia
  const tomarFoto = async () => {
    // Si la referencia de la camara existe
    if (camaraRef) {
      try {
        // Capturamos la imagen
        const datosFoto = await camaraRef.takePictureAsync();
        setFoto(datosFoto.uri); // Guardamos la URI de la foto en el estado
        console.log(datosFoto);
      } catch (error) {
        console.log('Error al tomar foto: ' + error);
      }
    }
  };

  // Funcion para guardar la foto en la galeria
  const guardarFoto = async () => {
    // Verificamos que haya una foto para guardar
    if (foto) {
      try {
        // Usamos MediaLibrary para crear un asset con la foto
        await MediaLibrary.createAssetAsync(foto);
        Alert.alert('!Guardada!', 'La foto ha sido guardada en tu galeria.');
        setFoto(null); // Limpiamos el estado de la foto para volver a la vista de camara
      } catch (error) {
        console.log('Error al guardar foto: ' + error);
        Alert.alert('Error', 'No se pudo guardar la foto.');
      }
    }
  };

  // Funcion para descartar la foto actual
  const descartarFoto = () => {
    setFoto(null); // Limpiamos el estado de la foto para volver a la camara
  };

  // ---- RENDERIZADO ----

  // Si no hay foto, mostramos la camara
  if (!foto) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Usamos CameraView en lugar del antiguo componente Camera */}
        <CameraView
          style={styles.camera}
          facing={facing} // Prop 'facing' para 'back' o 'front'
          ref={ref => setCamaraRef(ref)} // Asignamos la referencia
        >
          {/* Contenedor para los botones sobre la camara */}
          <View style={styles.botonesCamara}>
            {/* Boton para voltear la camara */}
            <TouchableOpacity
              style={styles.botonFlip}
              onPress={() => {
                // Alternamos el estado 'facing'
                setFacing(current => (current === 'back' ? 'front' : 'back'));
              }}>
              <Text style={styles.textoBoton}> Voltear </Text>
            </TouchableOpacity>

            {/* Boton principal para capturar la foto */}
            <TouchableOpacity style={styles.botonCaptura} onPress={tomarFoto} />

            {/* Espacio para centrar el boton de captura */}
            <View style={styles.botonFlip} />
          </View>
        </CameraView>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  // Si SI hay foto, mostramos la VISTA PREVIA
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Mostramos la imagen capturada */}
        <Image source={{ uri: foto }} style={styles.preview} />

        {/* Contenedor para los botones de la vista previa */}
        <View style={styles.botonesPreview}>
          {/* Boton para guardar */}
          <TouchableOpacity
            onPress={guardarFoto}
            style={[styles.button, styles.blueButton]}
          >
            <Text style={styles.buttonText}>Guardar Foto</Text>
          </TouchableOpacity>

          {/* Boton para descartar y tomar otra */}
          <TouchableOpacity
            onPress={descartarFoto}
            style={[styles.button, { backgroundColor: '#cc0000' }]}
          >
            <Text style={styles.buttonText}>Tomar Otra</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}