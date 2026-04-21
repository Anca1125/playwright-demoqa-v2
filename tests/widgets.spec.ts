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

  test("widgets module - progress bar - user can start progress bar", async ({
    page,
  }) => {
    await widgetsPage.openProgressBarPage();
    await widgetsPage.startProgressBar();

    await expect(widgetsPage.progressBar).toHaveText("100%", {
      timeout: 15000,
    });
  });
  test("widget module - progress bar - user can start and stop progress bar", async ({
    page,
  }) => {
    await widgetsPage.openProgressBarPage();
    await widgetsPage.startProgressBar();
    await page.waitForTimeout(5000);
    await widgetsPage.startProgressBar();

    const valueText = await widgetsPage.progressBar.textContent();
    const value = Number(valueText?.replace("%", ""));

    expect(value).toBeGreaterThanOrEqual(45);
    expect(value).toBeLessThanOrEqual(55);
  });

  test("widget module - progress bar - user can reset the progress bar", async ({
    page,
  }) => {
    await widgetsPage.openProgressBarPage();
    await widgetsPage.startProgressBar();

    await expect(widgetsPage.progressBar).toHaveText("100%", {
      timeout: 15000,
    });
    await expect(widgetsPage.resetButton).toBeVisible();

    await widgetsPage.resetProgressBar();

    await expect(widgetsPage.progressBar).toHaveText("0%");
  });

  test("widgets module - tabs - user can open what tab", async ({ page }) => {
    await widgetsPage.openTabPage();
    await widgetsPage.openWhatTab();

    await expect(widgetsPage.whatContent).toContainText(
      "Lorem Ipsum is simply dummy text ",
    );
  });

  test("widgets module - tabs - user can open origin tab", async ({ page }) => {
    await widgetsPage.openTabPage();
    await widgetsPage.openOriginTab();

    await expect(widgetsPage.originContent).toContainText(
      "Contrary to popular belief",
    );
  });

  test("widgets module - tabs - user can open use tab", async ({ page }) => {
    await widgetsPage.openTabPage();
    await widgetsPage.openUseTab();

    await expect(widgetsPage.useContent).toContainText(
      "It is a long established fact that",
    );
  });

  test("widgets module - tabs - user can switch tabs", async ({ page }) => {
    await widgetsPage.openTabPage();
    await widgetsPage.openWhatTab();

    await expect(widgetsPage.whatContent).toContainText(
      "Lorem Ipsum is simply dummy text ",
    );

    await widgetsPage.openOriginTab();

    await expect(widgetsPage.originContent).toContainText(
      "Contrary to popular belief",
    );
  });

  test("widgets module - tool tips - user can hover over the button", async ({
    page,
  }) => {
    await widgetsPage.openToolTips();
    await widgetsPage.hoverOverTheButton();

    await expect(page.getByText("You hovered over the button")).toBeVisible();
  });

  test("widgets module - tool tips - user can hover over the textField", async ({
    page,
  }) => {
    await widgetsPage.openToolTips();
    await widgetsPage.hoverOverTheTextField();

    await expect(
      page.getByText("You hovered over the text field"),
    ).toBeVisible();
  });

  test("widgets module - tool tips - user can hover over the Link", async ({
    page,
  }) => {
    await widgetsPage.openToolTips();
    await widgetsPage.hoverOverTheLink();

    await expect(page.getByText("You hovered over the Contrary")).toBeVisible();
  });

  test("widgets test - menu - user cand open submenu", async ({ page }) => {
    await widgetsPage.openMenu();
    await widgetsPage.mainItem2.hover();

    await expect(page.getByText("SUB SUB LIST")).toBeVisible();
  });
});
