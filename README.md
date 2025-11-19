
# 🧪 Voucher codes test automation task

## Overview

This automation task was completed within a strict 3-hour timebox 

- ✅ Full test logic for **Scenarios 1 to 3**
- ✅ A **GitHub Actions YAML workflow** to run tests across all browsers, either sequentially or in parallel
- ✅ A **matrix strategy** for parallel browser execution
- ✅ Enhanced `package.json` scripts to support targeted test execution

> **Note:** You can run these tests locally using PowerShell commands detailed below (headless or in UI mode), or via the provided GitHub Actions workflow.


## Test Scenarios Overview

### Scenario 1 – Confirm VoucherCodes Page Loads

- Navigates to the VoucherCodes homepage
- Verifies the URL and page title
- Accepts the cookie modal (if displayed)
- Confirms visibility of the logo link and search bar

### Scenario 2 – Restaurant Search Success

- Opens the homepage and handles the cookie modal
- Opens the Categories menu and selects Restaurants
- Verifies the Restaurants vouchers page layout
- Completes the search form using:
  - Location: London
  - 2 people
- Clicks Search and confirms the results page loads successfully

### Scenario 3 – Deliberate Failure Test

- Navigates to the homepage
- Intentionally validates an incorrect URL to force a controlled failure
- Captures a screenshot and logs diagnostic information when the test fails

## Playwright Framework – Implementation Approach

- For this task, I chose to implement the solution using native Playwright without a Page Object Model (POM) structure. This decision was based on the need for speed and simplicity, as the goal was to quickly achieve reliable automation for a well-scoped task.

### Why Native Playwright?

- **Rapid Development:** Native Playwright allows for direct interaction with page elements, which significantly reduces development time. This was ideal for delivering a quick, functional solution within limited time constraints.

- **Low Overhead:** Setting up POM introduces additional abstraction layers and boilerplate code. For a small, straightforward test suite, this can be unnecessary and may even slow down initial development.

- **Clarity and Debugging:** Writing tests natively makes the test flow more explicit and linear, which is helpful for debugging and understanding test behavior during the early stages.

### Why Not POM (for this case)?

- **Scope of the Task:** The current task did not require the scalability or maintainability benefits that POM offers. Since the test scenarios were limited and not expected to grow significantly, the added structure of POM would have been excessive.

- **Time Constraints:** Implementing POM properly requires initial setup of page classes, locator strategies, and abstraction layers. Given the time constraints, focusing on delivering working tests quickly was a higher priority.

### Future Consideration

If the project were to grow or become a longer-term engagement, I would refactor the tests into a modular framework using the Page Object Model. This would improve reusability, maintainability, and test readability in the long run.

If additional test scenarios are introduced or the test suite becomes more complex, I would transition to a structured POM-based framework. This would allow:

-  Centralized management of locators

-  Reusable step definitions

-  Better separation of concerns

-  Easier onboarding for other team members

---

## 🧰 Prerequisites

- **Node.js** v20 or higher
- **npm** (bundled with Node.js)
- Run `npm install` to install dependencies
- No need to manually install browsers — Playwright handles this automatically

---

## 🧪 Running Tests via PowerShell

- Ensure the path to run tests against is >> C:\Users\UserName\voucher-codes\tests
- Or even easier, Right click 'tests' folder in Visual Studio Code and select 'Open in Integrated Terminal' to open PowerShell in the correct directory, then choose one of the following commands below:

### Run All Tests (All Browsers, Headless Mode)
```bash
npm run test
```

### Run Individual Tests (All Browsers, Headless Mode)
```bash
npm run test:scenario1      # tests\scenario1-ConfirmVoucherCodesPage.spec.ts
npm run test:scenario2      # tests\scenario2-RestaurantSearchSuccess.spec.js
npm run test:scenario3      # tests\scenario3-RestaurantSearchFail.spec.ts
```

### Run All Tests on a Specific Browser (UI Mode)
```bash
npm run test:all:chromium:ui   # Chromium
npm run test:all:firefox:ui    # Firefox
npm run test:all:webkit:ui     # WebKit
```

### Run Individual Scenarios (UI Mode, all browsers)
```bash
npm run test:scenario1:ui   # tests\scenario1-ConfirmVoucherCodesPage.spec.ts
npm run test:scenario2:ui   # tests\scenario2-RestaurantSearchSuccess.spec.js
npm run test:scenario3:ui   # tests\scenario3-RestaurantSearchFail.spec.ts

```
---
## ⚙️ CI/CD Workflow – GitHub Actions Workflow

This GitHub Actions workflow automates Playwright test execution across multiple browsers.

### 🔁 Triggered By
- Pull requests to `main` or `master`
- Manual dispatch via GitHub UI with custom inputs

### 🧩 Configurable Inputs

| Input   | Description                                 | Required | Default | Options                        |
|---------|---------------------------------------------|----------|---------|-------------------------------|
| tests   | Specific tests to run (space-separated)     | ❌       | (empty) | Custom string                  |
| browser | Browser to run tests on                     | ✅       | chrome  | all, chrome, firefox, webkit   |

### 🖥️ Key Features
- Matrix strategy to run tests in parallel across Chrome, Firefox, and WebKit
- Custom inputs for environment, test selection, and browser targeting
- Playwright project mapping for browser-specific runs
- Automatic dependency and browser installation
- Detailed test reporting with Playwright HTML reports per browser

### 📦 Artifacts
	- Playwright reports per browser
	- html report files uploaded as artifacts for review
	- trace files included for failed tests
	
#### Uploaded artifacts include:
- `playwright-report-${{ matrix.browser }}` → Browser-specific Playwright report
---

## 🛠️ Pipeline Runs

- These are just shown as examples, it is a working yml file with tests executing successfully against individual browsers and all browsers
- The tests are *not* passing through CI currently and would need some investigation (which I've not had time to do and is not in the scope of this task), they are however passing locally.

- all browsers - https://github.com/jamesperrytester/voucher-codes/actions/runs/19519236460
- chrome - https://github.com/jamesperrytester/voucher-codes/actions/runs/19519108984
- firefox - https://github.com/jamesperrytester/voucher-codes/actions/runs/19519226709
- webkit -  https://github.com/jamesperrytester/voucher-codes/actions/runs/19519231694