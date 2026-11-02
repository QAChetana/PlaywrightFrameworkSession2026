import {Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage.js'

export class LoginPage extends BasePage{


private readonly emailId:Locator

private readonly pword:Locator

private readonly loginBtn:Locator

private readonly forgotPwdLink:Locator


private readonly pageError1:Locator

private readonly pageError2:Locator

//page refernce of Page type
//initialize of class level variables
constructor(page:Page){
    super(page);
    this.emailId= page.locator("#input-email");
    this.pword= page.locator("#input-password");
    this.loginBtn = page.getByRole("button",{name:"Login"});
    this.forgotPwdLink= page.locator("(//a[text()='Forgotten Password'])[1]");
   
    this.pageError1= page.locator(".alert.alert-danger.alert-dismissible");
    this.pageError2 = page.locator("//div[@class='alert alert-danger alert-dismissible' and  contains(text(),' Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour. ')]")

}



    async goToLoginPage():Promise<void>{

        await this.page.goto("en-gb?route=account/login");
    }
    async getLoginPageTitle(): Promise<string> {

       return  await this.page.title();
    }
    async isForgotPasswordLinkAvaialable():Promise<boolean>{

        return await this.forgotPwdLink.isVisible();
    }

    async doLogin(username:string,password:string):Promise<void>{

        await this.emailId.fill(username);
        await this.pword.fill(password);
        await this.loginBtn.click();

        await this.page.waitForTimeout(5000);
    }   

    async getPageErrorMessage1():Promise<string>{
       
        return await this.pageError1.innerText();
      

        }

        async getPageErrorMessage2():Promise<string>{
              return await this.pageError2.innerText();
        }
       
  

    async newCustomer():Promise<void>{
    
    await this.page.getByRole("link",{name:"Continue"}).click();
}
}