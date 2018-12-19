import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';
import styles from '../../Styles';
import firebase from 'firebase';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '', 
      password: '', 
      isTutor: false,
      loading: false   
    }
  }

  static navigationOptions = {
    title: 'SignUp',
  };

  createUser() {
    const { email, password } = this.state;
    
    this.setState({ 
      error: '', 
      loading: true 
    });

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onSignUpSuccess.bind(this))
        .catch(this.onSignUpFailed.bind(this));
  }

  writeUserData(){
    const user= firebase.auth().currentUser;
    const isTutor= this.state.isTutor, email=user.email.toLowerCase(), uid=user.uid, phone= "+45"+this.state.phone, name = this.state.name.toLowerCase();
    firebase.database().ref('UsersList/').push({
        uid,
        name,
        phone,
        email,
        isTutor
    }).then((data)=>{
        //success callback
       
    }).catch((error)=>{
        //error callback
        alert(uid,email,isTutor,error)
    })
}

  onSignUpSuccess() {
    this.writeUserData();
    this.setState({ 
      email: '', 
      loading: false, 
      error: '' }); 
  }

  onSignUpFailed(err) {
    this.setState({ 
      loading: false, 
      error: err.message });
      alert(err.message);
    }

  render() {

    if(this.loading) {
      return(
        <View style={{flex:1, padding: 20, justifyContent: 'center', alignItems:'stretch'}}> 
        <ActivityIndicator></ActivityIndicator>
      </View>
      )
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      
      <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/40/000000/about-us-male.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Full Name"
              underlineColorAndroid='transparent'
              value = {this.state.name}
              onChangeText={(name) => this.setState({name})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/40/000000/iphone-x.png'}}/>
          <TextInput style={styles.inputs}
               placeholder="12345678"
               underlineColorAndroid='transparent'
               value = {this.state.phone}
               onChangeText={(phone) => this.setState({phone})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value = {this.state.email}
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              value = {this.state.password}
              onChangeText={(password) => this.setState({password})}/>
        </View>
        

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.createUser.bind(this)}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableHighlight>

       
          <Text style={{fontSize:25}}>Tutor?</Text>
          <Switch style={{marginBottom:30}} value={this.state.isTutor} onValueChange={() => {
          switch(this.state.isTutor) {
          case false: {this.setState({isTutor:true})} break;
          case true:{this.setState({isTutor:false})} break;
          }}}>
          </Switch>
        

      </KeyboardAvoidingView>
    );
  }
}
