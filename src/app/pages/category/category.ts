import { Component, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { CategoryService } from '../../services/categoty.service';
import { NavigationExtras } from '@angular/router';
import { ConfigData } from '../../services/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  styleUrls: ['category.scss'],
  providers:[CategoryService]
})
export class CategoryPage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  categories:any = [];
  categoryPageLoaded = 1;


  constructor(
    public navCtrl: NavController,
    private categoryService:CategoryService,
    private domSanitizer: DomSanitizer) {
      this.loadCategories(null);
  }

  openCategory(category) {
    const navigationExtras: NavigationExtras = {
      queryParams: { id: category.id }
    };
    this.navCtrl.navigateForward(['/recent-news'], navigationExtras);
  }

  getHtmlTitle(title) {
    if (title) {
        return this.domSanitizer.bypassSecurityTrustHtml(title)
    }
  }

  doInfinite(event) {
    this.loadCategories(event)
  }

  loadCategories(event) {
    this.categoryService
    .getCategories(this.categoryPageLoaded++)
    .subscribe((data: Array<any>) => {
      if (data) {
        let newData = data.filter(item => {
          if (item.count == 0) return false
          if (!ConfigData.enableExcludeFromMenu) return true
            return ConfigData.excludeFromMenu[item.name.toLocaleLowerCase()]
        })
        if (newData && newData.length > 0) {
          this.categories = this.categories.concat(newData);
        }
      }
      if (event) {
        event.target.complete();
      }
    });
  }
}
