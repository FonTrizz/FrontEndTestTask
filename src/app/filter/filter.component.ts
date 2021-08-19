import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FilterValuesPipe} from "./filter-values.pipe";
import {User} from "../utils/utils";
import {HttpClient} from "@angular/common/http";
import {PossibleFilterName} from "./filter.types";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  possibleNames: string[] = [];
  users: User[] = [];
  selectedName = new FormControl();

  constructor(private httpService: HttpClient) {}

  ngOnInit(): void {
    const pipe = new FilterValuesPipe()
    this.httpService.get('./assets/test_users.json').subscribe(
      data => {
        this.users = (data as User[]).map((u, i) => ({...u, sourceOrder: i}));

        const possibleOptions = pipe.transform(this.users, [])
        this.possibleNames = possibleOptions.find(po => po.name === PossibleFilterName.Name)?.values as string[]
      }
    )
  }
}
