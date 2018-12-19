import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import styles from '../../Styles';
import firebase from 'firebase';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '', 
      isTutor: false,
      loading: false   
    }
  }

  static navigationOptions = {
    title: 'Login',
  };

  authenticate() {
    const { email, password } = this.state;
    
    this.setState({ 
      error: '', 
      loading: true 
    });

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onSignInSuccess.bind(this))
        .catch(this.onSignInFailed.bind(this));
  }
  
  onSignInSuccess() {
    this.setState({ 
      loading: false, 
      error: '' });
  }

  onSignInFailed(err) {
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
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput 
             style={styles.inputs}
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

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.authenticate.bind(this)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        
        <TouchableHighlight style={styles.buttonContainer} onPress={() => {this.props.navigation.navigate('SignUp')}}>
            <Text>Register</Text>
        </TouchableHighlight>
     
      </KeyboardAvoidingView>
    );
  }
}
