# Testing Guide: Dynamic Assessment Engine

## Introduction

Welcome to the testing phase for our new dynamic assessment engine! This powerful tool allows us to create and modify complex, multi-step assessments simply by editing a spreadsheet, eliminating the need for custom code for every change.

Your feedback is crucial to ensure each assessment is accurate, user-friendly, and effective. Please follow the steps below to test each of the prepared assessment modules.

---

## Step 1: Accessing the Assessment Files

There are two sets of files you will use for testing:

**A. Downloadable Test Files (`.xlsx`)**

These are the files you will upload into the form engine to run a test. You will need to create these Excel files from the data provided below.

**Instructions:**
1.  For each assessment, click the link to view the data.
2.  Open Microsoft Excel or a similar spreadsheet program.
3.  Carefully copy the data from each sheet in the document into a corresponding sheet in your Excel file. **Make sure the sheet names in your Excel file exactly match the sheet names in the document** (e.g., `Environment`, `Pages`, `FormQuestions`, etc.).
4.  Save the `.xlsx` file to your computer.

* **Test File 1:** [Brain Health Assessment Spreadsheet Data](immersive://parasite_protocol_spreadsheet?version=1)
* **Test File 2:** [Antiviral Selector Spreadsheet Data](immersive://antiviral_spreadsheet?version=1)
* **Test File 3:** [Bacterial Antimicrobial Spreadsheet Data](immersive://bacterial_antimicrobial_spreadsheet?version=1)
* **Test File 4:** [Lyme Protocol Advisor Spreadsheet Data](immersive://lyme_protocol_spreadsheet?version=1)
* **Test File 5:** [Parasite Protocol Spreadsheet Data](immersive://parasite_protocol_spreadsheet?version=1)

**B. Google Sheets (Viewing & Editing)**

This Google Drive folder contains the master versions of the spreadsheets. You can use this to review the logic or, if you feel comfortable, make suggestions or edits directly.

* **Master Files Location:** [Google Drive Folder](https://drive.google.com/drive/folders/1IsRacddI_b3zgmIx0X7S5Bw1G5FY2cPg?usp=drive_link)

---

## Step 2: Running a Test

1.  Open the **Form Engine HTML file** in your web browser (e.g., Google Chrome, Firefox).
2.  You will see a prompt to upload a file. Click the **"Choose File"** button.
3.  Select one of the `.xlsx` assessment files you created in Step 1.
4.  Once uploaded, the assessment will appear on the page, ready for you to begin.

---

## Step 3: What to Test (The Checklist)

As you go through each form, please pay close attention to the following areas. Try to think like a patient or end-user. Go through each form multiple times, choosing different answers each time to see how the results change.

#### ✔️ **Layout & Appearance**
* Is the assessment title and introduction text correct?
* Do all navigation links (header and footer) work as expected?
* Is the text easy to read? Are there any typos or grammatical errors in questions, answers, or descriptions?
* Do the form elements (buttons, checkboxes) look and feel right?
* Does the layout look good on your screen? (If possible, try resizing your browser window to see how it adjusts).

#### ✔️ **Functionality & Logic**
* Do the "Next" and "Back" buttons work correctly?
* Does the breadcrumb at the top accurately show your progress (e.g., "Page 1 of 3")?
* **Branching Logic:** Does the form correctly show or hide questions based on your previous answers? Try to go back and change an answer to see if the subsequent questions update correctly.
* Does the "Restart" button clear the form and start you from the beginning?

#### ✔️ **Results & Accuracy**
* After completing a form, review the final recommendations carefully.
* Do the results make sense based on the answers you provided? Try to get a specific result on purpose (e.g., try to get "Serotonin" as the primary focus in the Brain Health assessment).
* Is all the information on the results page correct? (e.g., product names, descriptions, lifestyle tips).
* Are there any special notices (like a pregnancy warning) that appear when they should?

---

## Step 4: Reporting Feedback

As you find issues or think of improvements, please document them. For now, the best way to do this is via **email**.

When you send an email, please include:

1.  **Which assessment you were testing** (e.g., "Parasite Protocol").
2.  **A clear description of the issue** or suggestion.
3.  **Steps to reproduce the issue.** (e.g., "1. On the Lyme form, I selected 'Fatigue'. 2. On the results page, the 'Biofilm Support' card did not appear.").
4.  **A screenshot**, if possible. This is extremely helpful for us to quickly identify the problem.

Thank you for your time and detailed feedback. This process is essential for creating a polished and reliable tool for your users.
