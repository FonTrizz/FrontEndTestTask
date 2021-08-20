import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {OnInit} from "@angular/core";
import {Sort} from "@angular/material/sort";
import {Filter} from "./filter/filter.types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = "FrontEndTestTask";
  users: User[] = [];
  filters: Filter[] = [];

  constructor(private httpService: HttpClient) {}

  onFiltersChanged(newFilters: Filter[]) {
    this.filters = newFilters;
  }


  ngOnInit(): void {
    this.httpService.get('./assets/test_users.json').subscribe(
      data => {
        this.users = (data as User[]).map((u, i) => ({...u, sourceOrder: i}));
      }
    )
    throw new Error('Method not implemented.');
  }
}

type User = {
  id: string,
  sourceOrder: number,
  name: string,
  age: number,
  gender: string,
  department: string,
  address: {
    city: string,
    street: string
  }
}
