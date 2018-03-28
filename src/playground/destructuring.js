// const person = {
//   name: 'Bijan',
//   age: 30,
//   location: {
//     city: 'Philadelphia',
//     temp: 92
//   }
// };

// const { name = 'Sean', age } = person;

// // const name = person.name;
// // const age = person.age;

// console.log(`${name} is ${age}`);

// const { city, temp: temperature} = person.location;

// if (city && temperature){
//   console.log(`It's ${temperature} in ${city}.`);
// }

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);

// Array destructuring

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// const [street, city, state, zip] = address;


// console.log(`You are in ${city} ${state}`);

const item = ['Coffee (hot)', '$3.00', '$3.50', '$3.75'];

const [itemName, , medium ] = item;

console.log(`A medium ${itemName} cost ${medium}`);