import { Constants } from './../../shared/constants';
import { ArticleListRequest } from './../models/article/article-list-request';
import { Injectable } from '@angular/core';
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

  getArticleList() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // return this.http.get<ArticleListRequest[]>(this.url + '/Article/AppArticleList', {
    return this.http.get<ArticleListRequest[]>(this.url , {
      headers
    });
  }
}
