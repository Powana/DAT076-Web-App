function ChoiceResult(props: {choice : String, votes: number }) {

    return (
      
        <tr>
            <td>{props.choice}</td>
            <td>{props.votes}</td>
        </tr>
      
    )
  }
  
  export default ChoiceResult