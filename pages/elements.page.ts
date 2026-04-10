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
  readonly webTables: Locator;
  readonly addItems: Locator;
  readonly searchInput: Locator;
  readonly editItem: Locator;
  readonly deleteItem: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInputForm: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;
  readonly submitForm: Locator;

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
    this.webTables = page.getByText("Web Tables", { exact: true });
    this.addItems = page.locator("#addNewRecordButton");
    this.searchInput = page.locator("#searchBox");
    this.editItem = page.locator('[title="Edit"]');
    this.deleteItem = page.locator('[title="Delete"]');
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.emailInputForm = page.locator("#userEmail");
    this.ageInput = page.locator("#age");
    this.salaryInput = page.locator("#salary");
    this.departmentInput = page.locator("#department");
    this.submitForm = page.locator("#submit");
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
  async openWebTables() {
    await this.webTables.click();
  }
  async addNewRecord() {
    await this.addItems.click();
  }
  async addDataForNewRecord(user: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    salary: string;
    departament: string;
  }) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInputForm.fill(user.email);
    await this.ageInput.fill(user.age);
    await this.salaryInput.fill(user.salary);
    await this.departmentInput.fill(user.departament);
  }
  async clickSubmitForm() {
    await this.submitForm.click();
  }
  async searchRecord(value: string) {
    await this.searchInput.fill(value);
  }
  async editRecord() {
    await this.editItem.first().click();
  }

  async deleteRecord() {
    await this.deleteItem.first().click();
  }
  async deleteRecordByEmail(email: string) {
    const row = this.page.locator(".rt-tr-group", {
      hasText: email,
    });

    await row.locator('[title="Delete"]').click();
  }
}
