import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {OnInit} from "@angular/core";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = "FrontEndTestTask";
  users: User[] = [];

  constructor(private httpService: HttpClient) {}

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.users = this.users.sort((a,b) => compare(a.sourceOrder, b.sourceOrder, true));
      return;
    }
    this.users = this.users.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active){
        case 'name': return compare(a.name, b.name, isAsc);
        case 'age': return compare(a.age, b.age, isAsc);
        case 'gender': return compare(a.gender, b.gender, isAsc);
        case 'dept': return compare(a.department, b.department, isAsc);
        case 'address': return compare(a.address.city, b.address.city, isAsc);
        default: return 0;
      }
    })
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
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
