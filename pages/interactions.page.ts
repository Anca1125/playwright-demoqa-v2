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
  readonly resizable: Locator;
  readonly resizableBox: Locator;
  readonly resizeHandle: Locator;
  readonly droppable: Locator;
  readonly simpleTab: Locator;
  readonly dragMe: Locator;
  readonly dropHere: Locator;
  readonly acceptTab: Locator;
  readonly acceptable: Locator;
  readonly notAcceptable: Locator;
  readonly acceptDropHere: Locator;
  readonly preventPropogationTab: Locator;
  readonly pPDragMe: Locator;
  readonly innerDroppable: Locator;
  readonly outerDroppable: Locator;
  readonly revertDraggable: Locator;
  readonly willRevert: Locator;
  readonly notReveret: Locator;
  readonly revertDropHere: Locator;

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
    this.resizable = page.getByText("Resizable");
    this.resizableBox = page.locator("#resizableBoxWithRestriction");
    this.resizeHandle = page.locator(
      "#resizableBoxWithRestriction .react-resizable-handle",
    );
    this.droppable = page.getByText("Droppable");
    this.simpleTab = page.locator("#droppableExample-tab-simple");
    this.dragMe = page.locator("#draggable").first();
    this.dropHere = page.locator("#droppable").first();
    this.acceptTab = page.locator("#droppableExample-tab-accept");
    this.acceptable = page.locator("#acceptable");
    this.notAcceptable = page.locator(".drag-box");
    this.acceptDropHere = page.locator("#droppable").nth(1);
    this.preventPropogationTab = page.locator(
      "#droppableExample-tab-preventPropogation",
    );
    this.pPDragMe = page.locator("#dragBox");
    this.innerDroppable = page.locator("#notGreedyInnerDropBox");
    this.outerDroppable = page.locator("#notGreedyDropBox");
    this.revertDraggable = page.locator("#droppableExample-tab-revertable");
    this.willRevert = page.locator("#revertable");
    this.notReveret = page.locator("#notRevertable");
    this.revertDropHere = page.locator("#droppable");
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
  async openResizable() {
    await this.resizable.click();
  }
  async openDroppable() {
    await this.droppable.click();
  }
}
