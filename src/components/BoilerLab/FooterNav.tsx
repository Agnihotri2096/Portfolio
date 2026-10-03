interface FooterNavProps {
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const navItems = [
  { label: "Mission", index: 0 },
  { label: "Manifesto", index: 1 },
  { label: "Lab", index: 2 },
  { label: "Stack", index: 3 },
  { label: "Work", index: 4 },
  { label: "Insights", index: 5 },
  { label: "Contact", index: 6 },
];

const FooterNav = ({ currentSlide, onNavigate }: FooterNavProps) => {
  return (
    <footer className="site-footer" aria-label="Section navigation">
      <nav className="footer-nav">
        {navItems.map((item) => (
          <a
            key={item.label}
            className={currentSlide === item.index ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.index);
            }}
            href={`#${item.label.toLowerCase()}`}
          >
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </footer>
  );
};

export default FooterNav;
