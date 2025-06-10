# Zod vs TypeScript and DTOs Example

This example demonstrates why Zod is beneficial over plain TypeScript types and DTO patterns for validation.

## Key Differences

1. **TypeScript Only (typescript-only.ts)**

   - ✅ Validates types at compile time
   - ❌ No runtime validation (types are erased)
   - ❌ Cannot validate external data (APIs, JSON, etc.)

2. **DTO Approach (dto-approach.ts)**

   - ✅ Runtime validation
   - ✅ Can validate external data
   - ❌ Verbose manual validation code
   - ❌ No type inference
   - ❌ Hard to reuse validation logic

3. **Zod Approach (zod-approach.ts)**
   - ✅ Compile-time type checking
   - ✅ Runtime validation
   - ✅ Type inference (DRY)
   - ✅ Rich validation primitives
   - ✅ Composable schemas
   - ✅ Detailed error messages
   - ✅ Partial/optional handling

## Setup

```bash
npm install
```

## Run Examples

```bash
# TypeScript only example (will show runtime issues)
npm run typescript

# DTO approach example
npm run dto

# Zod approach example
npm run zod
```
