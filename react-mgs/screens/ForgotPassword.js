import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { StackActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default class ForgotPassword extends React.Component {

  state = {
    email: ''
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        this.props.navigation.dispatch(
          StackActions.replace('Home')
        );
      }
    });
   
  }

 

  resetPassword = () => {
       firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
      alert(
          'Lütfen e-postanızı kontrol edin.',
          [
              {text : ' tamam '}
          ]
      )
    }).catch(function(error) {
      console.log(error);
    });
  }

  loginPage = () => {
    const popAction = StackActions.pop(1);
    this.props.navigation.dispatch(popAction);
  }
  render() {
   
    if (this.state.loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
        <ImageBackground source={require('./background.jpg')}  style={{width: '100%', height: '100%'}}> 
        <View style={styles.containerw}>
                 <AntDesign name="Safety" size={84} color="white" />
                 <View style={{ height: 30 }}></View>

             <View style={styles.inputView}>
            <TextInput
            placeholder='eposta'
            onChangeText={email => this.setState({ email: email })}
            value={this.state.email}
            style={styles.TextInput}
            placeholderTextColor='#00003f'
            keyboardType='email-address'
          />
        </View>

         
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.resetPassword()}>
          
              <Text style={styles.loginText}>
                Şifre sıfırlama e-postası al
            </Text>
          
          </TouchableOpacity>
          <View style={{ height: 30 }}></View>
          <TouchableOpacity onPress={() => this.loginPage()}>
             
              <Text style={styles.forgot_button}>
                Giriş Yap
            </Text>
             
          </TouchableOpacity>
          </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008b8b",
    alignItems: "center",
    justifyContent: "center",
  },
  containerw: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#f8fcfd",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",

  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: '#00003f'
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#f8fcfd'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', 
  },
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#00003f",
  },
  loginText : {
    color : "#f8fcfd",
  }
});