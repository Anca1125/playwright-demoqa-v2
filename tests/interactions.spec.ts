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

  test("interactions module - selectable - user can select an item in list", async ({
    page,
  }) => {
    await interactionsPage.openSelectable();
    await interactionsPage.firstItemInList.click();

    await expect(interactionsPage.firstItemInList).toHaveClass(/active/);
  });

  test("interactions module - selectable - user can select multiple items in list", async ({
    page,
  }) => {
    await interactionsPage.openSelectable();
    await interactionsPage.firstItemInList.click();
    await interactionsPage.secondItemInList.click();
    await interactionsPage.thirdItemInList.click();

    await expect(interactionsPage.firstItemInList).toHaveClass(/active/);
    await expect(interactionsPage.secondItemInList).toHaveClass(/active/);
    await expect(interactionsPage.thirdItemInList).toHaveClass(/active/);
  });

  test("interactions module - selectable - user can switch to grid and select multiple items", async ({
    page,
  }) => {
    await interactionsPage.openSelectable();
    await interactionsPage.selectGrid();

    await expect(interactionsPage.grid).toHaveClass(/active/);
    await expect(interactionsPage.gridContainer).toBeVisible();

    await interactionsPage.firstItemInGrid.click();
    await interactionsPage.secondItemInGrid.click();
    await interactionsPage.thirdItemInGrid.click();

    await expect(interactionsPage.firstItemInGrid).toHaveClass(/active/);
    await expect(interactionsPage.secondItemInGrid).toHaveClass(/active/);
    await expect(interactionsPage.thirdItemInGrid).toHaveClass(/active/);
  });

  test("interactions module - selectable - user can deselect selected items in list", async ({
    page,
  }) => {
    await interactionsPage.openSelectable();
    await interactionsPage.firstItemInList.click();
    await interactionsPage.secondItemInList.click();
    await interactionsPage.thirdItemInList.click();

    await expect(interactionsPage.firstItemInList).toHaveClass(/active/);
    await expect(interactionsPage.secondItemInList).toHaveClass(/active/);
    await expect(interactionsPage.thirdItemInList).toHaveClass(/active/);

    await interactionsPage.firstItemInList.click();
    await interactionsPage.secondItemInList.click();
    await interactionsPage.thirdItemInList.click();

    await expect(interactionsPage.firstItemInList).not.toHaveClass(/active/);
    await expect(interactionsPage.secondItemInList).not.toHaveClass(/active/);
    await expect(interactionsPage.thirdItemInList).not.toHaveClass(/active/);
  });

  test("interactions module - resizable - user can resize the box", async ({
    page,
  }) => {
    await interactionsPage.openResizable();

    const before = await interactionsPage.resizableBox.boundingBox();
    const handle = await interactionsPage.resizeHandle.boundingBox();

    if (before && handle) {
      await page.mouse.move(
        handle.x + handle.width - 2,
        handle.y + handle.height - 2,
      );

      await page.mouse.down();

      await page.mouse.move(handle.x + 100, handle.y + 100, { steps: 20 });

      await page.mouse.up();
    }

    const after = await interactionsPage.resizableBox.boundingBox();

    expect(after?.width).toBeGreaterThan(before?.width!);
    expect(after?.height).toBeGreaterThan(before?.height!);
  });

  test("interactions module - droppable - user can drop a item in simple tab", async ({
    page,
  }) => {
    await interactionsPage.openDroppable();

    await interactionsPage.dragMe.scrollIntoViewIfNeeded();

    const source = await interactionsPage.dragMe.boundingBox();
    const target = await interactionsPage.dropHere.boundingBox();

    if (source && target) {
      await page.mouse.move(
        source.x + source.width / 2,
        source.y + source.height / 2,
      );

      await page.mouse.down();

      await page.mouse.move(
        target.x + target.width / 2,
        target.y + target.height / 2,
        { steps: 25 },
      );
      await page.waitForTimeout(300);
      await page.mouse.up();
    }

    await expect(interactionsPage.dropHere).toContainText("Dropped!");
  });
});
