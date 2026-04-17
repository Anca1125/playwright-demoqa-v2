import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class WidgetsPage extends BasePage {
  readonly widgets: Locator;
  readonly accordian: Locator;
  readonly firstTitle: Locator;
  readonly secondTitle: Locator;
  readonly thirdTitle: Locator;
  readonly contentBody: Locator;

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
}
