import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import { StyleSheet, Text, Dimensions, TouchableHighlight, View } from 'react-native';


export default function DareIcon(props) {
    const navigation = useNavigation();

    //props should have 
    //  date = {month, day}, location=String(""), time=String("xx:xx xm"), member = []
    return(
        <TouchableHighlight style={props.side == 'left' ? styles.blockLeft : styles.blockRight}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => navigation.navigate('DareView', {props})}
            onLongPress={() => alert(Math.round(Dimensions.get('window').height))}>
            <View style={styles.block}>
                <View style={styles.date}>
                <SharedElement id={props.id+"month"}>
                        <Text style={styles.month}>{props.Dare.date.month}</Text>
                </SharedElement>
                <SharedElement id={props.id+"day"}>
                        <Text style={styles.day}>{props.Dare.date.day}</Text>
                </SharedElement>
                </View> 
            <View style={{zIndex: 1,}}>
                <SharedElement id={props.id+"location"}>
                    <Text style={styles.title}>{props.Dare.location}</Text>
                </SharedElement>
                <SharedElement id={props.id+"time"}>
                    <Text style={styles.time}>{props.Dare.time}</Text>
                </SharedElement>
            </View>
                <View style={{zIndex: 1, flexDirection: 'row', alignItems: "center",}}>
                    <View style={styles.party}>
                        <Text style={styles.person}>{props.Dare.member[0]}</Text>
                    </View>
                    <Text style={{color: 'white', fontSize: 25, fontWeight: '500', marginLeft: '5%', marginBottom: '2%'}}>+{props.Dare.member.length-1}</Text>
                </View>
                {props.isStarted ? <><View style={{zIndex: 0, position: 'absolute', left: '40%', right: 0, bottom: -40,}}><Text style={{opacity: .2, color: 'rgb(145, 168, 209)', fontSize: 200, fontStyle: "italic"}}>6</Text>
                </View></> : null}
            </View>
        </TouchableHighlight>
    )
    
    
}

function randomColor () {
    const colors = ['rgb(247, 119, 106)', 'rgb(145, 168, 209)', 'rgb(151, 221, 221)', 'rgb(247, 201, 201)', 'rgb(152, 150, 164)', 'rgb(249, 224, 61)'];
    return colors[Math.floor(Math.random() * colors.length)];
}
const styles = StyleSheet.create({
    block: {
        justifyContent: "space-between",
        flex: 1,
    },
    blockLeft: {
        borderRadius: 30,
        padding: 18,
        width: '44%',
        aspectRatio: 1,
        marginLeft: "4%",
        marginRight: "2%",
        backgroundColor: 'rgb(28, 28, 30)',
    },
    blockRight: {
        borderRadius: 30,
        padding: 18,
        width: '44%',
        aspectRatio: 1,
        marginLeft: "2%",
        marginRight: "4%",
        backgroundColor: 'rgb(28, 28, 30)',
    },
    date: {
        zIndex: 1,
    },
    month: {
        fontSize: 20,
        fontWeight: "500",
        color: 'rgb(145, 168, 209)'
    },
    day: {
        fontSize: 28,
        fontWeight: "600",
        color: 'white'
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        color: 'white'
    },
    time: {
        fontSize: 15,
        fontWeight: "400",
        color: 'gray'
    },
    person: {
        color: 'white',
    },
    party: {
        
        width: '24%',
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: 1,
        borderRadius: 100   ,
        backgroundColor: 'rgb(123, 143, 163)',
        
    }
  });
  