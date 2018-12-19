import React from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { ListItem } from "react-native-elements";
import StudentProfileScreen from './StudentProfileScreen'
import StudentFindTutorScreen from './StudentFindTutorScreen'
import firebase  from "firebase";

class StudentMainScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: '',
      isloading:true,
      currentUser: firebase.auth().currentUser
    }
  }
  static navigationOptions = {
    title: 'StudentMain'
  };
  
  
      componentDidMount(){
        this.ApiSync();
      };

      ApiSync() {
        return fetch('http://rallycoding.herokuapp.com/api/music_albums')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isloading:false,
            dataSource: responseJson
          })
        })
        .catch((error) => {console.error(error)})
      }
      render() {
        if(this.state.isloading) {
          return (
            <View style={{flex:1, padding: 20, justifyContent: 'center', alignItems:'stretch'}}> 
              <ActivityIndicator></ActivityIndicator>
            </View>
          ) 
        }
        return (
            <FlatList style={styles.container}
            data = {this.state.dataSource}
            renderItem = {({ item }) => 
            <ListItem 
              avatar={
                <Image style={{width:65, height:65}} source={{ uri:item.image}}/>
              }
              title={item.title}
              subtitle={item.artist}>
            </ListItem>
            } 
            keyExtractor={(iten, index) => index.toString()}>
            
            </FlatList>
        );
      }
} 




const tabNavigator =  createBottomTabNavigator(
  {
    StudentMain: {screen: StudentMainScreen },
    StudentFindTutor: {screen: StudentFindTutorScreen},
    StudentProfile: {screen: StudentProfileScreen }
  }
)

export default createAppContainer(tabNavigator);

  const styles = StyleSheet.create({
    container: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 50,
      marginBottom: 50
    }
  })




  