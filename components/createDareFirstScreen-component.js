import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';


export default function CreateDareFirstScreen(props) {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('datetime');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      props.setDareData({
        date: currentDate,
      });
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('datetime');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.body}>
        <View style={styles.title}>
            <Text style={styles.titleText}>
            Step 1
            </Text>
          </View>
          <View style={styles.title}>
            <SharedElement id="date">
            <Text style={styles.titleText}>
            {props.dareData.date.toDateString()}
            </Text>
            </SharedElement>
            
          </View>
          
          <View style={styles.picker}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
          </View>
          
          </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
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
        backgroundColor: '#eee',
      },
      headerBox: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: '400'
      },
      button: {
        marginTop: '12%',
        alignItems: 'center'
      },
      title: {
        paddingVertical: 5,
        width: '100%',
        alignItems: 'center',
        backgroundColor: "yellow",
        margin: 10,
        
      },
      titleText: {
        fontSize: 35, 
        fontWeight: "300",

        
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
        position: "absolute",
        width: '100%',
        top: Dimensions.get('window').height/3,
      }
});

