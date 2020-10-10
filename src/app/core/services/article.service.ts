import { ArticleListRequest } from './../models/article/article-list-request';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchArticleDto } from '../models/article/search-article';
import { BookmarkedArticlesDto } from '../models/article/bookmark-article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constants: Constants = new Constants();
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = this.constants.url;
  }

  getArticleList(skipNumber) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('skipNumber', skipNumber);
    // return this.http.get<ArticleListRequest[]>(this.url + '/Article/AppArticleList', {
    return this.http.get<ArticleListRequest[]>(this.url + '/Article/ArticlesLazyLoadInMobile', {
      headers, params
    });
  }

  getArticleDetail(id) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('id', id);
    return this.http.get<ArticleListRequest>( this.url + '/Article/ArticleDetail', {
      headers, params
    });
  }

  increaseClapCount(articleDto: ArticleListRequest) {
    return this.http.post(this.url + '/Article/IncreaseClapCounts', articleDto);
  }

  getArticlesBySearchKeyword(searchArticleDto: SearchArticleDto) {
    return this.http.post<ArticleListRequest[]>(this.url + '/Article/SearchArticles', searchArticleDto);
  }

  saveBookMarkArticle(markDto: BookmarkedArticlesDto) {
    return this.http.post<boolean[]>(this.url + '/Article/SaveBookMarkArticle', markDto);
  }

  removeBookMarkArticle(markDto: BookmarkedArticlesDto) {
    return this.http.post<boolean[]>(this.url + '/Article/RemoveBookMarkArticle', markDto);
  }

  getSavedArticles(userId) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('userId', userId);
    // return this.http.get<ArticleListRequest[]>(this.url + '/Article/AppArticleList', {
    return this.http.get<ArticleListRequest[]>(this.url + '/Article/ShowBookMarkedArticles', {
      headers, params
    });
  }
}
