import React from 'react';
import { View, Text, Button} from 'react-native';
import styles from '../../Styles';
import firebase from "firebase";



export default class StudentFindTutorScreen extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        dataSource: '',
        isloading:true,
        currentUser: firebase.auth().currentUser
      }
    }

    signOut() {
        firebase.auth().signOut()
        .then(function() {
            
        }, function(error) {
            alert(error);
        });
    }

    static navigationOptions = {
        title: 'StudentFindTutor',
      };

      
      render() {
        return (
            <View style={styles.container}>
            
                <Button title='Log out' onPress={this.signOut.bind(this)}>
                </Button>
            </View>
        );
      }
}


