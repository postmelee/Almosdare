import React from 'react';
import {
    View,
    Text, 
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
export default class LoginComponent extends React.Component{

    constructor(props){
        super(props);
        this.state={
            borderColor: null,
            userId: null,
            userPassword: null,
        }
        this.storeToken = this.storeToken.bind(this);
        this.getToken = this.getToken.bind(this);
        this.loginAndNavigate = this.loginAndNavigate.bind(this);
        this.onFocus = this.onFocus.bind(this);
    
    }
    
    async storeToken (token, tokenType) {
        AsyncStorage.setItem("userToken", tokenType+" "+token)
        .then(() => {
            alert('token stored successfully!');
               console.log('store success');
        })
        .catch((error) => {
            alert("Something went wrong");
          console.log("Something went wrong", error);
        })
      }

    async getToken () {
        let token = await AsyncStorage.getItem("userToken")
        .then((token) => {
            let data = JSON.parse(token);
            console.log(data);
            return data;
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        })
    }

    onFocus(value){
        this.setState({
            borderColor: value
        })
    }

    loginAndNavigate(){
        const id = this.state.userId;
        const password = this.state.userPassword;
        const userData = {
            id,
            password,
        }
        this.props.postLoginToApi(userData)
        .then((json) => {
            if(json.result == -1) alert('Wrong Id or Password');
            else if(json.result == 1) {
                this.storeToken(json.accessToken, json.tokenType)
                this.props.navigation.navigate('Main');
            }
        })
    }

    render() {
    
    
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.text}>Login with Phone and Password</Text>
                <View style={styles.action}>
                    <View style={[styles.section, {
                        borderColor: this.state.borderColor=="phone" ?
                        '#3465d9' : 'gray'
                    }]}>
                        <Feather name="phone" size={20} 
                        color={this.state.borderColor=="phone" ?
                        '#3465d9' : 'gray'}/>
                        <TextInput
                            clearButtonMode={'always'}
                            keyboardType={'phone-pad'}
                            placeholder="Phone Number"
                            autoFocus={true}
                            style={[styles.textInput, {
                                borderColor: this.state.borderColor=="phone" ?
                        '#3465d9' : 'gray'
                            }]}
                            onFocus={() => this.onFocus("phone")}
                            onChangeText={(text) => {
                                this.setState({
                                    userId: text,
                                })
                            }}
                        >
                        </TextInput>
                    </View>
                    <View style={[styles.section, {
                        borderColor: this.state.borderColor=="password" ?
                        '#3465d9' : 'gray'
                    }]}>
                        <Feather name="lock" size={20} 
                        color={this.state.borderColor=="password" ?
                        '#3465d9' : 'gray'}/>
                        <TextInput
                        clearButtonMode={'always'}
                            placeholder="Password"
                            style={[styles.textInput, {
                                borderColor: this.state.borderColor=="password" ?
                        '#3465d9' : 'gray'
                            }]}
                            onFocus={() => this.onFocus("password")}
                            onChangeText={(text) => {
                                this.setState({
                                    userPassword: text,
                                })
                            }}
                            secureTextEntry>
                        </TextInput>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.login}
                    onPress={() => {this.loginAndNavigate()}}>
                    <Text style={styles.textLogin}>
                        Login
                    </Text>
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text style={[styles.textSignup, {
                        color: 'gray'
                    }]}>Don't have an account?</Text>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUpComponent')}>
                        <Text style={styles.textSignup, {
                            color: '#3465d9',
                            marginLeft: 3,
                        }}> 
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 100,
    },
    title: {
        color: '#3465d9',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text: {
        color: 'gray',
    },
    section: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
    },
     forgot: {
         textAlign: 'right',
         marginTop: 15,
         color: '#3465d9'
     },
     textLogin: {
         color: 'white',
         fontSize: 15,
         fontWeight: 'bold'
     },
     login: {
         width: '100%',
         height: 40,
         backgroundColor: '#3465d9',
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: 25,
         borderRadius: 50
     },
     signup: {
         marginTop: 25,
         flexDirection: 'row',
         justifyContent: 'center'
     },
     textSignup: {
         textAlign: 'center'
     }
})