import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  title: string = 'タイトル';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private info: InfoService) { }

  ngOnInit(): void {
    this.info.getTitle().subscribe(
      next => {
        this.title = next.title;
      }
    );
  }

  search(keyword: string) {
    let username = this.route.snapshot.queryParamMap.get('username');
    let params = {keyword: keyword};
    if(username != null) {
      let params = {keyword: keyword, username: username};
    }
    this.router.navigate(['/'], { queryParams: params });
  }

}
