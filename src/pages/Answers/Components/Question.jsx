import React from "react";
// import ReactMarkdown from 'react-markdown'
import moment from "moment";
import Parser from "html-react-parser";

// import { parse } from "@fortawesome/fontawesome-svg-core";

 export function Question({question}) {
   
  // const innerHTML =`<div dangerouslySetInnerHTML={{__html:${question.body}}></div>`

    return(
        <div>
            <h1>{question.title}</h1>
          <div className="tags-row" style={{marginTop:"20px"}}>
            <ul>
              {question.Tags.map((tag, index) => {
                return <li style={{fontSize: "14px", fontWeight:"normal"}}
                 key={index}>{tag.name}</li>;
              })}
            </ul>

            <p>
              asked {moment(question.createdAt).fromNow()} by 
              <span
                style={{
                  backgroundColor: "#e5e5e5",
                  padding: "4px",
                  marginLeft: "8.5px",
                  borderRadius: "5px",
                }}
              >
                @{question.User.username}
              </span>
            </p>
          </div>
          <br />
          {/* <code dangerouslySetInnerHTML={{__html:(question.body)}}> */}
          
          {/* </code> */}
          {/* <p>{question.body}</p> */}
          {/* <div dangerouslySetInnerHTML={{__html:innerHTML}}></div> */}
          <div dangerouslySetInnerHTML={{__html:Parser(question.body)}}></div>
          {/* <ReactMarkdown>{question.body}</ReactMarkdown> */}
          {
            // ReactHtmlParser(question.body)
          }
        </div>
    )
}