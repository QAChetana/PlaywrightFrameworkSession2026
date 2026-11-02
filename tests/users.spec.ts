import {test,expect} from '@playwright/test';
import { request } from 'node:http';

let AUTH_TOKEN = {'Authorization': 'Bearer 18d75c81486b894eb57dd72930d2f5ddf35b14ee74ff14597f9b6632a806b8a5'};

test("Fetch a single user", async({request})=>{

    let response = await request.get("https://gorest.co.in/public/v2/users/8686849",{headers:AUTH_TOKEN});

    console.log(response);

    //converting reponse object into JSON response

    let responsebody = await response.json();

    console.log(responsebody);

    console.log("Response code: "+response.status());
    console.log("Response message: "+response.statusText());


});

test("Fetching all users", async({request})=>{

   let response = await request.get("https://gorest.co.in/public/v2/users",{headers:AUTH_TOKEN});
    console.log(response);


    let responseBody = await response.json();

    console.log(responseBody);

    console.log("Status code: "+response.status());
    console.log("Response message: "+response.statusText());



});

test("Create a new user",async({request})=>{
    let userData=
     {
    "name": "Chetana Kumar",
    "email": `chetana${Date.now()}@gmail.com`,
    "gender": "female",
    "status": "active"
  }
   let response= await request.post("https://gorest.co.in/public/v2/users", {headers:AUTH_TOKEN,data: userData});
   console.log(response);

   let responseBody = await response.json();
  console.log(responseBody);
  console.log(response.status());
  console.log(response.statusText());

});

test("Update an user details",async({request})=>{
let userData=
     {
    "name": "Chetana Hanumanthappa Kadabanakatte",
    "email": "chetanaMysuru@gmail.com",
    "gender": "female",
    "status": "active"
  }

let response = await request.put("https://gorest.co.in/public/v2/users/8687151",{headers:AUTH_TOKEN,data:userData});

console.log(response);

let responseBody = await response.json();
console.log(responseBody);
console.log(response.status());
console.log(response.statusText());


});

test("Update a partial user details",async({request})=>{
let userData=
     {
    "name": "Chetana Hanumanthappa Kumar",
    "email": "chetanaHK*S@gmail.com",
     }

let response = await request.patch("https://gorest.co.in/public/v2/users/8687151",{headers:AUTH_TOKEN,data:userData});

console.log(response);

let responseBody = await response.json();

console.log(response.status());
console.log(response.statusText());


});

test("Verify to Delete the user", async({request})=>{

    let response = await request.delete("https://gorest.co.in/public/v2/users/8686102",{headers:AUTH_TOKEN});

    console.log(response);

      console.log(response.status());
    console.log(response.statusText());


});