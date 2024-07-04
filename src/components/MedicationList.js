const MedicationList = ({ medications, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Medications</h2>
      <ul>
        {medications.map((medication) => (
          <li key={medication.id}>
            {medication.name} - {medication.dosage}
            <button onClick={() => onEdit(medication)}>Edit</button>
            <button onClick={() => onDelete(medication.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MedicationList
