import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graduate Engineer Trainee</h4>
                <h5>Tata Technologies · Pune</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building an AI-powered project-management ecosystem across Azure
              DevOps, Power Automate, Copilot Studio, and Power BI—cutting manual
              reporting from 3–5 hrs/week to under 30 minutes and shipping sprint
              intelligence, health scoring, and risk detection.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Product Manager (Part-time)</h4>
                <h5>OpsellAI</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Drove end-to-end sprint execution for the SellerOS MVP across seven
              epics—owning user stories, acceptance criteria, and risk registers.
              Defined activation metrics and a sub-10-minute, seven-step seller
              onboarding flow across a 14-person cross-functional team.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Product Management &amp; Agentic AI</h4>
                <h5>IIT Patna · Vishleshan iHub</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Focused training in product management and agentic AI—roadmapping,
              discovery, funnel thinking, and building LLM-assisted, agentic
              product workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech, Mechanical Engineering</h4>
                <h5>VIT Pune</h5>
              </div>
              <h3>2021–25</h3>
            </div>
            <p>
              Bachelor of Technology in Mechanical Engineering—where structured
              problem-solving and a systems mindset became the foundation for a
              move into product.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
