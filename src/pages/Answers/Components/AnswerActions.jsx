import React from 'react'
import answerIcon from "../../../assets/ANSWER PAGE ICONS/ANSWER-ICON.png"
import shareIcon from "../../../assets/ANSWER PAGE ICONS/SHARE-ICON.png"


export default function () {
  return (
    <div>
        <hr className="horizontal-line" />
          <div className="answer">
            <div className="ans">
              <img src={answerIcon} alt="" />
              <h3 style={{ fontWeight: "lighter", fontSize:"17px"}}>Answer</h3>
            </div>
            <h1>|</h1>
            <div className="share">
              <img src={shareIcon} alt="" />
              <span style={{fontWeight: "lighter", fontSize:"17px"}}>Share</span>
            </div>
          </div>
          <hr className="horizontal-line" />

    </div>
  )
}
