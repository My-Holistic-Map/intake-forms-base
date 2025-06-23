import React, { useState } from 'react';



const ParasiteApp = () => {

  // State for tracking user selections

  const [symptoms, setSymptoms] = useState({});

  const [riskFactors, setRiskFactors] = useState({});

  const [additionalInfo, setAdditionalInfo] = useState({});

  const [showResults, setShowResults] = useState(false);

  const [activeSection, setActiveSection] = useState('symptoms');



  // Symptom categories

  const symptomsData = [

    { id: 'itching', text: 'Itching around the anus, especially at night' },

    { id: 'visibleWorms', text: 'Visible worms in stool' },

    { id: 'fever', text: 'Fever, chills, or sweating (especially after travel)' },

    { id: 'fatigue', text: 'General fatigue or low energy' },

    { id: 'jointPain', text: 'Joint pain or muscle aches' },

    { id: 'skinRashes', text: 'Skin rashes or unexplained skin issues' },

    { id: 'abdominalPain', text: 'Abdominal pain or discomfort' },

    { id: 'bloating', text: 'Bloating or excessive gas' },

    { id: 'brainFog', text: 'Brain fog or difficulty concentrating' },

    { id: 'alternateDiarrhea', text: 'Alternating diarrhea and constipation' },

    { id: 'weightLoss', text: 'Weight loss or inability to maintain weight' },

    { id: 'digestiveIssues', text: 'Major digestive issues' },

    { id: 'anemia', text: 'Anemia or unexplained iron deficiency' }

  ];



  // Risk factor categories

  const riskFactorsData = [

    { id: 'travel', text: 'Recent international travel' },

    { id: 'rawMeat', text: 'Consumption of raw or undercooked meat' },

    { id: 'sushi', text: 'Consumption of sushi or raw fish' },

    { id: 'pets', text: 'Close contact with pets, especially cleaning litter boxes' },

    { id: 'wellWater', text: 'Use of well water or untreated water' },

    { id: 'restaurants', text: 'Regular dining at restaurants identified as potential sources' },

    { id: 'infectedPerson', text: 'Close contact with someone who has parasitic infection' },

    { id: 'soil', text: 'Playing or working in soil or gardening without gloves' },

    { id: 'publicRestrooms', text: 'Frequent use of public restrooms' }

  ];



  // Additional information categories

  const additionalInfoData = [

    { id: 'pregnant', text: 'Currently pregnant or breastfeeding' },

    { id: 'allergies', text: 'Known allergies to herbal supplements' },

    { id: 'medications', text: 'Currently taking prescription medications' },

    { id: 'lyme', text: 'History of Lyme disease or co-infections' },

    { id: 'children', text: 'Children in household with similar symptoms' },

    { id: 'partner', text: 'Partner/spouse with similar symptoms' },

    { id: 'afterEvent', text: 'Symptoms began after a specific event (travel, meal, etc.)' },

    { id: 'previousDiagnosis', text: 'Previous diagnosis of parasitic infection' }

  ];



  // Product information

  const products = {

    vidanga: {

      name: 'Vidanga Supreme',

      description: 'Best for intestinal worms (e.g., pinworms, hookworms).',

      targetSymptoms: 'Targets symptoms like itching around the anus or visible worms in stool.',

      score: 0

    },

    artemisia: {

      name: 'Artemisia Supreme',

      description: 'Ideal for protozoan parasites (e.g., malaria, Giardia).',

      targetSymptoms: 'Effective for fever, chills, and nausea, especially after travel.',

      score: 0

    },

    mimosa: {

      name: 'Mimosa Supreme',

      description: 'Broad-spectrum, great for Lyme disease or mixed infections.',

      targetSymptoms: 'Addresses fatigue, joint pain, and skin rashes.',

      score: 0

    },

    melia: {

      name: 'Melia Supreme',

      description: 'General anti-parasitic support for vague or chronic symptoms.',

      targetSymptoms: 'Helps with mild fatigue or digestive upset.',

      score: 0

    },

    blackWalnut: {

      name: 'Black Walnut Supreme',

      description: 'Powerful against worms and fungal infections (e.g., Candida).',

      targetSymptoms: 'Helps with bloating, brain fog, and skin issues.',

      score: 0

    }

  };



  // Handle checkbox changes

  const handleSymptomChange = (id) => {

    setSymptoms(prev => ({

      ...prev,

      [id]: !prev[id]

    }));

  };



  const handleRiskFactorChange = (id) => {

    setRiskFactors(prev => ({

      ...prev,

      [id]: !prev[id]

    }));

  };



  const handleAdditionalInfoChange = (id) => {

    setAdditionalInfo(prev => ({

      ...prev,

      [id]: !prev[id]

    }));

  };



  // Calculate recommendations

  const calculateRecommendations = () => {

    let productScores = {...products};

    

    // Score based on symptoms

    if (symptoms.itching || symptoms.visibleWorms) {

      productScores.vidanga.score += 3;

      productScores.blackWalnut.score += 2;

    }

    

    if (symptoms.fever) {

      productScores.artemisia.score += 3;

    }

    

    if (symptoms.jointPain || symptoms.fatigue || symptoms.skinRashes) {

      productScores.mimosa.score += 3;

      if (additionalInfo.lyme) {

        productScores.mimosa.score += 2;

      }

    }

    

    if (symptoms.brainFog || symptoms.bloating || symptoms.abdominalPain) {

      productScores.blackWalnut.score += 3;

    }

    

    if (symptoms.digestiveIssues || symptoms.alternateDiarrhea) {

      productScores.blackWalnut.score += 2;

      productScores.vidanga.score += 1;

      productScores.melia.score += 1;

    }

    

    if (symptoms.fatigue && !symptoms.jointPain && !symptoms.fever) {

      productScores.melia.score += 2;

    }



    if (symptoms.anemia) {

      productScores.vidanga.score += 1; // hookworms can cause anemia

    }

    

    // Risk factors

    if (riskFactors.travel) {

      productScores.artemisia.score += 2;

    }

    

    if (riskFactors.sushi || riskFactors.rawMeat) {

      productScores.blackWalnut.score += 1;

      productScores.vidanga.score += 1;

    }

    

    // Sort products by score

    return Object.values(productScores)

      .sort((a, b) => b.score - a.score)

      .filter(product => product.score > 0);

  };



  // Handle form submission

  const handleSubmit = () => {

    setShowResults(true);

  };



  // Reset the form

  const handleReset = () => {

    setSymptoms({});

    setRiskFactors({});

    setAdditionalInfo({});

    setShowResults(false);

    setActiveSection('symptoms');

  };



  // Navigate between sections

  const nextSection = () => {

    if (activeSection === 'symptoms') {

      setActiveSection('riskFactors');

    } else if (activeSection === 'riskFactors') {

      setActiveSection('additionalInfo');

    }

  };



  const previousSection = () => {

    if (activeSection === 'additionalInfo') {

      setActiveSection('riskFactors');

    } else if (activeSection === 'riskFactors') {

      setActiveSection('symptoms');

    }

  };



  // Determine recommendations based on selections

  const recommendations = calculateRecommendations();



  // Determine pregnancy-specific recommendations

  const isPregnant = additionalInfo.pregnant;

  const pregnancyRecommendations = isPregnant ? 

    "For pregnancy: Consider lemongrass, garlic, onion, Vital Guard, or Scutellaria which are safer options during pregnancy and breastfeeding." : "";



  const containerStyle = {

    minHeight: '100vh',

    background: 'linear-gradient(135deg, #879683 0%, #404e2c 100%)',

    padding: '20px'

  };



  const mainContainerStyle = {

    backgroundColor: '#fed695',

    border: '2px solid #879683'

  };



  const headerStyle = {

    background: 'linear-gradient(135deg, #3b3e2e 0%, #404e2c 100%)',

    color: '#fed695'

  };



  const headingStyle = {

    color: '#a15236'

  };



  const textStyle = {

    color: '#3b3e2e'

  };



  const buttonStyle = {

    background: 'linear-gradient(135deg, #a15236 0%, #483621 100%)'

  };



  const backButtonStyle = {

    backgroundColor: '#879683'

  };



  const checkboxStyle = {

    accentColor: '#767034'

  };



  const productCardStyle = {

    background: 'linear-gradient(135deg, #767034 0%, #483621 100%)',

    color: '#fed695'

  };



  const infoBoxStyle = {

    backgroundColor: '#879683',

    border: '2px solid #767034',

    color: '#fed695'

  };



  const pregnancyNoticeStyle = {

    backgroundColor: '#fed695',

    border: '2px solid #a15236'

  };



  return (

    <div style={containerStyle}>

      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg" style={mainContainerStyle}>

        <h1 className="text-2xl font-bold text-center mb-6 rounded-lg py-3" style={headerStyle}>

          Parasite Treatment Recommendation Tool

        </h1>

        

        {!showResults ? (

          <div>

            {/* Symptoms Section */}

            {activeSection === 'symptoms' && (

              <div>

                <h2 className="text-xl font-semibold mb-4" style={headingStyle}>Symptoms Checklist</h2>

                <p className="mb-4" style={textStyle}>Please check all symptoms you are currently experiencing:</p>

                <div className="grid md:grid-cols-2 gap-2 mb-6">

                  {symptomsData.map(item => (

                    <div key={item.id} className="flex items-start">

                      <input

                        type="checkbox"

                        id={item.id}

                        checked={symptoms[item.id] || false}

                        onChange={() => handleSymptomChange(item.id)}

                        className="mt-1 mr-2"

                        style={checkboxStyle}

                      />

                      <label htmlFor={item.id} style={textStyle}>{item.text}</label>

                    </div>

                  ))}

                </div>

                <div className="flex justify-end">

                  <button 

                    onClick={nextSection}

                    className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"

                    style={buttonStyle}

                  >

                    Next: Risk Factors

                  </button>

                </div>

              </div>

            )}



            {/* Risk Factors Section */}

            {activeSection === 'riskFactors' && (

              <div>

                <h2 className="text-xl font-semibold mb-4" style={headingStyle}>Risk Factor Assessment</h2>

                <p className="mb-4" style={textStyle}>Please check any that apply to you:</p>

                <div className="grid md:grid-cols-2 gap-2 mb-6">

                  {riskFactorsData.map(item => (

                    <div key={item.id} className="flex items-start">

                      <input

                        type="checkbox"

                        id={item.id}

                        checked={riskFactors[item.id] || false}

                        onChange={() => handleRiskFactorChange(item.id)}

                        className="mt-1 mr-2"

                        style={checkboxStyle}

                      />

                      <label htmlFor={item.id} style={textStyle}>{item.text}</label>

                    </div>

                  ))}

                </div>

                <div className="flex justify-between">

                  <button 

                    onClick={previousSection}

                    className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"

                    style={backButtonStyle}

                  >

                    Back to Symptoms

                  </button>

                  <button 

                    onClick={nextSection}

                    className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"

                    style={buttonStyle}

                  >

                    Next: Additional Info

                  </button>

                </div>

              </div>

            )}



            {/* Additional Info Section */}

            {activeSection === 'additionalInfo' && (

              <div>

                <h2 className="text-xl font-semibold mb-4" style={headingStyle}>Additional Information</h2>

                <p className="mb-4" style={textStyle}>Please check all that apply:</p>

                <div className="grid md:grid-cols-2 gap-2 mb-6">

                  {additionalInfoData.map(item => (

                    <div key={item.id} className="flex items-start">

                      <input

                        type="checkbox"

                        id={item.id}

                        checked={additionalInfo[item.id] || false}

                        onChange={() => handleAdditionalInfoChange(item.id)}

                        className="mt-1 mr-2"

                        style={checkboxStyle}

                      />

                      <label htmlFor={item.id} style={textStyle}>{item.text}</label>

                    </div>

                  ))}

                </div>

                <div className="flex justify-between">

                  <button 

                    onClick={previousSection}

                    className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"

                    style={backButtonStyle}

                  >

                    Back to Risk Factors

                  </button>

                  <button 

                    onClick={handleSubmit}

                    className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"

                    style={buttonStyle}

                  >

                    Get Recommendations

                  </button>

                </div>

              </div>

            )}

          </div>

        ) : (

          <div>

            <h2 className="text-xl font-semibold mb-4" style={headingStyle}>Your Recommendations</h2>

            

            {recommendations.length > 0 ? (

              <div>

                <p className="mb-4" style={textStyle}>Based on your symptoms and risk factors, these products may be helpful:</p>

                

                <div className="space-y-6 mb-8">

                  {recommendations.map((product, index) => (

                    <div 

                      key={product.name} 

                      className={`p-4 rounded-lg ${index === 0 ? 'ring-2' : ''}`} 

                      style={{

                        ...productCardStyle,

                        ...(index === 0 && { ringColor: '#a15236' })

                      }}

                    >

                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#fed695' }}>

                        {index === 0 ? '🌟 ' : ''}{product.name}

                      </h3>

                      <p className="mb-1" style={{ color: '#fed695', opacity: 0.9 }}>

                        {product.description}

                      </p>

                      <p className="text-sm" style={{ color: '#fed695', opacity: 0.8 }}>

                        {product.targetSymptoms}

                      </p>

                    </div>

                  ))}

                </div>

                

                {isPregnant && (

                  <div className="p-4 rounded-lg mb-6" style={pregnancyNoticeStyle}>

                    <h3 className="font-semibold" style={{ color: '#a15236' }}>Pregnancy/Breastfeeding Notice</h3>

                    <p style={textStyle}>{pregnancyRecommendations}</p>

                  </div>

                )}

                

                <div className="p-4 rounded-lg mb-6" style={infoBoxStyle}>

                  <h3 className="font-semibold mb-2" style={{ color: '#fed695' }}>Holistic Approach to Parasite Management</h3>

                  <ul className="space-y-2">

                    <li><span className="font-medium">Treatment Duration:</span> Standard protocol is 3-6 weeks. You should feel better, not worse.</li>

                    <li><span className="font-medium">Diet:</span> Focus on healthy whole foods and avoid food sensitivities. Avoid sushi and undercooked meats.</li>

                    <li><span className="font-medium">Hygiene:</span> Ensure proper handwashing, especially after using restrooms or handling pets.</li>

                    <li><span className="font-medium">Household:</span> Consider treating spouse/partner if you suspect cross-contamination.</li>

                    {additionalInfo.children && <li><span className="font-medium">Children:</span> Consider Black Walnut or Artemisia (check proper dosing).</li>}

                    <li><span className="font-medium">Protocol Note:</span> No need to cycle herbs on/off or follow moon cycles.</li>

                  </ul>

                </div>

                

                <div className="text-center">

                  <p className="italic mb-4" style={textStyle}>This tool is for informational purposes only. Consult with a qualified healthcare practitioner before beginning any treatment.</p>

                  <button 

                    onClick={handleReset} 

                    className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"

                    style={buttonStyle}

                  >

                    Start Over

                  </button>

                </div>

              </div>

            ) : (

              <div>

                <p className="mb-4" style={textStyle}>Based on your selections, we don't have enough information to make a specific recommendation. Consider selecting more symptoms or risk factors, or consult with a healthcare professional for personalized advice.</p>

                <div className="text-center">

                  <button 

                    onClick={handleReset}

                    className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"

                    style={buttonStyle}

                  >

                    Try Again

                  </button>

                </div>

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  );

};



export default ParasiteApp;
