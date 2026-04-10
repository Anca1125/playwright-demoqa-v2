import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ElementsPage } from "../pages/elements.page";
import { newUser, updateUser } from "../test-data/webTables.data";

test.describe("text Box form tests", () => {
  let homePage: HomePage;
  let elementsPage: ElementsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);

    await homePage.navigateToHome();
    await homePage.clickElements();
  });

  test("user can submit Text Box form", async ({ page }) => {
    await elementsPage.openTextBox();

    await expect(page).toHaveURL(/text-box/);

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
    await elementsPage.openTextBox();

    await expect(page).toHaveURL(/text-box/);

    await elementsPage.fillFullName("");
    await elementsPage.fillEmailAddress("");
    await elementsPage.fillCurrentAddress("");
    await elementsPage.fillPermanentAddress("");
    await elementsPage.clickSubmitButton();

    await expect(page.locator("#name")).toHaveCount(0);
  });

  test("user cannot submit form with an invalid email", async ({ page }) => {
    await elementsPage.openTextBox();

    await expect(page).toHaveURL(/text-box/);

    await elementsPage.fillFullName("Misu Iliuta");
    await elementsPage.fillEmailAddress("misu.iliuta.com");
    await elementsPage.fillCurrentAddress("Strada Principala");
    await elementsPage.fillPermanentAddress("strada secundara");
    await elementsPage.clickSubmitButton();

    await expect(elementsPage.emailInput).toHaveClass(/field-error/);
  });
  test("elements module - checkbox - user can select Home checkbox", async ({
    page,
  }) => {
    await elementsPage.openCheckBox();
    await elementsPage.selectHome();

    await expect(elementsPage.result).toBeVisible();
    await expect(elementsPage.result).toContainText("home");
  });

  test("elements module - checkbox - user can select Desktop checkbox", async ({
    page,
  }) => {
    await elementsPage.openCheckBox();
    await elementsPage.selectHome();
    await elementsPage.selectDesktop();

    await expect(elementsPage.result).toContainText("desktop");
  });

  test("elements module - checkbox - user can deselect Home checkbox", async ({
    page,
  }) => {
    await elementsPage.openCheckBox();
    await elementsPage.selectHome();

    await expect(elementsPage.result).toBeVisible();
    await expect(elementsPage.result).toContainText("home");

    await elementsPage.selectHome();

    await expect(elementsPage.result).toHaveCount(0);
  });

  test("elements module - radio button - user can check yes radio button", async ({
    page,
  }) => {
    await elementsPage.openRadioButton();

    await expect(page).toHaveURL("https://demoqa.com/radio-button");

    await elementsPage.checkYesRadioButton();

    await expect(elementsPage.resultRadioButton).toContainText("Yes");
  });

  test("elements module - radio button - user can check impressive radio button", async ({
    page,
  }) => {
    await elementsPage.openRadioButton();

    await expect(page).toHaveURL("https://demoqa.com/radio-button");

    await elementsPage.checkImpressiveRadioButton();

    await expect(elementsPage.resultRadioButton).toContainText("Impressive");
  });

  test("elements module - radio button - no button is disable", async ({
    page,
  }) => {
    await elementsPage.openRadioButton();

    await expect(elementsPage.noRadioButton).toBeDisabled();
  });
  test("elements module - web tables - user can add record to the web table", async ({
    page,
  }) => {
    await elementsPage.openWebTables();

    await expect(page).toHaveURL("https://demoqa.com/webtables");

    await elementsPage.addNewRecord();
    await elementsPage.addDataForNewRecord(newUser);

    await elementsPage.clickSubmitForm();

    await expect(page.getByText("misu@iliuta.com")).toBeVisible();
  });
  test("elements module - search - user can search records", async ({
    page,
  }) => {
    await elementsPage.openWebTables();

    await expect(page).toHaveURL("https://demoqa.com/webtables");

    await elementsPage.searchRecord("cierra@example.com");

    await expect(page.getByText("cierra@example.com")).toBeVisible();
  });

  test("elements module - edit - user is able to edit records", async ({
    page,
  }) => {
    await elementsPage.openWebTables();

    await expect(page).toHaveURL("https://demoqa.com/webtables");

    await elementsPage.editRecord();
    await elementsPage.addDataForNewRecord(updateUser);

    await elementsPage.clickSubmitForm();

    await expect(page.getByText("misu1@iliuta1.com")).toBeVisible();
    await expect(page.getByText("cierra@example.com")).not.toBeVisible();
  });

  test("elements module - web tables - user is able to delete a record", async ({
    page,
  }) => {
    await elementsPage.openWebTables();

    await expect(page).toHaveURL("https://demoqa.com/webtables");

    await elementsPage.deleteRecord();

    await expect(page.getByText("cierra@example.com")).not.toBeVisible();
  });

  test("elements module - web tables - user is able to delete a specific record", async ({
    page,
  }) => {
    await elementsPage.openWebTables();

    await expect(page).toHaveURL("https://demoqa.com/webtables");

    await elementsPage.addNewRecord();
    await elementsPage.addDataForNewRecord(newUser);
    await elementsPage.clickSubmitForm();

    await expect(page.getByText(newUser.email)).toBeVisible();

    await elementsPage.searchRecord(newUser.email);
    await elementsPage.deleteRecord();

    await expect(page.getByText(newUser.email)).not.toBeVisible();
  });

  test("elements module - web tables - CRUD flow - user can create, update and delete record", async ({
    page,
  }) => {
    await elementsPage.openWebTables();

    await expect(page).toHaveURL("https://demoqa.com/webtables");

    await elementsPage.addNewRecord();
    await elementsPage.addDataForNewRecord(newUser);
    await elementsPage.clickSubmitForm();
    await elementsPage.searchRecord(newUser.email);

    await expect(page.getByText(newUser.email)).toBeVisible();

    await elementsPage.editRecord();
    await elementsPage.addDataForNewRecord(updateUser);
    await elementsPage.clickSubmitForm();
    await elementsPage.searchRecord(updateUser.email);

    await expect(page.getByText(updateUser.email)).toBeVisible();
    await expect(page.getByText(newUser.email)).not.toBeVisible();

    await elementsPage.deleteRecord();

    await expect(page.getByText(updateUser.email)).toHaveCount(0);
  });
});
