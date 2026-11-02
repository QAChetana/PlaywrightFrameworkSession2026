
import { ShoppingCartPage } from 'src/pages/ShoppingCartPage.js';
import { test, expect } from '../src/fixtures/pageFixtures.js';
import { SearchResultsPage } from 'src/pages/SearchResultsPage.js';
import { ProductInfoPage } from 'src/pages/ProductInfoPage.js';

test.beforeEach(async ({ loginPage }) => {


    await loginPage.goToLoginPage();

    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
});

test("Verify the Shopping Cart Page Header", async({shoppingCartPage,homePage,searchResultsPage,productInfoPage})=>{
    await homePage.doSearchProduct("MacBook");
    await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
    await productInfoPage.doAddToCart(2);
    await productInfoPage.getSuccessMsg();
    await productInfoPage.clickOnShoppingCart();
    await productInfoPage.clickOnViewCartLink();

    await shoppingCartPage.waitForPageLoad();
    let header:string  = await shoppingCartPage.getPageHeader();
    console.log(header);
    expect(header).toBe("Shopping Cart (0.00kg)");

});
test("Verify the quantity can be updated",async({shoppingCartPage,homePage,searchResultsPage,productInfoPage})=>{





});

test("Verify that the products can be removed from the Shopping Cart page",async({shoppingCartPage,homePage,searchResultsPage,productInfoPage})=>{



});

test("Verify that Get Quotes is showing the estimated shipping charges after country,state and postcode are entered",async({shoppingCartPage,homePage,searchResultsPage,productInfoPage})=>{



});
