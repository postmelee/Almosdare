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
    TouchableOpacity,
    View,
    FlatList,
    Dimensions,
    AsyncStorage } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import CreateDareNavbar from './createDareNavbar-component'
import { Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export default class CreateDareFirstScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userData: null,
            modalVisible: false,
            loadingVisible: false,
            loadingMessage: 'Sending...',
            query: null,
            queryResult: null,
            searchSuggest: false,
            members: [],
            listItems: [
              {
                "idx": 0,
              },
              {
              "result": 1,
              "idx": "5f9c7ced7e18780017f4f8fd",
              "id": "01012345678",
              "nickname": "test"
              },
            ]  
        }
    
      }

    getUsers = async () => {
      let token = await AsyncStorage.getItem("userToken")
      return fetch('https://almosdare.herokuapp.com/api/users', { 
        method: 'GET', 
        headers: new Headers({
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }), 
        })
        .then((response) => response.json())
        .then((json) => {
            
          if(json.result === 1){       
              this.setState({
                userData: json,
                members: [...this.state.members, json]
              })
          }
          else{
              alert("ERROR")
          }
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });
    }

    componentDidMount() {
      this.getUsers();
    }
    
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    removeMember(userData) {
      const arr = this.state.members;
      const index = arr.indexOf(userData);
      if (index > -1) {
        arr.splice(index, 1);
      }
      this.setState({
        members: arr,
      })
    }
    
    addMember(newMember) {
      
      const arr = this.state.members;
      if (arr.some(e => e.idx === newMember.idx)) {
        alert('This User is in members')
        return -1
      }
      else{
        this.setState({
          members: [...this.state.members, newMember],
          // memberNicknames: [...this.state.memberNicknames, this.state.queryResult.nickname]
        })
        return 1
      }
    }
    createInstant = async () => {
      
      let token = await AsyncStorage.getItem("userToken")
      if(this.state.members.length < 2) {
        alert('You need to invited at least 1 person')
        return
      }
      this.setState({
        loadingVisible: true,
      })
      const member = this.state.members;
      const index = member.indexOf(this.state.userData);
      if (index > -1) {
        member.splice(index, 1);
      }
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
        if(json.result === 1) {
          let instantId = json.idx;
          return fetch('https://almosdare.herokuapp.com/api/instants/'+instantId+'/inviting', {
            method: 'POST',
            headers: new Headers({
              'Authorization': token,
              'Content-Type': 'application/json'
            }), 
              body: JSON.stringify({users: member}),
            })
            .then((res) => res.json())
            .then((json2) => {
              if(json2.result === 1) {
                this.setState({
                  loadingMessage: 'Inviting Success!'
                })
                this.props.navigation.goBack();
              }
              else{
                alert("Can't Send Invitation");
              }
            })
            .catch((error) => {
                console.log(error);
                alert('Server Problem: ' + error);
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
              'Content-Type': 'application/json'
            }), 
          })
          .then((response) => response.json())
          .then((json) => {
            //alert(JSON.stringify(json))
            if(json.result === 1) {
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
        const { modalVisible, loadingVisible } = this.state;
        return (
          <View style={styles.container}>
            <Modal
              style={styles.loadingModal}
              animationType="fade"
              visible={loadingVisible}
              onShow={() => {
                this.animation.play(0, 120);
              }}
            >
              <View style={styles.loadingView}>
                <Text style={styles.loadingTitle}>{this.state.loadingMessage}</Text>
                <LottieView
                  ref={animation => {
                    this.animation = animation;
                  }}
                  style={{
                    width: 400,
                    height: 400,
                    backgroundColor: '#eee',
                    
                  }}
                  source={require('../assets/loading.json')}
                />
              </View>
            </Modal>
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
                  <View style={styles.modalImg}>

                  </View>
                  <Text style={styles.modalText}>{this.state.queryResult ? this.state.queryResult.id : 'None'}</Text>
                  <Text style={styles.modalName}>{this.state.queryResult ? this.state.queryResult.nickname : 'None'}</Text>
                  <View style={{flexDirection: 'row', marginTop: 20}}>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: '#b0c4de' }}
                      onPress={() => {
                        this.addMember(this.state.queryResult);
                        this.setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Add</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: '#b0c4de' }}
                      onPress={() => {
                        this.setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>
                  </View>                  
                </View>
              </View>
            </Modal>  
            <View style={styles.title}>
              <Text style={styles.titleText}>
                What With Who
              </Text>
            </View>
            <View style={styles.memberSection}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                data={this.state.members}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  if(item == this.state.userData){
                    return(
                      <TouchableOpacity
                      style={styles.memberIcon}
                      >
                      <Entypo name="flash" size={50} color="black" />
                      <Text>{item.nickname}</Text>
                    </TouchableOpacity>
                    )
                  }
                  else{
                    return(
                      <TouchableOpacity
                        style={styles.memberIcon}
                        onPress={() => {this.removeMember(item)}}>
                        <Entypo name="flash" size={50} color="black" />
                        <Text>{item.nickname}</Text>
                      </TouchableOpacity>
                    )
                  }
                  
                }}
              >

              </FlatList>
            </View>

            <View style={styles.searchBar}>
              <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        onChangeText={(text) => {
                          if(text !== ''){
                            this.setState({
                              searchSuggest: true,
                              query: text,
                            })
                          }
                          else{
                            this.setState({
                              searchSuggest: false,
                              query: text,
                            })
                          }
                            
                        }}/>
            </View>
            <View style={styles.content}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{alignItems: 'center',}}
                data={this.state.listItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  if(item.idx === 0){
                    return(
                      this.state.searchSuggest ? <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => {this.searchUserById(this.state.query)}}>
                        <View>
                          <Text>
                            {'Search '+this.state.query}
                          </Text>
                        </View>
                      </TouchableOpacity> : <></>
                    )
                  }
                  else{
                    return(
                      <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => {
                          this.addMember(item);
                        }}>
                        <View>
                          <Text>
                            {item.nickname}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                }}>
              </FlatList>
            </View>
            <View style={styles.navbar}>
              <TouchableOpacity
                style={styles.navbarButton}
                onPress={this.createInstant}>
                <Entypo name="flash" size={50} color="black" />
                <Text>Instant</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navbarButton}
                onPress={this.createInstant}>
                <Entypo name="clock" size={50} color="black" />
                <Text>Dare</Text>
              </TouchableOpacity>
            </View>


          </View>
        );
      }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingView: {
      flex: 1,
      backgroundColor: 'rgb(238,238,238)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingModal: {
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingTitle: {
      fontSize: 40,
      fontWeight: '300',
      
    },
    centeredView: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'center',
    },
    content:{
      paddingTop: 5,
      height: '55%',
    },
    searchBar: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly'
    },
    searchInput: {
      borderWidth: 1,
      borderRadius: 50,
      paddingLeft: 15,
      height: 40,
      width: '90%',
      borderColor: 'black',
    },
    navbar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent:'space-around'
    },
    navbarButton: {
      elevation: 2,
      alignItems: 'center'
    },
    memberIcon:{
      height: 60,
      width: 60,
      marginHorizontal: 10,
      alignItems: 'center'
    },
    memberSection: {
      width: '100%',
      height: 100,
      padding: 10,
    },
    modalImg: {
      width: '70%',
      aspectRatio: 1,
      backgroundColor: 'blue',
      borderRadius: 500,
      marginBottom: 10,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 15,
      padding: 25,
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
    title: {
      paddingVertical: 10,
      marginTop: 22,
      width: '100%',
      alignItems: 'center',
      
    },
    titleText: {
      fontSize: 40, 
      fontWeight: "300",
    },
    listItem: {
      width: Dimensions.get('window').width*0.85,
      height: 50,
      margin: 4,
      padding: 5,
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: '#b0c4de'
    },
    searchButton: {
      alignContent: 'center',
      justifyContent: 'center',
      width: 60,
      height: 42,
      borderRadius: 20,
      elevation: 2
    },
    openButton: {
      width: 100,
      height: 40,
      backgroundColor: '#b0c4de',
      borderRadius: 10,
      padding: 3,
      elevation: 2,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      textAlign: "center"
    },
    modalText: {
      marginVertical: 4,
      fontSize: 20,
      textAlign: "center",
      fontWeight: '300'
    },
    modalName: {
      marginVertical: 10,
      fontSize: 30,
      textAlign: "center"
    }
  });
  

