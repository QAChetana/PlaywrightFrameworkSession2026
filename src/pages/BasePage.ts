import { Locator, Page } from '@playwright/test'

export class BasePage {

    protected readonly page: Page;

    protected readonly logo: Locator;
    protected readonly searchIcon: Locator;
    protected readonly searchBar: Locator;
    protected readonly footer: Locator;
    protected readonly shoppingCartBtn: Locator;
    protected readonly currency: Locator;

    constructor(page: Page) {

        this.page = page;
        this.logo = page.getByAltText("NLTECH Trainings Hub");
        this.searchIcon = page.locator("//i[@class='fa-solid fa-magnifying-glass']");
        this.searchBar = page.getByPlaceholder("Search");
        this.footer = page.locator("//footer//a");
       this.shoppingCartBtn = page.locator("//div[@id='cart']");
        this.currency = page.locator("#form-currency");
    }


    //common functionalities across the webpages:

    async isLogoVisible(): Promise<boolean> {

        return await this.logo.isVisible();

    }
    async seacrhBoxEditable(): Promise<boolean> {

        return await this.searchBar.isEditable();
    }
    async searchIconVisible(): Promise<boolean> {

        return await this.searchIcon.isVisible();
    }
    async isCurrencyBoxVisible(): Promise<boolean> {
        return await this.currency.isVisible();

    }
    async isCartButtonvisible(): Promise<boolean> {

        return this.shoppingCartBtn.isVisible();
    }

    async getPageFooterCount(): Promise<number> {
        let footerArray: string[] = await this.footer.allInnerTexts();
        console.log(footerArray.length);
        console.log(footerArray);
        return footerArray.length;

        // return await this.footer.count();
    }
    async getPageFooters(): Promise<void> {

        let footerArray: string[] = await this.footer.allInnerTexts();
        console.log(footerArray);

    }

    //page level generic functions:

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getCurrentURL(): Promise<string> {
        return await this.getCurrentURL();

    }
    async waitForPageLoad(): Promise<void> {

        this.page.waitForLoadState("load");

    }
}