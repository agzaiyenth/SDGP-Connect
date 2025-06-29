// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
import { footerItem } from "@/data/footerItems";
import Link from "next/link";

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
export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <footer className="border-t flex justify-center w-full">
        <div className="container mx-auto  pt-8 md:pt-12 ">
          <div className="grid grid-cols-2 px-10 md:px-40 gap-8 md:grid-cols-5">
            <div className=" flex flex-col gap-4 col-span-2 md:col-span-1 justify-center items-center">
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
          <div className="mt-8 border-t border-secondary-foreground/10 pt-8 text-center flex md:gap-4 gap-2 flex-col md:flex-row justify-center items-center">
            <p className="text-center text-sm text-gray-200 pb-4"> Copyright © {currentYear} - <strong><a href="http://IIT.ac.lk" className="text-center text-sm text-gray-200 pb-4">Informatics Institute of Technology </a></strong></p>
            <p className="text-center text-sm text-gray-200 pb-4 md:block hidden">|</p>
            <p className="text-center text-sm text-gray-200 pb-4"> Website Mentored By - <strong><a href="http://skillverse.lk" className="text-center text-sm text-gray-200 pb-4">SkillVerse (PVT) LTD</a></strong></p>
          </div>
        </div>
      </footer>
      {/* !Do not remove this , @zionashirwada Want's it this way and do not , do not change this ,.............................. */}
      <footer id="xy47_beta" className="text-center text-sm text-gray-200 md:pb-4 pb-24">
        Built by <strong><a href="https://www.psycodelabs.lk" className="hover:text-gray-400">Psycode Lab's</a></strong>
      </footer>
    </>
  );
};


