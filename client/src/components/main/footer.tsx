import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

//   const footerLinks = {
//     product: [
//       { label: "How It Works", path: "/how-it-works" },
//       { label: "Features", path: "/features" },
//       { label: "Pricing", path: "/pricing" },
//       { label: "FAQ", path: "/faq" },
//     ],
//     company: [
//       { label: "About Us", path: "/about" },
//       { label: "Blog", path: "/blog" },
//       { label: "Careers", path: "/careers" },
//       { label: "Contact", path: "/contact" },
//     ],
//     legal: [
//       { label: "Terms of Service", path: "/terms" },
//       { label: "Privacy Policy", path: "/privacy" },
//       { label: "Cookie Policy", path: "/cookies" },
//       { label: "Disclaimer", path: "/disclaimer" },
//     ],
//   };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-zinc-900 text-white">
      <div className="main px-4">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <h3 className="text-xl font-extrabold tracking-tighter font-space inline-flex items-center gap-2">
                   <div className="h-10 w-10 center rounded-full bg-white">
                    <img
                      src="/logo.png"
                      alt="logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>Protection</span>
                 
                  <span className="text-red-600">Pools</span>
                  <span>.</span>
                </h3>
              </Link>
              <p className="text-white text-sm font-sans mb-6 max-w-md">
                Secure your bets with confidence. Join thousands of smart
                bettors who protect their stakes with our innovative protection
                pools.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6 text-white">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-sans">emayaksamueltom@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-sans">+234 706 508 1315</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-sans">No. 70 Eka Street, Uyo, Akwa Ibom State, Nigeria</span>
                    </div>
                  </div>
                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          className="w-10 h-10 center rounded-full bg-zinc-700 hover:bg-red-600 text-white transition-colors duration-200"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
            </div>
           

            {/* Product Links */}
            {/* <div>
              <h4 className="text-base font-space font-semibold mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted font-sans hover:text-red-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          
            <div>
              <h4 className="text-base font-space font-semibold mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted font-sans hover:text-red-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          
            <div>
              <h4 className="text-base font-space font-semibold mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted font-sans hover:text-red-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-700 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted font-sans text-center md:text-left">
              © {currentYear} Protection Pools. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted font-sans">
                Responsible Betting
              </span>
              <span className="text-xs text-muted font-sans">
                18+ Only
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
