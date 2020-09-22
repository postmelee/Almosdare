import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { TabNavigator } from "react-navigation";
import { SharedElement } from 'react-navigation-shared-element';
import CreateDareNavbar from './createDareNavbar-component'

export default function CreateDareSecondScreen({route}) {
    const props = route.params.props;
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    
    useEffect(() => {
      // Update the document title using the browser API
      let mounted = true
      if(mounted){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("wokeeey");
            console.log(position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          (error) => setError(error.message),
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
      }
      return () => mounted = false;
      
    });
    
    return(
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.body}>
          <View style={styles.title}>
          <SharedElement id="title">
            <Text style={styles.titleText}>
              Step 2
            </Text>
            </SharedElement>
          </View>
          <View style={styles.title}>
            <SharedElement id="date">
              <Text style={styles.titleText}>
              {props.dareData.date.toDateString()}
            </Text>
            </SharedElement>
          </View>
          <View style={styles.title}>
            <SharedElement id="location">
              <Text style={styles.titleText}>
              {props.dareData.date.toDateString()}
            </Text>
            </SharedElement>
          </View>
          <View style={{flex: 1,}}>
            <MapView
              provider ={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
              latitude: 30.2672,
              longitude: -97.7431,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              }}
            >
              {!!latitude && !!longitude && <Marker
              coordinate={{latitude : latitude, longitude : longitude}}
              title={"Your Location"}
              />}
              
              <Marker 
                coordinate={{
                latitude: 30.2672,
                longitude: -97.7431,
                }}
                draggable
                image={require('../assets/marker.png')}
                
                >
                  <Callout>
                    {/* FOR TAEGYU : If you want custom pop up tab, you can edit it here with your own css */}
                    <Text>
                    Place of Dare
                    </Text>
                    <Text>
                    Choose your destination
                    </Text>
                  </Callout>
              </Marker>
              
            </MapView>
            
          </View>
        </View>
          
          <CreateDareNavbar dareData={props.dareData} index={2} previous="First" next="Third"></CreateDareNavbar>
      </View>
    )
  }

  CreateDareSecondScreen.sharedElements = (route, otherRoute, showing) => {
    return [{id: "date"}, {id: "title"}, {id: "buttonRight"}, {id: "buttonLeft"}]
  }

  let {height, width} = Dimensions.get('window')
 
  const styles = StyleSheet.create({
    mapContainer: {
      height: height,
      width: width,
    },
    map: {
      height: height,
      width: width,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      body: {
        flex: 1,
        alignItems: 'center',
      },
      header: {
        height: '6%',
        backgroundColor: 'white',
      },
      headerBox: {
        justifyContent: 'center',
        marginTop: Math.round(Dimensions.get('window').height)/22,
        alignItems: 'center',
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: '400'
      },
      twoButtons: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: '12%',
        marginHorizontal: '5%'
      },
      title: {
        paddingVertical: 5,
        width: '100%',
        alignItems: 'center',
        margin: 10,
        
      },
      titleText: {
        fontSize: 35, 
        fontWeight: "300"
        
      },
      description: {
        fontSize: 25,
        margin: '3%',
      },
      navbar: {
        flex: 0.1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '3%'
      },
      picker: {
        marginBottom: '11%'
      }
});

