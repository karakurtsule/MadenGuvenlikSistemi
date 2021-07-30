import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WeeklyReport from './WeeklyReport';
import MonthlyReport from './MonthlyReport';



export default class Reports extends React.Component {

  state = {
    datas: [0],
    user: '',
    loading: false,
    co2max: 0, co2min: 0, co2avr: 0,
    comax: 0, comin: 0, coavr: 0,
    o2max: 0, o2min: 0, o2avr: 0,
    ch4max: 0, ch4min: 0, ch4avr: 0,
    tempaturemax: 0, tempaturemin: 0, tempatureavr: 0,
    pressuremax: 0, pressuremin: 0, pressureavr: 0,
    humiditymax: 0, humiditymin: 0, humidityavr: 0
  }

  componentDidMount = () => {
    const timestamp = new Date().getTime();
    var oneYear = (timestamp - 31556952000);
    var min = 9999999, max = 0, avr, tmp, sum = 0, count = 0;


    // CO2 günlük rapor
    firebase.database().ref('co2').orderByChild('timestamp').startAt(oneYear).on('value', (snap) => {
      let datas = []
      snap.forEach((item) => {
        const { data } = item.val();
        tmp = parseInt(data);
        if (tmp > max) {
          max = tmp;
        }
        if (tmp < min) {
          min = tmp;
        }
        sum += tmp;
        count++;
        avr = Math.round(sum / count);
        datas.push({ data });
      });
      this.setState({ co2max: max });
      this.setState({ co2min: min });
      this.setState({ co2avr: avr });
    })

    //O2 günlük rapor
    min = 9999999, max = 0, avr, tmp, sum = 0, count = 0;
    firebase.database().ref('o2').orderByChild('timestamp').startAt(oneYear).on('value', (snap) => {
      let datas = []
      snap.forEach((item) => {
        const { data } = item.val();
        tmp = parseInt(data);
        if (tmp > max) {
          max = tmp;
        }
        if (tmp < min) {
          min = tmp;
        }
        sum += tmp;
        count++;
        avr = Math.round(sum / count);
        datas.push({ data });
      });
      this.setState({ o2max: max });
      this.setState({ o2min: min });
      this.setState({ o2avr: avr });
    })

    //CO gnlük rapor
    min = 9999999, max = 0, avr, tmp, sum = 0, count = 0;
    firebase.database().ref('co').orderByChild('timestamp').startAt(oneYear).on('value', (snap) => {
      let datas = []
      snap.forEach((item) => {
        const { data } = item.val();
        tmp = parseInt(data);
        if (tmp > max) {
          max = tmp;
        }
        if (tmp < min) {
          min = tmp;
        }
        sum += tmp;
        count++;
        avr = Math.round(sum / count);
        datas.push({ data });
      });
      this.setState({ comax: max });
      this.setState({ comin: min });
      this.setState({ coavr: avr });
    })

    //CH4 günlük rapor
    min = 9999999, max = 0, avr, tmp, sum = 0, count = 0;
    firebase.database().ref('ch4').orderByChild('timestamp').startAt(oneYear).on('value', (snap) => {
      let datas = []
      snap.forEach((item) => {
        const { data } = item.val();
        tmp = parseInt(data);
        if (tmp > max) {
          max = tmp;
        }
        if (tmp < min) {
          min = tmp;
        }
        sum += tmp;
        count++;
        avr = Math.round(sum / count);
        datas.push({ data });
      });
      this.setState({ ch4max: max });
      this.setState({ ch4min: min });
      this.setState({ ch4avr: avr });
    })
    //tempature günlük rapor
    min = 9999999, max = 0, avr, tmp, sum = 0, count = 0;
    firebase.database().ref('temperature').orderByChild('timestamp').startAt(oneYear).on('value', (snap) => {
      let datas = []
      snap.forEach((item) => {
        const { data } = item.val();
        tmp = parseInt(data);
        if (tmp > max) {
          max = tmp;
        }
        if (tmp < min) {
          min = tmp;
        }
        sum += tmp;
        count++;
        avr = Math.round(sum / count);
        datas.push({ data });
      });
      this.setState({ tempaturemax: max });
      this.setState({ tempaturemin: min });
      this.setState({ tempatureavr: avr });
    })

    //pressure günlük rapor
    min = 9999999, max = 0, avr, tmp, sum = 0, count = 0;
    firebase.database().ref('pressure').orderByChild('timestamp').startAt(oneYear).on('value', (snap) => {
      let datas = []
      snap.forEach((item) => {
        const { data } = item.val();
        tmp = parseInt(data);
        if (tmp > max) {
          max = tmp;
        }
        if (tmp < min) {
          min = tmp;
        }
        sum += tmp;
        count++;
        avr = Math.round(sum / count);
        datas.push({ data });
      });
      this.setState({ pressuremax: max });
      this.setState({ pressuremin: min });
      this.setState({ pressureavr: avr });
    })

    //humidity günlük rapor
    min = 9999999, max = 0, avr, tmp, sum = 0, count = 0;
    firebase.database().ref('humidity').orderByChild('timestamp').startAt(oneYear).on('value', (snap) => {
      let datas = []
      snap.forEach((item) => {
        const { data } = item.val();
        tmp = parseInt(data);
        if (tmp > max) {
          max = tmp;
        }
        if (tmp < min) {
          min = tmp;
        }
        sum += tmp;
        count++;
        avr = Math.round(sum / count);
        datas.push({ data });
      });
      this.setState({ humiditymax: max });
      this.setState({ humiditymin: min });
      this.setState({ humidityavr: avr });
    })




  }
  goHome = () => {
    const popAction = StackActions.pop(1);
    this.props.navigation.dispatch(popAction);
  }
  render() {
    return (
      
            <View style={styles.containerw}>
           
            <View style={styles.panel}>
            <Text>Yıllık Rapor Görüntüle </Text>
            </View>
            <View style={styles.panel}>
              <Text>Özellik              min                 ort                  max </Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'baseline' }}>
              <View style={styles.panel}>
                <Text>CO2      :            {this.state.co2min}                      {this.state.co2avr}                     {this.state.co2max} </Text>
                </View>
                <View style={styles.panel}>
                <Text>O2       :            {this.state.o2min}                      {this.state.o2avr}                     {this.state.o2max} </Text>
                </View>
                <View style={styles.panel}>
                <Text>CO       :            {this.state.comin}                      {this.state.coavr}                     {this.state.comax} </Text>
                </View>
                <View style={styles.panel}>
                <Text>CH4      :            {this.state.ch4min}                      {this.state.ch4avr}                     {this.state.ch4max} </Text>
                </View>
                <View style={styles.panel}>
                <Text>Sıcaklık :            {this.state.tempaturemin}                      {this.state.tempatureavr}                     {this.state.tempaturemax} </Text>
                </View>
                <View style={styles.panel}>
                <Text>Basınç   :            {this.state.pressuremin}                      {this.state.pressureavr}                     {this.state.pressuremax} </Text>
                </View>
                <View style={styles.panel}>
                <Text>Nem      :            {this.state.humiditymin}                      {this.state.humidityavr}                     {this.state.humiditymax} </Text>
              </View>
              </View>
              <View style={{alignItems: 'center', width: '100%', }}>
              <TouchableOpacity style={styles.homeButton} onPress = {() => (this.goHome())}>
             
                  <Text style={styles.homeButtonText}>
                      Home
                  </Text>
               
            </TouchableOpacity>
            </View>
           
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
 
  homeButton: {
    width: "70%",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#00003f",
    marginBottom:5,
  },
  homeButtonText : {
    color : "#f8fcfd",
    fontWeight: "bold",
  },
  panel: {
    height: "8%", 
    width: "100%",
    backgroundColor:'#FBFAF5', 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 9,
    justifyContent: 'space-evenly',
    borderColor: "#00003f",
    borderWidth:4,
  },
});