import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ElementsPage extends BasePage {
  readonly textBox: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly checkBox: Locator;
  readonly checkBoxMenu: Locator;
  readonly homeCheckBox: Locator;
  readonly result: Locator;
  readonly desktopCheckbox: Locator;
  readonly radioButton: Locator;
  readonly yesRadioButton: Locator;
  readonly impressiveRadioButton: Locator;
  readonly noRadioButton: Locator;
  readonly resultRadioButton: Locator;
  constructor(page: Page) {
    super(page);

    this.textBox = page.locator(".element-list").getByText("Text Box");
    this.fullNameInput = page.locator("#userName");
    this.emailInput = page.locator("#userEmail");
    this.currentAddressInput = page.locator("#currentAddress");
    this.permanentAddressInput = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");
    this.checkBox = page.locator(".element-list").getByText("Check Box");
    this.checkBoxMenu = page.getByText("Check Box");
    this.homeCheckBox = page.getByLabel("Home");
    this.result = page.locator("#result");
    this.desktopCheckbox = page.getByText("Desktop");
    this.radioButton = page.getByText("Radio Button", { exact: true });
    this.yesRadioButton = page.locator("#yesRadio");
    this.impressiveRadioButton = page.locator("#impressiveRadio");
    this.noRadioButton = page.locator("#noRadio");
    this.resultRadioButton = page.locator(".text-success");
  }

  async openTextBox() {
    await this.textBox.scrollIntoViewIfNeeded();
    await this.textBox.click({ force: true });
  }
  async fillFullName(value: string) {
    await this.fullNameInput.fill(value);
  }
  async fillEmailAddress(value: string) {
    await this.emailInput.fill(value);
  }
  async fillCurrentAddress(value: string) {
    await this.currentAddressInput.fill(value);
  }
  async fillPermanentAddress(value: string) {
    await this.permanentAddressInput.fill(value);
  }
  async clickSubmitButton() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }
  async openCheckBox() {
    await this.checkBoxMenu.click();
  }
  async selectHome() {
    await this.homeCheckBox.click();
  }

  async selectDesktop() {
    await this.desktopCheckbox.click();
  }
  async openRadioButton() {
    await this.radioButton.click();
  }
  async checkYesRadioButton() {
    await this.yesRadioButton.click();
  }
  async checkImpressiveRadioButton() {
    await this.impressiveRadioButton.click();
  }
  async checkNoRadioButton() {
    await this.noRadioButton.click();
  }
}
