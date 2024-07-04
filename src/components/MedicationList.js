const MedicationList = ({ medications, onDelete, onEdit, onMedicationClick }) => {
  return (
    <div>
      <h2>Medications</h2>
      <ul>
        {medications.map((medication) => (
          <li key={medication.id} className="medicationBtns">
            <button onClick={() => onMedicationClick(medication)}>{medication.name} - {medication.dosage}</button>
            <button onClick={() => onEdit(medication)}>Edit</button>
            <button onClick={() => onDelete(medication.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MedicationList
