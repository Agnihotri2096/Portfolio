import React from "react";
import Magnetic from "../Magnetic";

export const Description: React.FC = () => {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="ds-description-section">
      <div className="ds-description-container">
        <h2 className="ds-description-headline">
          Helping brands and ambitious teams thrive in the digital world.
          Delivering tailor-made digital systems and building high-impact
          interactive platforms from scratch.
        </h2>

        <div className="ds-description-sub">
          <p className="ds-description-body">
            The combination of deep systems engineering, AI intelligence &amp;
            interactive craft positions Agnihotri Labs in a unique place in
            the modern technology world.
          </p>

          <Magnetic strength={0.35}>
            <button
              type="button"
              className="ds-round-button"
              onClick={scrollToContact}
              aria-label="About Agnihotri Labs"
            >
              <div className="ds-round-button-fill" />
              <span>About me</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default Description;
