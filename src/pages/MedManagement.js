import { useState } from 'react'
import MedicationForm from '../components/MedicationForm'
import MedicationList from '../components/MedicationList'
import { addMedication, deleteMedication, updateMedication } from '../api/medications'

const MedManagement = ({ medications, setMedications, handleMarkAsTaken }) => {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(false)
  const [currentMedication, setCurrentMedication] = useState(null)

  const handleAdd = async (medication) => {
    const newMedication = await addMedication(medication)
    setMedications([...medications, {
      ...newMedication,
      taken_days: Array.isArray(newMedication.taken_days) ? newMedication.taken_days : []
    }])
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    await deleteMedication(id)
    setMedications(medications.filter(med => med.id !== id))
  }

  const handleEdit = async (id, medication) => {
    const updatedMedication = await updateMedication(id, medication)
    setMedications(medications.map(med => (med.id === id ? {
      ...updatedMedication,
      taken_days: Array.isArray(updatedMedication.taken_days) ? updatedMedication.taken_days : []
    } : med)))
    setEditing(false)
    setCurrentMedication(null)
    setShowForm(false)
  }

  const handleEditClick = (medication) => {
    setCurrentMedication(medication)
    setEditing(true)
    setShowForm(true)
  }

  return (
    <div>
      <div className='content'>
        <button 
          onClick={() => setShowForm(!showForm)}
          className='addNewBtn'>
          {editing ? 'Done' : 'Add New Medication'}
        </button>
        {showForm && 
          <MedicationForm 
            onAdd={handleAdd} 
            onEdit={handleEdit}
            medication={currentMedication}
            editing={editing}
        />}
        <MedicationList 
          medications={medications} 
          onDelete={handleDelete} 
          onEdit={handleEditClick} 
          onMarkAsTaken={handleMarkAsTaken}
        />
      </div>
    </div>
  )
}

export default MedManagement
