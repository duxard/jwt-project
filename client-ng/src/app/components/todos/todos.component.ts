import { Component, OnInit } from '@angular/core';
import { TodosService } from './services/todos.service';
import { Item } from './services/Item';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Item[] = [];
  showError = false;
  loading = true;

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todosService.fetchTodos().subscribe(fetchedTodos => {
      this.todos = fetchedTodos;
      this.showError = false;
      this.loading = false;
    }, error => {
      console.log(error);
      this.showError = true;
      this.loading = false;
    });
  }
}
