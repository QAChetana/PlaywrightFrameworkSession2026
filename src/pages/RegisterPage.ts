import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage{

private readonly firstName:Locator;
private readonly lastName:Locator;
private readonly eMail:Locator;
private readonly telePhone:Locator;
private readonly password:Locator;
private readonly confirmPassword:Locator;
private readonly subscribe_check:Locator;
private readonly PrivacyPolicy:Locator;
private readonly continueBtn:Locator;

private readonly warning:Locator;

constructor(page: Page){
super(page);
this.firstName = page.getByPlaceholder("First Name");
this.lastName = page.getByPlaceholder("Last Name");
this.eMail = page.getByRole("textbox",{name:"* E-Mail"});
this.telePhone = page.getByPlaceholder("Telephone");
this.password = page.getByRole("textbox",{name:"* Password",exact:true});
this.confirmPassword = page.getByRole("textbox",{name:"* Password Confirm"});
this.subscribe_check = page.getByRole("radio",{name:"Yes"});
this.PrivacyPolicy =  page.getByRole("checkbox");
this.continueBtn =  page.getByRole("button",{name:"Continue"});

this.warning = page.locator("//div[@class='alert alert-danger alert-dismissible']");
}

async goToRegister():Promise<void>{

    await this.page.goto("en-gb?route=account/register");
     
}

async getPageTitle(){

   return await this.page.title();
    
}

async registrationForm(fname:string,lname:string,email:string,tele:string,password:string,cpassword:string):Promise<string>{
       
    
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.eMail.fill(email);
        //Telephone is an integer value but playwright will parse and convert to string using : .toString() or `${}`
        //await this.telePhone.fill(tele.toString());
        await this.telePhone.fill(`${tele}`);
        await this.password.fill(password);
        await this.confirmPassword.fill(cpassword);

        await this.subscribe_check.check();
        await this.PrivacyPolicy.waitFor({state:"visible",timeout:2000});
        await this.PrivacyPolicy.check();
       
        await this.continueBtn.click();   

        await this.page.waitForTimeout(2000);

    
    return await this.page.locator("h1").innerText();
    


}






}



