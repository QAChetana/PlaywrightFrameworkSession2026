import {test,expect} from '../src/fixtures/pageFixtures.js';
import {CsvHelper} from '../src/utils/csvUtils.js';
import {ExcelHelper} from '../src/utils/excelUtils.js';
import {JsonHelper} from '../src/utils/jsonUtils.js';


test.beforeEach(async ({loginPage}) => {

    await loginPage.goToLoginPage();

  
})

test("Login Page Title test", async ({loginPage}) => {

    let title = await loginPage.getLoginPageTitle();
    expect(title).toBe("Account Login");

})


test("Forgot Password Link test", async ({loginPage}) => {


    let isAvaliable = await loginPage.isForgotPasswordLinkAvaialable()
    expect(isAvaliable).toBe(true);

})


test("Login test", async ({loginPage,homePage}) => {


    await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!);

    //inorder to use the page,waitforLoadState, need to pass the {page} deconstructor
    //await page.waitForLoadState("networkidle", { timeout: 5000 });

    // let flag:string = await hp.getHomePageTitle();
    
    // expect(flag).toBe("My Account");
    
    let flag:boolean = await homePage.isLogoutLinkAvaialable();
    expect(flag).toBeTruthy();
})

//Reading the multiple data from CSV file for negative testing:

let testInputData: Record<string, string>[] =CsvHelper.readCsv("src/testData/loginData.csv");
for (let data of testInputData)
{

test(`Negative scenario for CSV Login test using ${data.username} and ${data.password}`, async ({loginPage}) => {

try{
await loginPage.doLogin(data.username,data.password);
let errorMsg = await loginPage.getPageErrorMessage1();
expect(errorMsg).toContain(' Warning: No match for E-Mail Address and/or Password.');
}catch(error){
await loginPage.doLogin(data.username,data.password);
let errorMsg = await loginPage.getPageErrorMessage2();
expect(errorMsg).toContain(' Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.');
}

})
}
//Reading the multiple data from Excel file for negative testing:
let testInputData2:Record<string, string>[] =ExcelHelper.readExcel("src/testData/loginExcelTestData.xlsx");
for (let data of testInputData2)
{

test(`Negative scenario for Excel Login test using ${data.username} and ${data.password}`, async ({loginPage}) => {
try{
await loginPage.doLogin(data.username,data.password);
let errorMsg = await loginPage.getPageErrorMessage1();
expect(errorMsg).toContain(' Warning: No match for E-Mail Address and/or Password.');
}catch(error){
await loginPage.doLogin(data.username,data.password);
let errorMsg = await loginPage.getPageErrorMessage2();
expect(errorMsg).toContain(' Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.');
}

})


}

let testData3:Record<string, string>[]= JsonHelper.readJson("src/testData/loginData.json");

for(let data of testData3){

test(`Negative scenario for Json file login Data test using ${data.username} and ${data.password}`, async({loginPage})=>{
try{
await loginPage.doLogin(data.username,data.password);
let errorMsg = await loginPage.getPageErrorMessage1();
expect(errorMsg).toContain(' Warning: No match for E-Mail Address and/or Password.');
}catch(error){
await loginPage.doLogin(data.username,data.password);
let errorMsg = await loginPage.getPageErrorMessage2();
expect(errorMsg).toContain(' Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.s');
}




})


}
