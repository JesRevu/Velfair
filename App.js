import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, hasText] = useState('Not yet scanned')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  //Request camera permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  //Scan code
  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data)
  }

  //checking permissions and return the screens
  if (hasPermission === null) {
    return(
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
          <StatusBar style="auto" />
        </View>
    )
  }

  if (hasPermission === false) {
    return(
        <View style={styles.container}>
          <Text style={{margin: 10}}>No acces to camera</Text>
          <Button title={'Allow camera'} onPress={() => askForCameraPermission()}> </Button>
        </View>
    )
  }

  //Return the view
  return(
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined: handleBarCodeScanned}
        style={{height: 400, widht: 4000}} />      
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Sacan Again'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },
});
