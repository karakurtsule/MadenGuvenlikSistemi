from BildirimYonetim import BildirimYonetim
from DBYonetim import DBYonetim


class Manager:

    def __init__(self, dbYonetim, bildirimYonetim):
        self.flag = True
        self.dbYonetim = dbYonetim
        self.bildirimYonetim = bildirimYonetim

    def seperateABUMsg(self, info):
        if info[0] == "critical":
            self.dbYonetim.createLogMsg(info)
            self.dbYonetim.addToDB(info)
            self.bildirimYonetim.createNotificationMsg(info)

        elif info[0] == "abnormal":
            self.dbYonetim.createLogMsg(info)
            self.dbYonetim.addToDB(info)
            self.bildirimYonetim.createNotificationMsg(info)

        elif info[0] == "timer":
            self.dbYonetim.createLogMsg(info)
            self.dbYonetim.addToDB(info)

        elif info[0] == "alarm":
            self.dbYonetim.setAlarm(info[1])

        elif info[0] == "fan":
            self.dbYonetim.setFan(info[1])

    def listenDBForMobile(self):
        self.dbYonetim.dBListener()
