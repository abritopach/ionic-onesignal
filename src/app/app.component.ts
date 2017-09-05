import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  static APP_ID: string = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
  static SENDER_ID: string = "XXXXXXXXXXXX";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private oneSignal: OneSignal,
              private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.handlerNotifications();

    });
  }

  private handlerNotifications() {

    this.oneSignal.startInit(MyApp.APP_ID, MyApp.SENDER_ID);

    this.oneSignal.handleNotificationOpened()
        .subscribe(jsonData => {
          let alert = this.alertCtrl.create({
            title: jsonData.notification.payload.title,
            subTitle: jsonData.notification.payload.body,
            buttons: ['OK']
          });
          alert.present();
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        });
    this.oneSignal.endInit();

  }
}

