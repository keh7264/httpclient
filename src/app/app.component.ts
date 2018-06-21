import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';


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
  content: string;


  constructor(private todo: TodoService) { }

  ngOnInit() {
    this.todo.getAll().subscribe(
      todos => this.todos = todos,
      error => console.error('[TodoService.getAll]', error)
    );

  }


  addTodo() {
    if (!this.content) { return; }

    this.todo.add(this.content).subscribe(
      todo => this.todos = [...this.todos, todo],
      error => console.error('[TodoService.add]', error)
    );

    this.content = '';
  }


}
