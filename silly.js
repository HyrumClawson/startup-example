let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let c = a.reduce((total, number) => {
  return (total + number)
});
console.log(c);