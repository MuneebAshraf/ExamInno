import React from 'react';
import { View} from 'react-native';
import {CheckBox, Button } from "react-native-elements";
import styles from './../../Styles';
import firebase from 'firebase';



export default class TutorCalenderScreen extends React.Component {
constructor(props) {
super(props)

    this.state = {
        monday:false,
        tuesday:false,
        wednesday:false,
        thursday:false,
        friday:false,
        saturday:false,
        sunday:false,

    }
}
    static navigationOptions = {
        title: 'Calendar'
    };

    updateTimes(){
        const user= firebase.auth().currentUser;
        const uid= user.uid,
        monday=this.state.monday, 
        tuesday=this.state.tuesday, 
        wednesday=this.state.wednesday, 
        thursday=this.state.thursday, 
        friday= this.state.friday, 
        saturday= this.state.saturday,
        sunday=this.state.sunday

        firebase.database().ref('CalendarList/').set({
            uid,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        }).then((data)=>{
            //success callback
           alert("Thank you for submitting")
           
        }).catch((error)=>{
            //error callback
            alert(".")
        })
    }

render(){
    
    return (

        <View style={styles.container}>
        <CheckBox center title="I'm available on Mondays" onPress={()=>{this.setState({monday:!this.monday})}} checked={this.state.monday} />
        <CheckBox center title="I'm available on tuesdays"onPress={()=>{this.setState({tuesday:!this.tuesday})}} checked={this.state.tuesday}/>
        <CheckBox center title="I'm available on wednesdays" onPress={()=>{this.setState({wednesday:!this.wednesday})}}checked={this.state.wednesday}/>
        <CheckBox center title="I'm available on thursdays"onPress={()=>{this.setState({thursday:!this.thursday})}} checked={this.state.thursday}/>
        <CheckBox center title="I'm available on fridays" onPress={()=>{this.setState({friday:!this.friday})}}checked={this.state.friday}/>
        <CheckBox center title="I'm available on saturdays" onPress={()=>{this.setState({saturday:!this.saturday})}}checked={this.state.saturday}/>
        <CheckBox center title="I'm available on sundays" onPress={()=>{this.setState({sunday:!this.sunday})}}checked={this.state.sunday}/>
        <Button title="These are the days im available!" backgroundColor="#00b5ec" large onPress={this.updateTimes.bind(this)}></Button>
        </View>
    
    )
}

}