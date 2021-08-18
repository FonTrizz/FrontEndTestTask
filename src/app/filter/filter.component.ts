import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  nameFilter = new FormControl('');
  ageFilter = new FormControl(0);
  genderFilter = new FormControl('');
  departmentFilter = new FormControl('');
  cityFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  filterValues = {
    name: '',
    age: 0,
    gender: '',
    department: '',
    city: '',
  };
  users: User[] = [];
  constructor() {
    this.dataSource.data = this.users;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {

    this.nameFilter.valueChanges.subscribe(
      name => {
        this.filterValues.name = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );

    this.ageFilter.valueChanges.subscribe(
      age => {
        this.filterValues.age = age;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );

    this.genderFilter.valueChanges.subscribe(
      gender => {
        this.filterValues.gender = gender;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );

    this.departmentFilter.valueChanges.subscribe(
      dept => {
        this.filterValues.department = dept;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );

    this.cityFilter.valueChanges.subscribe(
      city => {
        this.filterValues.city = city;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );

  }
  createFilter(): (data: any, filter: string) => boolean {
    return function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    };
  }

}

type User = {
  id: string,
  name: string,
  age: number,
  gender: string,
  department: string,
  address: {
    city: string,
    street: string
  }
}

