# coding=utf-8
# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
from BildirimYonetim import BildirimYonetim
from DBYonetim import DBYonetim
from Manager import Manager
import serial

if __name__ == '__main__':
    abu = serial.Serial('COM3', 9600, timeout=1)
    dbManager = DBYonetim(abu)
    notificationManager = BildirimYonetim(dbManager)
    manager = Manager(dbManager, notificationManager)

    while True:
        manager.listenDBForMobile()
        abustr: str = abu.readline().decode().strip()
        abustr = str(abustr)

        if len(abustr) > 4:
            print("from abu")
            print(abustr)
            info = abustr.split("+")
            manager.seperateABUMsg(info)
