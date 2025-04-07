import React from 'react';

interface Props {
    // Add specific props here if needed
}

const Page: React.FC<Props> = (props) => {
    // Team members data (for Shadow Collective)
    const teamMembers = [
        { name: "Lakindu Samarasinghe", role: "Full Stack Developer", desc: "Weaves spells in binary" },
        { name: "Agzienth Ganaraj", role: "Full Stack Developer", desc: "Conjures visual magic" },
        { name: "Zion Ashrwardana", role: "Backend Developer", desc: "Steers through the void" },
        { name: "Zion Ashrwardana", role: "Backend Developer", desc: "Steers through the void" },
        { name: "Zion Ashrwardana", role: "Backend Developer", desc: "Steers through the void" },
        { name: "Zion Ashrwardana", role: "Backend Developer", desc: "Steers through the void" },
    ];

    // Contributors data (Module Team) with image paths
    const contributors = [
        {
            name: "Banu Athuraliya",
            role: "Module Leader",
            passion: "Managing Director @ Andro Dollar Network (PVT) LTD",
            image: "/public/Module Team/Banu.jpeg",
        },
        {
            name: "Suresh Peiris",
            role: "Fullstack Developer",
            passion: "Co Founder - Inforwaves",
            image: "/path/to/priya-image.jpg"
        },
        {
            name: "Kushan Bhareti",
            role: "Frontend Developer",
            passion: "Co-founder of Inforwaves",
            image: "/path/to/ravi-image.jpg"
        },
        {
            name: "Mithushan Jalangan",
            role: "Product Engineer",
            passion: "Co-founder of Asyncdot",
            image: "/path/to/anjali-image.jpg"
        },
        {
            name: "Manul Singhe",
            role: "Game Developer",
            passion: "Founder of Knight Owl",
            image: "/path/to/kieran-image.jpg"
        },
        {
            name: "Thashin Rahuman",
            role: "Software Engineer",
            passion: "Web Developer at Rubber-Cal",
            image: "/path/to/kieran-image.jpg"
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Hero/Introduction Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10 animate-pulse">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-repeat"></div>
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-wider animate-fade-in">
                        SDGP - CONNECT
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        Explore student-led software solutions addressing real-world challenges aligned with the UN Sustainable Development Goals.
                    </p>
                </div>
            </section>

            {/* What is SDGP Section (Image on Right) */}
            <section className="py-20 px-6 bg-black border-t border-b border-gray-900">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:w-2/3 text-center md:text-left">
                        <h2 className="text-5xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-slide-up">
                            What is the SDGP?
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
                            The Software Development Group Project (SDGP), which is a six-month project for second-year Information and Information Technology (IIT) students. During this project, students work together to develop full-stack applications in areas such as Education, Agriculture, Industry, and Health. The projects typically involve creating web portals and mobile applications, with optional machine learning components.
                        </p>
                    </div>
                    <div className="md:w-1/3 mt-8 md:mt-0">
                        <img
                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Tech Realm"
                            className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
                        />
                    </div>
                </div>
            </section>

            {/* Purpose of the Module Section (Image on Left, Text Right-Aligned) */}
            <section className="py-20 px-6 bg-black border-b border-gray-900">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:w-1/3 mt-8 md:mt-0">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-b5f3c2c8c372?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Code Cosmos"
                            className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 object-cover"
                        />
                    </div>
                    <div className="md:w-2/3 text-right">
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-slide-up">
                            The Purpose of This Cosmic Module
                        </h2>
                        <p className ="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl ml-auto">
                            The SDGP module offers second-year IIT students a six-month opportunity to build full-stack web and mobile applications in real-world scenarios. It enhances technical expertise while also strengthening soft skills such as teamwork, project management, critical thinking, and effective communication. Students also learn to market their products and pitch to stakeholders, gaining practical industry exposure and creating strong portfolio projects.
                        </p>
                    </div>
                </div>
            </section>

            {/* Goal of SDGP Section (Image on Right) */}
            <section className="py-20 px-6 bg-black border-b border-gray-900">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:w-2/3 text-center md:text-left">
                        <h2 className="text-5xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-slide-up">
                            The Eternal Goal of SDGP
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
                            SDGP is a formal partnership with the UN Sustainable Development Goals initiative that empowers young innovators to create technological solutions for pressing global challenges. Through this program, participants develop software applications and digital tools aimed at addressing issues such as hunger, education access, and environmental sustainability, contributing meaningfully to the UN's vision for a more equitable and sustainable future.
                        </p>
                    </div>
                    <div className="md:w-1/3 mt-8 md:mt-0">
                        <img
                            src="https://images.unsplash.com/photo-1473341304170-971890890858?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Earth Legacy"
                            className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
                        />
                    </div>
                </div>
            </section>

            {/* Contributors Section */}
            <section className="py-20 px-6 bg-black border-t border-b border-gray-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight animate-slide-up bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        THE MODULE TEAM
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {contributors.map((contributor, index) => (
                            <div
                                key={index}
                                className="relative bg-gray-900 rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-800 group"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <img
                                        src={
                                            contributor.image ||
                                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                                        }
                                        alt={contributor.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Overlay Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative z-10">
                                    <h2 className="text-xl font-semibold text-white mb-2">{contributor.name}</h2>
                                    <p className="text-gray-400 text-sm italic mb-3">{contributor.role}</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">{contributor.passion}</p>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl pointer-events-none transition-colors duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6 bg-black border-t border-b border-gray-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight animate-slide-up">
                        The Shadow Collective
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gray-950 rounded-xl p-6 transform hover:scale-105 transition-all duration-500 border border-gray-800 hover:border-white/10 group"
                            >
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-black border-2 border-gray-800 flex items-center justify-center text-3xl font-bold text-white group-hover:animate-spin-slow">
                                    {member.name[0]}
                                </div>
                                <h3 className="text-2xl font-semibold text-center">{member.name}</h3>
                                <p className="text-gray-400 text-center mb-2 italic">{member.role}</p>
                                <p className="text-gray-500 text-center text-sm">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-black text-center border-t border-gray-900">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-extrabold mb-8 tracking-wider animate-fade-in">
                        Step Into this Remarkable Experience
                    </h2>
                    <p className="text-gray-400 mb-10 text-lg">
                        Dare to shape the unseen? Join us in crafting a legacy that echoes through the infinite.
                    </p>
                    <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transform hover:scale-110 transition-all duration-300">
                        More Details Of This Journey
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Page;