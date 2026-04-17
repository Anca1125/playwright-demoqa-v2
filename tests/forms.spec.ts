import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { FormsPage } from "../pages/forms.page";
import { validUser, invalidUser } from "../test-data/forms.data";

test.describe("forms module", () => {
  let homePage: HomePage;
  let formsPage: FormsPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    formsPage = new FormsPage(page);

    await homePage.navigateToHome();

    await expect(page).toHaveURL("https://demoqa.com/");

    await formsPage.openPracticeForm();

    await expect(page).toHaveURL("https://demoqa.com/automation-practice-form");
  });

  test("forms module - positive scenario - user can complete and submit practice form with valid data", async ({
    page,
  }) => {
    await formsPage.fillForm(validUser);
    await formsPage.submitButton.click({ force: true });

    const modal = page.locator(".modal-content");

    await expect(modal).toBeVisible();
    await expect(modal).toContainText(
      `${validUser.firstName} ${validUser.lastName}`,
    );
    await expect(modal).toContainText(validUser.email);
    await expect(modal).toContainText(validUser.gender);
    await expect(modal).toContainText(validUser.mobile);
    await expect(modal).toContainText(validUser.address);
    await expect(modal).toContainText(validUser.hobbies);
    await expect(modal).toContainText(`${validUser.state} ${validUser.city}`);
  });

  test("forms module - negative scenario - user can not complete and submit practice form with invalid data", async ({
    page,
  }) => {
    await formsPage.fillForm(invalidUser);
    await formsPage.submitButton.click({ force: true });

    await expect(page.locator(".modal-content")).not.toBeVisible();
  });
});
