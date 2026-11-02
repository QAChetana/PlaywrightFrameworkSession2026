import {test,expect} from '../src/fixtures/pageFixtures.js';

//hook --beforeEach()
test.beforeEach(async ({ loginPage }) => {

   
    await loginPage.goToLoginPage();
   
   await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!);
});


test("Home Page Title test", async ({homePage}) => 
    {
   
    let homeTitle = await homePage.getHomePageTitle();
    
    expect(homeTitle).toBe("My Account");

    });
test("Home Page Headers test", async ({homePage}) => 
    {
    let hlist:string[]= await homePage.getHomePageHeaders();
   // console.log(hlist);
    //console.log(hlist.length);
    expect.soft(hlist).toContain("My Affiliate Account");
    expect.soft(hlist).toHaveLength(3);
    expect.soft(hlist).toEqual(["My Orders","My Affiliate Account","Newsletter"]);

    });
test("Home Page Logout Link available test", async ({homePage}) => 
    {

   let isLogoutLink:boolean =  await homePage.isLogoutLinkAvaialable();
        expect(isLogoutLink).toBe(true);
    });

test("Verifying if the search bar is editable", async({homePage})=>{

//Since homePage extends BasePage, seacrhBoxEditable() is coming from BasePage:
    let isEditable = await homePage.seacrhBoxEditable();
     console.log("The search bar is editable?: "+isEditable);

});

test("Verifying if the search magnifying icon visible",async({homePage})=>{

//Since homePage extends BasePage, searchIconVisible() is coming from BasePage:
    let isVisible = await homePage.searchIconVisible();
    console.log("The search icon is visible?: " +isVisible);
});

test("Verify that product is searcheable", async({homePage})=>{

    await homePage.doSearchProduct("macbook");
   
});

test("Verify the common logo test", async ({homePage}) => {
       
    await homePage.waitForPageLoad();

   let isLogoVisible =await  homePage.isLogoVisible();
    console.log(isLogoVisible);
    expect(isLogoVisible).toBe(true);

});