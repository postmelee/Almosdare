import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import DareIcon from "./dareIcon-component";
import Header from "./header-component";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import { StyleSheet, ScrollView, Animated, TouchableHighlight, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function Home() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [dareList, setDareList] = useState([{
    id: 0,
    date: {month: "JAN", day: "17"},
    location: "병점 중심상가",
    time: "03:00 AM",
    member: ['태규', '현민', '준하', '준엽'],
  }, {
    id: 1,
    date: {month: "MAY", day: "21"},
    location: "동탄 메타폴리스",
    time: "07:00 PM",
    member: ['태규', '준엽'],
  },
  {
    id: 2,
    date: {month: "OCT", day: "12"},
    location: "서울 롯데타워",
    time: "01:00 PM",
    member: ['태규', '현민', '준엽'],
  },
  {
    id: 3,
    date: {month: "DEC", day: "10"},
    location: "경기도 화성시 서동탄로 11 205-1503",
    time: "06:00 PM",
    member: ['현민', '준엽'],
  }
  ]);
  return (
    <View style={styles.container}>
      <Header scrollY={scrollY}></Header>
      
      <ScrollView style={{flex: 1, }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false},
        )}>
        <View key="title" style={styles.title}>
          <Text style={styles.titleText}>
            Appointments
          </Text>
          
        </View>
        {dareList.map((dareData, i) => {
          if((i+1)%2 !== 0){
            return(
              <View key={"View"+i} style={styles.list}>
                {dareList.length-1 == i ? <DareIcon key={"Icon"+i} id={i} side='left' Dare={dareList[i]}></DareIcon> : 
                <>
                <DareIcon key={"Icon"+i} id={i} side='left' Dare={dareList[i]}></DareIcon>
                  <DareIcon key={"Icon"+i+1} id={i+1} side='right' Dare={dareList[i+1]}></DareIcon>
                </>}
              </View>
            )
          }
        })}
        
      </ScrollView>
      <StatusBar style="dark"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 8,
    
  },
  titleText: {
    fontSize: 40,
    fontWeight: '300',
    marginLeft: '4%',
    
  },
  content: {
    width: '100%',
    flex: 0.6,
    flexDirection: 'row',
    flexWrap: 'wrap',

    alignItems: "center",
  },
  list: {
    marginTop: '4%',
    flexDirection: 'row',
    
  },

});

