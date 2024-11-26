import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import citiesgraph from "../../Assets/Projects/citiesgraph.png";
import neumarketplace from "../../Assets/Projects/neumarketplace.png";
import strings from "../../Assets/Projects/strings.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
        What I’ve Been  <strong className="purple">Building </strong>
        </h1>
        <p style={{ color: "white" }}>
        Discover the projects that reflect my journey and expertise 
        </p>
        <p style={{ color: "white" }}>
       <i>(more to come!)</i>
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={neumarketplace}
              isBlog={false}
              title="NEU Marketplace"
              description="NEU Marketplace is a dynamic platform built with Spring Boot, Hibernate ORM, and the DAO pattern, ensuring robust backend operations and seamless database interactions. Its MVC architecture organizes the platform efficiently, while a responsive frontend using HTML, CSS, JavaScript, and Bootstrap delivers a smooth user experience for the Northeastern community"
              ghLink="https://github.com/noumaanahmed/neumarketplace"
              // demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={strings}
              isBlog={false}
              title="Strings"
              description="Strings is a micro-blogging platform inspired by Threads, enhanced with features like Direct Messaging, customizable Channels ('Strings'), user profiles, and real-time notifications. Built with Next.js, Tailwind CSS, MongoDB, TypeScript, and Node.js, it enables seamless communication and collaboration for individuals and communities with shared interests"
              ghLink="https://github.com/noumaanahmed/Strings"
              // demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={citiesgraph}
              isBlog={false}
              title="Cities - Graph"
              description="Cities-Graph is a transportation network optimization project built using graph theory. It models cities and routes as a directed, weighted graph and employs algorithms like Dijkstra's, Floyd-Warshall, Kruskal's, Prim's, Bellman-Ford, BFS, and DFS to enhance route planning, capacity optimization, and cost efficiency. The project provides insights for logistics, infrastructure planning, and improved connectivity."
              ghLink="https://github.com/noumaanahmed/cities-graph"
              // demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/soumyajit4419/Plant_AI"
              demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Ai For Social Good"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col> */}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
