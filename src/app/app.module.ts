import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from "@angular/material/sort";
import { FilterComponent } from './filter/filter.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import { TableComponent } from './table/table.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {FilterValuesPipe} from "./filter/filter-values.pipe";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    TableComponent,
    FilterValuesPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
