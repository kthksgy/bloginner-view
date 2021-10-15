import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() articleId!: string;
  @Output() onSubmit = new EventEmitter();
  constructor(private fb: FormBuilder, private commentService: CommentService) { }

  commentForm = this.fb.group({
    handlename: [''],
    content: ['']
  });

  ngOnInit(): void {
  }

  submit() {
    if (this.commentForm.value.handlename != null && this.commentForm.value.content != null) {
      this.commentService.post(this.articleId, this.commentForm.value.handlename, this.commentForm.value.content).subscribe(
        next => {
          this.commentForm.reset();
          this.onSubmit.emit();
        }
      );
    }
  }
}
