import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import  React, {useEffect, useState} from 'react';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';


export default function App() {

  const [toggle, setToggle] = useState(false);

  const handlechangetoogle = () =>setToggle (oldToggle => !oldToggle);

  useEffect(()=>{
  // liga o flash do celular
    Torch.switchState(toggle);

  }, [toggle]);

  useEffect(()=>{
     // Quando o celular for chacoalhado, mudaremos o toggle
     const subscription = RNShake.addListener(() =>{
      setToggle (oldToggle => !oldToggle);   
     });
     // func para desmontar o componente
      return () => subscription.remove();

  }, []);

  return (
    <View style={toggle ? styles.containerlight : styles.container}>
      <TouchableOpacity onPress={handlechangetoogle}>
        <Image style={toggle ? styles.lightOn : styles.lightoff} 
        source= {toggle ? require('./assets/eco-light.png')
                 : require('./assets/eco-light-off.png')}
          
        />
        <Image style={styles.diologo} 
        source= {toggle ? require ('./assets/logo-dio.png')
                 : require ('./assets/logo-dio-white.png')}
          
        />
        <StatusBar style="auto" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerlight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width:150,
    height: 150,
  },
  lightoff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width:150,
    height: 150,
  },
  diologo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width:250,
    height: 250,
  },
});
