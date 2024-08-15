//creating a date 
let now = new Date();
let h3 = document.querySelector("h3");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sta"];
let day = days[now.getDay()];

let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let month = months[now.getMonth()];

h3.innerHTML ='${day} ${month} ${date}, ${hours}: ${minutes},${year}';

function Search(event){
    event.preventDefault()
let searchInput = document.querySelector("#search-txt-btn");
let h2 = document.querySelector("h2");
if (searchInput.value) {
    h2.innerHTML = 'search for ${searchInput.value}...';

}
else {h2.innerHTML = null;
then 
alert ("please input city");
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
}
//linking to the api
