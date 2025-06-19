// Array to store the user objects
var users = [];

// Array of city names in China
var cities = ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou", "Xi'an", "Nanjing", "Chongqing", "Wuhan"];

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random city name
function getRandomCity() {
  return cities[getRandomNumber(0, cities.length - 1)];
}

// Function to generate a random name
function getRandomName() {
  var names = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia", "Peter", "Queen", "Ryan", "Sophia", "Tom"];
  return names[getRandomNumber(0, names.length - 1)];
}

// Generate 120 user objects
for (var i = 0; i < 120; i++) {
  var user = {
    id: i,
    age: getRandomNumber(5, 92),
    name: `${getRandomName()}${i}` ,
    address: getRandomCity()
  };
  users.push(user);
}

// Print the user array
// console.log(users);

export default users;