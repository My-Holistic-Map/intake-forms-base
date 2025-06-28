# Form Engine Overview

This document outlines the capabilities, technical standards, and future potential of the dynamic assessment engine.

### 1. The Big Picture: A Non-Technical Overview

At its core, the **Dynamic Assessment Engine** is a tool that transforms simple spreadsheets into interactive, professional-looking web questionnaires. Its primary purpose is to empower non-technical users—like doctors, clinicians, or content creators—to build and modify complex, multi-step assessments without writing a single line of code.

**How it Works:**
A user opens a single HTML file in their browser. This file can either automatically load a specific assessment based on a URL parameter (for live use) or present an upload button (for testing). When a spreadsheet is loaded, the engine reads the data and dynamically builds the entire user experience, including:

* The assessment's title, introduction, and branding.
* A multi-page or single-page form with various question types.
* Intelligent, one-question-at-a-time progression.
* Complex branching logic that shows or hides questions based on previous answers.
* A sophisticated results page that provides personalized recommendations, notes, and action plans based on the user's input.

The end result is a polished, professional tool that feels custom-built for each assessment, yet is entirely controlled by an easy-to-edit Excel file.

---

### 2. Technical Specifications & Standards

The engine is built on a foundation of standard web technologies and a strictly defined spreadsheet schema to ensure stability and predictability.

**A. Core Technologies**
* **Structure:** HTML5
* **Styling:** Tailwind CSS (for a modern, responsive UI)
* **Logic:** Vanilla JavaScript (ES6+), with no external frameworks for maximum portability.
* **Spreadsheet Parsing:** [SheetJS (xlsx.full.min.js)](https://sheetjs.com/), a lightweight library for reading `.xlsx` files in the browser.

**B. The Spreadsheet Schema**
The engine is designed to read a `.xlsx` file containing six specific, consistently named sheets. The order of columns within each sheet is critical.

1.  **`Environment`**: Controls the global look and feel (title, navigation, footer).
2.  **`Pages`**: Defines the different pages or steps of the assessment.
3.  **`FormQuestions`**: The heart of the form, where every question, answer, and its associated logic is defined.
4.  **`RemediationRules`**: Contains the conditional logic that determines which results to show the user.
5.  **`ResultContent`**: A database of all the text, products, and notes that can be displayed on the results page.
6.  **`Library`**: A "human-readable" sheet that documents all the features and how to use them.

---

### 3. Engine Capabilities (The Feature Set)

The engine has been iteratively built to support a wide range of features, all controllable from the spreadsheet.

#### **Question & Answer Types**

| **Type** | **How it Renders** | **Controlled By** | **Use Case** |
| :--- | :--- | :--- | :--- |
| `multiple-choice` | A vertical list of radio buttons. | `QuestionType` | Standard single-answer questions. |
| `multiple-choice` (inline) | A horizontal group of buttons. | *Automatic.* The engine does this for questions with 3 or fewer simple answers (e.g., "Yes", "No"). | Simple binary or ternary questions. |
| `multiple-selection` | A list of checkboxes, displayed in a responsive grid for long lists. | `QuestionType` | "Select all that apply" questions. |
| `dropdown` | A standard dropdown/select menu. | `QuestionType` | Questions with many options where only one can be chosen. |
| **Categorized Options** | A single question with options grouped under subheadings. | `QuestionGroup` | Presenting a long list of choices in a more organized way (e.g., the Viral Selector). |

#### **Scoring & Logic**

| **Feature** | **How it Works** | **Spreadsheet Column** | **Example** |
| :--- | :--- | :--- | :--- |
| **Simple Scoring** | Adds a set number of points to a single category. | `AnswerValues` | `1,0` |
| **Symptom Counting** | Adds 1 point to a category (useful for counting symptoms). | `LinkedOutcome` | `INCREMENT_CATEGORY_SCORE:Lyme:1` |
| **Weighted Scoring** | Adds different point values to multiple categories from a single answer. | `LinkedOutcome` | `ADD_SCORES:{"Gluten":2,"Dairy":1}` |
| **Simple Branching** | Shows/hides a question based on a previous answer. | `ShowHideLogic` | `1:Yes` |
| **Path-Based Branching** | Shows/hides a question based on a "path" the user was sent down by an earlier question. | `ShowHideLogic` | `PATH:specific` |
| **State Tracking** | Sets a temporary variable (e.g., `isPregnant:true`) to be used by other rules. | `LinkedOutcome` | `SET_STATE_VARIABLE:isPregnant:true` |

#### **Result Generation & Remediation**

| **Feature** | **How it Works** | **Spreadsheet Column/Action** | **Use Case** |
| :--- | :--- | :--- | :--- |
| **Modular Results** | Shows a pre-written card or note from the `ResultContent` sheet based on a rule. | `Action` (`SHOW_...`) | The most common way to build results pages (Lyme, Viral forms). |
| **Dynamic Filtering** | Shows a result card but first removes specific products from it based on a user's medication answers. | `ResultContent` (`**Medication Filter:**`) | The Viral Selector form. |
| **Custom Calculators** | Runs a special, hard-coded function for the most complex assessments. | `Action` (`CALCULATE_...`) | The Bacterial, Fungal, and Parasite forms. |
| **Template-Based Text** | Builds a complex sentence by replacing `{placeholders}` with state variables. | `ResultMessage` | The Bacterial form. |

---

### 4. Future Growth & Expansion

The engine is now stable and feature-complete for all current forms, but its modular design allows for future expansion. Here are some potential areas for growth:

#### **New Form Elements**
* **Matrix / Grid Question:** A powerful way to rate multiple items on a single scale. This is a very logical next step.
* **Searchable Dropdown:** For questions with extremely long lists of options (e.g., hundreds of items).
* **"Tag" Input:** A modern alternative to long checkbox lists.

#### **UI/UX Enhancements**
* **Collapsible Accordion Groups:** Allow users to expand and collapse question groups to reduce visual clutter.
* **Enhanced Progress Indicators:** More visually engaging progress bars or "donut" charts.
* **Conditional "Next" Button Text:** The "Next" button could change its text (e.g., "Continue to Safety Questions") based on the form's logic.

#### **Backend & Integration**
* **Database Integration:** Save all form submissions to a central database for analysis and patient tracking.
* **PDF Generation:** Allow the user (or clinician) to download a PDF summary of the results.
* **Email Integration:** Automatically email the results to the user or a practitioner upon completion.
* **API Connection:** Pull product information or other content from an external API instead of hardcoding it in the `ResultContent` sheet.
