import { format } from 'date-fns'
const MedicationList = ({ medications, onDelete, onEdit, onMarkAsTaken }) => {
  if (!Array.isArray(medications)) {
    return <div>No medications available.</div>
  }

  const handleCheckboxChange = (id, date, checked) => {
    onMarkAsTaken(id, date, checked)
  }

  return (
    <div>
      <h2>Medications</h2>
      <ul>
        {medications.map((medication) => (
          <li key={medication.id}>
            {medication.name} - {medication.dosage}
            <button onClick={() => onEdit(medication)}>Edit</button>
            <button onClick={() => onDelete(medication.id)}>Delete</button>
            <div> 
              <label>
                Taken Today: 
                <input
                  type='checkbox'
                  onChange={(e) => handleCheckboxChange(medication.id, format(new Date(), 'MM-dd-yyyy'), e.target.checked)}
                  checked={Array.isArray(medication.taken_days) && medication.taken_days.includes(format(new Date(), 'MM-dd-yyyy'))}
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MedicationList
