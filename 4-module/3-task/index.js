function highlight(table) {
  let Age;
  let Gender;
  let Status;
  for (let el of table.rows[0].cells) {
    switch (el.innerText) {
      case "Age":
        Age = el.cellIndex;
        break;
      case "Gender":
        Gender = el.cellIndex;
        break;
      case "Status":
        Status = el.cellIndex;
        break;
    }
  }

  for (const row of table.tBodies[0].rows) {
    console.log(row.cells);
    let cellAge = row.cells[Age];
    let cellGender = row.cells[Gender];
    let cellStatus = row.cells[Status];

    if (Number(cellAge.textContent) < 18)
      row.style.textDecoration = "line-through";

    row.classList.add(cellGender.textContent === "m" ? "male" : "female");

    const available = cellStatus.dataset.available;

    if (!available) {
      row.setAttribute("hidden", "");
      continue;
    }

    row.classList.add(available === "true" ? "available" : "unavailable");
  }
}
