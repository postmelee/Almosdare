import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';



export default function CreateDareFirstScreen() {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
    return (
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
              Step 1
            </Text>
            <Text style={styles.description}>
              Choose a Date.
            </Text>
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
      button: {
        marginTop: '12%',
        alignItems: 'center'
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
        marginBottom: '42%',
      }
});

