function showSalary(users, age) {
  let filteredUsers = users.filter(user => user.age <= age);
  let result = filteredUsers.map(user => `${user.name}, ${user.balance}`).join('\n');
  return result;
}