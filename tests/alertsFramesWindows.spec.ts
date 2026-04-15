import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { AlertsFramesWindows } from "../pages/alertsFramesWindows.page";

test.describe("alerts, frames & windows", () => {
  let homePage: HomePage;
  let alertsPage: AlertsFramesWindows;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    alertsPage = new AlertsFramesWindows(page);
    await homePage.navigateToHome();
    await homePage.clickAlerts();
  });
  test("alerts module - browser windows - new tab", async ({
    page,
    context,
  }) => {
    await alertsPage.openBrowserWindow();

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      alertsPage.clickOnNewTab(),
    ]);

    await expect(newPage).toHaveURL("https://demoqa.com/sample");
  });

  test("alerts module - browser window - new window", async ({
    page,
    context,
  }) => {
    await alertsPage.openBrowserWindow();

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      alertsPage.clickOnNewWindow(),
    ]);

    await expect(newPage).toHaveURL("https://demoqa.com/sample");
  });

  test("alerts module - browser window - new window message", async ({
    page,
    context,
  }) => {
    await alertsPage.openBrowserWindow();

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      alertsPage.clickOnNewWindowMessage(),
    ]);

    const text = await newPage.locator("body").textContent();

    expect(text).toContain("Knowledge increases by sharing");
  });

  test("alerts module - alerts - click button to see simple alert", async ({
    page,
  }) => {
    await alertsPage.openAlerts();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("You clicked a button");
      await dialog.accept();
    });
    await alertsPage.clickAlertButton();
  });

  test("alerts module - alerts - timer alert", async ({ page }) => {
    await alertsPage.openAlerts();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("This alert appeared after 5 seconds");
      await dialog.accept();
    });
    await alertsPage.clickTimerAlertButton();
  });

  test("alerts module - alerts - confirm alert", async ({ page }) => {
    await alertsPage.openAlerts();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Do you confirm action?");
      await dialog.accept();
    });
    await alertsPage.clickConfirmAlertButton();

    await expect(page.locator("#confirmResult")).toContainText(
      "You selected Ok",
    );
  });

  test("alerts module - alerts - dismiss alert", async ({ page }) => {
    await alertsPage.openAlerts();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Do you confirm action?");
      await dialog.dismiss();
    });
    await alertsPage.clickConfirmAlertButton();

    await expect(page.locator("#confirmResult")).toContainText(
      "You selected Cancel",
    );
  });

  test("alerts module - alerts - prompt alert", async ({ page }) => {
    await alertsPage.openAlerts();

    page.on("dialog", async (dialog) => {
      await dialog.accept("Anca");
    });

    await alertsPage.clickPromptButton();

    await expect(page.locator("#promptResult")).toContainText(
      "You entered Anca",
    );
  });
});
