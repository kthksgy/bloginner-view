import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/entities/article';
import { ArticleComment } from 'src/app/entities/article-comment';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  id!: string;
  article!: Article;
  comments!: ArticleComment[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private commentService: CommentService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id == null) {
      this.router.navigate(['/']);
    } else {
      this.id = id;
      this.refresh();
    }
  }

  refresh() {
    this.articleService.get(this.id).subscribe(
      next => {
        this.article = next;
      }
    );
    this.refreshComments();
  }

  refreshComments() {
    this.commentService.get(this.id).subscribe(
      next => {
        console.log(next);
        this.comments = next;
      }
    );
  }

  onCommentSubmission() {
    this.refreshComments();
  }

}
