import React, { useState } from 'react'
import PreferenceForm from './Components/PreferenceForm'
import ComparisonTable from './Components/ComparisonTable'



const App = () => {

  const [recommendations, setRecommendations] = useState([])

  return (
    <div>

      <h1>
        AI Car Recommender
      </h1>

      <PreferenceForm setRecommendations={setRecommendations} />
      <ComparisonTable recommendations={recommendations} />

    </div>
  )

}

export default App