import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import DareIcon from "./dareIcon-component";
import InstantIcon from "./instantIcon-component";
import Header from "./header-component";
import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import { StyleSheet, ScrollView, Animated, TouchableWithoutFeedback, AsyncStorage, Text, View, Dimensions, TouchableOpacity,} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

class Fetch extends React.Component{

  constructor(props){
      super(props);
      this.state={
      }
  
  }

  componentDidMount () {
    const fetch = async () => {

      const result = await this.fetchData();
      console.log(result);
      this.props.setInstantList(result);
    }
    fetch();
  }
  fetchData = async () => {

    let token = await AsyncStorage.getItem("userToken")
    const url = 'https://almosdare.herokuapp.com/api/instants/pending';
    return await fetch(url, {
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
        console.log('json '+json)
        return json.data
      }
      else{
        alert('ERROR')
        return []
      }
    })
    .catch((error) => {
        console.log(error);
        alert('Server Problem');
        return []
    });
  }

  render() {
    return(
      <></>
    )
  }
}

class InstantList extends React.Component{

  constructor(props){
      super(props);
      this.state={
      }
  
  }

  render() {
    return(
      <View key={"View"+this.props.id} style={styles.list} ref={view => {this.viewRef = view}}>              
        <InstantIcon instantData={this.props.instantData} isBlured={this.props.isBlured} setSelectedData={(data) => {this.props.setSelectedData(data)}} setIsBlured={(toggle) => {this.viewRef && this.viewRef.measure((width, height, px, py, fx, fy) => {
          this.props.setHighlightOffset({
            fx: fx,
            fy: fy,
          })
          this.props.setIsBlured(toggle); 
        })}}></InstantIcon>
      </View>
    )
  }
}

export default function Home() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isBlured, setIsBlured] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isAccepted, setIsAccepted] = useState();
  const [highlightOffset, setHighlightOffset] = useState();
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
    },
    {
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
    },
    {
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

  const [isStarted, setIsStarted] = useState(false);
  const [pendingInstantList, setPendingInstantList] = useState([]);
  const [invitedInstantList, setinvitedInstantList] = useState();

  const swiperRef = useRef(null);
  
  const setPendingList = async () => {
    const result = await fetchData();
    return result
  }
  

  return (
      <View style={styles.container}>
        <Fetch setInstantList={(result) => {setPendingInstantList(result)}}></Fetch>
        <Header scrollY={scrollY}></Header>
        {(isBlured === true) && (highlightOffset) ? 
          <TouchableWithoutFeedback onPress={() => {setIsBlured(!isBlured)}}> 
            <BlurView tint='dark' intensity={100} style={[StyleSheet.absoluteFill, {position: 'absolute', zIndex: 1}]}>
        
              <View style={{flexDirection: 'row', width: '100%', position: 'absolute', top: highlightOffset && highlightOffset.fy}}>
                <InstantIcon isPopup={true} setSelectedData={(data) => {setSelectedData(data)}} selectedData={selectedData} isBlured={isBlured} setIsBlured={(toggle) => {setIsBlured(toggle)}}></InstantIcon>
                <Animatable.View
                  style={{zIndex: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    
                  }}
                  animation={isBlured ? 'bounceInRight' : null}
                  delay={0}
                  duration={800}
                  useNativeDriver>
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          position: 'absolute',
                          right: 50,
                        }}>
                          <Ionicons name="ios-checkmark-circle-outline" size={50} color="green" />
                      </TouchableOpacity>
                </Animatable.View>
              </View>
            </BlurView>
        </TouchableWithoutFeedback> : null}
        <ScrollView style={{flex: 1,}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false},
          )}>
      
          <Swiper 
            loop={false}
            height={40}
            showsPagination={false}
            horizontal={false}
            ref={swiperRef}
            scrollEnabled={false}
            onIndexChanged={(index) => {
              console.log('top'+index)
              
            }}>
            
            <View key="title" style={styles.title}>
              <Text style={styles.titleText}>
                Dares
              </Text>
              
            </View>
            <View key="title" style={styles.title}>
              <Text style={styles.titleText}>
                Instants
              </Text>
            
            </View>
          </Swiper>
          

    <Swiper
      style={{height: (pendingInstantList.length) * (Dimensions.get('window').width*0.20 + Dimensions.get('window').height*0.02) + Dimensions.get('window').height*0.04}}
      loop={false}
      showsPagination={false}
      onIndexChanged={(index) => {
        console.log(index)
        if(index === 0){
          console.log('back')
          swiperRef.current.scrollTo(0, false)
        }
        else if(index === 1){
          console.log('front')
          swiperRef.current.scrollTo(1, false)
        }
      
      }}>
        <View style={{flex: 1, marginTop: '4%'}}>
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
            </View>
            <View style={{flex: 1, marginTop: '4%'}}> 
              {
              pendingInstantList.map((instantData, i) => {
                console.log('map: '+ instantData)
                  return(
                      <InstantList id={i} isPopup={false} instantData={instantData} isBlured={isBlured} setSelectedData={(data) => {setSelectedData(data)}} setHighlightOffset={(data) => {setHighlightOffset(data)}}
                      setIsBlured={(data) => {setIsBlured(data)}}>
                      </InstantList>
                    ) 
                  }
                )}
            </View>
          </Swiper>
          
        </ScrollView>
        <StatusBar style="dark"/>
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
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
  dot: {
    backgroundColor: 'rgba(52, 101, 217, .4)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#3465d9',
      height: 8,
      marginHorizontal: 5,
      borderRadius: 4,
      marginVertical: 3,
  },
});

