import {test as baseTest} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage.js';
import {HomePage} from '../pages/HomePage.js';
import {RegisterPage} from '../pages/RegisterPage.js';
import {SearchResultsPage} from '../pages/SearchResultsPage.js';
import {ProductInfoPage } from '../pages/ProductInfoPage.js';
import {ShoppingCartPage} from '../pages/ShoppingCartPage.js';

//defining the fixture

type pageFixtures={

        loginPage:LoginPage;
        homePage:HomePage;
        registerPage:RegisterPage;
        searchResultsPage:SearchResultsPage;
        productInfoPage:ProductInfoPage;
        shoppingCartPage: ShoppingCartPage;

}
export let test = baseTest.extend<pageFixtures>({

    loginPage: async({page},use)=>
        {
           let loginPage =new LoginPage(page);

           await use(loginPage);
        },
    homePage: async({page},use)=>
         {     
           let homePage =new HomePage(page);

            await use(homePage);
        },
    registerPage: async({page},use)=>
        {

            let registerPage = new RegisterPage(page);
            
            await use(registerPage);


            },
    searchResultsPage: async({page},use)=>{

            let searchResultsPage = new SearchResultsPage(page);
            await use(searchResultsPage);

            },
        productInfoPage: async({page},use)=>{

            let productInfoPage= new ProductInfoPage(page);
            await use(productInfoPage);

            },
        shoppingCartPage: async({page},use)=>{
            let shoppingCartPage = new ShoppingCartPage(page);
            await use(shoppingCartPage);

        }


});

export {expect} from '@playwright/test';