export enum PossibleFilterName {
  Name = 'name',
  Age = 'age',
  Gender = 'gender',
  Department = 'department',
  City = 'city'
}

export type Filter = {
  name: PossibleFilterName
  value: string | number
}

export type PossibleOptions = {
  name: PossibleFilterName,
  values: { optionName: string | number, count: number }[]
}
