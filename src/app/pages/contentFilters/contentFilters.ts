import { Component, ViewChild } from "@angular/core";
import { NavController, IonInfiniteScroll } from "@ionic/angular";
// import { ContentFiltersService } from "../../services/categoty.service";
import { NavigationExtras } from "@angular/router";
import { ConfigData } from "../../services/config";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: "page-contentFilters",
	templateUrl: "contentFilters.html",
	styleUrls: ["contentFilters.scss"]
	// providers: [ContentFiltersService]
})
export class ContentFiltersPage {
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	categories: any = [];
	contentFiltersPageLoaded = 1;

	constructor(
		public navCtrl: NavController,
		// private contentFiltersService: ContentFiltersService,
		private domSanitizer: DomSanitizer
	) {
		// this.loadCategories(null);
	}
}

// openContentFilters(contentFilters) {
// 	const navigationExtras: NavigationExtras = {
// 		queryParams: { id: contentFilters.id }
// 	};
// 	this.navCtrl.navigateForward(["/recent-news"], navigationExtras);
// }

// getHtmlTitle(title) {
// 	if (title) {
// 		return this.domSanitizer.bypassSecurityTrustHtml(title);
// 	}
// }

// doInfinite(event) {
// 	this.loadCategories(event);
// }

// loadCategories(event) {
// 	this.contentFiltersService
// 		.getCategories(this.contentFiltersPageLoaded++)
// 		.subscribe((data: Array<any>) => {
// 			if (data) {
// 				let newData = data.filter(item => {
// 					if (item.count == 0) return false;
// 					if (!ConfigData.enableExcludeFromMenu) return true;
// 					return ConfigData.excludeFromMenu[item.name.toLocaleLowerCase()];
// 				});
// 				if (newData && newData.length > 0) {
// 					this.categories = this.categories.concat(newData);
// 				}
// 			}
// 			if (event) {
// 				event.target.complete();
// 			}
// 		});
// }