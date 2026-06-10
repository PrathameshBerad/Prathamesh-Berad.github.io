import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:berad.prathamesh210@gmail.com"
                data-cursor="disable"
              >
                berad.prathamesh210@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+919307631828" data-cursor="disable">
                +91 93076 31828
              </a>
            </p>
            <p>Pune, India</p>
            <h4>Education</h4>
            <p>B.Tech, Mechanical Engineering — VIT Pune (2021–2025)</p>
            <p>
              Product Management &amp; Agentic AI — IIT Patna, Vishleshan iHub
              (2024)
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/PrathameshBerad"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/prathamesh-berad/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="mailto:berad.prathamesh210@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Prathamesh Berad</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
