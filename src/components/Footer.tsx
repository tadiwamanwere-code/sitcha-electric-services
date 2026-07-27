import {ArrowUp, Facebook, Instagram, Mail, MessageCircle, Phone} from 'lucide-react';
import {BRAND, CONTACT_INFO} from '../data';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

/** Second copy of the nav items, with friendlier labels. Update alongside Navbar. */
const quickLinks = [
  {id: 'about', label: 'ABOUT US'},
  {id: 'services', label: 'SERVICES'},
  {id: 'projects', label: 'OUR WORK'},
  {id: 'gallery', label: 'GALLERY'},
  {id: 'process', label: 'HOW IT WORKS'},
  {id: 'contact', label: 'GET A QUOTE'},
];

const linkCls =
  'text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group';
const iconCls = 'w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400 transition-colors';

export default function Footer({onNavigate}: FooterProps) {
  const handleScrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

  return (
    <footer
      id="main-footer"
      className="bg-blue-800 text-white border-t border-white/10 py-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-5 space-y-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <Logo className="h-10 w-auto" />
              <div>
                <span className="font-display font-bold tracking-wide text-base text-white block leading-tight">
                  {BRAND.name}
                </span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-yellow-500 block -mt-0.5">
                  {BRAND.kicker}
                </span>
              </div>
            </button>
            <p className="text-xs md:text-sm font-sans text-gray-400 font-light leading-relaxed max-w-sm">
              {BRAND.blurb}
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block">
              QUICK SECTIONS
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer uppercase"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct contact */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block">
              REACH US DIRECTLY
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href={`tel:${CONTACT_INFO.phone}`} className={linkCls}>
                  <Phone className={iconCls} />
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </li>
              {CONTACT_INFO.phone2 && (
                <li>
                  <a href={`tel:${CONTACT_INFO.phone2}`} className={linkCls}>
                    <Phone className={iconCls} />
                    {CONTACT_INFO.phone2Formatted}
                  </a>
                </li>
              )}
              {CONTACT_INFO.phone3 && (
                <li>
                  <a href={`tel:${CONTACT_INFO.phone3}`} className={linkCls}>
                    <Phone className={iconCls} />
                    {CONTACT_INFO.phone3Formatted}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  <MessageCircle className={iconCls} />
                  WhatsApp Us
                </a>
              </li>
              {CONTACT_INFO.email && (
                <li>
                  <a href={`mailto:${CONTACT_INFO.email}`} className={linkCls}>
                    <Mail className={iconCls} />
                    {CONTACT_INFO.email}
                  </a>
                </li>
              )}
              {CONTACT_INFO.facebook && (
                <li>
                  <a
                    href={CONTACT_INFO.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkCls}
                  >
                    <Facebook className={iconCls} />
                    {CONTACT_INFO.facebookHandle}
                  </a>
                </li>
              )}
              {CONTACT_INFO.instagram && (
                <li>
                  <a
                    href={CONTACT_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkCls}
                  >
                    <Instagram className={iconCls} />
                    {CONTACT_INFO.instagramHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 text-[10px] font-mono text-gray-500">
          <div>
            <p>
              © {new Date().getFullYear()} {BRAND.legalName}. ALL RIGHTS RESERVED.
            </p>
            <p className="mt-1 text-gray-600">{BRAND.footerLine}</p>
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-3 py-2 border border-white/10 hover:border-blue-400 hover:text-blue-400 transition-colors group cursor-pointer"
            aria-label="Scroll back to top"
          >
            BACK TO TOP
            <ArrowUp className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>
      </div>
    </footer>
  );
}
