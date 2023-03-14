
export default function Comment(props: {text : String, name: String }){

  return (
      <tr>
        <td>{props.name}</td>
        <td>{props.text}</td>
      </tr>
    
  )}