import React, { useState, useEffect } from 'react'
import { getMedications, logMedication, getMedicationLogs } from '../services/medications'
import { isWithinInterval, addDays } from 'date-fns'

const Home = ({ setMedications, safeFormat }) => {
  const [medications, setLocalMedications] = useState([])
  const [interactions, setInteractions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)
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
        setLogs(fetchedLogs)
        updateCheckedMeds(fetchedLogs, fetchedMeds)
      } catch (err) {
        console.error("Error fetching initial data:", err)
        setError(err.message)
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
      console.error('Error logging medication:', err)
    }
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchTerm}&limit=10`)
      const data = await response.json()
      setInteractions(data.results)
    } catch (err) {
      console.error('Error fetching interactions:', err)
      setError('Error fetching interactions. Please try again later.')
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
      {error && <p className='error'>{error}</p>}
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
        <ul>
          {interactions.map((interaction, index) => (
            <li key={index}>{interaction.description}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
