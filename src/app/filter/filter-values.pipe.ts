import {Pipe, PipeTransform} from '@angular/core';
import {Filter, PossibleFilterName, PossibleOptions} from "./filter.types";
import {User} from "../utils/utils";

@Pipe({
  name: 'filterValues'
})


export class FilterValuesPipe implements PipeTransform {

  transform(users: User[], filters: Filter[]): PossibleOptions[] {
    const prepareCondition = (key: PossibleFilterName) => {
      return (u: User): Boolean => {
        const filter = filters.find(f => f.name === key)
        if (!filter) return true

        if (key === PossibleFilterName.City) return u.address.city === filter.value
        return (u as any)[key] === filter.value
      }
    }

    const ageCondition = prepareCondition(PossibleFilterName.Age)
    const nameCondition = prepareCondition(PossibleFilterName.Name)
    const departmentCondition = prepareCondition(PossibleFilterName.Department)
    const genderCondition = prepareCondition(PossibleFilterName.Gender)
    const cityCondition = prepareCondition(PossibleFilterName.City)
    const conditions = [ageCondition, nameCondition, departmentCondition, genderCondition, cityCondition]
    const possibleUsers = users.filter(u => conditions.every(c => c(u)))

    const userNames = Array.from(new Set(possibleUsers.map(pu => pu.name)))
    const userAges = Array.from(new Set(possibleUsers.map(pu => pu.age)))
    const userDepts = Array.from(new Set(possibleUsers.map(pu => pu.department)))
    const userGenders = Array.from(new Set(possibleUsers.map(pu => pu.gender)))
    const userCities = Array.from(new Set(possibleUsers.map(pu => pu.address.city)))

    return [
      {name: PossibleFilterName.Name, values: userNames},
      {name: PossibleFilterName.City, values: userCities},
      {name: PossibleFilterName.Gender, values: userGenders},
      {name: PossibleFilterName.Age, values: userAges},
      {name: PossibleFilterName.Department, values: userDepts}
    ]
  }
}
