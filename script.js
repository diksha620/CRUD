

var up = false;
let upIndex = -1;
let records = [];
const details = document.querySelector("#details");


details.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
});

function saveData() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let psw = document.getElementById("psw").value;
 
  if (up) {
    if (upIndex !== -1) {
       const updatedObj = {
        id: new Date().getTime(),
        name: name,
        email: email,
        psw: psw,
        date: new Date().toDateString(),
      };
      let rec = JSON.parse(localStorage.getItem("users"));
      rec[upIndex] = updatedObj;
      console.log(rec);
      localStorage.setItem("users", JSON.stringify(rec));
      upIndex = -1;
    }

    showData();
  } else {
    records = JSON.parse(localStorage.getItem("users"))
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    if (
      records.some((v) => {
        return v.email == email;
      })
    ) {
      alert("duplicate data");
    } else {
      records.push({
        name: name,
        email: email,
        psw: psw,
        id: new Date().getTime(),
        date: new Date().toDateString(),
      });
      localStorage.setItem("users", JSON.stringify(records));
    }
    showData();
  }
}

function showData() {
  document.getElementById("showUsers").innerHTML = "";
  let records = [];
  records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  if (records) {
    for (let i = 0; i < records.length; i++) {
      // const newLocal = "block";
      document.getElementById("c2").style.display = "block";
      let addDiv = document.createElement("div");
      addDiv.className = "row";
      addDiv.innerHTML = `  <div class="col-sm-2" style="padding: 10px; color: white;">${records[i].name}</div>
      <div class="col-sm-4" style="padding: 10px; color: white;">${records[i].email}</div>
      <div class="col-sm-2" style="padding: 10px; color: white;">${records[i].psw}</div>
      <div class="col-sm-1" style="padding: 10px; color: white;"> <a onclick = "remove(${records[i].id})"><i class="fa fa-trash-o"></i></a></div>
      <div class="col-sm-1" style="padding: 10px; color: white;"> <a onclick = "update(${records[i].id})"><i class="fa fa-edit"></i></a></div>
      <div class="col-sm-2" style="padding: 10px; color: white;">${records[i].date}</div>`;

      document.getElementById("showUsers").appendChild(addDiv);
    }
  }
}

const remove = (id) => {
  document.getElementById("c2").style.display = "none";
  document.getElementById("c1").style.display = "none";
  document.getElementById("confirm").innerHTML = "";
  let mainDiv = document.createElement("div");

  mainDiv.innerHTML = `<div id="confirmation" style ="height: 300px; width: 400px; position: absolute; top: 15vw; left: 35vw; transition: 1s ease-in-out; border-radius: 7px; background-color: cadetblue;">
                      <h3>Are you sure you want to delete ?</h3>
                      <button id="yes" onclick = "yes(${id})" style = "text-align: center; margin-left: 8vw; margin-top: 3vw; background-color:black; color:white;padding6px;border-radius:8px">YES</button>
                      <button id="no" onclick = "no()" style = "text-align: center; margin-left: 5vw; margin-top: 3vw; background-color:black; color:white;padding6px;border-radius:8px">NO</button></div>`;
  document.getElementById("confirm").appendChild(mainDiv);

  // console.log(mainDiv)
  yes = (id) => {
    let records = [];
    records = JSON.parse(localStorage.getItem("users"))
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    a = records.filter((item) => item.id !== id);
    localStorage.clear();
    localStorage.setItem("users", JSON.stringify(a));
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("c2").style.display = "block";
    document.getElementById("c1").style.display = "block";
    showData();
  };

  no = () => {
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("c2").style.display = "block";
    document.getElementById("c1").style.display = "block";
    // console.log()
  };
};

const update = (id) => {
  up = true;
  let records = [];
  records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  const a = records.filter((item) => item.id === id);
  document.getElementById("name").value = a[0].name;
  document.getElementById("email").value = a[0].email;
  document.getElementById("psw").value = a[0].psw;
  for (let j = 0; j < records.length; j++) {
    if (records[j].id === id) {
      upIndex = j;
    }
  }
};