import { AdMobFree } from "@ionic-native/admob-free/ngx";

import { Component, ViewChild } from "@angular/core";
import { NavController, IonInfiniteScroll } from "@ionic/angular";
import { CategoryService } from "../../services/categoty.service";
import { SyncService } from "../../services/sync.service";
import { UserService } from "../../services/user.service";
import { PostService } from "../../services/post.service";
import { MediaService } from "../../services/media.service";
import { BookmarkService } from "../../services/bookmark.service";
import { NavigationExtras } from "@angular/router";
import { ConfigData } from "../../services/config";
import { DomSanitizer } from "@angular/platform-browser";
import { MenuController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";

import {
	InAppBrowser,
	InAppBrowserOptions
} from "@ionic-native/in-app-browser/ngx";

@Component({
	selector: "page-home",
	templateUrl: "home.html",
	styleUrls: ["home.scss"],
	providers: [
		CategoryService,
		UserService,
		SyncService,
		PostService,
		MediaService,
		BookmarkService,
		AdMobFree,
		InAppBrowser
	]
})
export class HomePage {
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	// categories: any = [];
	// postsRecentNews: any = [];
	// selectedCategory: any;
	// selectedItem: any;
	// postPageLoaded = 1;

	dataLoaded: Promise<boolean>;
	dataNotLoaded: Boolean;
	posts: any = [];
	postsInSlider: number;
	postsExtra: number;
	postsExtraAdd: number;

	constructor(
		// private admobFree: AdMobFree,
		public navCtrl: NavController,
		private domSanitizer: DomSanitizer,
		private syncService: SyncService,
		private categoryService: CategoryService,
		private postService: PostService,
		private mediaService: MediaService,
		private bookmarkService: BookmarkService,
		private http: HttpClient,
		private iab: InAppBrowser,
		private menu: MenuController
	) {
		this.dataNotLoaded = true;
		this.postsInSlider = 3;
		this.postsExtra = 10;
		this.postsExtraAdd = 10;

		// this.postPageLoaded = 1;
		// // this.showBannerAds();
		//
		// this.syncService.sync().subscribe(data => {
		//   this.categoryService.getCategories(1).subscribe((data: Array<any>) => {
		//     if (!data) {
		//       return;
		//     }
		//     this.categories = data.filter(item => {
		//       if (item.count == 0) return false;
		//       if (!ConfigData.enableExcludeFromMenu) return true;
		//       return ConfigData.excludeFromMenu[item.name.toLocaleLowerCase()];
		//     });
		//     if (this.categories && this.categories.length > 0) {
		//       this.refreshData(this.categories[0]);
		//     }
		//   });
		// });
	}

	openContentFilter() {
		this.menu.enable(true, "contentFilter");
		this.menu.open("contentFilter");
	}

	getSelectedPosts(first) {
		var sp = []; // Selected Posts
		if (first) {
			for (let i = 0; i < this.postsInSlider; i++) {
				sp.push(this.posts[i]);
			}
		} else {
			for (
				let i = this.postsInSlider;
				i <
				(this.posts.length < this.postsInSlider + this.postsExtra
					? this.posts.length
					: this.postsInSlider + this.postsExtra);
				i++
			) {
				sp.push(this.posts[i]);
			}
		}
		return sp;
	}

	ngOnInit() {
		this.http
			.get("https://mystic-api-test.herokuapp.com/articles")
			.subscribe(res => {
				this.posts = res;
				console.log("Posts", this.posts);
				this.dataNotLoaded = false;
				this.dataLoaded = Promise.resolve(true);
			});
	}

	getTimeString(time) {
		var date = new Date(time);
		var now = new Date();
		var diff = Math.floor((now.getTime() - date.getTime()) / 60000);
		if (diff < 60) {
			var r = Math.ceil(diff);
			return r + " minute" + (r == 1 ? "" : "s") + " ago";
		} else if (diff < 60 * 24) {
			var r = Math.ceil(diff / 60);
			return r + " hour" + (r == 1 ? "" : "s") + " ago";
		} else {
			var r = Math.floor(diff / (60 * 24));
			return r + " day" + (r == 1 ? "" : "s") + " ago";
		}
	}

	getImageURL(item) {
		var url = item.site_name;
		url = "assets/imgs/logos/" + this.replaceAll(url, " ", "_").toLowerCase() + ".jpg";
		console.log(item.site_name + ' : url : ' + url);
		return url;
	}

	replaceAll(str, find, replace) {
		return str.replace(new RegExp(find, 'g'), replace);
	}

	// showBannerAds() {
	//   if (!ConfigData.bannerAds.enable) {
	//     return;
	//   }
	//   this.admobFree.banner.config(ConfigData.bannerAds.config);
	//   this.admobFree.banner.prepare();
	// }

	getHtmlTitle(title) {
		if (title) {
			return this.domSanitizer.bypassSecurityTrustHtml(title);
		}
	}

	loadData(categoryId, event) {
		// for (let i = this.postsInSlider; i < (this.posts.length < this.postsInSlider + this.postsExtra ? this.posts.length : this.postsInSlider + this.postsExtra); i++) {
		//   sp.push(this.posts[i]);
		// }
		// this.postService
		//   .getPostListWithFilter(categoryId, this.postPageLoaded++)
		//   .subscribe((data: Array<any>) => {
		//     if (this.posts && this.posts.length == 0) {
		//       this.posts = data.slice(0, 3);
		//       if (data.length > 3) {
		//         this.postsRecentNews = this.postsRecentNews.concat(
		//           data.slice(3, data.length)
		//         );
		//       }
		//     } else {
		//       this.postsRecentNews = this.postsRecentNews.concat(data);
		//     }
		//
		//     if (event) {
		//       event.target.complete();
		//     }
		//
		//     this.posts.forEach(element => {
		//       element.bookmark = this.bookmarkService[element.id] ? true : false;
		//       if (element.mediaId) {
		//         this.mediaService.getItemById(element.mediaId).subscribe(media => {
		//           this.posts.forEach(element => {
		//             if (media["id"] === element["mediaId"]) {
		//               element.image = media["source_url"];
		//             }
		//           });
		//         });
		//       }
		//     });
		//
		//     this.postsRecentNews.forEach(element => {
		//       element.bookmark = this.bookmarkService[element.id] ? true : false;
		//       if (element.mediaId) {
		//         this.mediaService.getItemById(element.mediaId).subscribe(media => {
		//           this.postsRecentNews.forEach(element => {
		//             if (media["id"] === element["mediaId"]) {
		//               element.image = media["source_url"];
		//             }
		//           });
		//         });
		//       }
		//     });
		//   });
	}
	//
	// refreshData(category) {
	//   this.selectedItem = category.name;
	//   this.selectedCategory = category;
	//   this.postsRecentNews = [];
	//   this.posts = [];
	//   this.postPageLoaded = 1;
	//   this.loadData(category.id, null);
	// }
	//
	doInfinite(event) {
		if (
			this.postsExtra + this.postsExtraAdd >
			this.posts.length - this.postsInSlider
		) {
			this.postsExtra = this.posts.length - this.postsInSlider;
		} else {
			this.postsExtra += this.postsExtraAdd;
		}
		event.target.complete();
		//this.loadData(this.selectedCategory.id, event);
	}

	openPost(item) {
		// const navigationExtras: NavigationExtras = {
		//   queryParams: { item: JSON.stringify(item) }
		// };
		// this.navCtrl.navigateForward(["/single-page"], navigationExtras);
		const options: InAppBrowserOptions = {
			zoom: "no"
		};

		const browser = this.iab.create(item.url, "_self", options);
	}

	bookmark = (item, e) => {
		if (e) {
			e.stopPropagation();
		}
		if (item.bookmark) {
			item.bookmark = false;
			this.bookmarkService.delete(item);
		} else {
			item.bookmark = true;
			this.bookmarkService.save(item);
		}
	};
}
