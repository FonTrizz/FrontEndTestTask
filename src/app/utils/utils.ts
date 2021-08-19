export type User = {
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
