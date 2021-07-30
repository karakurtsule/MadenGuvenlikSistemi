from DBYonetim import DBYonetim
from firebase_admin import db
from firebase_admin import credentials
from time import time


class BildirimYonetim:

    def __init__(self, dbyonetim):
        self.flag = True
        self.dbYonetim = dbyonetim

    # GELEN info DIZISINDEN BILDIRIM MSG OLUSTUR
    def createNotificationMsg(self, info):
        notificationMsg = ""
        if (info[0] == "abnormal"):
            notificationMsg = "Anormal data !! " + str(self.returnType(info)) + " " + str(self.returnMark(info))
        elif (info[0] == "critical"):
            notificationMsg = "Kritik seviye !! " + str(self.returnType(info)) + " " + str(self.returnMark(info))
        else:
            pass
        self.dbYonetim.createNotification(notificationMsg)

    def createNotification(self, notificationMsg):
        timeStamp = int(time() * 1000)
        adr = ''
        ref = db.reference(adr)
        ref_ortam = ref.child('notification')
        ref_ortam.update({
            'data': notificationMsg,
            'timestamp': timeStamp,
            'flag': True
        })

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
        elif type == "6":
            return "humidity"
        elif (type == "7"):
            return "temperature"

    def returnMark(self, info):
        mark = info[3]
        if mark == "11":
            return "normal"
        elif mark == "12":
            return "low"
        elif mark == "13":
            return "high"
        elif mark == "14":
            return "abnormal"
