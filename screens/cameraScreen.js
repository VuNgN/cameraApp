import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';

const cameraScreen = ({navigation}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      const filePath = data.uri;
      const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log('move from ' + filePath + ' to ' + newFilePath);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={styles.preview}>
        <SafeAreaView>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => captureHandle()}>
            <Text style={styles.capture}>CAPTURE</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </RNCamera>
    </View>
  );
};

export default cameraScreen;

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backButton: {
    borderColor: '#fff',
    borderWidth: 2,
    height: 45,
    width: 45,
    borderRadius: 10,
    marginTop: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    color: '#fff',
  },
  captureButton: {
    height: 45,
    width: 100,
    borderRadius: 10,
    marginBottom: 30,
    alignSelf: 'center',
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capture: {
    color: '#000',
  },
});
