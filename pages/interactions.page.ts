import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class InteractionsPage extends BasePage {
  readonly interctionsModule: Locator;
  readonly sortable: Locator;
  readonly list: Locator;
  readonly grid: Locator;
  readonly gridContainer: Locator;
  readonly listContainer: Locator;
  readonly listItems: Locator;
  readonly gridItems: Locator;
  readonly firstItemInList: Locator;
  readonly secondItemInList: Locator;
  readonly thirdItemInList: Locator;
  readonly firstItemInGrid: Locator;
  readonly secondItemInGrid: Locator;
  readonly thirdItemInGrid: Locator;
  readonly selectable: Locator;
  constructor(page: Page) {
    super(page);
    this.interctionsModule = page.getByText("Interactions");
    this.sortable = page.getByText("Sortable");
    this.list = page.locator("#demo-tab-list");
    this.grid = page.locator("#demo-tab-grid");
    this.gridContainer = page.locator("#demo-tabpane-grid");
    this.listContainer = page.locator("#demo-tabpane-list");
    this.listItems = page.locator(".vertical-list-container .list-group-item");
    this.gridItems = page.locator(".grid-container .list-group-item");
    this.firstItemInList = this.listItems.nth(0);
    this.secondItemInList = this.listItems.nth(1);
    this.thirdItemInList = this.listItems.nth(2);
    this.firstItemInGrid = this.gridItems.nth(0);
    this.secondItemInGrid = this.gridItems.nth(1);
    this.thirdItemInGrid = this.gridItems.nth(2);
    this.selectable = page.getByText("Selectable");
  }
  async openInteractions() {
    await this.interctionsModule.click();
  }
  async openSortable() {
    await this.sortable.click();
  }
  async selectGrid() {
    await this.grid.click();
  }
  async selectList() {
    await this.list.click();
  }
  async openSelectable() {
    await this.selectable.click();
  }
}
