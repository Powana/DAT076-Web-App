import CommentInput from "./CommentInput";
import { IComment } from "./Comment";
import Comment from "./Comment"

export default function CommentSection(props: {id: string, comments: Array<IComment>}){

    const comments = props.comments?.map(
        c => {
            return (
                <Comment comment={c}></Comment>
            )
        }
    )
    return (
      <div className="comment-section">
          <CommentInput id={props.id}></CommentInput>
          <div>
            {comments}
          </div>
      </div>
    )}