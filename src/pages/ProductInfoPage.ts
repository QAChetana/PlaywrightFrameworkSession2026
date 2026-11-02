import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';


export class ProductInfoPage extends BasePage {

    private readonly productHeader: Locator;
    private readonly productMetaData: Locator;// (//div[@class='col-sm']/ul[@class='list-unstyled'])[1]
    private readonly productPrice: Locator;// or (//div[@class='col-sm']/ul[@class='list-unstyled'])[2]
    private readonly productImages: Locator;
    private readonly map: Map<string, string>;
    private readonly successMsgToCart: Locator;
    private readonly successMsgClose: Locator;
    private readonly addToCartBtn:Locator;
    private readonly prodName:Locator;
    //private readonly shoppingCartBtn:Locator;
    private readonly noOfProducts:Locator;
    private readonly myMap:Map<string,string>;
    private readonly removeProd:Locator;
    private readonly removeMsg:Locator;
    private readonly viewCartLink:Locator;
    private readonly removeMsgBtn:Locator;
    private readonly noOfItems:Locator;
    private readonly prod_price:Locator;
    private readonly totalTag:Locator;
    private readonly totalValue:Locator;
    private readonly model:Locator;
    private readonly cartEmptyMsg:Locator;

    constructor(page: Page) {
        super(page);
        this.productHeader = page.locator("//h1");
        this.productMetaData = page.locator("(//div[@class='col-sm']/ul[@class='list-unstyled'])[1]/li");
        this.productPrice = page.locator("(//div[@class='col-sm']/ul[@class='list-unstyled'])[2]//span");
        this.productImages = page.locator("//div[@class='image magnific-popup']/div//img");
        this.map = new Map<string, string>();
        this.successMsgToCart=page.locator("//div[@class='alert alert-success alert-dismissible']");
        this.successMsgClose=page.locator("//div[@class='alert alert-success alert-dismissible']//button[@type='button']")
        this.addToCartBtn = page.locator("//button[@id='button-cart']");
        //this.shoppingCartBtn = page.locator("//div[@id='cart']");
        //button[@type='button' and @class='btn btn-lg btn-dark d-block dropdown-toggle']
        this.noOfProducts = page.locator("//table[@class='table table-striped mb-2']//tr");
        this.cartEmptyMsg = page.locator("//ul/li[text()='Your shopping cart is empty!']");

        this.noOfItems = page.locator("//form[input[@name='key']]/parent::td/preceding-sibling::td[2]"); 
        this.prod_price = page.locator("//form[input[@name='key']]/parent::td/preceding-sibling::td[1]");
        this.totalTag = page.locator("//td[@class='text-end']/strong[text()='Total']");
        this.totalValue = page.locator("//tr/td[@class='text-end']/strong[text()='Total']/../following-sibling::td");
        this.model = page.locator("//ul[@class='list-unstyled mb-0']/li[1]/small");


        this.myMap = new Map<string,string>();
        this.prodName = this.page.locator("//td[2]/a");
        //this.removeProd = this.page.locator(" //button[@class='btn btn-danger']");
        this.removeProd= page.getByRole('button', { name: 'Remove' });
        this.removeMsg = this.page.locator("//div[@class='alert alert-success alert-dismissible']");
        this.removeMsgBtn = this.page.locator("//div[@class='alert alert-success alert-dismissible']/button[@type='button']");
        this.viewCartLink = this.page.locator("//div/p[@class='text-end']/a[@href='https://opencart.nltechtrainings.com/en-gb?route=checkout/cart' ]");
    }
    


    async getproductHeader(): Promise<string> {

        return this.productHeader.innerText();
    }

    async getProductImagesCount(): Promise<number> {

        await this.productImages.first().waitFor({ state: "visible" });
        return await this.productImages.count();
    }

    async getProductMetaData(): Promise<void> {

        this.productMetaData.first().waitFor({ state: "visible" });
        let metaInfo: string[] = await this.productMetaData.allInnerTexts();

        for (let data of metaInfo) {
            let meta: string[] = data.split(":");// 0th[brand:apple]
            let metaKey = meta[0].trim();///0th[brand]
            let metaValue = meta[1].trim();//1st[apple]

            this.map.set(metaKey, metaValue);
        }
    }



    async getProductPrice(): Promise<void> {

        let priceInfo = await this.productPrice.innerText();

        this.map.set("Product Price", priceInfo);
    }



