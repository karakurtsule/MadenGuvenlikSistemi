from datetime import datetime
import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
from time import time


class DBYonetim:
    def __init__(self, abu):
        self.abu = abu
        self.logFile = open("logfile.txt", "a")
        self.notificationLogFile = open("logNotification.txt", "a")
        cred = credentials.Certificate('appmobil-6c630-firebase-adminsdk-xnr43-b9d5b50716.json')
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://appmobil-6c630-default-rtdb.firebaseio.com/'
        })
        ref = db.reference('restricted_access/secret_document')
        print(ref.get())
        self.notificationFlag = False
        self.alarm = 0
        self.fan = 0
        self.fanMsg = ""
        self.alarmMsg = ""

    def abuWriter(self, msg):
        self.abu.write(bytes(msg, 'utf-8'))

    ##LOG MESAJI LOGFILE KONUMUNA YAZ
    def logger(self, logMsg):
        self.logFile.write(self.timer() + " " + logMsg + "\n")

    # info LiSTESINDEN LOGMSG OLUSTUR
    def createLogMsg(self, info):
        logMsg = "" + str(self.returnType(info)) + " " + str(self.returnMark(info)) + " " + str(info[3])
        self.logger(logMsg)

    # YYYY-MM-DD, HH:MM:SS TIPINDE ZAMAN VERISI AL
    def timer(self):
        timestamp = datetime.now()
        cur_day_format = timestamp.strftime("%Y-%m-%d,%H:%M:%S ")
        return cur_day_format

    ### ORTAM VERISI DBYE YAZ #####
    def addToDB(self, info):
        timeStamp = int(time() * 1000)
        adr = ''
        ref = db.reference(adr)
        if str(info[0]) == 'alarm':
            ref_ortam = ref.child('alarm')
            ref_ortam.update({
                'data': info[1],
                'timestamp': timeStamp
            })
        elif str(info[0]) == 'fan':
            ref_ortam = ref.child('fan')
            ref_ortam.update({
                'data': info[1],
                'timestamp': timeStamp
            })
        else:
            type = self.returnType(info)
            level = info[2]
            ref_ortam = ref.child(type)
            ref_ortam.update({
                timeStamp: {
                    'data': level,
                    'timestamp': timeStamp
                }
            })

    def createNotification(self, notificationMsg):
        timeStamp = time() * 1000
        adr = ''
        ref = db.reference(adr)
        ref_ortam = ref.child('notification')
        ref_ortam.update({
            'message': notificationMsg,
            'flag': True,
            'timestamp': timeStamp
        })
        self.notificationLogFile.write(self.timer() + " " + notificationMsg + "\n")

    ##### MAIN DONGUDE CALISACAK, DEGISIKLIK ALGILA#####
    def dBListener(self):
        ref = db.reference('alarm')
        snap = ref.get()
        snap['data'] = str(snap['data'])
        if str(self.alarm) != str(snap['data'].replace("\"", "")):
            self.alarmMsg = "alarm+" + str(snap['data'])
            self.setABUAlarm(self.alarmMsg)
            self.alarm = snap['data']

        ref = db.reference('fan')
        snap = ref.get()
        snap['data'] = str(snap['data'])
        if str(self.fan) != str(snap['data'].replace("\"", "")):
            self.fanMsg = "fan+" + str(snap['data'])
            self.setABUFan(self.fanMsg)
            self.fan = snap['data']

    #### lvl parametre: 1-0 verilecek ####
    def setAlarm(self, lvl):
        if int(lvl) == 1 or int(lvl) == 2:
            timeStamp = time() * 1000
            adr = ''
            ref = db.reference(adr)
            ref_ortam = ref.child('alarm')
            ref_ortam.update({
                'data': lvl,
                'timestamp': timeStamp
            })
            self.alarm = lvl
        else:
            pass

    #### lvl parametre: 5-0 verilecek ####
    def setFan(self, lvl):
        if 0 <= int(lvl) <= 5:
            timeStamp = time() * 1000
            adr = ''
            ref = db.reference(adr)
            ref_ortam = ref.child('fan')
            ref_ortam.update({
                'data': lvl,
                'timestamp': timeStamp
            })
            self.fan = lvl
        else:
            pass

    def setABUFan(self, lvl):
        ABUmsg = str(lvl)
        self.abuWriter(ABUmsg)
        print("to abu")
        print(ABUmsg)

    def setABUAlarm(self, lvl):
        ABUmsg = str(lvl)
        self.abuWriter(ABUmsg)
        print("to abu")
        print(ABUmsg)

    def sendNotification(self, notificationMsg):
        if self.notificationFlag:
            timeStamp = int(time() * 1000)
            adr = ''
            ref = db.reference(adr)
            ref_ortam = ref.child('notification')
            ref_ortam.update({
                'data': notificationMsg,
                'timestamp': timeStamp
            })
            self.notificationLogFile.write(self.timer() + " " + notificationMsg + "\n")
        else:
            pass

    def returnType(self, info):
        type = info[1]
        if (type == "1"):
            return "o2"
        elif (type == "2"):
            return "co2"
        elif (type == "3"):
            return "pressure"
        elif (type == "4"):
            return "ch4"
        elif (type == "5"):
            return "co"
        elif (type == "6"):
            return "humidity"
        elif (type == "7"):
            return "temperature"

    def returnMark(self, info):
        mark = info[3]
        if (mark == "11"):
            return "normal"
        elif (mark == "12"):
            return "low"
        elif (mark == "13"):
            return "high"
        elif (mark == "14"):
            return "abnormal"

    def setNotificationFlag(self, flag):
        self.notificationFlag = flag
