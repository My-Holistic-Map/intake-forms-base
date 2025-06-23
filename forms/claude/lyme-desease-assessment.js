import React, { useState } from 'react';



const LymeGuide = () => {

  const [showResults, setShowResults] = useState(false);

  

  // Track symptoms

  const [lymeSymptoms, setLymeSymptoms] = useState({

    fatigue: false,

    jointPain: false,

    muscleAches: false,

    headaches: false,

    rash: false,

    brainFog: false

  });

  

  const [babesiaSymptoms, setBabesiaSymptoms] = useState({

    nightSweats: false,

    airHunger: false,

    dizziness: false

  });

  

  const [bartonellaSymptoms, setBartonellaSymptoms] = useState({

    soreFeet: false,

    anxiety: false,

    skinStreaks: false

  });

  

  const [healthInfo, setHealthInfo] = useState({

    chronicCase: false,

    dieoffReaction: false,

    pregnant: false

  });

  

  // Count checked symptoms

  const countSymptoms = (symptomGroup) => {

    return Object.values(symptomGroup).filter(Boolean).length;

  };

  

  // Get recommendations based on symptoms

  const getRecommendations = () => {

    const recommendations = [];

    const lymeCount = countSymptoms(lymeSymptoms);

    const babesiaCount = countSymptoms(babesiaSymptoms);

    const bartonellaCount = countSymptoms(bartonellaSymptoms);

    

    if (lymeCount >= 2) {

      recommendations.push({

        condition: "Lyme Disease",

        primary: "Morinda Supreme",

        support: "Mimosa Supreme",

        description: "Targets Borrelia bacteria and reduces inflammation"

      });

    }

    

    if (babesiaCount >= 1) {

      recommendations.push({

        condition: "Babesia Co-infection",

        primary: healthInfo.pregnant ? "Cryptolepis Supreme" : "Artemisia Supreme or Cryptolepis Supreme",

        description: "Targets the Babesia protozoan parasite"

      });

    }

    

    if (bartonellaCount >= 1) {

      recommendations.push({

        condition: "Bartonella Co-infection",

        primary: "Houttuynia Supreme",

        description: "Commonly used for Bartonella support"

      });

    }

    

    // Additional support recommendations

    const supportProducts = [];

    

    if (healthInfo.chronicCase || healthInfo.dieoffReaction) {

      supportProducts.push({

        name: "Takesumi Supreme",

        reason: "For detox support with chronic infections or die-off reactions"

      });

    }

    

    if (lymeCount >= 2) {

      supportProducts.push({

        name: "BFB1 or BFB2",

        reason: "To help break down bacterial biofilms that protect Lyme bacteria"

      });

    }

    

    return {

      mainRecommendations: recommendations,

      supportRecommendations: supportProducts

    };

  };

  

  const handleLymeChange = (symptom) => {

    setLymeSymptoms({

      ...lymeSymptoms,

      [symptom]: !lymeSymptoms[symptom]

    });

  };

  

  const handleBabesiaChange = (symptom) => {

    setBabesiaSymptoms({

      ...babesiaSymptoms,

      [symptom]: !babesiaSymptoms[symptom]

    });

  };

  

  const handleBartonellaChange = (symptom) => {

    setBartonellaSymptoms({

      ...bartonellaSymptoms,

      [symptom]: !bartonellaSymptoms[symptom]

    });

  };

  

  const handleHealthInfoChange = (item) => {

    setHealthInfo({

      ...healthInfo,

      [item]: !healthInfo[item]

    });

  };

  

  // Submit the form and show results

  const handleSubmit = (e) => {

    if (e) e.preventDefault();

    setShowResults(true);

    window.scrollTo(0, 0);

  };

  

  // Reset the form

  const handleReset = () => {

    setLymeSymptoms({

      fatigue: false,

      jointPain: false,

      muscleAches: false,

      headaches: false,

      rash: false,

      brainFog: false

    });

    

    setBabesiaSymptoms({

      nightSweats: false,

      airHunger: false,

      dizziness: false

    });

    

    setBartonellaSymptoms({

      soreFeet: false,

      anxiety: false,

      skinStreaks: false

    });

    

    setHealthInfo({

      chronicCase: false,

      dieoffReaction: false,

      pregnant: false

    });

    

    setShowResults(false);

  };

  

  // Function to render symptom checkboxes

  const SymptomCheckbox = ({ id, label, checked, onChange }) => (

    <div className="flex items-center mb-2">

      <input

        id={id}

        type="checkbox"

        checked={checked}

        onChange={onChange}

        className="h-4 w-4 rounded border-2 focus:ring-2"

        style={{

          accentColor: '#767034',

          borderColor: '#879683',

          '&:focus': { ringColor: '#767034' }

        }}

      />

      <label htmlFor={id} className="ml-2" style={{color: '#3b3e2e'}}>

        {label}

      </label>

    </div>

  );

  

  // Form component

  const SymptomsForm = () => (

    <form onSubmit={handleSubmit} className="p-6 rounded shadow-md" style={{backgroundColor: '#fed695'}}>

      <h2 className="text-xl font-bold mb-4" style={{color: '#a15236'}}>Lyme &amp; Co-Infection Symptoms</h2>

      

      <div className="mb-6">

        <h3 className="font-semibold mb-2" style={{color: '#a15236'}}>Lyme Disease Symptoms</h3>

        <div className="p-4 rounded" style={{border: '2px solid #879683'}}>

          <SymptomCheckbox 

            id="fatigue" 

            label="Fatigue or low energy" 

            checked={lymeSymptoms.fatigue} 

            onChange={() => handleLymeChange("fatigue")} 

          />

          <SymptomCheckbox 

            id="jointPain" 

            label="Joint pain (especially migrating pain)" 

            checked={lymeSymptoms.jointPain} 

            onChange={() => handleLymeChange("jointPain")} 

          />

          <SymptomCheckbox 

            id="muscleAches" 

            label="Muscle aches or stiffness" 

            checked={lymeSymptoms.muscleAches} 

            onChange={() => handleLymeChange("muscleAches")} 

          />

          <SymptomCheckbox 

            id="headaches" 

            label="Headaches and/or neck stiffness" 

            checked={lymeSymptoms.headaches} 

            onChange={() => handleLymeChange("headaches")} 

          />

          <SymptomCheckbox 

            id="rash" 

            label="Skin rash (bullseye or other)" 

            checked={lymeSymptoms.rash} 

            onChange={() => handleLymeChange("rash")} 

          />

          <SymptomCheckbox 

            id="brainFog" 

            label="Brain fog or memory issues" 

            checked={lymeSymptoms.brainFog} 

            onChange={() => handleLymeChange("brainFog")} 

          />

        </div>

      </div>

      

      <div className="mb-6">

        <h3 className="font-semibold mb-2" style={{color: '#a15236'}}>Babesia Symptoms</h3>

        <div className="p-4 rounded" style={{border: '2px solid #879683'}}>

          <SymptomCheckbox 

            id="nightSweats" 

            label="Night sweats or chills" 

            checked={babesiaSymptoms.nightSweats} 

            onChange={() => handleBabesiaChange("nightSweats")} 

          />

          <SymptomCheckbox 

            id="airHunger" 

            label="Shortness of breath or 'air hunger'" 

            checked={babesiaSymptoms.airHunger} 

            onChange={() => handleBabesiaChange("airHunger")} 

          />

          <SymptomCheckbox 

            id="dizziness" 

            label="Dizziness or feeling off-balance" 

            checked={babesiaSymptoms.dizziness} 

            onChange={() => handleBabesiaChange("dizziness")} 

          />

        </div>

      </div>

      

      <div className="mb-6">

        <h3 className="font-semibold mb-2" style={{color: '#a15236'}}>Bartonella Symptoms</h3>

        <div className="p-4 rounded" style={{border: '2px solid #879683'}}>

          <SymptomCheckbox 

            id="soreFeet" 

            label="Sore soles of feet (especially in morning)" 

            checked={bartonellaSymptoms.soreFeet} 

            onChange={() => handleBartonellaChange("soreFeet")} 

          />

          <SymptomCheckbox 

            id="anxiety" 

            label="Anxiety, irritability, or mood swings" 

            checked={bartonellaSymptoms.anxiety} 

            onChange={() => handleBartonellaChange("anxiety")} 

          />

          <SymptomCheckbox 

            id="skinStreaks" 

            label="Skin rashes or stretch mark-like streaks" 

            checked={bartonellaSymptoms.skinStreaks} 

            onChange={() => handleBartonellaChange("skinStreaks")} 

          />

        </div>

      </div>

      

      <div className="mb-6">

        <h3 className="font-semibold mb-2" style={{color: '#a15236'}}>Additional Information</h3>

        <div className="p-4 rounded" style={{border: '2px solid #879683'}}>

          <SymptomCheckbox 

            id="chronicCase" 

            label="Symptoms for over 6 months" 

            checked={healthInfo.chronicCase} 

            onChange={() => handleHealthInfoChange("chronicCase")} 

          />

          <SymptomCheckbox 

            id="dieoffReaction" 

            label="Experience die-off reactions with treatments" 

            checked={healthInfo.dieoffReaction} 

            onChange={() => handleHealthInfoChange("dieoffReaction")} 

          />

          <SymptomCheckbox 

            id="pregnant" 

            label="Pregnant or breastfeeding" 

            checked={healthInfo.pregnant} 

            onChange={() => handleHealthInfoChange("pregnant")} 

          />

        </div>

      </div>

      

      <button

        type="button"

        onClick={handleSubmit}

        className="font-bold py-3 px-4 rounded w-full text-white transition-all duration-200 hover:opacity-90"

        style={{background: 'linear-gradient(135deg, #a15236 0%, #483621 100%)'}}

      >

        Get Recommendations

      </button>

    </form>

  );

  

  // Results component

  const Results = () => {

    const { mainRecommendations, supportRecommendations } = getRecommendations();

    const hasRecommendations = mainRecommendations.length > 0;

    

    return (

      <div className="p-6 rounded shadow-md" style={{backgroundColor: '#fed695'}}>

        <h2 className="text-xl font-bold mb-4" style={{color: '#a15236'}}>Supreme Nutrition Recommendations</h2>

        

        {!hasRecommendations && (

          <div className="p-4 rounded mb-4" style={{backgroundColor: '#879683', border: '2px solid #767034'}}>

            <p style={{color: '#3b3e2e'}}>

              Based on your symptoms, we don't have enough information to suggest specific products.

              Please consult with a healthcare provider for proper diagnosis and treatment.

            </p>

          </div>

        )}

        

        {hasRecommendations && (

          <div className="mb-6">

            <h3 className="font-semibold mb-3" style={{color: '#a15236'}}>Primary Recommendations</h3>

            

            {mainRecommendations.map((rec, index) => (

              <div 

                key={index} 

                className="p-4 rounded mb-3 text-white"

                style={{background: 'linear-gradient(135deg, #767034 0%, #483621 100%)'}}

              >

                <h4 className="font-bold" style={{color: '#fed695'}}>{rec.condition}</h4>

                <p className="mt-1">

                  <strong>Main product:</strong> {rec.primary}

                </p>

                {rec.support && (

                  <p>

                    <strong>Support product:</strong> {rec.support}

                  </p>

                )}

                <p className="mt-1 text-sm opacity-90">

                  {rec.description}

                </p>

              </div>

            ))}

          </div>

        )}

        

        {supportRecommendations.length > 0 && (

          <div className="mb-6">

            <h3 className="font-semibold mb-3" style={{color: '#a15236'}}>Additional Support Products</h3>

            

            {supportRecommendations.map((product, index) => (

              <div 

                key={index} 

                className="p-3 rounded mb-2"

                style={{backgroundColor: '#879683', border: '2px solid #767034'}}

              >

                <p style={{color: '#3b3e2e'}}>

                  <strong>{product.name}:</strong> {product.reason}

                </p>

              </div>

            ))}

          </div>

        )}

        

        {healthInfo.pregnant && (

          <div className="p-4 rounded mb-4" style={{backgroundColor: '#a15236', border: '2px solid #483621'}}>

            <p className="text-white">

              <strong>Important:</strong> Artemisia Supreme should be avoided during pregnancy and breastfeeding.

              Please consult with a healthcare provider before taking any supplements.

            </p>

          </div>

        )}

        

        <div className="p-4 rounded mb-6" style={{backgroundColor: '#879683', border: '2px solid #767034'}}>

          <h3 className="font-semibold mb-2" style={{color: '#3b3e2e'}}>Important Notes</h3>

          <ul className="list-disc pl-5 space-y-1" style={{color: '#3b3e2e'}}>

            <li>Work with a qualified healthcare practitioner</li>

            <li>Start with 2 products simultaneously for better results</li>

            <li>Support overall health with proper nutrition and rest</li>

            <li>Treatment may need to change as symptoms evolve</li>

          </ul>

        </div>

        

        <button

          onClick={handleReset}

          className="font-bold py-3 px-4 rounded w-full text-white transition-all duration-200 hover:opacity-90"

          style={{background: 'linear-gradient(135deg, #a15236 0%, #483621 100%)'}}

        >

          Start Again

        </button>

      </div>

    );

  };

  

  return (

    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #879683 0%, #404e2c 100%)'}}>

      <div className="max-w-2xl mx-auto p-4">

        <div 

          className="text-white p-6 rounded-t mb-6"

          style={{

            background: 'linear-gradient(135deg, #3b3e2e 0%, #404e2c 100%)',

            color: '#fed695'

          }}

        >

          <h1 className="text-2xl font-bold">Supreme Nutrition Lyme Protocol Advisor</h1>

          <p>Find the right products for your symptoms</p>

        </div>

        

        {showResults ? <Results /> : <SymptomsForm />}

        

        <div className="mt-6 text-center text-sm" style={{color: '#fed695'}}>

          <p>This tool is for educational purposes only and does not replace medical advice.</p>

        </div>

      </div>

    </div>

  );

};



export default LymeGuide;
