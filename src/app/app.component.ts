import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[];
  url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  ngOnInit() {

    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', 'my-auth-token');

    /* HttpHeaders 클래스는 아래의 방법도 유효하다.
      const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
      });
    */

    const params = new HttpParams()
      .set('id', '1').set('completed', 'false');

    this.http.get<Todo[]>(this.url, { headers, params })
      .subscribe(todos => this.todos = todos);

    // non-json data 요청시
    // this.http.get('/textfile.txt', { responseType: 'text' })
    //   .subscribe(data => console.log(data));

  }
}
