import { test, expect } from 'src/fixtures/apiFixtures.js';



const TOKEN = process.env.API_TOKEN;
let AUTH_TOKEN = { 'Authorization': `Bearer ${TOKEN}` };
let userID: number;

//to run api test cases to run sequentially then use test.describe.serial block
test.describe.serial("End to End API test cases", () => {

    test("Get all users API test", async ({ apiHelper }) => {

        let response = await apiHelper.getRequest("/public/v2/users", AUTH_TOKEN);
        console.log(response.responseBody)

        expect(response.statusCode).toBe(200);
        expect(response.responseBody.length).toBeGreaterThan(1);

    });

    test("Create a new user", async ({ apiHelper }) => {
        let userData =
        {
            "name": "Chetana Santosh Kumar",
            "email": `chetana${Date.now()}@gmail.com`,
            "gender": "female",
            "status": "active"
        }
        let response = await apiHelper.postRequest("/public/v2/users", userData, AUTH_TOKEN);

        console.log(response.responseBody);

        expect(response.statusCode).toBe(201);
        expect(response.responseBody.id).toBeTruthy();
        expect(response.responseBody.name).toBe(userData.name);

        userID = response.responseBody.id;
        console.log("User id is: " + userID);

    });

    test("Update the user details", async ({ apiHelper }) => {
        let userData =
        {
            "name": "Chetana S Kumar",
            "email": `chetanaSK${Date.now()}@gmail.com`,
            "gender": "female",
            "status": "inactive"
        }

        let response = await apiHelper.updateRequest(`/public/v2/users/${userID}`, userData, AUTH_TOKEN);

        console.log(response.responseBody);

        expect(response.statusCode).toBe(200);
        expect(response.responseBody.name).toBe(userData.name);
         expect(response.responseBody.status).toBe(userData.status);

    });


    test("Partial update of user details", async ({ apiHelper }) => {
        let userData =
        {
            "name": "Chetana S K",
            "status": "active"
        }
        let response = await apiHelper.partialUpdateResquest(`/public/v2/users/${userID}`, userData, AUTH_TOKEN);

        console.log(response.responseBody);

        expect(response.statusCode).toBe(200);
        expect(response.responseBody.name).toBe(userData.name);
        expect(response.responseBody.status).toBe(userData.status);

    });

    test("Delete the user", async ({ apiHelper }) => {


        let response = await apiHelper.deleteRequest(`/public/v2/users/${userID}`, AUTH_TOKEN);

        console.log(response.statusCode);

        expect(response.statusCode).toBe(204);
        expect(response.statusText).toBe("No Content");

    });

    test("To find the deleted user", async ({ apiHelper }) => {

        let response = await apiHelper.deleteRequest(`/public/v2/users/${userID}`, AUTH_TOKEN);

        console.log(response.statusCode);

        console.log(response.statusText);

    });
});