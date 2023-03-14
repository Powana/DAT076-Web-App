import CommentInput from "./CommentInput";
import { IComment } from "./Comment";
import Comment from "./Comment";
import {  Table } from "react-bootstrap";
import '../App.css'


export default function CommentResult(props: {id: string, comments: Array<IComment>,  commentSubmitted: boolean;}){
    // Map the comments to Comment components
    const comments = props.comments?.map(c => {
            return (
                <Comment comment={c.text} name={c.name}></Comment>
            )
        }
    )
        // If there are no comments, return an empty div
        if(comments.length ==0){
            return(<div></div>)
        }
    
         // Render the comments in a table
  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <Table striped bordered className="table_comment">
        <thead className="table_thead">
          <tr>
            <th>Name</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments}
        </tbody>
      </Table>
    </div>
  )
}