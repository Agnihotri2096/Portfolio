import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <footer className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-header-wrap">
          <div className="contact-badge">
            <span className="badge-pulse"></span>
            GET IN TOUCH
          </div>
          <h2 className="contact-main-title">LET'S BUILD SOMETHING.</h2>
          <p className="contact-subhead">
            Have an idea, problem or system that needs to be built? Let's talk.
          </p>

          <ul className="contact-prompts">
            <li>Have a product architecture in mind?</li>
            <li>Need high-performance software built?</li>
            <li>Want to automate complex workflows with AI?</li>
            <li>Need technical security tooling?</li>
          </ul>
        </div>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Primary Studio Inquiries</h4>
            <p>
              <a
                href="mailto:hello@agnihotrilabs.tech"
                data-cursor="email"
                className="primary-email"
              >
                hello@agnihotrilabs.tech
              </a>
            </p>

            <h4 className="contact-secondary-heading">Official Website</h4>
            <p>
              <a
                href="https://agnihotrilabs.tech/"
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="website-link"
              >
                agnihotrilabs.tech
              </a>
            </p>
          </div>

          <div className="contact-box">
            <h4>Networks &amp; Profiles</h4>
            <a
              href="https://github.com/Agnihotri-Labs"
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="contact-social"
            >
              GitHub (Agnihotri-Labs) <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/akshat-agnihotri/"
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="contact-social"
            >
              LinkedIn (Akshat Agnihotri) <MdArrowOutward />
            </a>
            <a
              href="https://x.com/_Agnihotri_"
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="contact-social"
            >
              Twitter / X <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box brand-footer-box">
            <div className="footer-brand-title">
              <img
                src="/logo-mark.svg"
                alt="Agnihotri Labs"
                className="footer-logo-img"
              />
              <h2>
                AGNIHOTRI <span>LABS</span>
              </h2>
            </div>
            <p className="footer-tagline">BUILD. AUTOMATE. SECURE.</p>
            <p className="footer-desc">Independent technology studio.</p>
            <h5 className="footer-founder">Built by Akshat Agnihotri</h5>
            <span className="footer-copyright">
              <MdCopyright /> 2026 Agnihotri Labs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
