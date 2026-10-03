interface SiteHeaderProps {
  onGoHome: () => void;
}

const SiteHeader = ({ onGoHome }: SiteHeaderProps) => {
  return (
    <header className="site-header" aria-label="Main header">
      {/* Brand Logo on the left */}
      <div
        className="header-logo-left"
        onClick={onGoHome}
        role="button"
        tabIndex={0}
        aria-label="Agnihotri Labs Home"
        onKeyDown={(e) => {
          if (e.key === "Enter") onGoHome();
        }}
      >
        <img
          src="/brand-logo.png"
          alt="Agnihotri Labs Logo"
          className="logo-img"
          draggable="false"
        />
      </div>

      {/* Agnihotri Labs text in the center */}
      <div
        className="header-brand-center"
        onClick={onGoHome}
        role="button"
        tabIndex={0}
        aria-label="Agnihotri Labs Home"
        onKeyDown={(e) => {
          if (e.key === "Enter") onGoHome();
        }}
      >
        <div className="logo-text">
          AGNIHOTRI <span>LABS</span>
        </div>
      </div>

      {/* Status badge on the right */}
      <div className="header-badge">
        <span className="pulse-dot"></span>
        <span>LAB ACTIVE • 2026</span>
      </div>
    </header>
  );
};

export default SiteHeader;
