import React, { useState } from 'react';



const AntiviralSelector = () => {

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({});

  const [multiSelectAnswers, setMultiSelectAnswers] = useState({

    healthConcerns: [],

    medications: []

  });

  const [results, setResults] = useState([]);

  const [completed, setCompleted] = useState(false);



  const antivirals = [

    {

      name: "Melia Supreme",

      description: "Made from powdered neem leaf, works as a broad-spectrum antimicrobial effective against viruses, including herpes, without harming beneficial gut flora.",

      primaryUse: "Viral infections, especially herpes",

      benefits: ["Broad-spectrum antimicrobial", "Preserves beneficial gut flora", "Effective against herpes"],

      cautions: ["May interact with certain medications"]

    },

    {

      name: "Woad Supreme",

      description: "Made from Isatis tinctoria, acts as an antimicrobial with strong antiviral properties, particularly effective against influenza and pneumonia.",

      primaryUse: "Respiratory viral infections",

      benefits: ["Strong against influenza", "Helps with respiratory infections", "Antimicrobial properties"],

      cautions: ["Consult healthcare provider if pregnant"]

    },

    {

      name: "Illicium Supreme",

      description: "Star anise (Illicium verum) rich in shikimic acid (used in Tamiflu), helps with digestive issues and has antiviral properties.",

      primaryUse: "Flu-like viruses, digestive support",

      benefits: ["Contains shikimic acid (Tamiflu ingredient)", "Helps with nausea/indigestion", "Antiviral properties"],

      cautions: ["Generally considered safe for most individuals, including during pregnancy"],

      pregnancySafe: true

    },

    {

      name: "Astragalus Supreme",

      description: "Astragalus propinquus acts as an immunostimulant with cardiovascular benefits and anti-aging properties.",

      primaryUse: "Immune support and prevention",

      benefits: ["Immunostimulant", "Supports cardiovascular health", "Anti-aging benefits"],

      cautions: ["May interact with immunosuppressants"]

    },

    {

      name: "Cat's Claw Supreme",

      description: "Uncaria tomentosa, used as an antimicrobial for viral and Lyme disease with anti-inflammatory properties.",

      primaryUse: "Viral infections, Lyme disease, inflammation",

      benefits: ["Effective against many viruses", "Helps with Lyme disease", "Anti-inflammatory"],

      cautions: ["May interact with blood thinners and blood pressure medications"]

    },

    {

      name: "Olive Leaf Supreme",

      description: "Olea europaea, a broad-spectrum antimicrobial with antiviral and antioxidant properties.",

      primaryUse: "General viral protection with antioxidant benefits",

      benefits: ["Broad-spectrum antimicrobial", "Antioxidant properties", "Supports cardiovascular health"],

      cautions: ["May interact with blood pressure medications"]

    },

    {

      name: "Vital Guard Supreme",

      description: "Chrysanthemum morifolium acts as a broad-spectrum antimicrobial with antiviral, neuroprotective, and cardioprotective properties.",

      primaryUse: "Comprehensive immune and system support",

      benefits: ["Neuroprotective", "Cardioprotective", "Broad antiviral support"],

      cautions: ["Consult healthcare provider if on heart medications"]

    }

  ];



  const questions = [

    {

      question: "What is your primary reason for seeking an antiviral supplement?",

      options: [

        { label: "To treat a specific viral infection", value: "treat" },

        { label: "For general immune support to prevent infections", value: "prevent" }

      ]

    },

    {

      question: "What type of viral infection are you concerned about?",

      options: [

        { label: "Skin-related (e.g., herpes)", value: "skin" },

        { label: "Respiratory (e.g., influenza, common cold)", value: "respiratory" },

        { label: "Digestive system related", value: "digestive" },

        { label: "Other or unknown", value: "other" },

        { label: "Not applicable - seeking general prevention", value: "prevention" }

      ]

    },

    {

      question: "Are you currently pregnant or breastfeeding?",

      options: [

        { label: "Yes", value: "yes" },

        { label: "No", value: "no" }

      ]

    },

    {

      question: "Do you have any of these co-existing health concerns? (Select all that apply)",

      type: "multiSelect",

      selectKey: "healthConcerns",

      options: [

        { label: "Cardiovascular/heart issues", value: "cardiovascular" },

        { label: "Inflammatory conditions (arthritis, etc.)", value: "inflammatory" },

        { label: "Digestive problems", value: "digestive" },

        { label: "Autoimmune condition", value: "autoimmune" },

        { label: "Lyme disease or co-infections", value: "lyme" },

        { label: "None of the above", value: "none" }

      ]

    },

    {

      question: "Are you currently taking any of these medications? (Select all that apply)",

      type: "multiSelect",

      selectKey: "medications",

      options: [

        { label: "Blood thinners", value: "bloodThinners" },

        { label: "Blood pressure medications", value: "bloodPressure" },

        { label: "Immunosuppressants", value: "immunosuppressants" },

        { label: "None of the above", value: "none" }

      ]

    },

    {

      question: "Which additional benefits would you value most?",

      options: [

        { label: "Antioxidant properties", value: "antioxidant" },

        { label: "Anti-aging benefits", value: "antiAging" },

        { label: "Anti-inflammatory effects", value: "antiInflammatory" },

        { label: "Neuroprotective (brain health) benefits", value: "neuroprotective" },

        { label: "Cardioprotective (heart health) benefits", value: "cardioprotective" }

      ]

    }

  ];



  // Handle normal single-select questions

  const handleAnswer = (value) => {

    const updatedAnswers = { ...answers };

    

    // Store the answer based on current step

    if (step === 0) {

      updatedAnswers.purpose = value;

    } else if (step === 1) {

      updatedAnswers.virusType = value;

    } else if (step === 2) {

      updatedAnswers.pregnancy = value;

    } else if (step === 5) {

      updatedAnswers.additionalBenefits = value;

    }

    

    setAnswers(updatedAnswers);

    

    // Move to next step or finalize

    if (step === 5) {

      // This is the last question

      calculateResults(updatedAnswers, multiSelectAnswers);

    } else if (step === 2) {

      // After pregnancy question, go to health concerns

      setStep(3);

    } else if (step < 3) {

      // For all other single-select questions before multiselect

      setStep(step + 1);

    }

  };

  

  // Handle multi-select questions

  const handleMultiSelect = (value, selectKey) => {

    const updatedMultiSelectAnswers = { ...multiSelectAnswers };

    const currentSelection = [...updatedMultiSelectAnswers[selectKey]];

    

    // If "None of the above" is selected, clear other selections

    if (value === "none") {

      updatedMultiSelectAnswers[selectKey] = ["none"];

    } else {

      // If another option is selected, remove "None of the above" if present

      const noneIndex = currentSelection.indexOf("none");

      if (noneIndex !== -1) {

        currentSelection.splice(noneIndex, 1);

      }

      

      // Toggle the selected value

      const valueIndex = currentSelection.indexOf(value);

      if (valueIndex === -1) {

        currentSelection.push(value);

      } else {

        currentSelection.splice(valueIndex, 1);

      }

      

      updatedMultiSelectAnswers[selectKey] = currentSelection;

    }

    

    setMultiSelectAnswers(updatedMultiSelectAnswers);

  };

  

  // Handle continuing from a multi-select question

  const proceedFromMultiSelect = (selectKey) => {

    const updatedMultiSelectAnswers = { ...multiSelectAnswers };

    if (updatedMultiSelectAnswers[selectKey].length === 0) {

      // If nothing selected, default to "none"

      updatedMultiSelectAnswers[selectKey] = ["none"];

      setMultiSelectAnswers(updatedMultiSelectAnswers);

    }

    

    // Move to the next step

    if (step === 3) {

      setStep(4); // Move from health concerns to medications

    } else if (step === 4) {

      setStep(5); // Move from medications to additional benefits

    }

  };



  // Calculate the final recommendations

  const calculateResults = (userAnswers, multiAnswers) => {

    // Special case for pregnancy/breastfeeding

    if (userAnswers.pregnancy === "yes") {

      // Only recommend Illicium Supreme for pregnant/breastfeeding individuals

      // Just return the single product rather than all products with scores

      const pregnancySafeResult = [{

        ...antivirals.find(a => a.name === "Illicium Supreme"),

        score: 10

      }];

      

      setResults(pregnancySafeResult);

      setCompleted(true);

      return;

    }

    

    // Regular scoring for non-pregnant users

    let scoredAntivirals = antivirals.map(antiviral => {

      let score = 0;

      

      // Purpose scoring

      if (userAnswers.purpose === "prevent" && antiviral.name === "Astragalus Supreme") {

        score += 3;

      } else if (userAnswers.purpose === "prevent" && antiviral.name === "Vital Guard Supreme") {

        score += 2;

      } else if (userAnswers.purpose === "prevent" && antiviral.name === "Olive Leaf Supreme") {

        score += 2;

      }

      

      // Virus type scoring

      if (userAnswers.virusType === "skin" && antiviral.name === "Melia Supreme") {

        score += 3;

      } else if (userAnswers.virusType === "respiratory" && antiviral.name === "Woad Supreme") {

        score += 3;

      } else if (userAnswers.virusType === "respiratory" && antiviral.name === "Illicium Supreme") {

        score += 2;

      } else if (userAnswers.virusType === "digestive" && antiviral.name === "Illicium Supreme") {

        score += 3;

      } else if (userAnswers.virusType === "other" && (antiviral.name === "Cat's Claw Supreme" || antiviral.name === "Olive Leaf Supreme")) {

        score += 2;

      }

      

      // Health concerns scoring (multi-select)

      if (multiAnswers.healthConcerns.includes("none")) {

        // No health concerns to consider

      } else {

        // Check each selected health concern

        if (multiAnswers.healthConcerns.includes("cardiovascular") && 

            (antiviral.name === "Astragalus Supreme" || antiviral.name === "Vital Guard Supreme" || antiviral.name === "Olive Leaf Supreme")) {

          score += 2;

        }

        

        if (multiAnswers.healthConcerns.includes("inflammatory") && antiviral.name === "Cat's Claw Supreme") {

          score += 3;

        }

        

        if (multiAnswers.healthConcerns.includes("digestive") && antiviral.name === "Illicium Supreme") {

          score += 2;

        }

        

        if (multiAnswers.healthConcerns.includes("lyme") && antiviral.name === "Cat's Claw Supreme") {

          score += 3;

        }

        

        if (multiAnswers.healthConcerns.includes("autoimmune") && antiviral.name === "Cat's Claw Supreme") {

          score += 2;

        }

      }

      

      // Medication considerations (negative scoring)

      if (multiAnswers.medications.includes("none")) {

        // No medication concerns

      } else {

        // Check each medication for potential interactions

        if (multiAnswers.medications.includes("bloodThinners")) {

          if (antiviral.name === "Cat's Claw Supreme") {

            score -= 2;

          }

        }

        

        if (multiAnswers.medications.includes("bloodPressure")) {

          if (antiviral.name === "Olive Leaf Supreme" || antiviral.name === "Cat's Claw Supreme") {

            score -= 2;

          }

        }

        

        if (multiAnswers.medications.includes("immunosuppressants")) {

          if (antiviral.name === "Astragalus Supreme") {

            score -= 2;

          }

        }

      }

      

      // Additional benefits scoring

      if (userAnswers.additionalBenefits === "antioxidant" && antiviral.name === "Olive Leaf Supreme") {

        score += 2;

      } else if (userAnswers.additionalBenefits === "antiAging" && antiviral.name === "Astragalus Supreme") {

        score += 2;

      } else if (userAnswers.additionalBenefits === "antiInflammatory" && antiviral.name === "Cat's Claw Supreme") {

        score += 2;

      } else if (userAnswers.additionalBenefits === "neuroprotective" && antiviral.name === "Vital Guard Supreme") {

        score += 2;

      } else if (userAnswers.additionalBenefits === "cardioprotective" && (antiviral.name === "Vital Guard Supreme" || antiviral.name === "Astragalus Supreme" || antiviral.name === "Olive Leaf Supreme")) {

        score += 2;

      }

      

      return {

        ...antiviral,

        score

      };

    });

    

    // Sort by score in descending order

    scoredAntivirals.sort((a, b) => b.score - a.score);

    setResults(scoredAntivirals);

    setCompleted(true);

  };



  const resetQuiz = () => {

    setStep(0);

    setAnswers({});

    setMultiSelectAnswers({

      healthConcerns: [],

      medications: []

    });

    setResults([]);

    setCompleted(false);

  };



  return (

    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #879683 0%, #404e2c 100%)'}}>

      <div className="max-w-4xl mx-auto p-6">

        <div className="rounded-lg shadow-lg overflow-hidden" style={{backgroundColor: '#fed695'}}>

          <div className="p-6" style={{background: 'linear-gradient(135deg, #3b3e2e 0%, #404e2c 100%)'}}>

            <h1 className="text-2xl font-bold text-center" style={{color: '#fed695'}}>

              Supreme Nutrition Antiviral Selector

            </h1>

          </div>

          

          <div className="p-6">

            {!completed ? (

              <div className="p-6 rounded-lg mb-6" style={{backgroundColor: '#fed695', border: '2px solid #879683'}}>

                <h2 className="text-xl font-semibold mb-4" style={{color: '#a15236'}}>

                  {questions[step].question}

                </h2>

                

                {questions[step].type === "multiSelect" ? (

                  <>

                    <div className="space-y-3">

                      {questions[step].options.map((option, index) => (

                        <button

                          key={index}

                          onClick={() => handleMultiSelect(option.value, questions[step].selectKey)}

                          className="w-full text-left p-3 border-2 rounded-md transition-all duration-200 flex items-center"

                          style={{

                            backgroundColor: multiSelectAnswers[questions[step].selectKey].includes(option.value) 

                              ? '#767034' 

                              : '#fed695',

                            borderColor: multiSelectAnswers[questions[step].selectKey].includes(option.value) 

                              ? '#767034' 

                              : '#879683',

                            color: multiSelectAnswers[questions[step].selectKey].includes(option.value) 

                              ? '#fed695' 

                              : '#3b3e2e'

                          }}

                          onMouseEnter={(e) => {

                            if (!multiSelectAnswers[questions[step].selectKey].includes(option.value)) {

                              e.target.style.backgroundColor = '#767034';

                              e.target.style.color = '#fed695';

                            }

                          }}

                          onMouseLeave={(e) => {

                            if (!multiSelectAnswers[questions[step].selectKey].includes(option.value)) {

                              e.target.style.backgroundColor = '#fed695';

                              e.target.style.color = '#3b3e2e';

                            }

                          }}

                        >

                          <div 

                            className="w-5 h-5 mr-3 border-2 rounded-md flex items-center justify-center"

                            style={{

                              borderColor: multiSelectAnswers[questions[step].selectKey].includes(option.value) 

                                ? '#fed695' 

                                : '#879683',

                              backgroundColor: multiSelectAnswers[questions[step].selectKey].includes(option.value) 

                                ? '#fed695' 

                                : 'transparent'

                            }}

                          >

                            {multiSelectAnswers[questions[step].selectKey].includes(option.value) && (

                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#767034" strokeWidth={2}>

                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />

                              </svg>

                            )}

                          </div>

                          {option.label}

                        </button>

                      ))}

                    </div>

                    <button

                      onClick={() => proceedFromMultiSelect(questions[step].selectKey)}

                      className="w-full p-3 mt-6 rounded-md transition-all duration-200 font-medium"

                      style={{

                        background: 'linear-gradient(135deg, #a15236 0%, #483621 100%)',

                        color: '#fed695'

                      }}

                      onMouseEnter={(e) => {

                        e.target.style.transform = 'translateY(-1px)';

                        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

                      }}

                      onMouseLeave={(e) => {

                        e.target.style.transform = 'translateY(0)';

                        e.target.style.boxShadow = 'none';

                      }}

                    >

                      Continue

                    </button>

                  </>

                ) : (

                  <div className="space-y-3">

                    {questions[step].options.map((option, index) => (

                      <button

                        key={index}

                        onClick={() => handleAnswer(option.value)}

                        className="w-full text-left p-3 border-2 rounded-md transition-all duration-200"

                        style={{

                          backgroundColor: '#fed695',

                          borderColor: '#879683',

                          color: '#3b3e2e'

                        }}

                        onMouseEnter={(e) => {

                          e.target.style.backgroundColor = '#767034';

                          e.target.style.borderColor = '#767034';

                          e.target.style.color = '#fed695';

                        }}

                        onMouseLeave={(e) => {

                          e.target.style.backgroundColor = '#fed695';

                          e.target.style.borderColor = '#879683';

                          e.target.style.color = '#3b3e2e';

                        }}

                      >

                        {option.label}

                      </button>

                    ))}

                  </div>

                )}

                

                <div className="mt-4 text-sm" style={{color: '#879683'}}>

                  Question {step + 1} of {questions.length}

                </div>

              </div>

            ) : (

              <div>

                <h2 className="text-xl font-semibold mb-4" style={{color: '#a15236'}}>

                  Your Recommended Antivirals

                </h2>

                {results.length > 0 ? (

                  <div className="space-y-6">

                    {answers.pregnancy === "yes" ? (

                      // Special display for pregnancy - only show Illicium Supreme

                      <>

                        <div 

                          className="p-4 rounded-lg border-2"

                          style={{

                            background: 'linear-gradient(135deg, #767034 0%, #483621 100%)',

                            borderColor: '#879683',

                            color: '#fed695'

                          }}

                        >

                          <h3 className="text-lg font-bold mb-1" style={{color: '#fed695'}}>

                            {results[0].name}

                          </h3>

                          <div 

                            className="mb-2 text-sm p-2 rounded border-2"

                            style={{

                              backgroundColor: '#a15236',

                              borderColor: '#fed695',

                              color: '#fed695'

                            }}

                          >

                            <span className="font-medium">Recommended for pregnancy/breastfeeding.</span> Star anise is generally considered safer during pregnancy and may help with nausea.

                          </div>

                          <p className="text-sm mb-2">{results[0].description}</p>

                          <div className="mt-3">

                            <h4 className="font-medium text-sm" style={{color: '#fed695'}}>Best for:</h4>

                            <p className="text-sm">{results[0].primaryUse}</p>

                          </div>

                          <div className="mt-3">

                            <h4 className="font-medium text-sm" style={{color: '#fed695'}}>Key Benefits:</h4>

                            <ul className="list-disc list-inside text-sm">

                              {results[0].benefits.map((benefit, i) => (

                                <li key={i}>{benefit}</li>

                              ))}

                            </ul>

                          </div>

                          <div className="mt-3">

                            <h4 className="font-medium text-sm" style={{color: '#fed695'}}>Cautions:</h4>

                            <p className="text-sm">{results[0].cautions}</p>

                          </div>

                        </div>

                        

                        <div 

                          className="text-sm p-4 rounded-lg border-2"

                          style={{

                            backgroundColor: '#a15236',

                            borderColor: '#879683',

                            color: '#fed695'

                          }}

                        >

                          <p className="font-medium mb-2">Important Safety Information:</p>

                          <p className="mb-2">During pregnancy or breastfeeding, only Illicium Supreme (star anise) is being recommended. Other herbal supplements may not be safe during this time.</p>

                          <p className="font-medium">Always consult with your healthcare provider before taking any supplement during pregnancy or while breastfeeding.</p>

                        </div>

                      </>

                    ) : (

                      // Normal display for non-pregnant users - show top 3 results

                      <>

                        {results.slice(0, 3).map((antiviral, index) => (

                          <div 

                            key={index} 

                            className="p-4 rounded-lg border-2"

                            style={{

                              background: index === 0 

                                ? 'linear-gradient(135deg, #767034 0%, #483621 100%)' 

                                : 'linear-gradient(135deg, #879683 0%, #767034 100%)',

                              borderColor: '#879683',

                              color: '#fed695'

                            }}

                          >

                            <h3 className="text-lg font-bold mb-1" style={{color: '#fed695'}}>

                              {index + 1}. {antiviral.name}

                            </h3>

                            <p className="text-sm mb-2">{antiviral.description}</p>

                            <div className="mt-3">

                              <h4 className="font-medium text-sm" style={{color: '#fed695'}}>Best for:</h4>

                              <p className="text-sm">{antiviral.primaryUse}</p>

                            </div>

                            <div className="mt-3">

                              <h4 className="font-medium text-sm" style={{color: '#fed695'}}>Key Benefits:</h4>

                              <ul className="list-disc list-inside text-sm">

                                {antiviral.benefits.map((benefit, i) => (

                                  <li key={i}>{benefit}</li>

                                ))}

                              </ul>

                            </div>

                            <div className="mt-3">

                              <h4 className="font-medium text-sm" style={{color: '#fed695'}}>Cautions:</h4>

                              <p className="text-sm">{antiviral.cautions}</p>

                            </div>

                          </div>

                        ))}

                        

                        <div 

                          className="text-sm p-4 rounded-lg border-2"

                          style={{

                            backgroundColor: '#a15236',

                            borderColor: '#879683',

                            color: '#fed695'

                          }}

                        >

                          <p className="font-medium mb-2">Important Note:</p>

                          <p>Always consult with a healthcare professional before starting any supplement regimen, especially if you have existing health conditions or are taking medications.</p>

                        </div>

                      </>

                    )}

                    

                    <button 

                      onClick={resetQuiz}

                      className="mt-6 w-full p-3 rounded-md transition-all duration-200 font-medium"

                      style={{

                        background: 'linear-gradient(135deg, #a15236 0%, #483621 100%)',

                        color: '#fed695'

                      }}

                      onMouseEnter={(e) => {

                        e.target.style.transform = 'translateY(-1px)';

                        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

                      }}

                      onMouseLeave={(e) => {

                        e.target.style.transform = 'translateY(0)';

                        e.target.style.boxShadow = 'none';

                      }}

                    >

                      Start Over

                    </button>

                  </div>

                ) : (

                  <p style={{color: '#3b3e2e'}}>Calculating your results...</p>

                )}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

};



export default AntiviralSelector;
