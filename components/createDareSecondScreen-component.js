import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { TabNavigator } from "react-navigation";


export default function CreateDareSecondScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    
    useEffect(() => {
      // Update the document title using the browser API
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
    });
    
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBox}>
            <Text style={styles.headerTitle}>
              Create a Dare
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Step 2
            </Text>
            <Text style={styles.description}>
              Choose a Place.
            </Text>
          </View>
          
          <View style={styles.container}>
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
          

          <View style={styles.picker}>
          </View>
          
        </View>
      </View>
    )
  }

  let {height, width} = Dimensions.get('window')
 
  const styles = StyleSheet.create({
    mapContainer: {
      height: height,
      width: width,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      body: {
        flex: 1,
        justifyContent: "space-between",
      },
      header: {
        flex: 0.1,
        backgroundColor: '#eee',
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
        padding: 20,
        width: '100%',
        
      },
      titleText: {
        fontSize: 40,
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

