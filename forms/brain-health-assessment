import React, { useState } from 'react';
import { Brain, CheckCircle, AlertTriangle, Info, ArrowRight, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

const BrainHealthApp = () => {
  const [currentStep, setCurrentStep] = useState('assessment');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [detailAnswers, setDetailAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  // Neurotransmitter definitions with symptoms
  const neurotransmitters = {
    serotonin: {
      name: 'Serotonin',
      subtitle: 'The "Happy" Neurotransmitter',
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      symptoms: [
        'Down in the dumps depression (but still want to be around people)',
        'Negative thoughts and low self-esteem',
        'Obsessive thoughts',
        'Irritable and impatient',
        'Anxiety',
        'Sleep disorders',
        'Migraines',
        'Craving carbs'
      ],
      lifestyle: [
        'Support gut health (95% of serotonin made in gut)',
        'Balance hormones (estrogen/progesterone/testosterone)',
        'Liver detox support for estrogen clearance',
        'Eat tryptophan-rich foods',
        'Address gut dysbiosis'
      ]
    },
    dopamine: {
      name: 'Dopamine',
      subtitle: 'The Motivation & Drive Neurotransmitter',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      symptoms: [
        'Depression with preference to be alone',
        'Poor motivation',
        'Easily loses temper',
        'Agitated depression',
        'Trouble concentrating and focusing',
        'Trouble waking, want to sleep a lot',
        'Low libido',
        'Addiction issues',
        'ADD/ADHD symptoms'
      ],
      lifestyle: [
        'Eat tyrosine-rich foods (meats, eggs, cheeses, seeds)',
        'Practice stress management (HeartMath techniques)',
        'Remove artificial colors, preservatives, gluten, dairy',
        'Avoid endocrine-disrupting chemicals',
        'Support midbrain with antioxidants'
      ]
    },
    gaba: {
      name: 'GABA',
      subtitle: 'The Calming Neurotransmitter',
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      symptoms: [
        'Difficult to relax',
        'Insomnia',
        'Anxiety and panic attacks',
        'Overexcited, easily worried',
        'Feeling overwhelmed',
        'Racing mind',
        'Need TV or noise to sleep',
        'Seizures or epilepsy'
      ],
      lifestyle: [
        'Address chronic stress and adrenal health',
        'Support gut health to reduce ammonia',
        'Ensure proper citric acid cycle function',
        'Time calming supplements appropriately',
        'Test for leaky brain syndrome'
      ]
    },
    acetylcholine: {
      name: 'Acetylcholine',
      subtitle: 'The Memory & Focus Neurotransmitter',
      color: 'bg-orange-500',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      symptoms: [
        'Memory lapses',
        'Poor focus and concentration',
        'Brain endurance issues',
        'Poor reading comprehension',
        'Difficulty with number calculations',
        'Cannot follow directions well',
        'Poor sense of direction',
        'Neuromuscular fatigue',
        'Dementia/Alzheimer symptoms'
      ],
      lifestyle: [
        'Eat choline-rich foods (eggs, meat, cruciferous vegetables)',
        'Support citric acid cycle function',
        'Use ginger to boost choline',
        'Adjust choline intake based on mental workload',
        'Ensure adequate brain stimulation'
      ]
    }
  };

  // Detailed questions for personalized recommendations
  const detailQuestions = {
    serotonin: [
      {
        id: 'gut_health',
        question: 'Do you have digestive issues or gut problems?',
        options: ['Yes, significant issues', 'Some minor issues', 'No gut problems'],
        primarySupplement: {
          'Yes, significant issues': 'Cataplex B + Gut Support Protocol',
          'Some minor issues': 'Magnesium + B1 (Cataplex B)',
          'No gut problems': 'Magnesium + B1 (Cataplex B)'
        }
      },
      {
        id: 'hormones',
        question: 'Are you experiencing hormonal imbalances?',
        options: ['Yes, significant', 'Some issues', 'No problems'],
        secondarySupplement: {
          'Yes, significant': 'Liver Detox Support (Schisandra, Cataplex E)',
          'Some issues': 'St Johns Wort',
          'No problems': 'St Johns Wort'
        }
      },
      {
        id: 'constipation',
        question: 'Do you tend to be constipated?',
        options: ['Yes, frequently', 'Occasionally', 'No'],
        note: {
          'Yes, frequently': 'Focus on liver/gallbladder support first before serotonin supplements'
        }
      }
    ],
    dopamine: [
      {
        id: 'stress_pattern',
        question: 'Do you ruminate on stressors or have chronic stress?',
        options: ['Yes, constantly', 'Sometimes', 'Rarely'],
        primarySupplement: {
          'Yes, constantly': 'Tyrosine (depleted from rumination)',
          'Sometimes': 'Essential Nutrients (5MTHF, B12, P5P, Iron)',
          'Rarely': 'Essential Nutrients (5MTHF, B12, P5P, Iron)'
        }
      },
      {
        id: 'adhd_focus',
        question: 'Do you have ADD/ADHD or learning difficulties?',
        options: ['Yes, diagnosed/obvious', 'Some symptoms', 'No'],
        secondarySupplement: {
          'Yes, diagnosed/obvious': 'Pro DHA + Bacopa Supreme',
          'Some symptoms': 'Bacopa Supreme',
          'No': 'NAC + Alpha Lipoic Acid'
        }
      },
      {
        id: 'movement',
        question: 'Any movement issues or family history of Parkinsons?',
        options: ['Yes', 'Family history only', 'No'],
        note: {
          'Yes': 'Consider Mucuna (consult physician, especially if melanoma history)',
          'Family history only': 'Consider Mucuna for prevention (consult physician)'
        }
      }
    ],
    gaba: [
      {
        id: 'anxiety_level',
        question: 'Do you experience panic attacks or severe anxiety?',
        options: ['Yes, panic attacks', 'Severe anxiety', 'Mild anxiety'],
        primarySupplement: {
          'Yes, panic attacks': 'Magnesium + Zinc + P5P (Critical Trinity)',
          'Severe anxiety': 'Magnesium + Zinc + P5P (Critical Trinity)',
          'Mild anxiety': 'Ashwagandha'
        }
      },
      {
        id: 'sleep_environment',
        question: 'Do you need TV or background noise to sleep?',
        options: ['Yes, always', 'Sometimes', 'No, prefer quiet'],
        secondarySupplement: {
          'Yes, always': 'Passion Flower + Valerian',
          'Sometimes': 'Passion Flower + Valerian',
          'No, prefer quiet': 'Progesterone Support (Vitamin E + Iodine)'
        }
      },
      {
        id: 'gaba_response',
        question: 'Have you tried GABA supplements? Did they help?',
        options: ['Yes, they helped', 'Tried, no effect', 'Never tried'],
        note: {
          'Yes, they helped': 'May indicate leaky brain - focus on brain health foundations first'
        }
      }
    ],
    acetylcholine: [
      {
        id: 'mental_workload',
        question: 'How demanding is your daily mental/brain work?',
        options: ['Very demanding', 'Moderate', 'Light'],
        primarySupplement: {
          'Very demanding': 'Choline (higher dose)',
          'Moderate': 'Choline (standard dose)',
          'Light': 'Cataplex B'
        }
      },
      {
        id: 'memory_type',
        question: 'What type of cognitive issues do you experience most?',
        options: ['Reading/comprehension', 'Math/calculations', 'Following directions', 'General memory'],
        secondarySupplement: {
          'Reading/comprehension': 'Bacopa Supreme',
          'Math/calculations': 'Cataplex B2',
          'Following directions': 'Ginger + Manganese',
          'General memory': 'Bacopa Supreme'
        }
      }
    ]
  };

  // Brain health foundations
  const brainFoundations = [
    {
      category: 'Gut Health',
      description: 'Most neurotransmitters are made in the gut',
      actions: ['Address dysbiosis', 'Support healthy gut bacteria', 'Reduce inflammation']
    },
    {
      category: 'Healthy Fats',
      description: 'Brain is 60% fat - need 30% calories from healthy fats',
      actions: ['Grass-fed beef', 'Farm fresh eggs', 'Fish, nuts, avocados', 'Pro DHA supplement', '2 TBS grass-fed butter daily']
    },
    {
      category: 'Stable Glucose',
      description: 'Brain needs steady fuel supply',
      actions: ['Stabilize blood sugar', 'Avoid spikes/crashes', 'Monitor mood/energy patterns']
    },
    {
      category: 'Oxygen',
      description: 'Brain uses 20% of total body oxygen',
      actions: ['Address anemia (Copper, 5MTHF, Iron, Mo, P5P, B12)', 'Improve breathing patterns', 'Support healthy blood pressure']
    },
    {
      category: 'Sleep',
      description: 'Glymphatic system clears toxins during sleep',
      actions: ['Optimize sleep quality', 'Clear beta amyloid buildup', 'Support circadian rhythm']
    },
    {
      category: 'Hormonal Balance',
      description: 'All hormones made from cholesterol affect brain',
      actions: ['Support thyroid function', 'Balance sex hormones', 'Eat sufficient healthy fats']
    },
    {
      category: 'Brain Stimulation',
      description: 'Neuroplasticity requires variety and challenge',
      actions: ['Try new activities', 'Vary exercise routines', 'Learn new skills', 'Original strength movements']
    }
  ];

  const handleSymptomToggle = (ntType, symptom) => {
    const symptomKey = `${ntType}-${symptom}`;
    setSelectedSymptoms(prev => 
      prev.includes(symptomKey) 
        ? prev.filter(s => s !== symptomKey)
        : [...prev, symptomKey]
    );
  };

  const handleDetailAnswer = (questionId, answer) => {
    setDetailAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateResults = () => {
    const scores = {};
    Object.keys(neurotransmitters).forEach(nt => {
      scores[nt] = selectedSymptoms.filter(s => s.startsWith(nt)).length;
    });
    
    const topNT = Object.entries(scores).reduce((a, b) => a[1] >= b[1] ? a : b);
    const hasMultiple = Object.values(scores).filter(score => score > 0).length > 1;
    
    setResults({
      scores,
      primaryNeurotransmitter: topNT[0],
      hasMultipleImbalances: hasMultiple,
      totalSymptoms: selectedSymptoms.length
    });
    setCurrentStep('detailed-questions');
  };

  const getPersonalizedSupplements = (ntType) => {
    const questions = detailQuestions[ntType] || [];
    const primaryQ = questions.find(q => q.primarySupplement);
    const secondaryQ = questions.find(q => q.secondarySupplement);
    
    const primaryRec = primaryQ?.primarySupplement?.[detailAnswers[primaryQ.id]] || 'Essential Nutrients (5MTHF, B12, P5P, Iron)';
    const secondaryRec = secondaryQ?.secondarySupplement?.[detailAnswers[secondaryQ.id]] || 'Magnesium + Zinc';
    
    return { primary: primaryRec, secondary: secondaryRec };
  };

  const resetAssessment = () => {
    setSelectedSymptoms([]);
    setDetailAnswers({});
    setResults(null);
    setCurrentStep('assessment');
    setExpandedSections({});
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Initial Assessment Step
  if (currentStep === 'assessment') {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 min-h-screen">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-16 h-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-800">Brain Health Assessment</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Identify potential neurotransmitter imbalances and receive personalized supplement and lifestyle recommendations based on your symptoms.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {Object.entries(neurotransmitters).map(([key, nt]) => (
            <div key={key} className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{borderLeftColor: nt.color.replace('bg-', '#')}}>
              <div className="flex items-center mb-6">
                <div className={`w-6 h-6 rounded-full ${nt.color} mr-4`}></div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{nt.name}</h3>
                  <p className="text-gray-600">{nt.subtitle}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {nt.symptoms.map((symptom, idx) => (
                  <label key={idx} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.includes(`${key}-${symptom}`)}
                      onChange={() => handleSymptomToggle(key, symptom)}
                      className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 leading-relaxed">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={calculateResults}
            disabled={selectedSymptoms.length === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center mx-auto space-x-3 transition-all transform hover:scale-105"
          >
            <span>Analyze My Brain Health</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          {selectedSymptoms.length === 0 && (
            <p className="text-gray-500 mt-3">Select at least one symptom to continue</p>
          )}
          {selectedSymptoms.length > 0 && (
            <p className="text-blue-600 mt-3">{selectedSymptoms.length} symptoms selected</p>
          )}
        </div>
      </div>
    );
  }

  // Detailed Questions Step
  if (currentStep === 'detailed-questions' && results) {
    const primaryNT = results.primaryNeurotransmitter;
    const ntData = neurotransmitters[primaryNT];
    const questions = detailQuestions[primaryNT] || [];
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Detailed Assessment</h1>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className={`w-8 h-8 rounded-full ${ntData.color} mr-3`}></div>
            <p className="text-xl text-gray-600">
              Primary focus: <strong className={ntData.textColor}>{ntData.name}</strong>
            </p>
          </div>
          <p className="text-gray-600">Let's get more specific to personalize your recommendations</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className={`w-6 h-6 rounded-full ${ntData.color} mr-3`}></div>
            {ntData.name} Detailed Questions
          </h2>

          <div className="space-y-8">
            {questions.map((question, idx) => (
              <div key={question.id} className={`p-6 rounded-lg border-2 ${ntData.borderColor} ${ntData.bgColor}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{question.question}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleDetailAnswer(question.id, option)}
                      className={`p-4 text-sm rounded-lg border-2 transition-all transform hover:scale-105 ${
                        detailAnswers[question.id] === option
                          ? `${ntData.color} text-white border-transparent shadow-lg`
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {question.note && detailAnswers[question.id] && question.note[detailAnswers[question.id]] && (
                  <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> {question.note[detailAnswers[question.id]]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setCurrentStep('results')}
            disabled={questions.some(q => !detailAnswers[q.id])}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center mx-auto space-x-3 transition-all transform hover:scale-105"
          >
            <span>Get My Personalized Plan</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          {questions.some(q => !detailAnswers[q.id]) && (
            <p className="text-gray-500 mt-3">Please answer all questions to continue</p>
          )}
        </div>
      </div>
    );
  }

  // Results Step
  if (currentStep === 'results' && results) {
    const primaryNT = neurotransmitters[results.primaryNeurotransmitter];
    const supplements = getPersonalizedSupplements(results.primaryNeurotransmitter);
    
    return (
      <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Your Personalized Brain Health Plan</h1>
          </div>
          <button
            onClick={resetAssessment}
            className="text-blue-600 hover:text-blue-700 flex items-center mx-auto space-x-2 text-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Take Assessment Again</span>
          </button>
        </div>

        {results.hasMultipleImbalances && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-800 text-lg">Multiple Neurotransmitter Imbalances Detected</h3>
                <p className="text-yellow-700 mt-2">
                  You may benefit from addressing the brain health foundations first, then focusing on your primary neurotransmitter: <strong>{primaryNT.name}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Primary Results Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className={`w-8 h-8 rounded-full ${primaryNT.color} mr-4`}></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Primary Focus: {primaryNT.name}</h2>
              <p className="text-xl text-gray-600">{primaryNT.subtitle}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Primary Supplement */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                Primary Supplement Recommendation
              </h3>
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                <p className="text-lg font-semibold text-green-800">
                  {supplements.primary}
                </p>
                <p className="text-sm text-green-700 mt-2">Start with this as your primary support</p>
              </div>
            </div>

            {/* Secondary Supplement */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Info className="w-6 h-6 text-blue-500 mr-2" />
                Secondary Supplement Recommendation
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                <p className="text-lg font-semibold text-blue-800">
                  {supplements.secondary}
                </p>
                <p className="text-sm text-blue-700 mt-2">Add this for additional support</p>
              </div>
            </div>
          </div>

          {/* Lifestyle Actions */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Info className="w-6 h-6 text-purple-500 mr-2" />
              Key Lifestyle Actions for {primaryNT.name}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {primaryNT.lifestyle.map((action, idx) => (
                <div key={idx} className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <p className="text-purple-800 font-medium">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brain Health Foundations */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <button
            onClick={() => toggleSection('foundations')}
            className="w-full flex items-center justify-between text-left mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Brain Health Foundations</h2>
            {expandedSections.foundations ? (
              <ChevronUp className="w-6 h-6 text-gray-500" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-500" />
            )}
          </button>
          
          {expandedSections.foundations && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brainFoundations.map((foundation, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{foundation.category}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{foundation.description}</p>
                  <ul className="space-y-2">
                    {foundation.actions.map((action, actionIdx) => (
                      <li key={actionIdx} className="text-sm text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-center">
            <strong className="text-gray-800">Important Disclaimer:</strong> This assessment is for educational purposes only. 
            Always consult with a qualified healthcare provider before starting any supplement regimen, especially if you have 
            existing health conditions, take medications, or are pregnant/nursing.
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={resetAssessment}
            className="text-blue-600 hover:text-blue-700 flex items-center mx-auto space-x-2 text-lg font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Start New Assessment</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default BrainHealthApp;
