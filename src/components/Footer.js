import { Instagram, Linkedin, Github } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Vinx</h3>
          <p>© 2025 Vinx. Todos os direitos reservados.</p>
        </div>

        <div className="footer-social">
          <a href="#" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="#" aria-label="GitHub">
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;