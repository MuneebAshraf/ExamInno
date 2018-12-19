import React from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator} from "react-navigation";
import StudentMainScreen from './components/Student/StudentMainScreen';
import TutorMainScreen from './components/Tutor/TutorMainScreen';
import LoginScreen from './components/Auth/LoginScreen';
import firebase from 'firebase';
import SignUpScreen from './components/Auth/SignUpScreen';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loggedIn: false,
      isTutor: undefined
    }
  }

  isTutor() {
    var that = this;
    let user = firebase.auth().currentUser
    let ref =firebase.database().ref('UsersList/')
    let query = ref.orderByChild('email').equalTo(user.email)
    query.once('value', function (shot) {
      shot.forEach((childshot) => {
        var result = childshot.val()
        that.setState({isTutor:result.isTutor})
    });
    })}
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyB0OgjC5d6ED6_0Q4a6bcUKoVDimmPOlpc",
      authDomain: "tutorapp-9e7fe.firebaseapp.com",
      databaseURL: "https://tutorapp-9e7fe.firebaseio.com",
      projectId: "tutorapp-9e7fe",
      storageBucket: "tutorapp-9e7fe.appspot.com",
      messagingSenderId: "926365260033"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isTutor();
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      } 
    });
  }
  render() {
    switch (this.state.loggedIn){
      case false: 
      return (
        <AuthContainer></AuthContainer>
      )
      case true: 
        switch(this.state.isTutor){
          case true:return(<TutorMainScreen></TutorMainScreen>);
          
          case false:return(<StudentMainScreen></StudentMainScreen>);
        }

      default: 
      return firebase.auth().signOut();
    } 
    
  }
}

const AuthStacks = createStackNavigator({
  LoginScreen: {screen: LoginScreen},
  SignUp: {screen: SignUpScreen}
})

const AuthContainer = createAppContainer(AuthStacks);

export default createAppContainer(createSwitchNavigator(
  {
    App: App,
    auth: AuthStacks,
    Student: StudentMainScreen,
    Tutor: TutorMainScreen 
  },
  {
    initialRouteName: 'App',
  }
));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



