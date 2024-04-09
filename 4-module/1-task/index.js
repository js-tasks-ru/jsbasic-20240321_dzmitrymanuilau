function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  
  // Loop through the friends array and create li elements for each friend
  friends.forEach(friend => {
      let li = document.createElement('li');
      
      li.textContent = `${friend.firstName} ${friend.lastName}`;
      
      ul.appendChild(li);
  });
  
  return ul;
}