#ifndef MY_ABU_H
#define MY_ABU_H


#include "Sensor.h"
#include "Transfer.h"
#include "Havalandirma.h"
#include <Arduino.h>
class ABU {

/*
// tip : 01:o2 02:co2 03:ch4 04:co 05:nem 06:sıcaklık 07:basınç
// belirtec: 11: normal 12:düşük 13: yüksek 14:anormal
// seviye: sensörden okunan değer
*/
  public:

    bool flag;
    void abnormalDataDetected(byte tip, int seviye , byte belirtec, Transfer& sender );
        //normal sınırların dışında bir sensör verisi ile karşılaşınca çalışacak. Anormal data verisini
        //sender objesine gönderecek transfer mesajını oluştur.
    bool isImportant(Sensor& ortam, Alarm& alarm, Havalandirma& fan ,  Transfer& sender); 
        //ortam verisini alır. normal sınırlarında verilerle karşılaşırsa diğer fonsksiyonları çağırır.
    void sendCommand(byte tip, int seviye , byte belirtec,  Transfer& sender );
        //yüksek ve düşük bir sensör verisi ile karşılaşınca çalışacak. Kritik data verisini
        //sender objesine gönderecek transfer mesajını oluştur.
    ABU(bool flag);
    void transferEt(String transferMsg,  Transfer& sender);
        //oluşturulan transfer mesajını sender objesine iletir.
    
};

#endif