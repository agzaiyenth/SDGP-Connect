export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full mt-auto">
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-70"></div>
                <div className="py-6 text-center text-sm text-gray-400">
                    Copyright © {currentYear} - Informatics Institute of Technology - All Rights Reserved
                </div>
            </div>
        </footer>
    )
}
