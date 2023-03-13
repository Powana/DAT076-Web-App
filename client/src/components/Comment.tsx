export interface IComment {
    name: string,
    text: string
}

export default function Comment(props: {comment : String, name: String }){

  return (
      <tr>
      <td>{props.name}</td>
      <td>{props.comment}</td>
      </tr>
    
  )}