// TypeScript type definition
interface User {
  id: number;
  email: string;
  age: number;
}

// This looks correct at compile time
function createUserTS(userData: User): User {
  return userData;
}

// This will compile fine since the types match
const validUser = createUserTS({
  id: 1,
  email: "user@example.com",
  age: 25,
});

// This will cause a compile-time error (uncomment to see)
/*
const invalidTypeUser = createUserTS({
  id: "1", // Type error: string is not assignable to number
  email: "user@example.com",
  age: 25
});
*/

// But this will NOT be caught at runtime - types are erased
const userFromAPI = JSON.parse(
  '{"id": "1", "email": "notanemail", "age": "twenty"}'
);
const problematicUser = createUserTS(userFromAPI as User); // No runtime error!

console.log("TypeScript validation doesn't run at runtime:");
console.log(problematicUser); // Will contain invalid data: age is a string, email is not validated

// TypeScript can't validate:
// 1. Runtime data from API/JSON
// 2. Complex validations (email format, age minimum, etc.)
// 3. Partial data
