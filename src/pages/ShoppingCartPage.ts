import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';


export class ShoppingCartPage extends BasePage {

    private readonly shoppingCartHeader: Locator;
    private readonly updateQTYBox: Locator;
    private readonly updateBtn: Locator;
    private readonly updateMsg: Locator;
    private readonly updateMsgClose: Locator;

    private readonly removebtn: Locator;
    private readonly prodname:Locator;
    private readonly itemRemoveMsg: Locator;
    private readonly itemRemoveMsgclose:Locator;

    private readonly noStockMsg: Locator;
    private readonly noStockMsgClose: Locator;

    private readonly estAccordion: Locator;
    private readonly countryDD: Locator;
    private readonly stateDD: Locator;
    private readonly postCode: Locator;
    private readonly getQuotesBtn: Locator;
    private readonly modalOptions:Locator;
    private readonly flatRate:Locator;
    private readonly applyShippingBtn:Locator;
    private readonly successMsg:Locator;
    private readonly successMsgBtn:Locator;
    private readonly checkoutBtn: Locator;
    private readonly Continue: Locator;

    constructor(page: Page) {
        super(page);
        this.shoppingCartHeader = this.page.locator("//h1");
        this.updateQTYBox = this.page.locator("//div/input[@name='quantity']");
        this.updateMsg = this.page.locator("//div[@class='alert alert-success alert-dismissible' and text()=' Success: You have modified your shopping cart! ']");
        this.updateMsgClose = this.page.locator("//div[@class='alert alert-success alert-dismissible']/button[@type='button']");
        this.updateBtn = this.page.locator("//button[@aria-label='Update']");

        this.prodname = this.page.locator("//tr/td[@class='text-start text-wrap']/a");
        this.removebtn = this.page.locator("//div/a[@aria-label='Remove']");
        this.itemRemoveMsg = this.page.locator("//div[@class = 'alert alert-success alert-dismissible' and text()=' Success: You have removed an item from your shopping cart! ' ]");
        this.itemRemoveMsgclose = this.page.locator("//div[@class = 'alert alert-success alert-dismissible' and text()=' Success: You have removed an item from your shopping cart! ' ]/button")
        this.noStockMsg = this.page.locator("//no stock--//div[@class='alert alert-danger alert-dismissible' and text()=' Products marked with *** are not available in the desired quantity or not in stock! ']");
        this.noStockMsgClose = this.page.locator("//div[@class='alert alert-danger alert-dismissible']/ button[@type='button']");

        this.estAccordion = this.page.locator("//div[@class='accordion-item']//button[@class='accordion-button']");
        this.countryDD = this.page.locator("select[id =input-country]");
        this.stateDD = this.page.locator("select[id =input-zone]");
        this.postCode = this.page.locator("//input[@id = 'input-postcode']");
        this.getQuotesBtn = this.page.locator("//button[@id = 'button-quote']");
        this.modalOptions = this.page.locator("//h4[text()='Shipping method options']");
        this.flatRate = this.page.locator("//div/input[@id='input-shipping-method-flat-flat']");
        this.applyShippingBtn = this.page.locator("//div/button[@id='button-shipping-method']");
        this.successMsg = this.page.locator("//div[@class='alert alert-success alert-dismissible' and text()=' Success: Your shipping estimate has been applied! ']");
        this.successMsgBtn = this.page.locator("//div[@class='alert alert-success alert-dismissible' ]//button");
        this.checkoutBtn = this.page.locator("//div[@class='col text-end']/a");
        this.Continue = this.page.locator("//div[@class='col']/a");

    }


async getPageHeader():Promise<string>{

   return await this.shoppingCartHeader.innerText();
    
}
async doQuantityUpdate(quantity:number):Promise<string>{
    await this.updateQTYBox.fill(`${quantity}`);
   await this.updateBtn.click();
   await this.page.waitForTimeout(500);
  let updateSuccessMsg = await this.updateMsg.innerText();
  console.log(updateSuccessMsg);
  await this.updateMsgClose.click();
  return updateSuccessMsg;

    
}

async removeProduct(prodName:string){

    await this.removebtn.first().waitFor({state:"visible"});
    console.log("The count before removal is :" +await this.removebtn.count());
   let prodArray:string[] = await this.prodname.allInnerTexts();
    for(let product of prodArray){
        if(product === prodName)
             await this.removebtn.click();

    }
   let text = await this.itemRemoveMsg.innerText();

   console.log(text);
   await this.itemRemoveMsgclose.click();

      
      console.log("Now the final count is: "+  await this.removebtn.count());
    

}
async getShippingEst(country:string,state:string,option:boolean,post?:string):Promise<{msg:string,option:boolean}>{

await this.estAccordion.click();
this.countryDD.click();
await this.countryDD.selectOption({label:`${country}`});
await this.stateDD.selectOption({label:`${state}`});
await this.postCode.fill(`${post}`);

await this.getQuotesBtn.click();
await this.page.waitForTimeout(500);

console.log(await this.modalOptions.isVisible());
await this.flatRate.click();

let msg= await this.successMsg.innerText();
this.successMsgBtn.click();

if(option){
 await this.checkoutBtn.click();
}else{
await this.Continue.click();
}


return({msg,option});


}

}