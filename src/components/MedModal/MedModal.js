import './MedModal.css'

const MedModal = ({ showModal, handleClose, medication }) => {
  if (!showModal) {
    return null
  }

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{medication.name}</h4>
        </div>
        <div className="modal-body">
          <p>Dosage: {medication.dosage}</p>
          <p>Frequency: {medication.frequency}</p>
          <p>Start Date: {medication.start_date}</p>
          <p>End Date: {medication.end_date || "N/A"}</p>
          <p>Refill Due: {medication.refill_due_date || "N/A"}</p>
        </div>
        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default MedModal
