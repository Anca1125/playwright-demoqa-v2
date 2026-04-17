import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class FormsPage extends BasePage {
  readonly forms: Locator;
  readonly practiceForm: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  //readonly genderOption: Locator;
  readonly mobileInput: Locator;
  readonly DOBInput: Locator;
  readonly subjectsInput: Locator;
  readonly hobbiesOption: Locator;
  readonly pictureInput: Locator;
  readonly currentAddressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.forms = page.getByText("Forms", { exact: true });
    this.practiceForm = page.getByText("Practice Form", { exact: true });
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.emailInput = page.locator("#userEmail");
    //this.genderOption = page.locator('input[name="gender"]');
    this.mobileInput = page.locator("#userNumber");
    this.DOBInput = page.locator("#dateOfBirthInput");
    this.subjectsInput = page.locator("#subjectsInput");
    this.hobbiesOption = page.locator('input[type="checkbox"]');
    this.pictureInput = page.locator("#uploadPicture");
    this.currentAddressInput = page.locator("#currentAddress");
    this.stateInput = page.locator("#state");
    this.cityInput = page.locator("#city");
    this.submitButton = page.locator("#submit");
  }

  async openPracticeForm() {
    await this.forms.click();
    await this.practiceForm.click();
  }

  async fillForm(user: {
    firstName: string;
    lastName: string;
    email: string;
    gender: "Male" | "Female" | "Other";
    mobile: string;
    DOB: string;
    subjects: string;
    hobbies: string;
    picture: string;
    address: string;
    state: string;
    city: string;
  }) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.selectGenderOption(user.gender);
    await this.mobileInput.fill(user.mobile);
    await this.DOBInput.fill(user.DOB);
    //await this.subjectsInput.fill(user.subjects);
    await this.selectHobby(user.hobbies);
    await this.uploadPicture(user.picture);
    await this.currentAddressInput.fill(user.address);
    await this.selectState(user.state);
    await this.selectCity(user.city);
  }

  async selectGenderOption(gender: "Male" | "Female" | "Other") {
    await this.page.getByLabel(gender).click();
  }

  async fillSubjects(subject: string) {
    await this.subjectsInput.scrollIntoViewIfNeeded();
    await this.subjectsInput.click();

    await this.subjectsInput.fill(subject.substring(0, 2));

    const option = this.page.locator(".subjects-auto-complete__option", {
      hasText: subject,
    });

    await option.waitFor({ state: "visible" });
    await option.click();

    await this.subjectsInput.press("Escape");
  }
  async selectHobby(hobby: string) {
    await this.page.getByLabel(hobby).click();
  }
  async uploadPicture(path: string) {
    await this.pictureInput.setInputFiles(path);
  }
  async selectState(state: string) {
    await this.stateInput.click();
    await this.page.getByText(state).click();
  }
  async selectCity(city: string) {
    await this.cityInput.click();
    await this.page.getByText(city).click();
  }
}
