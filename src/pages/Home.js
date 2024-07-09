import { useState, useEffect } from 'react'
import { getMedications, logMedication, getMedicationLogs } from '../services/medications'
import { isWithinInterval, addDays } from 'date-fns'
import Interactions from '../components/Interactions'

const Home = ({ setMedications, safeFormat }) => {
  const [medications, setLocalMedications] = useState([])
  const [interactions, setInteractions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [drugName, setDrugName] = useState('')
  const [interactionsTable, setInteractionsTable] = useState([])
  const [checkedMeds, setCheckedMeds] = useState(() => {
    const today = new Date().toISOString().split('T')[0]
    const storedData = JSON.parse(localStorage.getItem('checkedMeds')) || {}
    return storedData.date === today ? storedData.meds : {}
  })
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMeds = await getMedications()
        setLocalMedications(fetchedMeds)
        setMedications(fetchedMeds)
        const fetchedLogs = await getMedicationLogs()

        if (Array.isArray(fetchedLogs)) {
          setLogs(fetchedLogs);
          updateCheckedMeds(fetchedLogs, fetchedMeds);
        } else {
          console.error("Fetched logs are not an array:", fetchedLogs);
        }
      } catch (err) {
        console.log("Error fetching initial data:", err)
      }
    }
    fetchData()
  }, [setMedications])

  const updateCheckedMeds = (logs, meds) => {
    const today = new Date().toISOString().split('T')[0]
    const medicationsMap = meds.reduce((acc, med) => ({ ...acc, [med.id]: med.name }), {})
    const medicationsTaken = logs.reduce((acc, log) => {
      if (log.date === today && medicationsMap[log.medication]) {
        acc[log.medication] = true
      }
      return acc
    }, {})
    setCheckedMeds(medicationsTaken)
  }

  const handleCheckboxChange = async (medication) => {
    const today = new Date().toISOString().split('T')[0]
    if (checkedMeds[medication.id]) return // prevent multiple checks for the same day
    const newLog = { medication: medication.id, date: today, taken: true }
    try {
      await logMedication(newLog)
      const newCheckedMeds = { ...checkedMeds, [medication.id]: true }
      setCheckedMeds(newCheckedMeds)
      setLogs([...logs, newLog])
      localStorage.setItem('checkedMeds', JSON.stringify({ date: today, meds: newCheckedMeds }))
    } catch (err) {
      console.log('Error logging medication:', err)
    }
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchTerm}&limit=1`)
      const data = await response.json()
      console.log('API Response:', data)

      const interactionData = data.results[0]?.drug_interactions || []
      console.log('Interactions data:', interactionData)

      const fetchedDrugName = data.results[0]?.openfda?.brand_name[0] || data.results[0]?.openfda?.generic_name[0] || 'Unknown Drug'
      console.log('Drug Name:', fetchedDrugName)

      const interactionsTable = data.results[0]?.drug_interactions_table || []
      console.log('Interactions table:', interactionsTable)

      setInteractions(interactionData)
      setDrugName(fetchedDrugName)
      setInteractionsTable(interactionsTable)
    } catch (err) {
      console.log('Error fetching interactions:', err)
    }
  }

  const upcomingRefills = medications.filter(med => {
    const refillDate = new Date(med.refill_due_date)
    const today = new Date()
    const nextWeek = addDays(today, 7)
    return isWithinInterval(refillDate, { start: today, end: nextWeek })
  })

  return (
    <div className='content'>
      <div className='column'>
        <h2>Today's Medications</h2>
        {medications.map(med => (
          <div key={med.id}>
            <label>
              <input
                type="checkbox"
                checked={checkedMeds[med.id] || false}
                onChange={() => handleCheckboxChange(med)}
                disabled={checkedMeds[med.id] || false}
              />
              {med.name}
            </label>
          </div>
        ))}
      </div>
      <div className='column'>
        <h2>Upcoming Refills</h2>
        <ul>
          {upcomingRefills.map(med => (
            <li key={med.id}>
              {med.name} - Refill due: {safeFormat(new Date(med.refill_due_date), 'MM-dd-yyyy')}
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
        <Interactions drugName={drugName} interactions={interactions} interactionsTable={interactionsTable} />
      </div>
    </div>
  )
}

export default Home
