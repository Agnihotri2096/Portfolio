import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-header-wrap">
          <h3>LET'S BUILD SOMETHING.</h3>
          <ul className="contact-prompts">
            <li>Have an idea?</li>
            <li>Need a website?</li>
            <li>Want to automate something?</li>
            <li>Have a problem worth solving?</li>
          </ul>
        </div>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Studio Inquiries</h4>
            <p>
              <a
                href="mailto:hello@agnihotrilabs.tech"
                data-cursor="disable"
                className="primary-email"
              >
                hello@agnihotrilabs.tech
              </a>
            </p>
            <h4>Direct Engineering</h4>
            <p>
              <a
                href="mailto:agnihotriakshat6759@gmail.com"
                data-cursor="disable"
              >
                agnihotriakshat6759@gmail.com
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Agnihotri2096"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/akshat-agnihotri/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://x.com/_Agnihotri_"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              AGNIHOTRI <span>LABS</span>
            </h2>
            <p className="footer-tagline">Build. Automate. Secure.</p>
            <h5>Built by Akshat Agnihotri</h5>
            <span className="footer-copyright">
              <MdCopyright /> 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
