import * as React from 'react';
import { View, ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import TesseractOcr from 'react-native-tesseract-ocr'

import CameraView from './components/CameraView';
import HomeGallery from './components/HomeGallery';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <HomeGallery />
      <Pressable onPress={() => navigation.navigate('Camera')} style={{ position: 'absolute', bottom: 4, alignItems: 'center', justifyContent: 'center' }}>
        <AntDesign name="camera" size={28} color="black" />
      </Pressable>
    </View>
  )
}

function CameraScreen({ navigation }) {
  return (
    <>
      <CameraView />
      <Pressable onPress={() => navigation.navigate('Home')} style={{ position: 'absolute', bottom: 4, backgroundColor: 'transparent', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>

        <AntDesign name="home" size={28} color="white" />

      </Pressable>
    </>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#111"
  }
});