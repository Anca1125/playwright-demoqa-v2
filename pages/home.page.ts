import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly elementsCard: Locator;
  readonly formsCard: Locator;
  readonly alertsCard: Locator;
  readonly widgetsCard: Locator;
  readonly interactionsCard: Locator;
  readonly bookstoreCard: Locator;
  constructor(page: Page) {
    super(page);

    this.elementsCard = page
      .locator(".card-body")
      .filter({ hasText: "Elements" });
    this.formsCard = page.locator(".card-body").filter({ hasText: "Forms" });
    this.alertsCard = page
      .locator(".card-body")
      .filter({ hasText: "Alerts, Frame & Windows" });
    this.widgetsCard = page
      .locator(".card-body")
      .filter({ hasText: "Widgets" });
    this.interactionsCard = page
      .locator(".card-body")
      .filter({ hasText: "Interactions" });
    this.bookstoreCard = page
      .locator(".card-body")
      .filter({ hasText: "Book Store Application" });
  }

  async navigateToHome() {
    await this.page.goto("/");
  }

  async clickElements() {
    await this.elementsCard.click();
  }
  async clickForms() {
    await this.formsCard.click();
  }
  async clickAlerts() {
    await this.alertsCard.click();
  }
  async clickWidgets() {
    await this.widgetsCard.click();
  }
  async clickInteractions() {
    await this.interactionsCard.click();
  }
  async clickBookStore() {
    await this.bookstoreCard.click();
  }
}
