import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function Target() {
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  const location = {
    coords: {
      latitude: 37.7749, 
      longitude: -122.4194,
    },
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    console.log('Dummy photo taken: {uri: "dummy_photo.jpg"}');
  };

  const toggleRecording = async () => {
    if (isRecording) {
      console.log('Dummy video recording stopped: {uri: "dummy_video.mp4"}');
      setIsRecording(false);
    } else {
      console.log('Dummy video recording started');
      setIsRecording(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        </MapView>
      </View>

      <View style={styles.cameraContainer}>
        <RNCamera ref={cameraRef} style={styles.camera} type={cameraType}>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
              <Ionicons name="camera-reverse" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.cameraButton, styles.captureButton]} onPress={takePicture}>
              <Ionicons name="camera" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cameraButton, isRecording && styles.recordingButton]}
              onPress={toggleRecording}
            >
              <Ionicons name={isRecording ? "stop-circle" : "videocam"} size={24} color="white" />
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.coordsText}>
          Lat: {location.coords.latitude.toFixed(4)}, Long: {location.coords.longitude.toFixed(4)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
  },
  map: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  cameraButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  captureButton: {
    padding: 20,
    backgroundColor: '#ff4444',
  },
  recordingButton: {
    backgroundColor: '#ff0000',
  },
  infoContainer: {
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  coordsText: {
    fontSize: 14,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});
