Current Links (live forms)

  * [Bacterial Assessment](https://www.google.com/search?q=https://my-holistic-map.github.io/intake-forms-base/index.html%3Fform%3Ddysbiosis_bacteria_assessment_v2)
  * [Food Sensitivity Assessment](https://www.google.com/search?q=https://my-holistic-map.github.io/intake-forms-base/index.html%3Fform%3Dfood_sensativity_assessment_v2)
  * [Infection Identifier Assessment](https://www.google.com/search?q=https://my-holistic-map.github.io/intake-forms-base/index.html%3Fform%3Ddysbiosis_infection_identifier_assessment_v2)
  * [Lyme Disease Assessment](https://www.google.com/search?q=https://my-holistic-map.github.io/intake-forms-base/index.html%3Fform%3Ddysbiosis_lyme_disease_assessment_v2)
  * [Parasite Assessment](https://www.google.com/search?q=https://my-holistic-map.github.io/intake-forms-base/index.html%3Fform%3Ddysbiosis_parasite_assessment_v2)
  * [Fungal Assessment](https://www.google.com/search?q=https://my-holistic-map.github.io/intake-forms-base/index.html%3Fform%3Ddysbiosis_fungal_assessment_v1)
  * [Viral Assessment](https://www.google.com/search?q=https://my-holistic-map.github.io/intake-forms-base/index.html%3Fform%3Ddysbiosis_viral_assessment_v2)

A form engine is a tool that allows you to create, manage, and process forms. In your case, the unique requirement is to use a spreadsheet (like Excel or Google Sheets) to define the form's logic, including questions, answers, and their associated weights. This engine will then use these rules to calculate a score and provide a meaningful result to the user.

### **How It Works**

The core idea is to separate the form's logic (the rules in the spreadsheet) from the form's presentation (what the user sees).

1.  **Spreadsheet as a Database**: Your spreadsheet will act as a simple database. Each row can represent a question, and columns can define the question text, the possible answers, and the weight/value for each answer.

2.  **Form Interface**: This is the web page or application where the user will fill out the form. It will dynamically load the questions from your spreadsheet.

3.  **The Engine**: This is the backend logic. When a user submits the form, the engine will:
    * Look up the submitted answers in the spreadsheet.
    * Calculate a total score based on the weights of the answers.
    * Determine the result based on the final score.

### **Building Your Form Engine**

Here are a few ways you can build this, from simple to more advanced:

#### **1. No-Code/Low-Code Platforms**

Many existing platforms can achieve this with minimal to no coding.

* **Google Forms + Google Sheets**: You can use Google Forms for the user interface and Google Sheets to analyze the results. With some creative use of formulas and add-ons, you can create a scoring system. For instance, you can use `VLOOKUP` or `INDEX(MATCH)` in a separate sheet to assign scores to answers and then sum them up.
* **Airtable**: Airtable is a hybrid of a spreadsheet and a database. You can easily create a form and then use its powerful formula fields to implement your scoring logic directly within the Airtable base.
* **Dedicated Form Builders**: Many online form builders like JotForm, Typeform, or SurveySparrow have features for conditional logic and scoring. You can often export the results to a spreadsheet to further analyze the data.

#### **2. Custom Code Solution**

If you have some programming knowledge, you can build a more flexible and powerful engine.

* **Frontend (What the User Sees)**: You can use standard web technologies like **HTML**, **CSS**, and **JavaScript**. A framework like **React** or **Vue.js** can make it easier to dynamically generate the form from the spreadsheet data.

* **Backend (The Engine's Logic)**:
    * **Python with Pandas**: Python is excellent for data manipulation. You can use the **Pandas** library to read the Excel or Google Sheet file, process the data, and perform the calculations.
    * **Node.js with Google Sheets API**: If you're using Google Sheets, you can use **Node.js** and the official Google Sheets API to read the spreadsheet data in real-time.

* **Connecting the Pieces**:
    1.  **Read the Spreadsheet**: Your backend code will fetch the rules from the spreadsheet.
    2.  **Generate the Form**: The backend will send the questions to the frontend to be displayed to the user.
    3.  **Process Submission**: When the user submits the form, the answers are sent back to the backend.
    4.  **Calculate Score**: The backend will use your spreadsheet rules to calculate the total score.
    5.  **Return Result**: The backend will send the final result back to the user.

### **Example Spreadsheet Structure**

Here is a simple example of how you could structure your spreadsheet:

| Question ID | Question Text                                | Answer Option | Weight/Value |
| :---------- | :------------------------------------------- | :------------ | :----------- |
| 1           | How often do you exercise?                   | Never         | 0            |
| 1           | How often do you exercise?                   | 1-2 times/week| 5            |
| 1           | How often do you exercise?                   | 3+ times/week | 10           |
| 2           | Do you eat a balanced diet?                  | No            | 0            |
| 2           | Do you eat a balanced diet?                  | Mostly        | 5            |
| 2           | Do you eat a balanced diet?                  | Yes           | 10           |

You could also have another sheet for the results:

| Minimum Score | Maximum Score | Result Message                                   |
| :------------ | :------------ | :----------------------------------------------- |
| 0             | 5             | You have some room for improvement.              |
| 6             | 15            | You're on a good track!                          |
| 16            | 20            | Excellent! You're leading a healthy lifestyle.   |

By using a structure like this, you can easily update the questions, answers, and scoring logic just by editing the spreadsheet, without needing to change any code.

### **How to Verify the Stored Data**

After a user completes the form, you can check the stored data in your browser's developer tools:

1.  **Open Developer Tools**: Right-click on the webpage and select "Inspect", or press `F12` (or `Cmd+Option+I` on Mac).
2.  **Navigate to the Application Tab**: In the developer tools window, find and click on the "Application" tab (it might be called "Storage" in Firefox).
3.  **Find Local Storage**: On the left-hand menu, expand the "Local Storage" section and select the entry corresponding to your `file:///...` URL.
4.  **View the Data**: You will see a key-value pair. The key will be `this_form_name_abc`, and the value will be the JSON string containing the complete record of the user's submission.

The stored data will look like this:

```json
{
  "formName": "this_form_name_abc",
  "timestamp": "2025-06-08T20:55:15.000Z",
  "userAnswers": {
    "How often do you exercise per week?": "2-3 times",
    "What are your primary fitness goals? (Select all that apply)": [
      "Weight Loss",
      "Cardio Health"
    ],
    "Do you have any known allergies?": "No",
    "Please describe your current diet.": "A balanced diet with plenty of vegetables."
  },
  "remediation": {
    "score": 17,
    "message": "You are on the right track! Focus on consistency.",
    "linkedOutcomes": []
  }
}
```

This implementation successfully captures the form submission data and stores it locally in the user's browser, ensuring only the latest entry is kept, exactly as you requested.
