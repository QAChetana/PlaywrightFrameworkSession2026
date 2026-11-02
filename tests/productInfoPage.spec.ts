import { test, expect } from '../src/fixtures/pageFixtures.js';


//hook --beforeEach()
test.beforeEach(async ({ loginPage }) => {


    await loginPage.goToLoginPage();

    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
});

// test("Verify the product images test", async ({ productInfoPage, homePage, searchResultsPage }) => {

//     await homePage.doSearchProduct("Canon");
//     await searchResultsPage.selectAndClickOnProduct("Canon EOS 5D");
//     let imagesCount: number = await productInfoPage.getProductImagesCount();
//     console.log("Totla number of images: " + imagesCount);
//     expect(imagesCount).toBeGreaterThan(1);

// });

// test("Verify the product information test", async ({ productInfoPage, homePage, searchResultsPage }) => {

//     await homePage.doSearchProduct("Canon");
//     await searchResultsPage.selectAndClickOnProduct("Canon EOS 5D");
//     let completeProductInfo: Map<string, string> = await productInfoPage.getCompleteProductInfo();

//     console.log(completeProductInfo);

//     expect.soft((completeProductInfo).get("Brand")).toBe("Canon");
//     expect.soft((completeProductInfo).get("Product Code")).toBe("Product 3");
//     expect.soft((completeProductInfo).get("Reward Points")).toBe("200");
//     expect.soft((completeProductInfo).get("Availability")).toBe("In Stock");
//     expect.soft((completeProductInfo).get("Product Price")).toBe("$122.00");


// });


// test("Verify the common logo test", async ({ productInfoPage,homePage,searchResultsPage}) => {
//     await homePage.doSearchProduct("Canon");
//     await searchResultsPage.selectAndClickOnProduct("Canon EOS 5D");

//     await productInfoPage.waitForPageLoad();

//    let isLogoVisible =await  productInfoPage.isLogoVisible();
//     console.log(isLogoVisible);
//     expect(isLogoVisible).toBe(true);

// });
// // test("Verify the common logo test", async ({ productInfoPage}) => {

// //     productInfoPage.waitForPageLoad();
// //    let isLogoVisible =await  productInfoPage.isLogoVisible();

// //     expect(isLogoVisible).toBe(true);

// // });

// test("Verify the common footer test", async ({ productInfoPage,homePage,searchResultsPage}) => {

//     await homePage.doSearchProduct("Canon");
//     await searchResultsPage.selectAndClickOnProduct("Canon EOS 5D");

//   //  await productInfoPage.waitForPageLoad();
//    let footerCount = await productInfoPage.getPageFooterCount();

//     expect(footerCount).toBe(15);

// });

// test("Verify the AddtoCart button functionality",async({productInfoPage,homePage,searchResultsPage,page})=>{
//      await homePage.doSearchProduct("Samsung");
//     let productName :string = await searchResultsPage.selectAndClickOnProduct("Samsung Galaxy Tab 10.1");
//     await productInfoPage.doAddToCart(3);
//     let successMsg:string = await productInfoPage.getSuccessMsg();
//     console.log(successMsg);
//     expect.soft(successMsg).toContain(` Success: You have added ${productName} to your shopping cart!`);

// });

// test("Verify the shopping cart details", async({productInfoPage,homePage,searchResultsPage})=>{

//     await homePage.doSearchProduct("MacBook");
//     let productName :string = await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
//     await productInfoPage.doAddToCart(2);
//     let successMsg:string = await productInfoPage.getSuccessMsg();
//     console.log(successMsg);
// let details = await productInfoPage.clickOnShoppingCart();

// console.log("The no of products are: "+details[0].count);

// });

// test("Verify that the products in the shopping cart is same as selected",async({productInfoPage,homePage,searchResultsPage})=>{

//     await homePage.doSearchProduct("MacBook");
//     let productName :string = await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
//     await productInfoPage.doAddToCart(2);
//     // let details = await productInfoPage.getShoppingCartDetails();
//     // console.log(details);

//     let info:Map<string,string>[] =await  productInfoPage.getProductNameQtyPrice();
//     console.log(info);

//      expect.soft(info[1].get("Product Name")).toBe("MacBook Pro");
//      expect.soft(info[1].get("Quantity")).toBe("MacBook Pro");
//      expect.soft(info[1].get("Price")).toBe("MacBook Pro");
//      expect.soft(info[1].get("Total")).toBe("MacBook Pro");
// //need to check qty, total price.



// });



// test("Verify that the products can be removed",async({productInfoPage,homePage,searchResultsPage})=>{



//     await homePage.doSearchProduct("MacBook");

//     let productName :string = await searchResultsPage.selectAndClickOnProduct("MacBook Air");

//     await productInfoPage.doAddToCart(1);
//     let successMsg: string = await productInfoPage.getSuccessMsg();
//     console.log(successMsg);


//     await productInfoPage.getCompleteProductInfo();

//     await productInfoPage.removeProducts("MacBook Air");
//    let removeText:string =await productInfoPage.getRemoveMsg();
//     expect(removeText).toContain(" Success: You have removed an item from your shopping cart! ");

// });
test("Verify the no of items and total is same as on shopping cart button and inside shopping cart", async ({ homePage, searchResultsPage, productInfoPage }) => {

    await homePage.doSearchProduct("MacBook");
    let productName: string = await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
    await productInfoPage.doAddToCart(2);
    let successMsg: string = await productInfoPage.getSuccessMsg();
    console.log(successMsg);

    let insideCart = await productInfoPage.getItemsTotal();

    let outsideCart = await productInfoPage.checkShoppingCartBtn();

    console.log(typeof insideCart);
    console.log(typeof outsideCart);
    console.log(insideCart);
    console.log(outsideCart);


    expect(insideCart.count).toBe(outsideCart.count);
    expect(insideCart.total).toBe(outsideCart.total);


});


test("Verify that the shopping cart is cleared",async({productInfoPage,homePage,searchResultsPage})=>{
 test.setTimeout(60000);
await homePage.doSearchProduct("Samsung");
    let productName :string = await searchResultsPage.selectAndClickOnProduct("Samsung Galaxy Tab 10.1");
    await productInfoPage.doAddToCart(1);
    let successMsg:string = await productInfoPage.getSuccessMsg();
    await productInfoPage.clickOnShoppingCart();
    await productInfoPage.clearCart();
});
// test("Verify the shoppping cart page is displayed on clicking ViewCart link", async ({ productInfoPage, homePage, searchResultsPage, page }) => {

//     await homePage.doSearchProduct("MacBook");
//     let productName: string = await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
//     await productInfoPage.doAddToCart(2);
//     let successMsg: string = await productInfoPage.getSuccessMsg();
//     console.log(successMsg);

//     await productInfoPage.clickOnShoppingCart();

//     await productInfoPage.clickOnViewCartLink();
//     expect(await page.title()).toBe("Shopping Cart");
// });



