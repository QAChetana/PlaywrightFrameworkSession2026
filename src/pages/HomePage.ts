import { Page, Locator } from '@playwright/test'

import { BasePage } from '../pages/BasePage.js'

export class HomePage extends BasePage {


    private readonly headers: Locator;
    private readonly logoutLink: Locator;
  


    constructor(page: Page) {

        super(page);
        this.headers = page.locator("//h2");
        this.logoutLink = page.locator("(//a[text()='Logout'])[2]");
   
    }

    async getHomePageTitle(): Promise<string> {

        await this.page.waitForLoadState("networkidle");
        return await this.page.title();
    }

    async getHomePageHeaders(): Promise<string[]> {

        //await this.page.waitForLoadState("networkidle");

        // 1. Force Playwright to wait until the first header is completely visible on screen
        await this.headers.first().waitFor({ state: 'visible', timeout: 5000 });

        let allheaders: string[] = await this.headers.allInnerTexts();
        return allheaders;
    }

    async isLogoutLinkAvaialable(): Promise<boolean> {
        try {
             await this.page.waitForLoadState("networkidle");

            // FIX 2: Wait for the logout link to become visible before checking its state
             await this.logoutLink.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (e) {
            // If it times out or doesn't appear within 5 seconds, safely return false
            return false;
        }
    }

 

    

    async doSearchProduct(productName:string):Promise<void>{

        console.log(`Searching for the product : ${productName}`);

        await this.searchBar.fill(productName);
       
        await this.searchIcon.click();
    }

}
