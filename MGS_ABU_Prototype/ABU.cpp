#include "ABU.h"
#include "Sensor.h"


ABU::ABU(bool flag){
  this -> flag = flag;
}


bool ABU::isImportant(Sensor& ortam, Alarm& alarm, Havalandirma& fan , Transfer& sender){
  /*
  belirtec:   
  11 normal && 12 low && 13 high  &&  14 abnormal
  */
byte  belirtec = ortam.getBelirtec();
int seviye = ortam.getSeviye();
byte tip = ortam.getTip();
  bool flag = true;
  if (belirtec == 11){     //normal is not important
    flag = false;
    
  } else if (belirtec == 12 || belirtec == 13) {
    ABU::sendCommand( tip,  seviye , belirtec , sender);
   alarm.turnOnAlarm(1);
   fan.turnOnFan(1);
   
  } else {
    flag = true;
    ABU::abnormalDataDetected( tip,  seviye , belirtec, sender );   
  }
  return flag;
}
 
void ABU::abnormalDataDetected(byte tip, int seviye, byte belirtec , Transfer& sender){
  String transferMsg = "abnormal"+String(tip)+"+"+String(seviye)+"+"+String(belirtec)+"";
  ABU::transferEt(transferMsg, sender);
  }

 void ABU::sendCommand(byte tip, int seviye , byte belirtec, Transfer& sender){
  String transferMsg = "critical"+String(tip)+"+"+String(seviye)+"+"+String(belirtec)+"";
  ABU::transferEt(transferMsg, sender);
 }
 void ABU::transferEt(String transferMsg, Transfer& sender){
 Serial.println( transferMsg);
 sender.transferEt(transferMsg);
 }
 