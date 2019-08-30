import { OneSignalConfig } from "./../services/one.signal.service";
import { Component } from "@angular/core";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ConfigData } from "../services/config";
import { BookmarkService } from "../services/bookmark.service";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"]
})
export class AppComponent {
	public appPages = [];
	headerMenuItem = {};

	rootPage: any = "HomePage";
	pages: Array<{ title: string; component: any; icon: string; url: string }>;
	isPushNotificationEnabled: boolean = true;

	constructor(
		private oneSignal: OneSignal,
		private navController: NavController,
		private bookmark: BookmarkService,
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen
	) {
		this.initializeApp();

		//Change Color StatusBar
		// this.statusBar.backgroundColorByName("white");
		this.statusBar.styleBlackTranslucent();
		// used for an example of ngFor and navigation
		this.pages = [
			{ title: "Home", component: "HomePage", icon: "book", url: "home" },
			{
				title: "Category",
				component: "CategoryPage",
				icon: "list-box",
				url: "category"
			},
			{
				title: "Bookmark",
				component: "BookmarkPage",
				icon: "bookmark",
				url: "bookmark"
			},
			{
				title: "About",
				component: "AboutPage",
				icon: "ios-flag",
				url: "about"
			},
			{
				title: "Settings",
				component: "settings",
				icon: "settings",
				url: "settings"
			}
		];
	}

	initializeApp() {
		let self = this;
		this.platform.ready().then(() => {
			// Uncomment this code fore prodaction

			// this.bookmark
			// .readFromFile()
			// .then(data => {
			//   if (window['cache']) {
			//     window['cache'].clear(() => {
			//       console.log('success')
			//       self.resetData(data)
			//     }, () => {
			//       console.log('err')
			//       self.resetData(data)
			//     });
			//     window['cache'].cleartemp();
			//   } else {
			//     self.defaultLoad();
			//   }
			// });

			self.defaultLoad();
		});
	}

	resetData(data) {
		let settingsObject = JSON.parse(data);
		if (settingsObject.isLightColorSelected) {
			localStorage.setItem(
				"isLightColorSelected",
				settingsObject.isLightColorSelected + ""
			);
		} else {
			localStorage.setItem("isLightColorSelected", "true");
		}
		if (settingsObject.isPushNotificationEnabled) {
			localStorage.setItem(
				"isPushNotificationEnabled",
				settingsObject.isPushNotificationEnabled + ""
			);
		} else {
			localStorage.setItem("isPushNotificationEnabled", "true");
		}
		if (settingsObject.isRTLEnabled) {
			localStorage.setItem("isRTLEnabled", settingsObject.isRTLEnabled + "");
		} else {
			localStorage.setItem("isRTLEnabled", "false");
		}

		localStorage.setItem("bookmark", settingsObject.bookmark + "");
		this.defaultLoad();
	}

	defaultLoad() {
		if (localStorage.getItem("isRTLEnabled") == "true") {
			document.getElementsByTagName("ion-menu")[0].setAttribute("side", "end");
			document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
		}
		if (!localStorage.getItem("isLightColorSelected")) {
			localStorage.setItem("isLightColorSelected", "true");
		} else {
			let isLightColorSelected =
				localStorage.getItem("isLightColorSelected") == "true";
			let theme = isLightColorSelected ? "colorLight" : "colorDark";
			document.getElementsByTagName("body")[0].setAttribute("class", theme);
		}

		this.statusBar.styleDefault();
		this.splashScreen.hide();
		if (
			ConfigData.oneSignal &&
			ConfigData.oneSignal.appID &&
			ConfigData.oneSignal.googleProjectId
		) {
			this.oneSignal.startInit(
				ConfigData.oneSignal.appID,
				ConfigData.oneSignal.googleProjectId
			);
			this.oneSignal.inFocusDisplaying(
				this.oneSignal.OSInFocusDisplayOption.Notification
			);
			this.oneSignal.endInit();
		}
		let pushNotificationEnabledStorageValue = localStorage.getItem(
			"isPushNotificationEnabled"
		);
		if (!pushNotificationEnabledStorageValue) {
			localStorage.setItem("isPushNotificationEnabled", "true");
			pushNotificationEnabledStorageValue = "true";
		}
		this.oneSignal.setSubscription(this.isPushNotificationEnabled);
	}

	openPage(page) {
		this.navController.navigateForward([page.url], {});
	}
}
