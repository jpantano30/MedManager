import { useState, useEffect } from 'react'
import { getMedications } from '../api/medications'

const Home = ({ medications, setMedications }) => {
  const [interactions, setInteractions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const data = await getMedications()
        setMedications(data)
      } catch (error) {
        console.log('Error fetching medications:', error)
        setError('Error fetching medications. Please try again later.')
      }
    }
    fetchMedications()
  }, [setMedications])

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchTerm}&limit=10`)
      const data = await response.json()
      setInteractions(data.results)
    } catch (error) {
      console.log('Error fetching interactions:', error)
      setError('Error fetching interactions. Please try again later.')
    }
  }

  return (
    <div>
      <div className='content'>
        {error && <p className='error'>{error}</p>}
        <div className='column'>
          <h2>Today's Medications</h2>
          <ul>
            {medications.map((med) => (
              <li key={med.id}>
                <input type='checkbox' /> {med.name} - {med.dosage}
              </li>
            ))}
          </ul>
        </div>
        <div className='column'>
          <h2>Upcoming Refills</h2>
          <ul>
            {medications.filter(med => med.refill_due_date).map((med) => (
              <li key={med.id}>
                {med.name} - Refill due: {med.refill_due_date}
              </li>
            ))}
          </ul>
        </div>
        <div className='column'>
          <h2>Medication Interactions</h2>
          <input
            type='text'
            placeholder='Search for interactions'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <ul>
            {interactions.map((interaction, index) => (
              <li key={index}>{interaction.description}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
