import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ScrollView, Animated, Text, View, AsyncStorage} from 'react-native';
import Header from "./header-component";



export default class UserInfoScreen extends React.Component{
    constructor(props){
      super(props);
      this.state={
          pendingInstants: []
      }
      this.getPendingInstant = this.getPendingInstant.bind(this);
      this.getMemberIdByInstant = this.getMemberIdByInstant.bind(this);
    }
  
    componentDidMount() {
      this.getPendingInstant();
    }

    getNicknameByIdx = () => {
      
    }

    getMemberIdByInstant = async (instant) => {
      const token = await AsyncStorage.getItem("userToken");
      const result = await Promise.all(
        instant.invited.map((userIdx, i) => {
        const url = 'https://almosdare.herokuapp.com/api/users/idx/'+userIdx;
        return fetch(url, {
          method: 'GET',
          headers: new Headers({
            'Authorization': token,
            'Content-Type': 'application/json'
          }), 
        })
        .then((response) => response.json())
        .then((json) => {
          if(json.result === 1) {
            alert(json.nickname)
            return json.nickname;
          }
          else{
            alert("ERROR");
            return -1;
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      })
      );
      return result
    }
    getPendingInstant = async () => {
      const url = 'https://almosdare.herokuapp.com/api/instants/pending';
      const token = await AsyncStorage.getItem("userToken");
      return fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Authorization': token,
          'Content-Type': 'application/json'
        }), 
      })
      .then((response) => response.json())
      .then(async (json) => {
        if(json.result === 1) {
          this.setState({
            pendingInstants: await Promise.all(json.data.map((instant, i) => {
              return this.getMemberIdByInstant(instant)
            }))
          })
        }
        else{
          alert("ERROR");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    }
    render() {
      
      return (
          <View style={styles.container}>
          <ScrollView style={{flex: 1,}}>
          <View style={styles.title}>
              <Text style={styles.titleText}>
                  User
              </Text>
          </View>
          <View style={styles.content}>
            
              {this.state.pendingInstants.map((instant, i) => {
                return(
                  <View id={i}>
                    {instant.map((nickname, j) => {
                      return (
                        <Text id={j}>
                          {nickname}
                        </Text>
                      )
                    })}
                  </View>
                )
              })}
          
          </View>
          </ScrollView>
          </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        flex: 0.1,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        width: '100%',
        backgroundColor: '#bbb',
        padding: 10,
        
      },
      titleText: {
        fontSize: 40,
        marginLeft: '4%',
        
      },
      content: {
        width: '100%',
        flex: 0.6,
        flexDirection: 'row',
        flexWrap: 'wrap',
    
        alignItems: "center",
      },
      navbar: {
        flex: 0.1,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

