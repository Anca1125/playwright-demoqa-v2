export const validUser = {
  firstName: "Anca",
  lastName: "Test",
  email: "anca@test.com",
  mobile: "0987654321",
  gender: "Female",
  DOB: "25 May 1990",
  subjects: "Physics",
  hobbies: "Reading",
  picture: "test-data/testFile.txt",
  address: "Botosani",
  state: "NCR",
  city: "Delhi",
} as const;

export const invalidUser = {
  firstName: "Anca",
  lastName: "Test",
  email: "anca.test,com",
  mobile: "123",
  gender: "Female",
  DOB: "25 May,1990",
  subjects: "Maths",
  hobbies: "Reading",
  picture: "test-data/testFile.txt",
  address: "Botosani",
  state: "NCR",
  city: "Delhi",
} as const;
