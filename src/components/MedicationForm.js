import { useState, useEffect } from 'react'

//props 
const MedicationForm = ({ onAdd, onEdit, medication, editing }) => {
  // declare state variables and their set functions 
    // each state is variable is initalized with an empty string. 
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [refillDueDate, setRefillDueDate] = useState('')

  // useEffect hook to set state variables based on props. It runs whenever the editing or medication props change. If the component is in editing mode (editing = true) and a med object is provided, it sets the state variables to the corresponding vlaues from the medication object. If there is no value then it defaults to an empty string. 
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


   // handles form submission. It prevents the default form submission behavior. It retrieves the userId from localStorage. It then creates a newMedication object with current state values and userId. It calls the onAdd or onEdit function depending on whether the component is in editing mode or not. If passes the medication.id and newMedication object to onEdit, or just newMedication to onAdd. It also resets the state variables to an empty string after submission. 
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
      <h3> New Medication: </h3>
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
      <button type='submit' className='AddMedBtn'>{editing ? 'Done' : 'Add Medication'} </button>
    </form>
  )
}

export default MedicationForm
