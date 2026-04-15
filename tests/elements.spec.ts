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

  test("elements module - buttons - user can perform a double click", async ({
    page,
  }) => {
    await elementsPage.openButtonsSection();

    await expect(page).toHaveURL(/buttons/);

    await elementsPage.performDoubleClick();

    await expect(elementsPage.doubleClickMessage).toHaveText(
      "You have done a double click",
    );
  });

  test("elements module - buttons - user can perform a right click", async ({
    page,
  }) => {
    await elementsPage.openButtonsSection();
    await elementsPage.performRightClick();

    await expect(elementsPage.rightClickMessage).toHaveText(
      "You have done a right click",
    );
  });

  test("elements module - buttons -  user can perform a dynamic click", async ({
    page,
  }) => {
    await elementsPage.openButtonsSection();
    await elementsPage.performDynamicClick();

    await expect(elementsPage.dynamicClickMessage).toHaveText(
      "You have done a dynamic click",
    );
  });

  test("elements module - links - user can open Home link ", async ({
    page,
    context,
  }) => {
    await elementsPage.openLinksSection();

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      elementsPage.clickHomeLink(),
    ]);

    await expect(newPage).toHaveURL("https://demoqa.com/");

    await newPage.close();
  });

  test("elements module - links - user can see Created response", async ({
    page,
  }) => {
    await elementsPage.openLinksSection();
    await elementsPage.clickCreatedLink();

    await expect(elementsPage.responseAPIMessage).toContainText("201");
  });

  test("elements module - broken links-images - valid image is loaded", async ({
    page,
  }) => {
    await elementsPage.openBrokenLinksImages();

    await expect(elementsPage.validImage).toBeVisible();
  });

  test("elements module - broken links-images - broken image is not loaded", async ({
    page,
  }) => {
    await elementsPage.openBrokenLinksImages();

    const naturalWidth = await elementsPage.brokenImage.evaluate(
      (img: HTMLImageElement) => img.naturalWidth,
    );

    expect(naturalWidth).toBe(0);
  });

  test("elements module - broken links-images - valid link returns 200", async ({
    page,
    request,
  }) => {
    await elementsPage.openBrokenLinksImages();

    const url = await elementsPage.validLink.getAttribute("href");

    const response = await request.get(url!);

    expect(response.status()).toBe(200);
  });

  test("elements module - broken links-images - broken link return 500", async ({
    page,
    request,
  }) => {
    await elementsPage.openBrokenLinksImages();

    const url = await elementsPage.brokenLink.getAttribute("href");

    const response = await request.get(url!);

    expect(response.status()).toBe(500);
  });

  test("elements module - upload and download - user can download a file", async ({
    page,
  }) => {
    await elementsPage.openUploadAndDownload();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      elementsPage.downloadAfile(),
    ]);

    const fileName = download.suggestedFilename();

    expect(fileName).toBeTruthy();
  });

  test("elements module - upload and download - user can upload a file", async ({
    page,
  }) => {
    await elementsPage.openUploadAndDownload();

    const filePath = "test-data/testFile.txt";

    await elementsPage.uploadAfile(filePath);

    await expect(elementsPage.uploadedFilePath).toContainText("testFile.txt");
  });

  test("elements page - dynamic properties - Button enabled after 5 seconds", async ({
    page,
  }) => {
    await elementsPage.openDynamicProperties();

    await expect(elementsPage.enableButton).toBeDisabled();
    await expect(elementsPage.enableButton).toBeEnabled({ timeout: 6000 });
  });

  test("elements page - dynamic properties - button changes the color", async ({
    page,
  }) => {
    await elementsPage.openDynamicProperties();

    await expect(elementsPage.colorButton).toHaveClass(/text-danger/, {
      timeout: 6000,
    });
  });
  test("elements page - dynamic properties - visible after 5 seconds ", async ({
    page,
  }) => {
    await elementsPage.openDynamicProperties();

    await expect(elementsPage.visibleButton).toBeVisible({ timeout: 6000 });
  });
});
