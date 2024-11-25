import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiPython,
  DiGit,
  DiJava,
  DiMongodb,
} from "react-icons/di";
import {
  SiSpringboot,
  SiHibernate,
  SiPostgresql,
  SiMysql,
  SiNextdotjs,
  SiTypescript,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiAmazonaws,
  SiGooglecloud,
  SiApachekafka,
  SiMqtt,
} from "react-icons/si";

function Techstack() {
  const techs = [
    { icon: <DiJava />, name: "Java" },
    { icon: <SiSpringboot />, name: "Spring Boot" },
    { icon: <SiHibernate />, name: "Hibernate" },
    { icon: <DiJavascript1 />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <DiReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <DiNodejs />, name: "Node.js" },
    { icon: <DiMongodb />, name: "MongoDB" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiKubernetes />, name: "Kubernetes" },
    { icon: <SiTerraform />, name: "Terraform" },
    { icon: <SiAmazonaws />, name: "AWS" },
    { icon: <SiGooglecloud />, name: "Google Cloud" },
    { icon: <SiApachekafka />, name: "Kafka" },
    { icon: <SiMqtt />, name: "MQTT" },
    { icon: <DiPython />, name: "Python" },
    { icon: <DiGit />, name: "Git" },
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {techs.map((tech, index) => (
        <Col xs={4} md={2} className="tech-icons" key={index}>
          {tech.icon}
          <span className="tech-name">{tech.name}</span>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
