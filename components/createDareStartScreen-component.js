import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Dialog, { ScaleAnimation, DialogContent } from 'react-native-popup-dialog';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    AsyncStorage } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import CreateDareNavbar from './createDareNavbar-component'

export default class CreateDareFirstScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible: false,
            query: null,
            queryResult: null,
            members: []
        }
    
    }
    
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    createInstant = async () => {
      let token = await AsyncStorage.getItem("userToken")

      const member = this.state.members;
      alert(member)
      return fetch('https://almosdare.herokuapp.com/api/instants', {
        method: 'POST',
        headers: new Headers({
          'Authorization': token,
          'Content-Type': 'application/json'
        }), 
        
      })
      .then((response) => response.json())
      .then((json) => {
        //alert(JSON.stringify(json))
        if(json.result) {
          let instantId = json.idx;
          return fetch('https://almosdare.herokuapp.com/api/instants/'+instantId+'/inviting', {
            method: 'POST',
            headers: new Headers({
              'Authorization': token,
              'Content-Type': 'application/json'
            }), 
              body: JSON.stringify({users: member}),
            })
            .then((response) => response.json())
            .then((json) => {
              //alert(JSON.stringify(json))
              if(json.result) {
                  alert("Succesfully Invited");
              }
              else{
                  alert("Can't Send Invitation");
              }
            })
            .catch((error) => {
                console.log(error);
                alert('Server Problem');
          });
          }
          else{
              alert("Can't Create Instant");
          }
        })
        .catch((error) => {
            console.log(error);
            alert('Server Problem');
      });
    }

    async searchUserById(id) {
      if(!id){
        return
      }
        let token = await AsyncStorage.getItem("userToken")
        const url = 'https://almosdare.herokuapp.com/api/users/id/' + id;
      
        return fetch(url, {
            method: 'GET',
            headers: new Headers({
              'Authorization': token,
              'Content-Type': 'application/x-www-form-urlencoded'
            }), 
          })
          .then((response) => response.json())
          .then((json) => {
            //alert(JSON.stringify(json))
            if(json.result) {
                this.setModalVisible(true)
                this.setState({ 
                    queryResult: json,
                });
            }
            else{
                alert("Can't find the User");
                this.setState({
                  queryResult: null
                })
            }
          })
          .catch((error) => {
              console.log(error);
              alert('Server Problem');
        });
    }
    
      render() {
        const { modalVisible } = this.state;
        return (
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{this.state.queryResult ? this.state.queryResult.nickname : 'None'}</Text>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.setState({
                        members: [...this.state.members, this.state.queryResult.idx]
                      })
                    }}
                  >
                    <Text style={styles.textStyle}>Add User</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            <View
                    style={styles.searchBar}
                >
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        onChangeText={(text) => {
                            this.setState({
                                query: text,
                            })
                        }}
                    >

                    </TextInput>
            </View>
                <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                    this.searchUserById(this.state.query);
                }}
                >
                <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableHighlight>

                <TouchableHighlight
                style={styles.openButton}
                onPress={this.createInstant}
                >
                <Text style={styles.textStyle}>Create Instant</Text>
                </TouchableHighlight>

                <TouchableHighlight
                style={styles.openButton}
                onPress={() => {this.setState({
                  members: []
                })}}
                >
                <Text style={styles.textStyle}>Clear Members</Text>
                </TouchableHighlight>
                <TouchableHighlight
                style={styles.openButton}
                onPress={() => {alert(this.state.members)}}
                >
                <Text style={styles.textStyle}>Show Members</Text>
                </TouchableHighlight>
          </View>
        );
      }
  }

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: "center",
      marginTop: 22
    },
    searchBar: {
        borderWidth: 1,
        borderRadius: 50,
        width: '70%',
        borderColor: 'black',
    },

    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  

