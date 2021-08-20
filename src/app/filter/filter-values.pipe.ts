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
        return '' + (u as any)[key] === '' + filter.value
      }
    }

    const ageCondition = prepareCondition(PossibleFilterName.Age)
    const nameCondition = prepareCondition(PossibleFilterName.Name)
    const departmentCondition = prepareCondition(PossibleFilterName.Department)
    const genderCondition = prepareCondition(PossibleFilterName.Gender)
    const cityCondition = prepareCondition(PossibleFilterName.City)
    const conditions = [ageCondition, nameCondition, departmentCondition, genderCondition, cityCondition]
    const possibleUsers = users.filter(u => conditions.every(c => c(u)))

    const calculateUniqueOptions = (options: string[] | number[]) => {
      const uniqueMap: Record<string | number, number> = {}
      options.forEach(o => {
        if (!uniqueMap[o]) {
          uniqueMap[o] = 0
        }

        uniqueMap[o]++
      })

      return uniqueMap
    }

    const userNames = calculateUniqueOptions(possibleUsers.map(pu => pu.name))
    const userAges = calculateUniqueOptions(possibleUsers.map(pu => pu.age))
    const userDepts = calculateUniqueOptions(possibleUsers.map(pu => pu.department))
    const userGenders = calculateUniqueOptions(possibleUsers.map(pu => pu.gender))
    const userCities = calculateUniqueOptions(possibleUsers.map(pu => pu.address.city))


    return [
      {
        name: PossibleFilterName.Name,
        values: Object.keys(userNames).map(un => ({optionName: un, count: userNames[un]}))
      },
      {
        name: PossibleFilterName.City,
        values: Object.keys(userCities).map(uc => ({optionName: uc, count: userCities[uc]}))
      },
      {
        name: PossibleFilterName.Gender,
        values: Object.keys(userGenders).map(ug => ({optionName: ug, count: userGenders[ug]}))
      },
      {name: PossibleFilterName.Age, values: Object.keys(userAges).map(ua => ({optionName: ua, count: userAges[ua]}))},
      {
        name: PossibleFilterName.Department,
        values: Object.keys(userDepts).map(ud => ({optionName: ud, count: userDepts[ud]}))
      }
    ]
  }
}
