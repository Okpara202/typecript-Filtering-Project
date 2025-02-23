// Constructing interface for the Admin and User Person types
interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: "admin";
  name: string;
  age: number;
  role: string;
}

// construct person as a union of User and Admin
type Person = User | Admin;

// Sample Data as person object
const persons: Person[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
  { type: "user", name: "Wilson", age: 23, occupation: "Ball" },
  { type: "admin", name: "Agent Smith", age: 23, role: "Anti-virus engineer" },
];

// Function to log a person's detail
function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === "admin" ? person.role : person.occupation
    }`
  );
}

// Fixing the typings for the filterPersons function
function filterPersons<T extends User | Admin>(
  persons: Person[],
  personType: T["type"],
  criteria: Omit<Partial<T>, "type">
): T[] {
  // Ensuring we can filter by the remaining  criteria
  return persons
    .filter((person): person is T => person.type === personType)
    .filter((person) => {
      let criteriaKeys = Object.keys(criteria) as (keyof Omit<
        Partial<T>,
        "type"
      >)[];
      return criteriaKeys.every((fieldName) => {
        return person[fieldName as keyof T] === criteria[fieldName];
      });
    });
}

// FIlter by number
const usersOfAge23 = filterPersons<User>(persons, "user", { age: 23 });
const adminsOfAge23 = filterPersons<Admin>(persons, "admin", {
  age: 23,
});

// Filter by name
const userNamedWilson = filterPersons<User>(persons, "user", {
  name: "Wilson",
});
const userNamedSmith = filterPersons<Admin>(persons, "admin", {
  name: "Agent Smith",
});

console.log("Users of age 23:");
usersOfAge23.forEach(logPerson);

console.log("Admins of age 23:");
adminsOfAge23.forEach(logPerson);

console.log("UserNamedWilson:");
userNamedWilson.forEach(logPerson);

console.log("userNamedSmith:");
userNamedSmith.forEach(logPerson);
