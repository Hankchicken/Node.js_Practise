const product = { id: 101, name: "電競滑鼠", price: 1290 };
const { name, price } = product;
console.log(`產品名稱: ${name}, 售價: ${price}`);

const users = [{ username: "Hank", role: "Admin" }, { username: "Amy", role: "Editor" }];
const [firstuser] = users;
const [ ,seconduser] = users;
const { username, role } = seconduser;

console.log(`使用者名稱: ${username}, 權限: ${role}`);