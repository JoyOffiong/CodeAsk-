import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../stylesheets/editor.css";

/*
 * Simple editor component that takes placeholder text as a prop
 */
export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", theme: "snow" };
  }

  render() {
    return (
      <div>
        <ReactQuill
          onChange={(html) => {
            this.props.handleFormBody(html);
          }}
          theme={this.state.theme}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder={this.props.placeholder}
          value={this.props.value}
        />
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
