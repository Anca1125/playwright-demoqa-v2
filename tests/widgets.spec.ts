import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { WidgetsPage } from "../pages/widgets.page";

test.describe("widgets module", () => {
  let homePage: HomePage;
  let widgetsPage: WidgetsPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    widgetsPage = new WidgetsPage(page);

    await homePage.navigateToHome();

    await expect(page).toHaveURL("https://demoqa.com/");

    await widgetsPage.openWidgets();
  });

  test("widgets module - accordian - when cliking on first title, first content body should collapse", async ({
    page,
  }) => {
    await widgetsPage.openAccordian();

    await expect(widgetsPage.contentBody.first()).toBeVisible();

    await widgetsPage.clickOnFirstTitle();

    await expect(widgetsPage.contentBody.first()).toBeHidden();
  });

  test("widgets module - accordian - when cliking on the second title, first content body should collapse and second content body should expand", async ({
    page,
  }) => {
    await widgetsPage.openAccordian();

    await expect(widgetsPage.contentBody.first()).toBeVisible();
    await expect(widgetsPage.contentBody.nth(1)).toBeHidden();

    await widgetsPage.clickOnSecondTitle();

    await expect(widgetsPage.contentBody.first()).toBeHidden();
    await expect(widgetsPage.contentBody.nth(1)).toBeVisible();
  });

  test("widgets module - accordian - user can open third section and other sections collapse", async ({
    page,
  }) => {
    await widgetsPage.openAccordian();

    await expect(widgetsPage.contentBody.first()).toBeVisible();
    await expect(widgetsPage.contentBody.nth(1)).toBeHidden();
    await expect(widgetsPage.contentBody.nth(2)).toBeHidden();

    await widgetsPage.clickOnThirdTitle();

    await expect(widgetsPage.contentBody.first()).toBeHidden();
    await expect(widgetsPage.contentBody.nth(1)).toBeHidden();
    await expect(widgetsPage.contentBody.nth(2)).toBeVisible();
  });

  test("widgets module - accordian - user can open and close third section", async ({
    page,
  }) => {
    await widgetsPage.openAccordian();

    await expect(widgetsPage.contentBody.first()).toBeVisible();
    await expect(widgetsPage.contentBody.nth(1)).toBeHidden();
    await expect(widgetsPage.contentBody.nth(2)).toBeHidden();

    await widgetsPage.clickOnThirdTitle();

    await expect(widgetsPage.contentBody.first()).toBeHidden();
    await expect(widgetsPage.contentBody.nth(1)).toBeHidden();
    await expect(widgetsPage.contentBody.nth(2)).toBeVisible();

    await widgetsPage.clickOnThirdTitle();

    await expect(widgetsPage.contentBody.first()).toBeHidden();
    await expect(widgetsPage.contentBody.nth(1)).toBeHidden();
    await expect(widgetsPage.contentBody.nth(2)).toBeHidden();
  });

  test("widgets module - auto complete - user can fill input with multiple colors", async ({
    page,
  }) => {
    await widgetsPage.openAutoComplete();
    await widgetsPage.fillMultipleColorInput("Yellow");
    await page.keyboard.press("Enter");
    await widgetsPage.fillMultipleColorInput("Green");
    await page.keyboard.press("Enter");
    await widgetsPage.fillMultipleColorInput("Indigo");
    await page.keyboard.press("Enter");

    await expect(widgetsPage.inputFilledMultipleColors).toContainText("Yellow");
    await expect(widgetsPage.inputFilledMultipleColors).toContainText("Green");
    await expect(widgetsPage.inputFilledMultipleColors).toContainText("Indigo");
  });

  test("widgets module - auto complete - user can fill input with a single color", async ({
    page,
  }) => {
    await widgetsPage.openAutoComplete();
    await widgetsPage.fillSingleColorInput("Yellow");
    await page.keyboard.press("Enter");

    await expect(widgetsPage.inputFilledSingleColor).toContainText("Yellow");
  });

  test("widgets modul - date picker - user can select day, month and year", async ({
    page,
  }) => {
    await widgetsPage.openDatePicker();
    await widgetsPage.selectDate("04/04/2026");

    await expect(widgetsPage.dateInput).toHaveValue("04/04/2026");
  });

  test("widgets module - date picker - user can select a specific date and time ", async ({
    page,
  }) => {
    await widgetsPage.openDatePicker();
    await widgetsPage.selectDateAndTime();

    await expect(widgetsPage.dateAndTimeInput).toBeVisible();
  });

  test("widgets module - date picker - user can select current day and time ", async ({
    page,
  }) => {
    await widgetsPage.openDatePicker();
    await widgetsPage.selectTodayAndTime();

    await expect(widgetsPage.dateAndTimeInput).toBeVisible();
  });

  test("widgets module - slider - user can move slider and change the value", async ({
    page,
  }) => {
    await widgetsPage.openSlider();
    await widgetsPage.changeSlider(30);

    await expect(widgetsPage.inputSlider).toHaveValue("30");
  });
});
