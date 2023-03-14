import CommentInput from "./CommentInput";
import Comment from "./Comment";
import {  Table } from "react-bootstrap";
import { useEffect, useState } from "react";


export default function CommentSection(props: {id: string, ogComments: Array<{text: string, name: string}>} ){
  const [comments, setComments] = useState(props.ogComments);
  if (comments !== props.ogComments) { // don't update unnecessarily
    setComments(props.ogComments);
  }

  function appendComment(name: string, text: string) {
    const updatedComments = [...comments, {name: name, text: text}];
    setComments(updatedComments); // For whatever reason, the component is not re-rendered, so instead:
    document.location.reload();  // Just reload the page as a hack
  }

  return (
    <div className="comment-section">
        <CommentInput id={props.id} appendComment={appendComment}></CommentInput>         
        <div>
          <h3>Comments</h3>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
            {comments?.map(
                c => {
                  return (
                      <Comment text={c.text} name={c.name}></Comment>
                  )})}
            </tbody>
          </Table>
        </div>
    </div>
  )}