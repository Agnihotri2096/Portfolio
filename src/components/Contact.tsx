import { MdArrowOutward, MdMail, MdLanguage } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <section className="contact-section section-container" id="contact">
      <div className="contact-container">
        {/* Main CTA */}
        <div className="cta-box">
          <div className="section-label">
            <span className="label-dot"></span>
            COLLABORATION & INQUIRIES
          </div>
          <h2 className="cta-headline">
            LET'S BUILD <span>SOMETHING.</span>
          </h2>
          <p className="cta-subtext">
            Have an idea, project or problem worth solving? Let's talk.
          </p>
          <div className="cta-action">
            <a
              href="mailto:hello@agnihotrilabs.tech?subject=Project%20Inquiry%20-%20Agnihotri%20Labs"
              className="hero-btn primary-btn"
              data-cursor="disable"
            >
              START A PROJECT <span className="arrow">→</span>
            </a>
          </div>
        </div>

        {/* Contact Coordinates Grid */}
        <div className="contact-flex">
          <div className="contact-box">
            <h4>STUDIO INQUIRIES</h4>
            <p className="contact-item">
              <MdMail className="c-icon" />
              <a href="mailto:hello@agnihotrilabs.tech" data-cursor="disable">
                hello@agnihotrilabs.tech
              </a>
            </p>
            <p className="contact-item">
              <MdLanguage className="c-icon" />
              <a href="https://agnihotrilabs.tech" data-cursor="disable">
                agnihotrilabs.tech
              </a>
            </p>
          </div>

          <div className="contact-box">
            <h4>PERSONAL & ENGINEERING</h4>
            <p className="contact-item">
              <MdMail className="c-icon" />
              <a href="mailto:agnihotriakshat6759@gmail.com" data-cursor="disable">
                agnihotriakshat6759@gmail.com
              </a>
            </p>
            <p className="contact-sub">
              Engineering student & independent builder
            </p>
          </div>

          <div className="contact-box">
            <h4>VERIFIED LINKS</h4>
            <div className="social-links-grid">
              <a
                href="https://github.com/Agnihotri2096"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                GITHUB <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/akshat-agnihotri/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                LINKEDIN <MdArrowOutward />
              </a>
              <a
                href="https://x.com/_Agnihotri_"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                X / TWITTER <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>

        {/* Unified Official Footer */}
        <footer className="footer-wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>AGNIHOTRI LABS</h3>
              <p className="footer-tagline">BUILD. AUTOMATE. SECURE.</p>
              <p className="footer-domains">AI • SOFTWARE • SECURITY</p>
            </div>
            <div className="footer-creator">
              <p>Built by <strong>Akshat Agnihotri</strong>.</p>
              <p className="footer-note">Independent technology studio.</p>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-links">
              <a href="#labs" data-cursor="disable">AGNIHOTRI LABS</a>
              <a href="https://github.com/Agnihotri2096" target="_blank" rel="noopener noreferrer" data-cursor="disable">GITHUB</a>
              <a href="https://www.linkedin.com/in/akshat-agnihotri/" target="_blank" rel="noopener noreferrer" data-cursor="disable">LINKEDIN</a>
              <a href="mailto:hello@agnihotrilabs.tech" data-cursor="disable">EMAIL</a>
            </div>
            <div className="footer-copyright">
              © 2026 Agnihotri Labs. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
