import { App } from "./world/cucumberWorld";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

let alertMessage: string;

Given("I navigate to the login page", async function (this: App) {
  await this.loginPage.navigateToLoginPage();
});

When("I type a Username {word}", async function (this: App, userName: string) {
  await this.loginPage.fillUserName(userName);
});

When("I type a Password {word}", async function (this: App, password: string) {
  await this.loginPage.fillPassword(password);
});

When("I click on the login submit button", async function (this: App) {
  this.loginPage.page.on("dialog", async (alert) => {
    alertMessage = alert.message();
    await alert.accept();
  });
  await this.loginPage.clickOnLoginButton();
});

Then(
  "The alert message wil be {string}",
  async function (this: App, expectedMessage: string) {
    expect(alertMessage).toBe(expectedMessage);
  }
);
