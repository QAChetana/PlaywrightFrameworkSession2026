import {test,expect} from '../src/fixtures/pageFixtures.js';
import { CsvHelper } from 'src/utils/csvUtils.js';

//hook --beforeEach()
test.beforeEach(async ({ loginPage }) => {

   
    await loginPage.goToLoginPage();
   
   await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!);

   
});


test("Get Search page header", async({searchResultsPage,homePage})=>
    
{
    await homePage.doSearchProduct("Canon");
    let searchHeader:string = await searchResultsPage.getSeacrhResultsPageHeader("Canon");
    expect(searchHeader).toBe("Search - Canon");
});

test("Get the total count of the product meeting the search criteria", async({searchResultsPage,homePage})=>{

await homePage.doSearchProduct("MacBook");
let count = await searchResultsPage.getSeacrhResultsCount();
expect(count).toBeGreaterThan(0);
});

test("Verify if the selected product clicked on goes to ProductInfo Page", async({searchResultsPage,homePage,page})=>{

await homePage.doSearchProduct("Samsung");
let productHeaderPage = await searchResultsPage.selectAndClickOnProduct("Samsung Galaxy Tab 10.1");
expect(page).toHaveTitle("Samsung Galaxy Tab 10.1");
console.log("The product info page title is: "+  await page.title());
//expect(productHeaderPage).toContain("Samsung");

});



let testData:Record<string, string>[]= CsvHelper.readCsv("src/testData/search_click_count.csv");
for(let data of testData){
 test(`Verifying search functionality for key: "${data.searchKey}" using CSV data`, async ({ searchResultsPage, homePage, page }) => {

    await homePage.doSearchProduct(data.searchKey);


    let count = await searchResultsPage.getSeacrhResultsCount();
    let expectedCount= Number(data.count);
    expect(count).toBe(expectedCount);

    await searchResultsPage.selectAndClickOnProduct(data.productName);
    await expect(page).toHaveTitle(`${data.productName}`);





});

}


