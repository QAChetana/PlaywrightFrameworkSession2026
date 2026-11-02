import{Locator,Page} from '@playwright/test';
import { BasePage } from '../pages/BasePage.js'

export class SearchResultsPage extends BasePage{


private readonly seacrhPageHeader:Locator;

 private readonly   productResult:Locator;

 private readonly dropdown:Locator;

constructor(page:Page){

    super(page);

    this.seacrhPageHeader = page.locator("h1");
    this.productResult = this.page.locator("//div[@class='product-thumb']");
    this.dropdown = this.page.locator("//select[@id='input-option-226']");

}

async getSeacrhResultsPageHeader(product:string):Promise<string>{
    return  await this.seacrhPageHeader.innerText();
}

async getSeacrhResultsCount():Promise<number>{


let totalCount = await this.productResult.count();
console.log("Total search results: "+totalCount);
return totalCount;
}

async selectAndClickOnProduct(productName:string):Promise<string>{

    
console.log(`Clicking on the product with name: ${productName}`);
//await this.page.locator(`//a[text()='${productName}']`).click();
//let productLocator = this.page.locator(`//img[contains(@alt,'${productName}')]`);

let productLocator = this.page.locator(`//h4/a[text()='${productName}']`);


// if(productName==='Canon EOS 5D'){
// await this.dropdown.selectOption({label:"Red"});
//await page.getByLabel('Select').selectOption('15');
// }

await productLocator.click();

return (`${productName}`);




}
}