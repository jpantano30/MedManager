import MedicationForm from '../components/MedicationForm'

const AddMedication = ({ onAdd }) => {
  return (
    <div>
      <h1>Add Medication</h1>
      <MedicationForm onAdd={onAdd} />
    </div>
  )
}

export default AddMedication
