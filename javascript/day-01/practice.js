/* Exercise 1 */
const users = [
  { name: "Anna", age: 25, active: true },
  { name: "John", age: 30, active: false },
  { name: "Sara", age: 28, active: true },
];

// Show only active users. Expected: ["Anna", "Sara"]

const activeUsers = users
  .filter((user) => user.active)
  .map((user) => user.name);

console.log(activeUsers);

/* Exercise 2 */

const cart = [
  { name: "Book", price: 15, quantity: 2 },
  { name: "Pen", price: 3, quantity: 4 },
  { name: "Bag", price: 40, quantity: 1 },
];

// Calculate the total cost of items in the cart. Expected: 82

const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

console.log(total);

/* Exercise 3 */

const user = {
  id: 1,
  name: "Alice",
  address: {
    city: "Paris",
    country: "France",
  },
};

// Need to update a nested object without modifying the original one.
// Expected:
// {
//   id: 1,
//   name: "Alice",
//   address: {
//     city: "London",
//     country: "France"
//   },
//   isVerified: true
// }

const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: "London",
  },
  isVerified: true,
};

console.log(updatedUser);
console.log(user);

/* Exercise 4 */

const usersList = [
  { id: 1, name: "Anna", email: "anna@test.com" },
  { id: 2, name: "John" },
  { id: 3, name: "Sara", email: "sara@test.com" },
];

// Write a function getUserEmail(usersList, id)
// Expected:
// getUserEmail(usersList, 1) -> "anna@test.com"
// getUserEmail(usersList, 2) -> "No email"
// getUserEmail(usersList, 99) -> "No email"

const userMap = new Map(usersList.map((user) => [user.id, user]));

const getUserEmail = (userMap, id) => {
  const user = userMap.get(id);
  return user?.email ?? "No email";
};

console.log(getUserEmail(userMap, 1)); // "anna@test.com"
console.log(getUserEmail(userMap, 2)); // "No email"
console.log(getUserEmail(userMap, 99)); // "No email"

/* Exercise 5 */

const applications = [
  { company: "Google", status: "applied" },
  { company: "Meta", status: "interview" },
  { company: "Amazon", status: "applied" },
  { company: "Spotify", status: "rejected" },
  { company: "Netflix", status: "interview" },
];

// Group applications by status

const groupedApplications = applications.reduce((acc, app) => {
  acc[app.status] = acc[app.status] || [];
  acc[app.status].push(app.company);
  return acc;
}, {});

console.log(groupedApplications);
