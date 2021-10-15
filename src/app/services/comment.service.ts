import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../entities/article';
import { ArticleComment } from '../entities/article-comment';
import { Page } from '../structures/page';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  get(id: string): Observable<ArticleComment[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let httpParams = new HttpParams({ fromObject: { id: id } })
    return this.http.get<ArticleComment[]>('/api/article-comments?'.concat(httpParams.toString()));
  }

  post(articleId: string, handlename: string, content: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let httpParams = new HttpParams({ fromObject: { articleId: articleId, handlename: handlename, content: content } })
    return this.http.post(
      '/api/comment/post',
      httpParams.toString(),
      httpOptions);
  }
}
