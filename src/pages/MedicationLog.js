import { useState, useEffect } from'react'
import { getMedicationLogs, getMedications } from '../services/medications'

const MedicationLog = ({ setMedications }) => {
  const [logs, setLogs] = useState([])
  const [medicationMap, setMedicationMap] = useState({})

  useEffect(() => {
    const fetchMedications = async () => {
      const meds = await getMedications()
      setMedications(meds)

      const medsMap = meds.reduce((acc, med) => {
        acc[med.id] = med.name
        return acc
      }, {})
      setMedicationMap(medsMap)
    }

    const fetchLogs = async () => {
      const logs = await getMedicationLogs()
      setLogs(logs)
    }
    fetchMedications()
    fetchLogs()
  }, [setMedications])

  return (
    <div>
      <h2> Medication Log </h2>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.date} - {medicationMap[log.medication]} - {log.taken ? 'Taken' : 'Missed'}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default MedicationLog