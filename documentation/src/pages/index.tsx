import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button, Col, Row } from "react-bootstrap";
import Bootstrap from "../components/Bootstrap";
import Feature from "../components/Feature";
import Link from "@docusaurus/Link";

function Homepage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout>
      <Bootstrap>
        <section className="section bg-light">
          <div className="container text-center">
            <h1>{siteConfig.title}</h1>

            <br />

            <h3>JavaScript / TypeScript Utility Library</h3>

            <p />

            <h4>
              Gives functions, classes, and more for handling common and complex
              tasks
            </h4>

            <br />

            <Link to="/docs/Installation">
              <Button size="lg" className="btn-primary">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: "70%" }}>
            <Row>
              <Col xs={12} md={6}>
                <Feature
                  title="Easy to Use"
                  description={`No other dependencies need to be installed. No other configuration or setup is needed. This reduces the time to get started.`}
                />
              </Col>
              <Col xs={12} md={6}>
                <Feature
                  title="Multiple Environments"
                  description={`This library can be installed on frontend and backend.`}
                />
              </Col>
              <Col xs={12} md={6}>
                <Feature
                  title="Compatible With TypeScript"
                  description="This library can be used with JavaScript and TypeScript."
                />
              </Col>
              <Col xs={12} md={6}>
                <Feature
                  title="Actively Maintained"
                  description="This library is constantly being updated and maintained so that the library is always up to date."
                />
              </Col>
            </Row>
          </div>
        </section>
      </Bootstrap>
    </Layout>
  );
}

export default Homepage;
