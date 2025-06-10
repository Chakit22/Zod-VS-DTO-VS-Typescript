// Zod approach
import { z } from "zod";

// 1. Define the schema (combines type definition AND validation rules)
const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(), // Built-in email validation
  age: z.number().int().positive().max(120), // Multiple validations chained
  role: z.enum(["user", "admin", "moderator"]).optional(), // Optional field with specific values
});

// 2. Derive TypeScript type from the schema (automatic)
type User = z.infer<typeof UserSchema>;

// 3. Function that uses the schema for validation
function createUserZod(userData: unknown): User {
  // Parse will throw if validation fails
  return UserSchema.parse(userData);
}

// This works fine
try {
  const validUser = createUserZod({
    id: 1,
    email: "user@example.com",
    age: 25,
  });
  console.log("Valid user:", validUser);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Validation errors:", error.errors);
  }
}

// This will catch runtime validation errors with detailed messages
try {
  const userFromAPI = JSON.parse(
    '{"id": 1, "email": "notanemail", "age": "twenty"}'
  );
  const problematicUser = createUserZod(userFromAPI);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Zod validation caught errors:");
    error.errors.forEach((err) => {
      console.log(`- ${err.path.join(".")}: ${err.message}`);
    });
  }
}

// Partial data validation (great for PATCH requests)
const UserUpdateSchema = UserSchema.partial();
type UserUpdate = z.infer<typeof UserUpdateSchema>;

function updateUser(userId: number, updates: unknown): UserUpdate {
  return UserUpdateSchema.parse(updates);
}

// Validates partial data
try {
  const validUpdate = updateUser(1, { email: "new@example.com" });
  console.log("Valid update:", validUpdate);
} catch (error) {
  // Won't reach here
}

// Benefits of Zod:
// 1. Schema = Type definition + Runtime validation in one place
// 2. Type inference from schema (DRY)
// 3. Rich validation primitives (email, url, regex, etc.)
// 4. Composable schemas (nested objects, arrays, unions)
// 5. Great error messages
// 6. Partial/optional field handling
// 7. Schema transformations (default values, transformations)
