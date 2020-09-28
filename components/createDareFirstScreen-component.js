import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Text, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import CreateDareNavbar from './createDareNavbar-component'

export default class CreateDareFirstScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
          mode: 'datetime',
          show: false,
          

        }
    
    }
    


    onChange = (event, selectedDate) => {
      const currentDate = selectedDate || this.props.route.params.setNewDareDate(currentDate)
      this.setState(
        {
          show: Platform.OS === 'ios',
        }
      )
      this.props.route.params.setNewDareDate(currentDate)
    };
  
    showMode = (currentMode) => {

      this.setState(
        {
        mode: currentMode,
        show: true,
        } 
      )
    };
  
    showDatepicker = () => {
      this.showMode('datetime');
    };
  
    showTimepicker = () => {
      this.showMode('time');
    };

    render() {
      return(
        <View style={styles.container}>
          <View style={styles.header}></View>
          <View style={styles.body}>
          <View style={styles.title}>
          <SharedElement id="title">
              <Text style={styles.titleText}>
              Step 1
              </Text>
            </SharedElement>
            </View>
            <View style={styles.title}>
              <SharedElement id="date">
              <Text style={styles.titleTextFocus}>
                {this.props.route.params.getDareData().date.toDateString()}
              </Text>
              </SharedElement>
              
            </View>
            
            <View style={styles.picker}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.props.route.params.getDareData().date}
                  mode={this.state.mode}
                  is24Hour={true}
                  display="default"
                  onChange={this.onChange}
                />
            </View>
            
            </View>
          <CreateDareNavbar index={1} previous='home' next="Second"></CreateDareNavbar>
        </View>
      );
    }
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
        backgroundColor: 'white',
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
        margin: 10,
        
      },
      titleText: {
        fontSize: 25, 
        fontWeight: "300",
      },
      titleTextFocus: {
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

