import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class WidgetsPage extends BasePage {
  readonly widgets: Locator;
  readonly accordian: Locator;
  readonly firstTitle: Locator;
  readonly secondTitle: Locator;
  readonly thirdTitle: Locator;
  readonly contentBody: Locator;
  readonly autoComplete: Locator;
  readonly inputMultipleColors: Locator;
  readonly inputSingleColor: Locator;
  readonly inputFilledMultipleColors: Locator;
  readonly inputFilledSingleColor: Locator;

  constructor(page: Page) {
    super(page);
    this.widgets = page.getByText("Widgets", { exact: true });
    this.accordian = page.getByText("Accordian", { exact: true });
    this.firstTitle = page.getByRole("button", {
      name: "What is Lorem Ipsum?",
    });
    this.secondTitle = page.getByRole("button", {
      name: "Where does it come from?",
    });
    this.thirdTitle = page.getByRole("button", { name: "Why do we use it?" });
    this.contentBody = page.locator(".accordion-body");
    this.autoComplete = page.getByText("Auto Complete");
    this.inputMultipleColors = page.locator("#autoCompleteMultipleInput");
    this.inputSingleColor = page.locator("#autoCompleteSingleInput");
    this.inputFilledMultipleColors = page
      .locator(".auto-complete__control")
      .first();
    this.inputFilledSingleColor = page
      .locator(".auto-complete__control")
      .nth(1);
  }
  async openWidgets() {
    await this.widgets.click();
  }
  async openAccordian() {
    await this.accordian.click();
  }
  async clickOnFirstTitle() {
    await this.firstTitle.click();
  }
  async clickOnSecondTitle() {
    await this.secondTitle.click();
  }
  async clickOnThirdTitle() {
    await this.thirdTitle.click();
  }
  async openAutoComplete() {
    await this.autoComplete.click();
  }
  async fillMultipleColorInput(value: string) {
    await this.inputMultipleColors.fill(value);
  }
  async fillSingleColorInput(value: string) {
    await this.inputSingleColor.fill(value);
  }
}
