const products = [
    { id: 1, name: "滑鼠", price: 2000 },
    { id: 2, name: "鍵盤", price: 3000 },
    { id: 3, name: "主機", price: 25000 },
    { id: 4, name: "螢幕", price: 5000 }
];

//傳統 for 迴圈
// let max = products[0];
// for (let i = 1; i < products.length; i++) {
//     if (products[i].price > max.price) {
//         max = products[i];
//     }
// }
// console.log(max);

const veryveryheight = products.reduce((max, item) =>
    item.price > max.price ? item : max
);

const { name, price } = veryveryheight;
console.log(`非常非常貴: ${name}, 價格: ${price}`);