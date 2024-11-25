import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiIntellijidea,
  SiPostman,
  SiSlack,
  SiJira,
  SiFigma,
  SiTerraform,
  SiDocker,
  SiJenkins,
  SiApachetomcat,
  SiPowershell,
  SiVercel,
  SiMacos,
} from "react-icons/si";

function Toolstack() {
  const tools = [
    { icon: <SiVisualstudiocode />, name: "VS Code" },
    { icon: <SiIntellijidea />, name: "IntelliJ IDEA" },
    { icon: <SiPostman />, name: "Postman" },
    { icon: <SiSlack />, name: "Slack" },
    { icon: <SiJira />, name: "JIRA" },
    { icon: <SiFigma />, name: "Figma" },
    { icon: <SiTerraform />, name: "Terraform" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiJenkins />, name: "Jenkins" },
    { icon: <SiApachetomcat />, name: "Apache Tomcat" },
    { icon: <SiPowershell />, name: "PowerShell" },
    { icon: <SiVercel />, name: "Vercel" },
    { icon: <SiMacos />, name: "macOS" },
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools.map((tool, index) => (
        <Col xs={4} md={2} className="tech-icons" key={index}>
          {tool.icon}
          <span className="tech-name">{tool.name}</span>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;
