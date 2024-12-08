import { FaGithub, FaLinkedinIn, FaReddit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiX } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: FaGithub, label: 'Github', href: 'https://github.com/AnanduA-6' },
    { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anandu-dev/' },
    { icon: MdEmail, label: 'Email', href: 'anandu.a.dev@gmail.com' },
    { icon: SiX, label: 'Twiiter', href: 'https://x.com/anandu_a_dev' },
    { icon: FaReddit, label: 'Reddit', href: 'https://x.com/anandu_a_dev' }
  ];

  return (
    <footer 
      className="w-full py-8 px-4 md:px-16"
      style={{ background: 'var(--portfolio-zinc)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p 
            className="text-sm order-2 md:order-1"
            style={{ color: 'var(--portfolio-secondary)' }}
          >
            © {currentYear} Anandu. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 order-1 md:order-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200 hover:-translate-y-1"
                style={{ color: 'var(--portfolio-text)' }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;