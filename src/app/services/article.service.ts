import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../entities/article';
import { Page } from '../structures/page';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAll(keyword: string | null, username: string | null, page: number | null, size: number | null): Observable<Page<Article>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let httpParams = new HttpParams()
    if (keyword != null) {
      // HttpParamsは不変なので再代入の形を取る
      httpParams = httpParams.append('keyword', keyword);
    }
    if (username != null) {
      // HttpParamsは不変なので再代入の形を取る
      httpParams = httpParams.append('username', username);
    }
    if (page != null) {
      httpParams = httpParams.append('page', page);
    }
    if (size != null) {
      httpParams = httpParams.append('size', size);
    }
    let url = '/api/articles';
    let queryString = httpParams.toString();
    if (queryString !== '') {
      url = url.concat('?').concat(queryString);
    }
    return this.http.get<Page<Article>>(url);
  }

  get(id: string): Observable<Article> {
    return this.http.get<Article>('/api/article/'.concat(id));
  }
}