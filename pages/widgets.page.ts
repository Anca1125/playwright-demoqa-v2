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
}
