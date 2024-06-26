import { useState, useEffect } from 'react'

const MedicationForm = ({ onAdd, onEdit, medication, editing }) => {
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [refillDueDate, setRefillDueDate] = useState('')

  useEffect(() => {
    if (editing && medication) {
      setName(medication.name || '')
      setDosage(medication.dosage || '')
      setFrequency(medication.frequency || '')
      setStartDate(medication.start_date || '')
      setEndDate(medication.end_date || '')
      setRefillDueDate(medication.refill_due_date || '')
    }
  }, [editing, medication])

  const handleSubmit = (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')
    const newMedication = {
      name,
      dosage,
      frequency,
      start_date: startDate,
      end_date: endDate || null,
      refill_due_date: refillDueDate || null,
      user: userId,
    }
    if (editing){
      onEdit(medication.id, newMedication)
    } else {
      onAdd(newMedication)
    }
    setName('')
    setDosage('')
    setFrequency('')
    setStartDate('')
    setEndDate('')
    setRefillDueDate('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Dosage</label>
        <input type='text' value={dosage} onChange={(e) => setDosage(e.target.value)} />
      </div>
      <div>
        <label>Frequency</label>
        <input type='text' value={frequency} onChange={(e) => setFrequency(e.target.value)} />
      </div>
      <div>
        <label>Start Date</label>
        <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date</label>
        <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div>
        <label>Refill Due Date</label>
        <input type='date' value={refillDueDate} onChange={(e) => setRefillDueDate(e.target.value)} />
      </div>
      <button type='submit'>{editing ? 'Done' : 'Add Medication'} </button>
    </form>
  )
}

export default MedicationForm
