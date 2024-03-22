import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from "react";
import { Pressable, ImageBackground, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function CameraView() {
    const [status, requestPermission] = Camera.useCameraPermissions();
    const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState();
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [lastPhotoURI, setLastPhotoURI] = useState(null);
    let cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const cameraPermission = await requestPermission();
            const mediaLibraryAccess = await MediaLibrary.requestPermissionsAsync;
            setHasMediaLibraryPermissions(mediaLibraryAccess);
        })();
    }, [])

    if (status?.undetermined) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                <ActivityIndicator />
            </View>
        );
    } else if (status === undefined) {
        return (
            <Text>Camera permissions denied. Please change this in settings, or restart the app for changes to take effect.</Text>
        )
    }

    function flipCamera() {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    let takePicture = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setLastPhotoURI(newPhoto);
    };

    if (lastPhotoURI) {
        let sharePicture = () => {
            shareAsync(lastPhotoURI.uri).then(() => {
                setLastPhotoURI(undefined);
            })
        };


        let savePicture = () => {
            MediaLibrary.saveToLibraryAsync(lastPhotoURI.uri).then(() => {
                setLastPhotoURI(undefined);
            })
        };

        return (
            <ImageBackground source={{ uri: "data:image/jpg;base64" + lastPhotoURI.base64 }} style={styles.backgroundContainer} >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Pressable style={styles.saveDelBtn} onPress={savePicture}><Feather name="download" size={24} color="white" /></Pressable>
                    <Pressable style={styles.saveDelBtn} onPress={() => setLastPhotoURI(undefined)}><AntDesign name="delete" size={24} color="white" /></Pressable>
                    <Pressable onPress={sharePicture} style={{ flex: 1, flexDirection: "column", alignItems: "flex-end", marginRight: 20 }} >
                        <View style={styles.shareBtn}>
                            <Text style={styles.shareBtnTxt}>Send To</Text>
                        </View>
                    </Pressable>
                </View>
            </ImageBackground>


        )
    }

    return (
        <Camera style={{ flex: 1, alignItems: "center", justifyContent: "center" }} type={type} ref={cameraRef} >
            <View style={{ flex: 1, backgroundColor: "red   ", flexDirection: "row", justifyContent: "center" }}>
                <Pressable style={styles.actionRowBtn} onPress={takePicture}>
                    <View style={styles.circleButton}>
                        <View style={styles.innerCircleButton}></View>
                    </View>
                </Pressable>
                <Pressable style={styles.actionRowBtn} onPress={flipCamera}>
                    <View>
                        <MaterialIcons name="flip-camera-android" size={32} color="white" />
                    </View>
                </Pressable>
            </View>
        </Camera >
    );
}


const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    circleButton: {
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
        width: 50, // Adjust according to your needs
        height: 50, // Adjust according to your needs
        borderRadius: 25, // Half of the width and height to make it a perfect circle
        backgroundColor: 'white', // Just for demonstration, you can change this
    },
    innerCircleButton: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#222",
        width: 40, // Adjust according to your needs
        height: 40, // Adjust according to your needs
        borderRadius: 20, // Half of the width and height to make it a perfect circle
        backgroundColor: 'white', // Just for demonstration, you can change this
    },
    actionRowBtn: {
        alignSelf: "flex-end",
        alignItems: "flex-end",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
    shareBtn: {
        height: 38,
        width: 150,
        backgroundColor: '#26f',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveDelBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 38,
        width: 80,
        borderWidth: 5,
        borderColor: '#ddd',
        backgroundColor: 'transparent',
        borderRadius: 18,
        marginLeft: 30
    },
    shareButtonGroup: {
        flexDirection: 'row',
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 10
    },
    shareBtnTxt: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eee',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})