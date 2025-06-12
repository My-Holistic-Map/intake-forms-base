let formQuestions = [];
let remediationRules = [];

document.getElementById('fileUploader').addEventListener('change', handleFile);

function handleFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});

        // Ensure sheet names are correct
        if (!workbook.Sheets['FormQuestions'] || !workbook.Sheets['RemediationRules']) {
            alert("The uploaded spreadsheet is missing the required 'FormQuestions' or 'RemediationRules' sheets.");
            return;
        }

        formQuestions = XLSX.utils.sheet_to_json(workbook.Sheets['FormQuestions']);
        remediationRules = XLSX.utils.sheet_to_json(workbook.Sheets['RemediationRules']);

        buildForm();
    };

    reader.readAsArrayBuffer(file);
}

function buildForm() {
    const formContainer = document.getElementById('dynamicForm');
    formContainer.innerHTML = '';

    formQuestions.forEach(q => {
        const questionDiv = document.createElement('div');
        const label = document.createElement('label');
        label.innerText = q.QuestionText;
        questionDiv.appendChild(label);

        if (q.QuestionType === 'multiple-choice') {
            const options = String(q.AnswerOptions).split(',');
            options.forEach(opt => {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question-${q.QuestionID}`;
                radio.value = opt.trim();
                questionDiv.appendChild(radio);
                questionDiv.append(` ${opt.trim()}`);
                questionDiv.appendChild(document.createElement('br'));
            });
        } else if (q.QuestionType === 'multiple-selection') {
            const options = String(q.AnswerOptions).split(',');
            options.forEach(opt => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = `question-${q.QuestionID}`;
                checkbox.value = opt.trim();
                questionDiv.appendChild(checkbox);
                questionDiv.append(` ${opt.trim()}`);
                questionDiv.appendChild(document.createElement('br'));
            });
        } else if (q.QuestionType === 'text') {
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.name = `question-${q.QuestionID}`;
            questionDiv.appendChild(textInput);
        }

        formContainer.appendChild(questionDiv);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.innerText = 'Get Results';
    submitButton.onclick = calculateResults;
    formContainer.appendChild(submitButton);
}

function calculateResults() {
    let totalScore = 0;
    const linkedOutcomesList = [];
    const userAnswers = {}; 

    formQuestions.forEach(q => {
        const questionName = `question-${q.QuestionID}`;
        const elements = document.getElementsByName(questionName);

        if (q.QuestionType === 'multiple-choice') {
            const selected = Array.from(elements).find(el => el.checked);
            if (selected) {
                userAnswers[q.QuestionText] = selected.value;
                const answerIndex = String(q.AnswerOptions).split(',').map(o => o.trim()).indexOf(selected.value);
                if (answerIndex > -1) {
                    totalScore += parseInt(String(q.AnswerValues).split(',')[answerIndex].trim());
                }

                // --- Improved LinkedOutcome Logic ---
                const hasLinkedOutcome = q.LinkedOutcome && String(q.LinkedOutcome).includes(`If "${selected.value}"`);
                
                if (hasLinkedOutcome) {
                    // Split the string to isolate the outcome message
                    const parts = String(q.LinkedOutcome).split('then "');
                    
                    // Check if the split was successful before accessing the second part
                    if (parts.length > 1) {
                        // Get the outcome text, which is the second part
                        let outcomeText = parts[1];
                        
                        // Remove the trailing quote if it exists
                        if (outcomeText.endsWith('"')) {
                            outcomeText = outcomeText.slice(0, -1);
                        }
                        
                        linkedOutcomesList.push(outcomeText);
                    }
                }
                // --- End of Improved Logic ---

            }
        } else if (q.QuestionType === 'multiple-selection') {
            const selected = Array.from(elements).filter(el => el.checked);
            const selectedValues = selected.map(s => s.value);
            userAnswers[q.QuestionText] = selectedValues;

            selected.forEach(sel => {
                const answerIndex = String(q.AnswerOptions).split(',').map(o => o.trim()).indexOf(sel.value);
                 if (answerIndex > -1) {
                    totalScore += parseInt(String(q.AnswerValues).split(',')[answerIndex].trim());
                }
            });
        } else if (q.QuestionType === 'text') {
            const element = elements[0];
            if (element) {
                userAnswers[q.QuestionText] = element.value;
            }
        }
    });
    
    displayResults(totalScore, linkedOutcomesList, userAnswers);
}

function displayResults(score, outcomes, answers) {
    document.getElementById('score').innerText = score;

    const remediation = remediationRules.find(r => score >= r.MinScore && score <= r.MaxScore);
    const remediationMessage = remediation ? remediation.ResultMessage : 'No feedback available for this score.';
    document.getElementById('remediationMessage').innerText = remediationMessage;

    const outcomesUl = document.getElementById('linkedOutcomes');
    outcomesUl.innerHTML = '';
    if (outcomes.length > 0) {
        outcomes.forEach(outcome => {
            const li = document.createElement('li');
            li.innerText = outcome;
            outcomesUl.appendChild(li);
        });
    } else {
        outcomesUl.innerHTML = '<li>None</li>';
    }

    document.getElementById('results').style.display = 'block';
    
    // --- New: Storing data in localStorage ---
    
    // 1. Create the result object
    const resultData = {
        formName: "this_form_name_abc",
        timestamp: new Date().toISOString(),
        userAnswers: answers,
        remediation: {
            score: score,
            message: remediationMessage,
            linkedOutcomes: outcomes
        }
    };

    // 2. Convert the object to a JSON string and save to localStorage
    // This will overwrite any previous entry with the same key.
    localStorage.setItem("this_form_name_abc", JSON.stringify(resultData, null, 2)); 
    console.log("Results saved to localStorage with key: this_form_name_abc");
}
