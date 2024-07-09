const Interactions = ({ drugName, interactions, interactionsTable }) => {
  if ((!interactionsTable || interactionsTable.length === 0) && (!interactions || interactions.length === 0)) {
    return <p>No interactions found for {drugName}</p>
  }

  return (
    <div>
      <h3>Interactions for {drugName || 'Unknown Drug'}</h3>
      {interactionsTable && interactionsTable.length > 0 ? (
        <div
          dangerouslySetInnerHTML={{ __html: interactionsTable }}
        />
      ) : (
        <ul>
          {interactions.map((interaction, index) => (
            <li key={index}>
              <p>{interaction}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Interactions

// this will show the interations data from the API or it will show the interactions table depending on what is data is available from the API for a particular medication 

// https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html