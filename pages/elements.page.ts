import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ElementsPage extends BasePage {
  readonly textBox: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  constructor(page: Page) {
    super(page);

    this.textBox = this.textBox = page
      .locator(".element-list")
      .getByText("Text Box");
    this.fullNameInput = page.locator("#userName");
    this.emailInput = page.locator("#userEmail");
    this.currentAddressInput = page.locator("#currentAddress");
    this.permanentAddressInput = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");
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
}
