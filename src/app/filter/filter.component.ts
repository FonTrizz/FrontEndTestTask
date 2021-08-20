import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FilterValuesPipe} from "./filter-values.pipe";
import {User} from "../utils/utils";
import {HttpClient} from "@angular/common/http";
import {Filter, PossibleFilterName} from "./filter.types";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  @Output() filtersChanged: EventEmitter<Filter[]> = new EventEmitter();

  names: Record<string, boolean> = {}
  ages: Record<string, boolean> = {}
  genders: Record<string, boolean> = {}
  departments: Record<string, boolean> = {}
  cities: Record<string, boolean> = {}

  optionResolver: FilterValuesPipe = new FilterValuesPipe()
  possibleNames: { optionName: string | number, count: number }[] = [];
  possibleAges: { optionName: string | number, count: number }[] = [];
  possibleGenders: { optionName: string | number, count: number }[] = [];
  possibleDepartments: { optionName: string | number, count: number }[] = [];
  possibleCities: { optionName: string | number, count: number }[] = [];
  users: User[] = [];
  filters: Filter[] = [];

  constructor(private httpService: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.httpService.get('./assets/test_users.json').subscribe(
      data => {
        this.users = (data as User[]).map((u, i) => ({...u, sourceOrder: i}));
        this.resolvePossibleOptions()
      }
    )
  }

  onCheckboxStateChange(checked: boolean, type: string, name: string | number) {
    const processChangeState = (bindings: Record<string, boolean>, filterName: PossibleFilterName) => {
      bindings[name] = checked;
      if (!checked) {
        this.filters = this.filters.filter(f => f.name !== filterName)
      } else {
        this.filters.push({name: filterName, value: name})
      }
    }

    switch (type) {
      case 'name':
        processChangeState(this.names, PossibleFilterName.Name);
        break;
      case 'age':
        processChangeState(this.ages, PossibleFilterName.Age);
        break;
      case 'gender':
        processChangeState(this.genders, PossibleFilterName.Gender);
        break;
      case 'department':
        processChangeState(this.departments, PossibleFilterName.Department);
        break;
      case 'city':
        processChangeState(this.cities, PossibleFilterName.City);
        break;
    }

    this.resolvePossibleOptions()
    this.filtersChanged.emit(this.filters.slice())
  }

  resolvePossibleOptions() {
    const possibleOptions = this.optionResolver.transform(this.users, this.filters)
    this.possibleNames = possibleOptions.find(po => po.name === PossibleFilterName.Name)?.values as { optionName: string | number, count: number }[]
    this.possibleAges = possibleOptions.find(po => po.name === PossibleFilterName.Age)?.values as { optionName: string | number, count: number }[]
    this.possibleGenders = possibleOptions.find(po => po.name === PossibleFilterName.Gender)?.values as { optionName: string | number, count: number }[]
    this.possibleDepartments = possibleOptions.find(po => po.name === PossibleFilterName.Department)?.values as { optionName: string | number, count: number }[]
    this.possibleCities = possibleOptions.find(po => po.name === PossibleFilterName.City)?.values as { optionName: string | number, count: number }[]
  }
}
