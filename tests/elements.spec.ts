import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ElementsPage } from "../pages/elements.page";

test.describe("text Box form tests", () => {
  let homePage: HomePage;
  let elementsPage: ElementsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);

    await homePage.navigateToHome();
    await homePage.clickElements();
    await elementsPage.openTextBox();

    await expect(page).toHaveURL(/text-box/);
  });

  test("user can submit Text Box form", async ({ page }) => {
    await elementsPage.fillFullName("Misu Iliuta");
    await elementsPage.fillEmailAddress("misu@iliuta.com");
    await elementsPage.fillCurrentAddress("Strada Principala");
    await elementsPage.fillPermanentAddress("strada secundara");
    await elementsPage.clickSubmitButton();

    await expect(page.locator("#name")).toContainText("Misu Iliuta");
    await expect(page.locator("#output")).toBeVisible();
    await expect(page.locator("#email")).toContainText("misu@iliuta.com");
  });

  test("user cannot submit form with blank fields", async ({ page }) => {
    await elementsPage.fillFullName("");
    await elementsPage.fillEmailAddress("");
    await elementsPage.fillCurrentAddress("");
    await elementsPage.fillPermanentAddress("");
    await elementsPage.clickSubmitButton();

    await expect(page.locator("#name")).toHaveCount(0);
  });

  test("user cannot submit form with an invalid email", async ({ page }) => {
    await elementsPage.fillFullName("Misu Iliuta");
    await elementsPage.fillEmailAddress("misu.iliuta.com");
    await elementsPage.fillCurrentAddress("Strada Principala");
    await elementsPage.fillPermanentAddress("strada secundara");
    await elementsPage.clickSubmitButton();

    await expect(elementsPage.emailInput).toHaveClass(/field-error/);
  });
});
