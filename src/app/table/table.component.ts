import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSort, Sort} from "@angular/material/sort";
import {Filter, PossibleFilterName} from "../filter/filter.types";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  _filters: Filter[] = [];
  users: User[] = [];
  sourceUsers: User[] = [];
  sort: Sort = {active: '', direction: ''};

  constructor(private httpService: HttpClient) {
  }

  filterData() {
    const conditions: ((u: User) => Boolean)[] = []

    this._filters.forEach(f => {
      switch (f.name) {
        case PossibleFilterName.Name:
          conditions.push((u: User) => u.name === f.value)
          break;
        case PossibleFilterName.Age:
          conditions.push((u: User) => u.age === +f.value)
          break;
        case PossibleFilterName.Gender:
          conditions.push((u: User) => u.gender === f.value)
          break;
        case PossibleFilterName.City:
          conditions.push((u: User) => u.address.city === f.value)
          break;
        case PossibleFilterName.Department:
          conditions.push((u: User) => u.department === f.value)
          break;
      }
    })

    this.users = this.sourceUsers.filter(su => conditions.every(c => c(su)))
    this.sortData(this.sort);
  };

   sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.users = this.users.sort((a, b) => compare(a.sourceOrder, b.sourceOrder, true));
      return;
    }
    this.users = this.users.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'age':
          return compare(a.age, b.age, isAsc);
        case 'gender':
          return compare(a.gender, b.gender, isAsc);
        case 'dept':
          return compare(a.department, b.department, isAsc);
        case 'address':
          return compare(a.address.city, b.address.city, isAsc);
        default:
          return 0;
      }
    })
     this.sort = sort;
  }

  @Input()
  set filters(newFilters: Filter[]) {
    console.log(`Filters changed from ${JSON.stringify(this._filters)} into ${JSON.stringify(newFilters)}`)
    this._filters = newFilters;
    this.filterData()
  }

  ngOnInit(): void {
    this.httpService.get('./assets/test_users.json').subscribe(
      data => {
        this.users = (data as User[]).map((u, i) => ({...u, sourceOrder: i}));
        this.sourceUsers = (data as User[]).map((u, i) => ({...u, sourceOrder: i}));
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
