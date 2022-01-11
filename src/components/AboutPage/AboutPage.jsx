import React from 'react';
import '../App/App.css';

function AboutPage() {
  return (
    <>
      <div id="aboutText">
        <h3 id="aboutHeading">
          LYSTR easily and conveniently connects those seeking to rent a boat
          with those who already own one!
        </h3>
      </div>
      <div id="aboutContainer">
        <div className="about" id="rentAbout">
          <ul id="ulRentAbout">
            <li>Don't own a boat?</li>
            <li>Want to try out boating before you commit to buying one?</li>
            <li>On vacation?</li>
          </ul>
        </div>

        <div id="connect">
          <div id="imageDiv">
            <img src="/images/clipart2417826.png" />
          </div>
        </div>

        <div className="about" id="listAbout">
          <ul id="ulListAbout">
            <li>Want to make extra cash?</li>
            <li>Barely use your boat?</li>
            <li>Going to be out of town?</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