    async getCompleteProductInfo(): Promise<Map<string, string>> {

        await this.getProductMetaData();
        await this.getProductPrice();
        return this.map;
    }


async doAddToCart(quantity:number){
     let qty = this.page.locator("//input[@name='quantity']");
       console.log("Qty is editable?: "+await qty.isEditable());
       console.log(`The quantity selected is : ${quantity}`);
      qty.fill(`${quantity}`);
    await this.addToCartBtn.click();
}

async getItemsTotal():Promise<{count:number,total:number}>{

let itemArray:string[] = await this.noOfItems.allInnerTexts();
 let count=0;
for(let item of itemArray){
      let no = item.split(" ");
      let no_x = no[0].trim();
      let no_value = no[1].trim();

      let num = Number(no_value);
    count+= num;

}
let tot=await  this.totalValue.innerText();
let cleantot = tot.replace(/[$,]/g,'');
let total = Number(cleantot);

 return({count,total});
}


async checkShoppingCartBtn():Promise<{count:number,total:number}>{
//To check once the product is added from AddToCart, the product is added to the shopping cart btn displaying the no. of item and total price

 let itemPrice:string = await this.shoppingCartBtn.innerText();
 console.log(itemPrice);
 
  // 2. Remove commas so "$7,500.00" becomes "$7500.00"
  const cleanString = itemPrice.replace(/[$,]/g, '');


    // 3. Extract the numeric values using regex
  const matches = cleanString.match(/\d+(\.\d+)?/g);

if (matches && matches.length >= 2) {
    
     let  parsedcount = Number(matches[0]);
     let  parsedtotal =Number(matches[1]);


      return{
        count:isNaN(parsedcount) ? 0: parsedcount,
        total:isNaN(parsedtotal) ? 0: parsedtotal
      };
    
  }

 return { count: 0, total: 0 };;


}




async getSuccessMsg():Promise<string>{

    let displayAddToCartMsg: string = await this.successMsgToCart.innerText();
     this.successMsgClose.click();
    return displayAddToCartMsg;
} 

async getRemoveMsg():Promise<string>{

    let removeItem:string = await this.removeMsg.innerText();
    console.log(removeItem);
    await this.removeMsgBtn.click();
    return removeItem;

}


async clickOnShoppingCart():Promise<Array<{count:number,allnames:string[]}>>{
   
    await this.shoppingCartBtn.click();
   let productCount = await this.noOfProducts.count();
    let productNames = await this.noOfProducts.allInnerTexts();
    return [
        {
            count:productCount,
            allnames:productNames
        }
    ];
}


async getProductNameQtyPrice():Promise<Map<string,string>[]>{
 await this.shoppingCartBtn.click();

let productCount = await this.noOfProducts.count();
 let prod_name = await this.prodName.allInnerTexts();
let prod_code:string[] =await  this.model.allInnerTexts();
let qty:string[] = await this.noOfItems.allInnerTexts();
let price:string[] = await this.prod_price.allInnerTexts();
let totalText:string = await this.totalTag.innerText();
let totalValue:string = await this.totalValue.innerText();

let finalArrayOfMaps:Map<string,string>[]=[];

for(let i=0;i< productCount; i++){

    let itemMap = new Map<string,string>();

        itemMap.set(`Product Name`,prod_name[i]);

if(prod_code[i]){
let modelarray = prod_code[i].split(":");
let model_key = modelarray[0].trim();
let model_value = modelarray[1].trim();
itemMap.set(model_key,model_value);
}

itemMap.set(`Quantity`,qty[i]);
itemMap.set(`Price`,price[i]);

itemMap.set(totalText,totalValue);

finalArrayOfMaps.push(itemMap);
}



return finalArrayOfMaps;

}
async clearCart() {
  // 1. Navigate directly to the main shopping cart page layout
  // (Change this URL to whatever your application's direct cart link is, e.g., '/cart' or 'index.php?route=checkout/cart')
  await this.page.goto('index.php?route=checkout/cart');
  await this.page.waitForLoadState('networkidle');

  // 2. Read the product counts cleanly from the main page view
  let prodlength = await this.removeProd.count();

  if (prodlength > 0) {
    console.log("The no. of products detected on the cart page: " + prodlength);

    while (prodlength > 0) {
      // 3. Click the first delete/remove button on the standalone page row
      await this.removeProd.first().click();
      
      // Let the page reload or update its table rows
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(500);
      
      // Re-evaluate counter
      prodlength = await this.removeProd.count();
    }
    console.log("Cart cleared successfully via the Cart Page!");
  } else {
    console.log("Your cart is already empty!");
  }
}

async removeProducts(productname:string){
this. prodName.first().waitFor({state:"visible"});
let prod_name:string[] = await this.prodName.allInnerTexts();
    for(let pname of prod_name){
        if(pname == productname){
           await this.removeProd.click();
            console.log(`${pname} is removed from the shopping cart`);
        }


    }
}



    async clickOnViewCartLink(){

        await this.viewCartLink.click();


    }
  
}



   
   




      //feature details://ul[@class='list-unstyled mb-0']/li/small
      
     


//div[@class='mb-3' and '#button-cart']



//view cart link
//   (//div[@id='cart']//ul//a)[3]

//checkout link
//    (//div[@id='cart']//ul//a)[4]