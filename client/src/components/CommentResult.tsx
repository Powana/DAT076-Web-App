import CommentInput from "./CommentInput";
import { IComment } from "./Comment";
import Comment from "./Comment";
import {  Table } from "react-bootstrap";
import '../App.css'


export default function CommentResult(props: {id: string, comments: Array<IComment>}){

    const comments = props.comments?.map(
        c => {
            return (
                <Comment comment={c.text} name={c.name}></Comment>
            )
        }
    )



    return (
      <div className="comment-section">
          
          <h3 >Comments</h3>
            <Table striped bordered className="table_comment" width={4000}>
          <thead className="table_thead">
            <tr>
              <th >Name</th>
              <th >Comment</th>
            </tr>
          </thead>
          <tbody>
            {comments}
          </tbody>
        </Table>
            </div>
          
    )}