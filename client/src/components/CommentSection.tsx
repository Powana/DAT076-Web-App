import CommentInput from "./CommentInput";
import CommentResult from "./CommentResult";

import { IComment } from "./Comment";
import Comment from "./Comment";
import {  Table } from "react-bootstrap";


export default function CommentSection(props: {id: string, comments: Array<IComment>}){

    const comments = props.comments?.map(
        c => {
            return (
                <Comment comment={c.text} name={c.name}></Comment>
            )
        }
    )
    return (
      <div className="comment-section">
          <CommentInput id={props.id}></CommentInput>         
 
          <div>
          <h3 >Comments</h3>
        <Table striped bordered  >
          <thead>
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
      </div>
    )}