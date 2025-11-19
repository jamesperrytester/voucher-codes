
# 🧪 Voucher codes test automation task

## Overview

This automation task was completed within a strict 3-hour timebox 

- ✅ Full test logic for **Scenarios 1 to 4**
- ✅ A **GitHub Actions YAML workflow** to run tests across all browsers, either sequentially or in parallel
- ✅ A **matrix strategy** for parallel browser execution
- ✅ Enhanced `package.json` scripts to support targeted test execution

> **Note:** You can run these tests locally using PowerShell commands detailed below (headless or in UI mode), or via the provided GitHub Actions workflow.

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

- Ensure the path run tests against is >> C:\Users\UserName\voucher-codes\tests
- Right click 'tests' folder and select 'Open in Integrated Terminal' to open PowerShell in the correct directory, then choose one of the following commands below:

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
| env     | Target environment (qa, stage, demo, live)  | ❌       | (empty) | Custom string                  |
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
	
#### Uploaded artifacts include:
- `playwright-report-${{ matrix.browser }}` → Browser-specific Playwright report
---

## 🛠️ Pipeline Run links (including artifact uploads, and extracted data displays in github actions summary):

- all browsers - 
- chrome - 
- firefox - 
- webkit -  