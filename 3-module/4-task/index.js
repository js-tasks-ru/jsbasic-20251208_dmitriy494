function showSalary(users, age) {
  let filterUser = users.filter((el) => {
    return el.age <= age;
  });

  let result = [];
  for (let el of filterUser) {
    result.push(el.name + ", " + el.balance);
  }
  return result.join("\n");
}
