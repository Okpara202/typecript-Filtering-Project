# **Person Filter Project**

---

## **Overview**

This project is a TypeScript-based application designed to filter and log user and admin data based on specific criteria. The application defines `User` and `Admin` interfaces, and a `filterPersons` function that can filter users or admins based on their given criteria. It also includes a function to log the details of the filtered persons. This task is aimed at helping me get a better grasp on typescript basics to better understand its differences and similarities with Javascript

---

## **Features**

- **TypeScript Interfaces**: Defines clear structures for `User` and `Admin` objects.
- **Union Type**: Uses a union type `Person` to handle both `User` and `Admin`.
- **Filtering Function**: Provides a flexible `filterPersons` function to filter users and admins based on type and criteria.
- **Logging Function**: Includes a `logPerson` function to log the details of users and admins.
- **Data Array**: Contains sample data for testing and demonstration purposes.

---

## **TASK**

I was given a filtering function called `filterPersons` to fix. I had to ensure that the `filterPersons` functions met the following conditions on top of its primary function of filtering:

- Returns `User[]` when `personType` is `user`
- Returns `Admin[]` when `personType` is `admin`
- If `personType` is `User`, the `criteria` aurgument should accept a partial `User` object.
- If `personType` is `admin`, the `criteria` aurgument should accept a partial `Admin` object.
- The `criteria` object should exclude the `type` field ensuring that I can't filter by the `type` property.

---

## **WHAT I DID**

I noticed the `filterPersons` function had some issues in the way it accepted parameters such as:

- The type annotation for `personType` is `string`, limiting type safety.
- The type annotation for `criteria` is `unknown`, this limited property access especially without proper type guards further complicating the source code and make it prone to errors.
- It allowed filtering by `type`, which could lead to unforseen issues.

**MY SOLUTIONS**

1. **Strong Typing with Generics:**

   - Used `<T extends User | Admin>` to infer the return type dynamically.
   - `personType` is now strictly `'user'` or `'admin'`.

2. **Type-Safe Criteria:**

   - Used `Omit<Partial<T>, 'type'>` to:
     - Allow partial filtering (`age`, `name`, `occupation`, `role`).
     - Prevent filtering by `type`.

3. **Type Guard for Type Inference:**

   - Added a type predicate to help TypeScript correctly infer the type after filtering by `personType`.

   ***

## CODE IMPLEMENTATION

The source code file for this project is located in main.ts under the src folder of this repo.

**Set Up Steps**

1. Clone this repo

```bash
git clone
```

2. Navigate to src folder, under it is main.ts and there you will see the source code

3. Open you IDE terminal and run

```bash
npm run dev
```

4. This opens a development server allowing you to view this project on any browser of your choice

5. Open your developers tools,

```bash
ctrl + shift + i
```

6. Navigate to console and you will see the code execution.
