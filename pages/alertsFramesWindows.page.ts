import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class AlertsFramesWindows extends BasePage {
  readonly browserWindow: Locator;
  readonly newTab: Locator;
  readonly newWindow: Locator;
  readonly newWindowMessage: Locator;
  readonly alertsButtons: Locator;
  readonly simpleAltertButton: Locator;
  readonly timerAlertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  constructor(page: Page) {
    super(page);
    this.browserWindow = page.getByText("Browser Windows");
    this.newTab = page.locator("#tabButton");
    this.newWindow = page.locator("#windowButton");
    this.newWindowMessage = page.locator("#messageWindowButton");
    this.alertsButtons = page.getByText("Alerts", { exact: true });
    this.simpleAltertButton = page.locator("#alertButton");
    this.timerAlertButton = page.locator("#timerAlertButton");
    this.confirmButton = page.locator("#confirmButton");
    this.promptButton = page.locator("#promtButton");
  }
  async openBrowserWindow() {
    await this.browserWindow.click();
  }
  async clickOnNewTab() {
    await this.newTab.click();
  }
  async clickOnNewWindow() {
    await this.newWindow.click();
  }
  async clickOnNewWindowMessage() {
    await this.newWindowMessage.click();
  }
  async openAlerts() {
    await this.alertsButtons.click();
  }
  async clickAlertButton() {
    await this.simpleAltertButton.click();
  }
  async clickTimerAlertButton() {
    await this.timerAlertButton.click();
  }
  async clickConfirmAlertButton() {
    await this.confirmButton.click();
  }
  async clickPromptButton() {
    await this.promptButton.click();
  }
}
