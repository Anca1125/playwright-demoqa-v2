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
});
