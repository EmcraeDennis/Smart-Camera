import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import TesseractOcr, {LANG_ENGLISH} from 'react-native-tesseract-ocr';




const HomeGallery = () => {
    // const tessOptions = {};
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access camera roll is required!');
            }
        })();
    }, []);

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })


        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }


    const [progress, setProgress] = useState(0);
    addEventListener('onProgressChange', (p) => {
        setProgress(p.percent / 100);
    });



    const recognizeText = async () => {
        if (!image) {
            alert('Please select an image first.');
            return;
        }

        const { data } = await TesseractOcr.recognize(image, LANG_ENGLISH, {
            onProgress: (recognizeProgress) => console.log(recognizeProgress),
        });

        setText(data.text);
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={selectImage}>
                <Text>
                    Pick an image from camera roll
                </Text>

            </Pressable>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 10 }} />}
            <Pressable onPress={recognizeText}>
                <Text>Recognize Text</Text>
            </Pressable>
            <Text style={styles.textArea}>{text}</Text>

        </View>
    );

};

export default HomeGallery

const styles = StyleSheet.create({
    textArea: {
        marginTop: 10,
        justifyContent: 'flex-end',
        alignContent: 'center',
        backgroundColor: 'black',
        color: 'white',
        height: 300,
        width: 250
    }
})