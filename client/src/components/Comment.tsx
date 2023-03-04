export interface IComment {
    name: string,
    text: string
}

export default function Comment(props: {comment: IComment}){

  return (
    <div className="comment">
        <h3>{props.comment.name}</h3>
        <p>{props.comment.text}</p>
    </div>
  )}