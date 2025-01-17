import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
	{ path: "", redirectTo: "home", pathMatch: "full" },
	{
		path: "home",
		loadChildren: "../pages/home/home.module#HomePageModule"
	},
	{
		path: "category",
		loadChildren: "../pages/category/category.module#CategoryPageModule"
	},
	{
		path: "contentFilters",
		loadChildren:
			"../pages/contentFilters/contentFilters.module#ContentFiltersPageModule"
	},
	{
		path: "bookmark",
		loadChildren: "../pages/bookmark/bookmark.module#BookmarkPageModule"
	},
	{
		path: "events",
		loadChildren: "../pages/events/events.module#EventsPageModule"
	},
	{
		path: "tournaments",
		loadChildren:
			"../pages/events/tournaments/tournaments.module#TournamentsPageModule"
	},
	{
		path: "standings",
		loadChildren:
			"../pages/events/standings/standings.module#standingsPageModule"
	},
	{
		path: "about",
		loadChildren: "../pages/about/about.module#AboutPageModule"
	},
	{
		path: "settings",
		loadChildren: "../pages/settings/settings.module#SettingsPageModule"
	},
	{
		path: "recent-news",
		loadChildren: "../pages/recent-news/recent-news.module#RecentNewsPageModule"
	},
	{
		path: "recent-news",
		loadChildren: "../pages/recent-news/recent-news.module#RecentNewsPageModule"
	},
	{
		path: "single-page",
		loadChildren: "../pages/single-page/single-page.module#SinglePageModule"
	},
	{
		path: "form-page",
		loadChildren: "../pages/form/form.module#FormPageModule"
	},
	{
		path: "comment-page",
		loadChildren: "../pages/comments/comments.module#CommentsPageModule"
	}
	// {
	// 	path: "events",
	// 	children: [
	// 		{
	// 			path: "",
	// 			loadChildren: "../events/events.module#EventsPageModule"
	// 		},
	// 		{
	// 			path: "tournaments",
	// 			loadChildren:
	// 				"../events/tournaments/tournaments.module#TournamentsPageModule"
	// 		},
	// 		{
	// 			path: "standings",
	// 			loadChildren: "../events/standings/standings.module#standingsPageModule"
	// 		}
	// 	]
	// }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
