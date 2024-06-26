import { useState, useEffect } from 'react'
import MedicationForm from '../components/MedicationForm'
import MedicationList from '../components/MedicationList'
import { addMedication, deleteMedication, updateMedication, getMedications } from '../api/medications'

const MedManagement = ({ medications, setMedications, user }) => {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(false)
  const [currentMedication, setCurrentMedication] = useState(null)

  useEffect(() => {
    if (user){
      const fetchMedications = async () => {
        try {
          const data = await getMedications()
          setMedications(data)
        } catch (error) {
          console.log('Error fetching medications: ', error)
        }
      }
      fetchMedications()
    }
  }, [user, setMedications])

  const handleAdd = async (medication) => {
    const newMedication = await addMedication(medication)
    setMedications([...medications, newMedication])
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    await deleteMedication(id)
    setMedications(medications.filter(med => med.id !== id))
  }

  const handleEdit = async (id, medication) => {
    const updatedMedication = await updateMedication(id, medication)
    setMedications(medications.map(med => (med.id === id ? updatedMedication : med)))
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
              {editing ? 'Edit Medication' : 'Add New Medication'}
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
        />
      </div>
    </div>
  )
}

export default MedManagement
