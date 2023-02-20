import { Component } from "react";

export class EditableText extends Component<{text: string}, {}> {
    render() {
        return(
            <li><div>A choice: {this.props.text}</div></li>
        );
    }
}