import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full mt-auto">
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-70"></div>
                <div className="py-6 text-center text-sm text-gray-400">
                    {/* Quick Links */}
                    <div className="flex justify-center gap-6 mb-4">
                        <Link href="/faq" className="hover:text-gray-300 transition-colors">
                            FAQ
                        </Link>
                        <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/contact" className="hover:text-gray-300 transition-colors">
                            Support
                        </Link>
                    </div>
                    
                    {/* Copyright */}
                    <div>
                        Copyright © {currentYear} - <a href="http://skillverse.lk" className="hover:text-gray-300 transition-colors">SkillVerse (PVT) LTD</a> - All Rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    )
}
