import { timeStamp } from 'node:console';
import {test,expect} from '../src/fixtures/pageFixtures.js';
import { CsvHelper } from 'src/utils/csvUtils.js';
import {ExcelHelper} from 'src/utils/excelUtils.js';
import {JsonHelper} from 'src/utils/jsonUtils.js';

test.beforeEach(async({registerPage})=>
    {

    await registerPage.goToRegister();
}
)


test("Register page title",async({registerPage})=>{

   let title:string =  await registerPage.getPageTitle();
   console.log("The page title is: "+title);

   expect(title).toBe("Register Account");
})

//input data passing as parameters to a function
// test("Positive scenarios: account registration", async({registerPage})=>{
//     let uniqueEmail = `neeta${Date.now()}@gmail.com`;
//     let confirmationText = await registerPage.registrationForm("Neetu","Singh",uniqueEmail,"0977564545","admin123","admin123");

//     //expect(confirmationText).toContain("Your Account Has Been Created!");


// })

//input data reading from a CSV file 
let testData1:Record<string, string>[] = CsvHelper.readCsv("src/testData/registerData.csv");
for(let data of testData1){


test(`Registration from CSV file data for ${data.FirstName}`,async({registerPage})=>{
    let uniqueEmail = `${data.FirstName}+${Date.now()}@gmail.com`;
    let confirmationText = await registerPage.registrationForm(data.FirstName,data.LastName,uniqueEmail,data.Telephone,data.Password,data.PasswordConfirm);

    expect(confirmationText).toContain("Your Account Has Been Created!");


});
}

////input data reading from an Excel file 

let testData2:Record<string, string>[]= ExcelHelper.readExcel('src/testData/registerData.xlsx',"registerData");


for(let data of testData2){
    test(`Registration from Excel file data for ${data.FirstName}`,async({registerPage})=>{
    let unique_email = `${data.FirstName}+${Date.now()}@gmail.com`
    let result:string = await registerPage.registrationForm(data.FirstName,data.LastName,unique_email,data.Telephone,data.Password,data.Password_Confirm)
    
    expect(result).toContain("Your Account Has Been Created!");

});

}
//input data from JSON file 
let testData3= JsonHelper.readJson("src/testData/registerData.json");

for(let data of testData3){

    test(`Registration from JSON file for ${data.firstname}:`, async({registerPage})=>{
        let domain= "@hogwards.com";
        let unique_Email = `${data.lastname}+${Date.now()}+${domain}`;

        let result:string = await registerPage.registrationForm(data.firstname,data.lastname,unique_Email,data.telephone,data.password,data.confirmPassword)
        expect(result).toContain("Your Account Has Been Created!");
    })

}