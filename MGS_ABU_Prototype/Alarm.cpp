#include "Alarm.h"

Alarm::Alarm(byte pin){
  this -> pin = pin; 
}




void Alarm::turnOnAlarm(byte luzumsuz){
  this->level = 1;
  digitalWrite(pin, HIGH);
  delay(100);
  digitalWrite(pin, LOW);
  delay(60);

}

void Alarm::turnOffAlarm(){
  digitalWrite(this->pin, LOW);
  this->level = 0;
}

void Alarm::init(){
  pinMode(this->pin, OUTPUT);
  turnOffAlarm();
  this->level = 0;
}

byte Alarm::getAlarmLevel(){
  return this->level;
}