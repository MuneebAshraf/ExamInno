import React from 'react';
import {View, Image, Text} from 'react-native';
import {Button, } from 'react-native-elements';
import {createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import style from "../../Styles";
import firebase from 'firebase';
import TutorFindCourseScreen from "./TutorFindCourseScreen";
import TutorProfileScreen from "./TutorProfileScreen";
import TutorCalenderScreen from "./TutorCalendarScreen";



class TutorMainScreen extends React.Component {
  constructor(props) {
    super(props)
    this.getInfo()

    this.state = {
      email:'dummy@mail.com',
      phone:'+4512345678',
      
    }
  } 
    getInfo() {
    var that = this;
    let user = firebase.auth().currentUser
    let ref =firebase.database().ref('UsersList')
    let query = ref.orderByChild('email').equalTo(user.email)
    query.once('value', function (data) {
      data.forEach((datachild) => {
        var result = datachild.val()
        that.setState({email: result.email, phone:result.phone})
    });
    })}


    static navigationOptions = {
        title: 'Main',
      };
      render() {
      
        return (
            <View style={style.profileContainer}>
            <Image style={style.profileImage} source={{uri:"http://chittagongit.com//images/blank-person-icon/blank-person-icon-9.jpg"}}></Image>
            
            <View style={{marginLeft:30}}>
              <Text H5>{this.state.email}</Text>
              <Text H5>{this.state.phone}</Text>
            </View>

            <View style={{flex:1, flexDirection:"row"}}>
            <View style={{flex:1, flexDirection:"column", padding: 30}}>
            <Button large backgroundColor="#00b5ec" style={{margin:30} } title="My Courses"></Button>
            <Button large backgroundColor="#00b5ec" style={{margin:30} } title="My Calender" onPress={()=> {this.props.navigation.navigate('Calendar')}}></Button>
            </View>
            </View>
            </View>
        );
      }
}


const calendarStack = createStackNavigator({
  Main: {screen: TutorMainScreen},
  Calendar: {screen: TutorCalenderScreen},
})

const calendarcontainer = createAppContainer(calendarStack);


const tabNavigator =  createBottomTabNavigator(
  {
    Main: {screen: calendarcontainer },
    FindCourse: {screen: TutorFindCourseScreen},
    Profile: {screen: TutorProfileScreen }
  }
)

export default createAppContainer(tabNavigator);