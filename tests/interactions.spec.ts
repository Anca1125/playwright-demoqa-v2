import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { InteractionsPage } from "../pages/interactions.page";

test.describe("interactions", () => {
  let homePage: HomePage;
  let interactionsPage: InteractionsPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    interactionsPage = new InteractionsPage(page);

    await homePage.navigateToHome();

    await expect(page).toHaveURL("https://demoqa.com/");

    await interactionsPage.openInteractions();
  });

  test("interactions module - sortable - user can select grid", async ({
    page,
  }) => {
    await interactionsPage.openSortable();
    await interactionsPage.selectGrid();

    await expect(interactionsPage.grid).toHaveClass(/active/);
    await expect(interactionsPage.gridContainer).toBeVisible();
  });

  test("interactions module - sortable - user can switch from grid to list", async ({
    page,
  }) => {
    await interactionsPage.openSortable();
    await interactionsPage.selectGrid();

    await expect(interactionsPage.grid).toHaveClass(/active/);
    await expect(interactionsPage.gridContainer).toBeVisible();

    await interactionsPage.selectList();

    await expect(interactionsPage.list).toHaveClass(/active/);
    await expect(interactionsPage.listContainer).toBeVisible();
  });

  test("interactions module - sortable - user can reorder items in the list", async ({
    page,
  }) => {
    await interactionsPage.openSortable();
    await interactionsPage.firstItemInList.scrollIntoViewIfNeeded();

    const sourceBox = await interactionsPage.firstItemInList.boundingBox();
    const targetBox = await interactionsPage.thirdItemInList.boundingBox();

    if (sourceBox && targetBox) {
      await page.mouse.move(
        sourceBox.x + sourceBox.width / 2,
        sourceBox.y + sourceBox.height / 2,
      );
      await page.mouse.down();

      await page.mouse.move(
        targetBox.x + targetBox.width / 2,
        targetBox.y + targetBox.height / 2,
        { steps: 10 },
      );
      await page.mouse.up();

      const items = await interactionsPage.listItems.allTextContents();

      expect(items[0]).not.toBe("One");
    }
  });
});
