import React, { useState } from 'react';
import { Linking,StyleSheet, Modal,  Switch, Text, ImageBackground, View, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { StackActions } from '@react-navigation/native';
import { Entypo, Feather } from '@expo/vector-icons';



export default class Home extends React.Component {

  state = {
    user: '',
    loading: false,
    values: [],
    data: 8,

    tmp : '',
    notificationMsg : '',
    notificationFlag : true,

    alarm: 0,
    fan: 0,
    alarmSwitch: false,
    fanSwitch: false,
  }
componentWillUnmount = () => {
  //
}

  alarmState = () => {
    firebase.database().ref('alarm').on('value', (snap) => {
      const datas = snap.val();
      //this.state.alarm = datas.data;
      if(String(this.state.alarm) != String(datas.data)){
        this.setState({
          alarm: String(datas.data) ,
          alarmSwitch : (String(datas.data) == '1') 
        });
      }
  
    })
   
  }

  fanState = () => {
    firebase.database().ref('fan').on('value', (snap) => {
      const datas = snap.val();
      if(String(this.state.fan) != String(datas.data)){
        this.setState({
          fan: String(datas.data) ,
          fanSwitch : !(String(datas.data) == '0') 
        });
      }
  
    })

  }
  goReports = () => {
    const pushAction = StackActions.push('Raporlar');
    this.props.navigation.dispatch(pushAction);
  }

  goPhysical = () => {
    const pushAction = StackActions.push('Physical');
    this.props.navigation.dispatch(pushAction);
  }

  callEmergency = () => {
    firebase.database().ref('emergency').once('value', (snap) => {
      Linking.openURL(`tel:${snap.val()}`)
    })

  }


  alarmSwitchButton = () => {

    if ((this.state.alarm == 1 && this.state.alarmSwitch == false) || (this.state.alarm == 0 && this.state.alarmSwitch == true)) {
      if (this.state.alarmSwitch == true) {
        this.turnOnAlarm();
      } else {

        this.turnOffAlarm();
      }
    }
  }

  fanSwitchButton = (value) => {
    if ((this.state.fan != 0 && this.state.fanSwitch == false) || (this.state.fan == 0 && this.state.fanSwitch == true)) {
      if (this.state.fanSwitch == true) {
        this.turnOnFan();
      } else {

        this.turnOffFan();
      }
    }
  }
  turnOnAlarm = () => {
    const timestamp = new Date().getTime();
    firebase.database().ref('alarm').set({
      data: 1,
      timestamp: timestamp
    });
    this.state.alarm = 1;
    Alert.alert('Alarm başlatıldı ! ');
  }
  turnOffAlarm = () => {
    const timestamp = new Date().getTime();
    firebase.database().ref('alarm').set({
      data: 0,
      timestamp: timestamp
    });
    this.state.alarm = 0;
    Alert.alert('Alarm susturuldu! ');
  }

  turnOnFan = () => {
    const timestamp = new Date().getTime();
    firebase.database().ref('fan').set({
      data: 1,
      timestamp: timestamp
    });
    this.state.fan = 1;
    Alert.alert('Havalandırma açıldı! ');
  }

  turnOffFan = () => {
    const timestamp = new Date().getTime();
    firebase.database().ref('fan').set({
      data: 0,
      timestamp: timestamp
    });
    this.state.fan = 0;
    Alert.alert('Havalandırma kapatıldı! ');
  }

  fanUp = () => {
    if (this.state.fanSwitch) {
      var fanLevel = parseInt(this.state.fan);
      if (fanLevel != 5) {
        var newLevel = fanLevel + 1;
        const timestamp = new Date().getTime();
        firebase.database().ref('fan').set({
          data: newLevel,
          timestamp: timestamp
        });
        this.state.fan = newLevel;
        this.forceUpdate();
      } else {
        Alert.alert('Havalandırma en yüksek seviyede! ');
      }
    } else {
      Alert.alert('havalandırma kapalı ! ')
    }
  }

  fanDown = () => {
    if (this.state.fanSwitch) {
      var fanLevel = parseInt(this.state.fan);
      if (fanLevel > 1) {
        var newLevel = fanLevel - 1;
        const timestamp = new Date().getTime();
        firebase.database().ref('fan').set({
          data: newLevel,
          timestamp: timestamp
        });
        this.state.fan = newLevel;
        this.forceUpdate();
      } else {
        Alert.alert('Havalandırma en düşük seviyede ! ');
      }
    } else {
      Alert.alert('havalandırma kapalı ! ')
    }
  }
  notificationConfirmed = () => {
   
    firebase.database().ref('notification').set({
      flag: 'false',
      message: '',
    });
    this.setState({
      notificationFlag: false
    })
    

  }

  notificationManager = () => {
    firebase.database().ref('notification').on('value', (snap) => {
      const datas = snap.val();
      if( String(this.state.notificationFlag) != String(datas.flag) ) {
        this.setState({
          notificationFlag:(String(datas.flag) == 'true' ),
          notificationMsg : String(datas.message)
        })
      }
 //     this.state.notificationFlag = (String(datas.flag) == 'true' );
  //    this.state.notificationMsg= String(datas.message);
    });
    console.log("flag = "+this.state.notificationFlag);
  }

  
  addData = () => {
    null
    // firebase.database().ref('emergency').set('112');
  }
  signOutNow = () => {
    firebase.auth().signOut().then(() => {
      navigation.dispatch(StackActions.popToTop());
    }).catch((err) => {
      console.log(err);
    })

  }


  render() {
    return (
      <View style={styles.containerw}>
        {this.alarmState()}
        {this.fanState()}
        {this.alarmSwitchButton()}
        {this.fanSwitchButton()}
        {this.notificationManager()}
       
        <Entypo name="tools" size={54} color="white" style={{ paddingBottom: 10 }} />
        <TouchableOpacity style={styles.loginBtn} onPress={() => (this.goPhysical())}>
          
            <Feather name="file-text" size={24} color="white" style={{ paddingRight: 5 }} />
            <Text style={styles.loginText}>
              Fiziksel koşulları görüntüle
            </Text>
         
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => (this.goReports())}> 
            <Feather name="file-text" size={24} color="white" style={{ paddingRight: 5 }} />
            <Text style={styles.loginText}>
              Raporları görüntüle
            </Text> 
        </TouchableOpacity>
        <TouchableOpacity  style={styles.loginBtn} onPress={() => (this.callEmergency())}>
            <Feather name="phone-call" size={24} color="white" style={{ paddingRight: 5 }} />
            <Text style={styles.loginText}>
              112 Acil Servis Ara
            </Text>
        
         
        </TouchableOpacity>
        <View style={{ height: 60 }}></View>
        <View style={styles.panel}>
          <View style={{ alignItems: 'center' }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              onValueChange={(alarmSwitch) => this.setState({ alarmSwitch })}
              value={this.state.alarmSwitch}
              {...console.log('switch 165 : ' + this.state.alarmSwitch)}
            />
            <Text style={styles.panelText}>Alarm</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              onValueChange={(fanSwitch) => this.setState({ fanSwitch })}
              value={this.state.fanSwitch}
            />
            <Text style={styles.panelText}>Havalandırma</Text>
          </View>
          <View style={{ height: 70 }}>
            <TouchableOpacity onPress={() => this.fanUp()} style={styles.upDownButton}>
              <View >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.fanDown()} style={styles.upDownButton}>
              <View >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 35 }}>

        </View>
        <View style={styles.infoPanel}>
         
          <Text>
            Alarm durumu : {this.state.alarmSwitch ? 'açık' : 'kapalı'}
          </Text>
          <Text>
            Havalandırma durumu : {this.state.fanSwitch ? 'açık' : 'kapalı'}
          </Text>
          <Text>
            Havalandırma seviyesi :{this.state.fanSwitch ? this.state.fan : 'kapalı'}
          </Text>
        </View>


          <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.notificationFlag}
        onRequestClose={() => {
          this.notificationConfirmed();
        }}>
          <View style={{height:"75%" , width:"90%", backgroundColor:"white" }}>
        <Text> WARNING :  { this.state.notificationMsg }</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => this.notificationConfirmed()}>
          
            <Text style={styles.loginText}>
              Anladım, kapat.
            </Text>
          </TouchableOpacity>
      </View>

      </Modal>
        </View>
    );
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
    backgroundColor: "#008b8b",
    justifyContent: "center",
  },
 
  upDownButton : {
    flex: 1, 
    width: 30, 
    borderWidth: 3, 
    borderColor: "#000072",
    borderRadius: 10,
    justifyContent:"center",
    backgroundColor:'#005381', 
    alignContent: 'center', 
    alignItems: 'center',
    margin:1,
  },
  panel: {
    height: 100, 
    width: "75%",
    backgroundColor:'#FBFAF5', 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 30,
    justifyContent: 'space-evenly',
    borderColor: "#00003f",
    borderWidth:4,
  },
  infoPanel: {
    height: 100, 
    width: "75%",
    padding:15,
    borderRadius: 30,
    backgroundColor:'#FBFAF5', 
    alignItems: 'baseline', 
    borderColor: "#00003f",
    borderWidth:4,
   },
  panelText: {
    fontWeight: 'bold',
    color: "#00003f",
  },
  inputView: {
    backgroundColor: "#f8fcfd",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",

  },


  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: "flex-start",
    backgroundColor: "#00003f",
    justifyContent: 'space-evenly',
  },
  loginText : {
    color : "#f8fcfd",
  }
});