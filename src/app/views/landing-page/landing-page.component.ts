import { AuthenticationService } from './../../core/services/authentication.service';
import { NavbarService } from './../../core/services/shared_services/navbar.service';
import { Constants } from './../../shared/constants';
import { BookmarkedArticlesDto } from './../../core/models/article/bookmark-article';
import { SearchArticleDto } from './../../core/models/article/search-article';
import { ArticleListRequest } from './../../core/models/article/article-list-request';
import { ArticleService } from './../../core/services/article.service';
import { Component, OnInit, OnDestroy, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { AdMobFreeBannerConfig, AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Platform, NavController, AlertController, ToastController, IonContent } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  articleLists: ArticleListRequest[] = [];
  // backUpArticleLists: ArticleListRequest[] = [];
  articleListsAfterScroll: ArticleListRequest[] = [];
  articleDto: ArticleListRequest = new ArticleListRequest();
  searchDto: SearchArticleDto = new SearchArticleDto();
  bookmarkDto: BookmarkedArticlesDto = new BookmarkedArticlesDto();
  loading = true;
  spinnerLoading = false;
  skipNumber = 0;
  title = '';
  articleActive = true;
  onWhichPage = 'article';
  constants: Constants = new Constants();
  private scrollDepthTriggered = false;
  isBookmarkIconClicked = false;
  // private ngNavigatorShareService: NgNavigatorShareService;
  // public isDesktopvar = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  isShowScrollTop: boolean;

  constructor(
    private platform: Platform,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta,
    public nav: NavbarService,
    private socialSharing: SocialSharing,
    // private network: Network,
    private dialogs: Dialogs,
    private admobFree: AdMobFree,
    private navCtrl: NavController,
    public authenticationService: AuthenticationService,
    public alertController: AlertController,
    public toastController: ToastController,
    private keyboard: Keyboard
  ) {
    platform.ready().then(() => {

    });
  }

  ngOnInit() {
    this.articleService
      .getArticleList()
      .pipe(first())
      .subscribe(data => {
        this.articleLists = data;
        this.loading = false;
      });
    // window.addEventListener('scroll', this.scroll, true);

    this.metaTagService.updateTag(
      // tslint:disable-next-line: max-line-length
      { name: 'robots', content: 'noindex' }
    );
  }

  scrollToTop() {
    this.content.scrollToTop(1500);
  }
}

