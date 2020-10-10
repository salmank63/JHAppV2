import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageBComponent } from './views/page-b/page-b.component';
import { PageAComponent } from './views/page-a/page-a.component';
import { PageCComponent } from './views/page-c/page-c.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ArticleService } from './core/services/article.service';
import { AuthenticationService } from './core/services/authentication.service';
import { NavbarService } from './core/services/shared_services/navbar.service';

@NgModule({
  declarations: [
    AppComponent,
    PageBComponent,
    PageAComponent,
    PageCComponent,
    LandingPageComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    SocialSharing,
    Network,
    Dialogs,
    Keyboard,
    ArticleService,
    AuthenticationService,
    NavbarService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
