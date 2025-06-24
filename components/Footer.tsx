import Link from "next/link";
import Image from "next/image";
import { footerItem } from "@/data/footerItems";

interface NavLink {
  label: string;
  href: string;
}
const {
  logoSrc,
  logoAlt,
  logoWidth,
  logoHeight,
  logoClassName,
  companyUrl,
  sections,
} = footerItem;
export default function Footer () {
  const currentYear = new Date().getFullYear()
  return (
    <>
    <footer className="border-t flex justify-center w-full">
      <div className="container mx-auto  pt-8 md:pt-12 ">
        <div className="grid grid-cols-2 px-10 md:px-40 gap-8 md:grid-cols-5">
          <div className=" flex flex-col gap-4">
            {/* <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={logoWidth}
                height={logoHeight}
                className={logoClassName}
              />
            
            </a> */}
            <a href="https://ebadge.bestweb.lk/api/v1/clicked/sdgp.lk/BestWeb/2025/Rate_Us">
              <img src="https://ebadge.bestweb.lk/eBadgeSystem/domainNames/sdgp.lk/BestWeb/2025/Rate_Us/image.png" alt="logo" width="150" height="150" />
            </a>
          </div>
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-3 font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
         <div className="mt-8 border-t border-secondary-foreground/10 pt-8 text-center flex gap-4 flex-row justify-center items-center">
          <p className="text-center text-sm text-gray-500 pb-4"> Copyright © {currentYear} - <a href="http://IIT.ac.lk" className="text-center text-sm text-gray-500 pb-4">IIT (PVT) LTD</a></p>
          <p className="text-center text-sm text-gray-500 pb-4">|</p>
          <p className="text-center text-sm text-gray-500 pb-4"> Mentored By - <a href="http://skillverse.lk" className="text-center text-sm text-gray-500 pb-4">SkillVerse (PVT) LTD</a></p>
        </div>
      </div>
    </footer>
    {/* TODO: REMOVE THIS */}
    <footer id="xy47_beta" className="text-center text-sm text-gray-500 pb-4">
      Built by <strong><a href="https://www.psycodelabs.lk" className="hover:text-gray-700">Psycode Lab's</a></strong>
    </footer>
    </>
  );
};


