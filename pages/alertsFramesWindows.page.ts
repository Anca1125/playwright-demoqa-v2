import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class AltertsFramesWindows extends BasePage {
  readonly browserWindow: Locator;
  readonly newTab: Locator;
  readonly newWindow: Locator;
  readonly NewWindowMessage: Locator;
  constructor(page: Page) {
    super(page);
  }
}
