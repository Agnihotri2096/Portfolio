import { MdArrowForward, MdArrowOutward } from "react-icons/md";

interface ContactsSlideProps {
  isActive: boolean;
  className?: string;
  isArriving?: boolean;
}

const ContactsSlide = ({
  isActive,
  className = "",
  isArriving = false,
}: ContactsSlideProps) => {
  return (
    <section
      id="contacts"
      className={`slide ${className} ${isActive ? "present" : ""} ${
        isArriving ? "contacts-arriving" : ""
      }`}
    >
      {/* Rotating Moon Graphic with Atmospheric Horizon Rise */}
      <div className="contacts-moon-wrap" aria-hidden="true">
        <img
          src="/images/full-moon.webp"
          alt="Full Moon"
          className="contacts-moon"
          draggable="false"
        />
      </div>

      <div className="moon-gradient" aria-hidden="true" />

      <div className="slide-inner contacts-content">
        <h2 className="eyebrow contacts-title">
          Let’s build the&nbsp;future together<br />
        </h2>

        <p
          className="subtitle"
          style={{
            maxWidth: "34rem",
            margin: "0.5rem auto 1.25rem",
            color: "rgba(226, 231, 242, 0.85)"
          }}
        >
          Tell us what you’re trying to build, automate or secure.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <a
            className="button primary-button big contacts-button"
            href="mailto:hello@agnihotrilabs.tech"
            aria-label="Contact the Lab"
          >
            Contact the Lab
            <MdArrowForward aria-hidden="true" />
          </a>
        </div>

        <div className="contacts-details" aria-label="Studio contact info">
          <p
            className="subtitle"
            style={{ color: "#ffffff", fontWeight: 700, letterSpacing: "0.15em" }}
          >
            AGNIHOTRI LABS • BUILD. AUTOMATE. SECURE.
          </p>
          <p className="subtitle" style={{ fontSize: "0.85rem", opacity: 0.85, margin: "0.25rem 0" }}>
            Founder & Engineer: Akshat Agnihotri
          </p>
          <p className="subtitle" style={{ marginTop: "0.5rem" }}>
            <a href="mailto:hello@agnihotrilabs.tech" className="contact-email-link">
              hello@agnihotrilabs.tech
            </a>
          </p>
          <a
            href="https://akshat-agnihotri.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="portfolio-pill-button"
            aria-label="View Portfolio"
          >
            <span>Portfolio</span>
            <MdArrowOutward aria-hidden="true" />
          </a>
          <p className="subtitle" style={{ marginTop: "0.5rem" }}>
            <a
              href="https://github.com/Agnihotri-Labs"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#64748b", textDecoration: "none" }}
            >
              github.com/Agnihotri-Labs
            </a>
          </p>

            2026, Agnihotri Labs
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactsSlide;
