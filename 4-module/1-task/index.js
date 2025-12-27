function makeFriendsList(friends) {
  var ul = document.createElement("ul");
  for (let el of friends) {
    var li = document.createElement("li");
    li.textContent = el.firstName + " " + el.lastName;
    ul.appendChild(li);
  }
  return ul;
}
