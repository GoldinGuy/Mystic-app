import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookmarkService } from '../../services/bookmark.service';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'news-item-home',
  templateUrl: 'news-item-home.html',
  styleUrls: ['news-item-home.scss'],
  providers:[BookmarkService]
})

export class NewsItemHomePage {
  @Input('data') data: any;

  constructor(private navCtrl: NavController, private bookmarkService: BookmarkService) {}

  bookmark = (item, event) => {
    if (event) {
      event.stopPropagation();
    }
    if (item.bookmark) {
      item.bookmark = false;
      this.bookmarkService.delete(item);
    } else {
      item.bookmark = true;
      this.bookmarkService.save(item);
    }
  }

  getTimeString(time) {
    var date = new Date(time);
    var now = new Date();
    var diff = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diff < 60) {
      var r = Math.ceil(diff)
      return r + " minute" + (r == 1 ? "" : "s") + " ago"
    } else if (diff < 60 * 24) {
      var r = Math.ceil(diff / 60)
      return r + " hour" + (r == 1 ? "" : "s") + " ago"
    } else {
      var r = Math.floor(diff / (60 * 24))
      return r + " day" + (r == 1 ? "" : "s") + " ago"
    }
  }

  openSinglePost(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.navCtrl.navigateForward(['/single-page'], navigationExtras);
  }
}
