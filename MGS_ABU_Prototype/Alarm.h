#ifndef MY_ALARM_H
#define MY_ALARM_H

#include <Arduino.h>
class Alarm {
  private:
    
 
  public:
   byte pin;
   Alarm(byte pin);
    
    byte level;
   
    
    void init();
    void turnOnAlarm(byte luzumsuz); //Gelecekte yapılacak geliştirmelerde havalandırma classıyla ortak çalışma sağlayabilmek
                                     //için kullanılmayan bir byte parametre
    void turnOffAlarm();
    byte getAlarmLevel();
    
};

#endif