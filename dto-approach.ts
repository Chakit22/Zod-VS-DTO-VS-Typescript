// DTO (Data Transfer Object) approach
class UserDTO {
  id: number;
  email: string;
  age: number;

  constructor(data: any) {
    // Manual validation in constructor
    if (typeof data.id !== "number") {
      throw new Error("Invalid id: must be a number");
    }
    this.id = data.id;

    if (typeof data.email !== "string") {
      throw new Error("Invalid email: must be a string");
    }
    // Basic email validation
    if (!data.email.includes("@")) {
      throw new Error("Invalid email format");
    }
    this.email = data.email;

    if (typeof data.age !== "number") {
      throw new Error("Invalid age: must be a number");
    }
    if (data.age < 0 || data.age > 120) {
      throw new Error("Invalid age: must be between 0 and 120");
    }
    this.age = data.age;
  }
}

function createUserDTO(userData: any): UserDTO {
  // Wrapping in try/catch to handle validation errors
  try {
    return new UserDTO(userData);
  } catch (error: any) {
    console.error("Validation error:", error.message);
    throw error;
  }
}

// This works fine
try {
  const validUser = createUserDTO({
    id: 1,
    email: "user@example.com",
    age: 25,
  });
  console.log("Valid user:", validUser);
} catch (error: any) {
  // Won't reach this
}

// This will catch the runtime error
try {
  const userFromAPI = JSON.parse(
    '{"id": 1, "email": "notanemail", "age": "twenty"}'
  );
  const problematicUser = createUserDTO(userFromAPI);
} catch (error: any) {
  console.log("DTO validation caught the error:", error.message);
}

// Problems with DTO approach:
// 1. Verbose manual validation code
// 2. Error handling logic is scattered
// 3. No standard way to validate complex objects/arrays
// 4. Validation rules are not easily reusable
// 5. No type inference for validated data
