import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/entities/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  articles!: Article[];
  length: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      next => {
        console.log(next);
        this.refresh(next.keyword, next.username, this.pageIndex, this.pageSize);
      }
    );
  }

  refresh(keyword: string | null, username: string | null, page: number | null, size: number | null): void {
    this.articleService.getAll(keyword, username, page, size).subscribe(
      next => {
        this.articles = next.content;
        this.length = next.totalElements;
        this.pageIndex = next.number;
        this.pageSize = next.size;
        console.log(next);
      }
    );
  }

  page(event: PageEvent) {
    this.route.queryParams.subscribe(
      next => {
        this.refresh(next.keyword, next.username, event.pageIndex, event.pageSize);
      }
    );
  }

  readMore(id: string) {
    this.router.navigate([`/${id}`]);
  }
}
