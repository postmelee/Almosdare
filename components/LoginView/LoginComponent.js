import React from 'react';
import {
    View,
    Text, 
    StyleSheet,
    TextInput,
    TouchableOpacity
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
        .then((result) => {
            alert(result);
            if(result == -1) alert('Wrong Id or Password');
            else if(result == 1) this.props.navigation.navigate('Main');
        })
    }

    render() {
    
    
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.text}>Login with E-mail and Password</Text>
                <View style={styles.action}>
                    <View style={[styles.section, {
                        borderColor: this.state.borderColor=="email" ?
                        '#3465d9' : 'gray'
                    }]}>
                        <MaterialCommunityIcons name="email-outline" size={20} 
                        color={this.state.borderColor=="email" ?
                        '#3465d9' : 'gray'}/>
                        <TextInput
                            placeholder="E-mail"
                            style={[styles.textInput, {
                                borderColor: this.state.borderColor=="email" ?
                        '#3465d9' : 'gray'
                            }]}
                            onFocus={() => this.onFocus("email")}
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