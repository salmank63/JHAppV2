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
      // this.network.onDisconnect().subscribe(() => {
      //   this.dialogs.alert('Please check your Internet Connection and open app again');
      // });
      this.showBannerAd();
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

  goToArticleDetail(id, title, item: ArticleListRequest) {
    item.Views = item.Views + 1;
    this.router.navigate(['/articledetail', id]);
  }

  onEvent(event) {
    event.stopPropagation();
  }

  // onClapped(id, claps) {
  //   this.articleLists.find(x => x.Id === id).Claps = claps + 1;

  //   this.articleDto.Id = id;
  //   this.articleDto.Claps = claps + 1;
  //   this.articleService
  //     .increaseClapCount(this.articleDto)
  //     .pipe(first())
  //     .subscribe();
  // }

  underConstruction() {
    alert(
      'Share feature is under development. Please wait for some days till it becomes fully functional.'
    );
    event.preventDefault();
  }

  stopPropagation() {
    // event.preventDefault();
    return false;
  }

  async shareArticle(item: any) {
      // tslint:disable-next-line: deprecation
      event.stopPropagation();
      // tslint:disable-next-line: deprecation
      event.preventDefault();
      try {
        let slug = '';
        const specialChars = /[^\w\s]/gi;
        const re = / /gi;
        slug = item.SeoTitle.replace(specialChars, '');
        slug = slug.replace(/  /gi, ' ');
        slug = slug.replace(re, '-');

        const options = {
          message: item.ArticleHeading + '.\n\n',
          subject: item.ArticleHeading,
          url: 'https://www.jugaadhai.in/#/articledetail/' + item.Id + '/' + slug,
        };
        this.socialSharing.shareWithOptions(options);
      } catch (error) {
        console.log(error);
        // tslint:disable-next-line: deprecation
        event.preventDefault();
      }
  }

  showBannerAd() {
    const bannerConfig: AdMobFreeBannerConfig = {
      isTesting: this.constants.isTesting, // Remove in production
      autoShow: true,
      id: this.constants.bannerAdId,
      size: 'BANNER'
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
        // success
    }).catch(e => alert(e));
  }

  makeActive(page: string) {
    if (page !== this.onWhichPage) {
      this.nav.selectedIndex('deals');
      this.navCtrl.navigateForward('deals');
      // this.router.navigate(['/deals'], {replaceUrl: true});
    }
  }

  async scrollView($event) {
    if (this.scrollDepthTriggered) {
      return;
    }
    const scrollElement = await $event.target.getScrollElement();
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;

    const currentScrollDepth = $event.detail.scrollTop;
    const targetPercent = 80;
    const triggerDepth = ((scrollHeight / 100) * 90);

    // console.log(currentScrollDepth);

    if (currentScrollDepth > 2000) {
      this.isShowScrollTop = true;
    } else {
      this.isShowScrollTop = false;
    }

    // console.log(currentScrollDepth);
    // console.log(triggerDepth);
    if (currentScrollDepth > triggerDepth) {
      this.scrollDepthTriggered = true;
      if (this.searchDto.Keywords !== undefined && this.searchDto.Keywords !== null) {
        this.showDataAfterScrollBySearch();
      } else {
        this.showDataAfterScroll();
      }
      setTimeout(() => {
        this.scrollDepthTriggered = false;
      }, 1000);
    }
  }

  showDataAfterScroll() {
      this.spinnerLoading = true;
      this.skipNumber++;
      // console.log(this.skipNumber);
      this.articleService
        .getArticleList(this.skipNumber)
        .pipe(first())
        .subscribe(data => {
          this.articleListsAfterScroll = data;

          this.articleListsAfterScroll.forEach(x => {
            this.articleLists.push({
              Id: x.Id,
              ArticleHeading: x.ArticleHeading,
              LastModifiedOn: x.LastModifiedOn,
              MiniDetail: x.MiniDetail,
              ImageUrl: x.ImageUrl,
              Admin: x.Admin,
              Explanation: x.Explanation,
              AdminImage: x.AdminImage,
              AboutAdmin: x.AboutAdmin,
              ComImage: x.ComImage,
              Claps: x.Claps,
              Views: x.Views,
              SeoTitle: x.SeoTitle,
              SeoKeywords: x.SeoKeywords,
              LstComments: null,
              VideoId: x.VideoId,
              IsBookmark: x.IsBookmark
            });
          });
          this.spinnerLoading = false;
          // this.backUpArticleLists = this.articleLists;    // for keeping backup of article
          // setTimeout(() => {
          //   window.addEventListener('scroll', this.scroll, true);
          // }, 100);
        });
      // window.addEventListener('scroll', this.scroll, true);
  }

  showDataAfterScrollBySearch() {
    this.skipNumber++;
    // console.log(this.skipNumber);
    // console.log(this.searchDto.Keywords);
    this.searchDto.SkipNumber++;
    // console.log(this.searchDto.SkipNumber);
    this.articleService
      .getArticlesBySearchKeyword(this.searchDto)
      .pipe(first())
      .subscribe(data => {
        // this.articleLists = [];
        this.articleListsAfterScroll = data;

        this.articleListsAfterScroll.forEach(x => {
            this.articleLists.push(x);
          });
        // console.log(this.articleLists);
        this.loading = false;
      });
  }

  async filterList(evt) {
    this.loading = true;
    window.scrollTo(0, 0);
    this.searchDto.Keywords = evt.srcElement.value;
    console.log(evt.srcElement.value);

    this.articleService
      .getArticlesBySearchKeyword(this.searchDto)
      .pipe(first())
      .subscribe(data => {
        this.articleLists = data;
        this.loading = false;
        this.skipNumber = 0;
        this.searchDto.SkipNumber = 0;
        this.content.scrollToTop(1500);
        this.keyboard.hide();
      });
  }

  async filterListClear(evt) {
    this.loading = true;
    window.scrollTo(0, 0);
    this.searchDto.Keywords = '';
    console.log(evt.srcElement.value);

    this.articleService
      .getArticlesBySearchKeyword(this.searchDto)
      .pipe(first())
      .subscribe(data => {
        this.articleLists = data;
        this.loading = false;
        this.skipNumber = 0;
        this.searchDto.SkipNumber = 0;
        this.content.scrollToTop(1500);
        this.keyboard.hide();
      });
  }

  async filterListKeyboardCleared(evt) {
    // this.loading = true;
    window.scrollTo(0, 0);
    // console.log(evt.srcElement.value);
    if (evt.srcElement.value === '') {
      this.searchDto.Keywords = evt.srcElement.value;

      this.articleService
        .getArticlesBySearchKeyword(this.searchDto)
        .pipe(first())
        .subscribe(data => {
          this.articleLists = data;
          this.loading = false;
          this.skipNumber = 0;
          this.searchDto.SkipNumber = 0;
          this.content.scrollToTop(1500);
          this.keyboard.hide();
        });
    }
  }


  bookmarkArticle(id: number, isMarked: boolean) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser === null) {
      this.presentAlertConfirm();
      return;
    }

    if (isMarked) {
      this.bookmarkDto.ArticleId = id;
      this.bookmarkDto.UserId = currentUser.Id;

      this.articleService.removeBookMarkArticle(this.bookmarkDto)
        .pipe(first())
        .subscribe(result => {
          if (!result) {
            this.articleLists.find(x => x.Id === id).IsBookmark = false;
          } else {
            alert('Something went wrong');
          }
        });

    } else {
      this.bookmarkDto.ArticleId = id;
      this.bookmarkDto.UserId = currentUser.Id;

      this.articleService.saveBookMarkArticle(this.bookmarkDto)
        .pipe(first())
        .subscribe(result => {
          if (result) {
            this.articleLists.find(x => x.Id === id).IsBookmark = true;
            this.articleSavedToast();
          } else {
            alert('Something went wrong');
          }
        });
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Please Login Or Signup',
      message: 'You need to Login or Sign Up before saving any article.',
      buttons: [
        {
          text: 'Login',
          cssClass: 'secondary',
          handler: (blah) => {
            // this.nav.selectedIndex('login');
            this.router.navigate(['/login']);
          }
        }, {
          text: 'Sign Up',
          handler: () => {
            this.router.navigate(['/signup']);
          }
        }
      ]
    });

    await alert.present();
  }

  async articleSavedToast() {
    const toast = await this.toastController.create({
      // tslint:disable-next-line: max-line-length
      message: 'Article saved successfully',
      duration: 2500,
      cssClass: 'toastCustomization'
    });
    toast.present();
  }

  scrollToTop() {
    this.content.scrollToTop(1500);
  }
}

