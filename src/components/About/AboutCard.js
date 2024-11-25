import React from "react";
import Card from "react-bootstrap/Card";
// import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi there! I'm <span className="purple">Noumaan Ahmed. </span>
            <br />
            <br />
            I'm currently pursuing a <span className="purple"> Master's in Information Systems </span> at <span className="purple">Northeastern University</span>, where I'm honing my skills in cutting-edge technologies and systems management.
            <br />
            <br />
            When I'm not busy chasing bugs or refactoring code (again), you can find me doing one of these:
            </p>
          <ul>
            <li className="about-activity">
            🎮  Immersed in intense gaming sessions (yes, respawning *is* a skill) 
            </li>
            <br />
            <li className="about-activity">
            🥾  Exploring new trails and hiking to places where Wi-Fi fears to tread 
            </li>
            <br />
            <li className="about-activity">
            🥋 Practicing MMA – because sometimes code isn't the only thing that needs a good fight
            </li>
          </ul>

          <p style={{ color: "rgb(136 170 192)" }}>
            "Those who can imagine anything, can create the impossible."{" "}
          </p>
          <footer className="blockquote-footer">Alan Turing</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
