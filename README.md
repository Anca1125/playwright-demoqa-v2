Playwright Automation Project – DemoQA
Overview

This project contains automated tests for the DemoQA website using Playwright and TypeScript.

I created this project to practice test automation and to better understand how UI testing works in a real-world scenario.

Tech Stack

Playwright
TypeScript
Node.js

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

Browser Windows (new tab, new window, window message)
Alerts (handling alert pop-ups: accept, dismiss, input)
Frames and Nested Frames (working with iframe and nested iframe)
Modal Dialogs (opening and closing modals)

How to run the tests

Install dependencies:

npm install

Run all tests:

npx playwright test

Run tests in UI mode:

npx playwright test --ui
