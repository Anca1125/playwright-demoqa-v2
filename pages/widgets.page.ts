import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class WidgetsPage extends BasePage {
  readonly widgets: Locator;
  readonly accordian: Locator;
  readonly firstTitle: Locator;
  readonly secondTitle: Locator;
  readonly thirdTitle: Locator;
  readonly contentBody: Locator;
  readonly autoComplete: Locator;
  readonly inputMultipleColors: Locator;
  readonly inputSingleColor: Locator;
  readonly inputFilledMultipleColors: Locator;
  readonly inputFilledSingleColor: Locator;
  readonly datePicker: Locator;
  readonly dateInput: Locator;
  readonly dateAndTimeInput: Locator;
  readonly nextButton: Locator;
  readonly previousButton: Locator;
  readonly currentMonth: Locator;
  readonly currentYear: Locator;
  readonly currentDay: Locator;
  readonly day: Locator;
  readonly slider: Locator;
  readonly rangeSlider: Locator;
  readonly inputSlider: Locator;
  readonly progressBarPage: Locator;
  readonly progressBar: Locator;
  readonly startStopButton: Locator;
  readonly resetButton: Locator;
  readonly tab: Locator;
  readonly whatTab: Locator;
  readonly originTab: Locator;
  readonly useTab: Locator;
  readonly moreTab: Locator;
  readonly whatContent: Locator;
  readonly originContent: Locator;
  readonly useContent: Locator;
  readonly toolTips: Locator;
  readonly hoverTheButton: Locator;
  readonly hoverTheField: Locator;
  readonly hoverTheLink: Locator;
  readonly menu: Locator;
  readonly mainItem2: Locator;
  readonly subSubLIst: Locator;
  readonly selectMenu: Locator;
  readonly selectOptions: Locator;
  readonly selectTitle: Locator;
  readonly selectOldMenu: Locator;
  readonly multiSelectDropDown: Locator;
  readonly selectStandard: Locator;
  readonly multiSelectValues: Locator;
  constructor(page: Page) {
    super(page);
    this.widgets = page.getByText("Widgets", { exact: true });
    this.accordian = page.getByText("Accordian", { exact: true });
    this.firstTitle = page.getByRole("button", {
      name: "What is Lorem Ipsum?",
    });
    this.secondTitle = page.getByRole("button", {
      name: "Where does it come from?",
    });
    this.thirdTitle = page.getByRole("button", { name: "Why do we use it?" });
    this.contentBody = page.locator(".accordion-body");
    this.autoComplete = page.getByText("Auto Complete");
    this.inputMultipleColors = page.locator("#autoCompleteMultipleInput");
    this.inputSingleColor = page.locator("#autoCompleteSingleInput");
    this.inputFilledMultipleColors = page
      .locator(".auto-complete__control")
      .first();
    this.inputFilledSingleColor = page
      .locator(".auto-complete__control")
      .nth(1);
    this.datePicker = page.getByText("Date Picker");
    this.dateInput = page.locator("#datePickerMonthYearInput");
    this.dateAndTimeInput = page.locator("#dateAndTimePickerInput");
    this.nextButton = page.locator(".react-datepicker__navigation--next");
    this.previousButton = page.locator(
      ".react-datepicker__navigation--previous",
    );
    this.currentMonth = page.locator(
      ".react-datepicker__month-read-view--selected-month",
    );
    this.currentYear = page.locator(
      ".react-datepicker__year-read-view--selected-year",
    );
    this.currentDay = page.locator(".react-datepicker__day--today");
    this.day = page.locator(".react-datepicker__day--015");
    this.slider = page.getByText("Slider");
    this.rangeSlider = page.locator("#slider");
    this.inputSlider = page.locator("#sliderValue");
    this.progressBarPage = page.getByText("Progress Bar");
    this.progressBar = page.locator("#progressBar");
    this.startStopButton = page.locator("#startStopButton");
    this.resetButton = page.locator("#resetButton");
    this.tab = page.getByText("Tabs");
    this.whatTab = page.locator("#demo-tab-what");
    this.originTab = page.locator("#demo-tab-origin");
    this.useTab = page.locator("#demo-tab-use");
    this.moreTab = page.locator("#demo-tab-more");
    this.whatContent = page.locator("#demo-tabpane-what");
    this.originContent = page.locator("#demo-tabpane-origin");
    this.useContent = page.locator("#demo-tabpane-use");
    this.toolTips = page.getByText("Tool Tips");
    this.hoverTheButton = page.locator("#toolTipButton");
    this.hoverTheField = page.locator("#toolTipTextField");
    this.hoverTheLink = page.getByRole("link", { name: "Contrary" });
    this.menu = page.getByText("Menu", { exact: true });
    this.mainItem2 = page.getByText("Main Item 2");
    this.subSubLIst = page.getByText("SUB SUB LIST »");
    this.selectMenu = page.getByText("Select Menu", { exact: true });
    this.selectOptions = page.locator("#withOptGroup");
    this.selectTitle = page.locator("#selectOne");
    this.selectOldMenu = page.locator("#oldSelectMenu");
    this.multiSelectDropDown = page.locator("#react-select-4-input");
    this.selectStandard = page.locator("#cars");
    this.multiSelectValues = page.locator("#selectMenuContainer");
  }
  timeOption(time: string) {
    return this.page.locator(".react-datepicker__time-list-item", {
      hasText: time,
    });
  }
  async openWidgets() {
    await this.widgets.click();
  }
  async openAccordian() {
    await this.accordian.click();
  }
  async clickOnFirstTitle() {
    await this.firstTitle.click();
  }
  async clickOnSecondTitle() {
    await this.secondTitle.click();
  }
  async clickOnThirdTitle() {
    await this.thirdTitle.click();
  }
  async openAutoComplete() {
    await this.autoComplete.click();
  }
  async fillMultipleColorInput(value: string) {
    await this.inputMultipleColors.fill(value);
  }
  async fillSingleColorInput(value: string) {
    await this.inputSingleColor.fill(value);
  }
  async openDatePicker() {
    await this.datePicker.click();
  }
  async selectDate(date: string) {
    await this.dateInput.click();
    await this.dateInput.fill(date);
    await this.dateInput.press("Enter");
  }
  async selectDateAndTime() {
    await this.dateAndTimeInput.click();
    await this.day.first().click();
    await this.timeOption("16:00").click();
  }
  async selectTodayAndTime() {
    await this.dateAndTimeInput.click();
    await this.currentDay.click();
    await this.timeOption("18:00").click();
  }
  async openSlider() {
    await this.slider.click();
  }
  async changeSlider(value: number) {
    await this.rangeSlider.click();

    let current = Number(await this.inputSlider.inputValue());

    while (current !== value) {
      if (current < value) {
        await this.rangeSlider.press("ArrowRight");
      } else {
        await this.rangeSlider.press("ArrowLeft");
      }
      current = Number(await this.inputSlider.inputValue());
    }
  }
  async openProgressBarPage() {
    await this.progressBarPage.click();
  }
  async startProgressBar() {
    await this.startStopButton.click();
  }
  async resetProgressBar() {
    await this.resetButton.click();
  }
  async openTabPage() {
    await this.tab.click();
  }
  async openWhatTab() {
    await this.whatTab.click();
  }
  async openOriginTab() {
    await this.originTab.click();
  }
  async openUseTab() {
    await this.useTab.click();
  }
  async openToolTips() {
    await this.toolTips.click();
  }
  async hoverOverTheButton() {
    await this.hoverTheButton.hover();
  }
  async hoverOverTheTextField() {
    await this.hoverTheField.hover();
  }
  async hoverOverTheLink() {
    await this.hoverTheLink.hover();
  }
  async openMenu() {
    await this.menu.click();
  }
  async openSelectMenu() {
    await this.selectMenu.click();
  }
  async selectAOption(value: string) {
    await this.selectOptions.click();
    await this.page.keyboard.type(value);
    await this.page.keyboard.press("Enter");
  }
  async selectAtitle(value: string) {
    await this.selectTitle.click();
    await this.page.keyboard.type(value);
    await this.page.keyboard.press("Enter");
  }
  async selectAColor(value: string) {
    await this.selectOldMenu.selectOption(value);
  }
  async selectMultipleColors(
    value1: string,
    value2: string,
    value3: string,
    value4: string,
  ) {
    await this.multiSelectDropDown.click();
    await this.page.keyboard.type(value1);
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.type(value2);
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.type(value3);
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.type(value4);
    await this.page.keyboard.press("Enter");
  }
  async selectCars(values: string[]) {
    await this.selectStandard.selectOption(values);
  }
}
