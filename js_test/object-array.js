const person = {
    name: 'Hank',
    age: 30
};
console.log('姓名', person.name);
console.log('年齡', person.age);

const number = [1, 2, 3, 4];
const doubled = number.map(num => num * 2);
console.log('雙數:', doubled);

const { name, age } = person;
console.log('身分', name, age);

