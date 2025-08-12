const students = [
    { name: '小明', scores: [80, 90, 70] },
    { name: '小華', scores: [85, 95, 100] },
    { name: '小華', scores: [75, 85, 80] }
];

students.forEach(student => {
    const { name, scores } = student;
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    const avg = (sum / scores.length).toFixed(2);
    console.log(`${name} 平均分數是 ${avg}`);
});