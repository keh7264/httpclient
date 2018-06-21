import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

interface ErrorMessage {
  title: string;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[];
  error: ErrorMessage;
  content: string;

  url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTodos().subscribe(todos => this.todos = todos);

    // const headers = new HttpHeaders()
    //   .set('Content-type', 'application/json')
    //   .set('Authorization', 'my-auth-token');

    /* HttpHeaders 클래스는 아래의 방법도 유효하다.
      const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
      });
    */

    // const params = new HttpParams()
    //   .set('id', '1').set('completed', 'false');

    // this.http.get<Todo[]>(this.url, { headers, params })
    //   .subscribe(todos => this.todos = todos);

    // non-json data 요청시
    // this.http.get('/textfile.txt', { responseType: 'text' })
    //   .subscribe(data => console.log(data));

    // this.http.get<Todo[]>(this.url)
    //   .pipe(
    //     catchError(this.handleError)
    //   ).subscribe(
    //     todos => this.todos = todos,
    //     (error: ErrorMessage) => this.error = error);
  }

  add() {
    if (!this.content) { return; }

    this.addTodo().subscribe(todo => this.todos = [...this.todos, todo]);

    this.content = '';
  }

  private getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  private addTodo(): Observable<Todo> {
    const payload = { content: this.content, completed: false };
    return this.http.post<Todo>(this.url, payload);
  }

  private handleError(error: HttpErrorResponse) {
    let message = '';

    if (error.error instanceof ErrorEvent) {
      // 클라이언트 측의 에러
      console.error(`Client-side error : ${error.error.message}`);
      message = error.error.message;
    } else {
      // 백엔드 측의 에러
      console.error(`Server-side error: ${error.status}`);
      message = error.message;
    }

    return throwError({
      title: 'Something wrong! please try again later.',
      message
    });
  }
}
