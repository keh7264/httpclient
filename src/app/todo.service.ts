import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Todo } from './todo.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  // 서버에 새로운 todo의 추가를 요청한다.
  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  // 서버에 새로운 todo의 추가를 요청한다.
  add(content: string): Observable<Todo> {
    /* 서버로 전송할 요청 페이로드
       id는 json-server에 의해 자동 생성된다 */
    const payload = { content, completed: false };

    return this.http.post<Todo>(this.url, payload)
      .pipe(catchError(this.handleError));
  }

  // 에러 핸들러 함수
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
