Playwright Automation Project – DemoQA
Overview

This project contains automated tests for the DemoQA website using Playwright and TypeScript.

I created this project to practice test automation and to better understand how UI testing works in a real-world scenario.

Tech Stack

- Playwright
- TypeScript
- Node.js

Project Structure

The project is organized using the Page Object Model.

- The pages folder contains the page classes where locators and methods are defined.
- The tests folder contains the test files.
- The test-data folder is used for storing test data.

What I tested

In the Elements section, I covered:

- Text Box form
- Check Box interactions
- Radio Button functionality
- Web Tables (adding, editing, deleting records)
- Buttons (double click, right click, dynamic click)
- Links (opening new tab and API response validation)
- Broken Links and Images
- Upload and Download functionality
- Dynamic Properties (elements that change state over time)

In the Alerts, Frames & Windows section, I covered:

- Browser Windows (new tab, new window, window message)
- Alerts (handling alert pop-ups: accept, dismiss, input)
- Frames and Nested Frames (working with iframe and nested iframe)
- Modal Dialogs (opening and closing modals)

In the Practice Form Testing, I implemented an end-to-end test including:

- Filling all required fields
- Submitting the form
- Validating the submitted data in the confirmation modal

✔️ Positive Scenario

- User successfully completes and submits the form
- All entered data is correctly displayed

❌ Negative Scenario

- Invalid inputs (e.g. incorrect email, invalid mobile)

In Widgets module I covered:

- Accordion behavior (expand / collapse sections)
- Auto Complete (single and multiple color selection)
- Date Picker (manual date + current date + date & time)
- Slider value updates
- Progress Bar (start / stop / reset)
- Tabs navigation
- Tool Tips (hover validation)
- Menu and submenu hover actions
- Select Menu

How to run the tests

Install dependencies:

npm install

Run all tests:

npx playwright test

Run tests in UI mode:

npx playwright test --ui
