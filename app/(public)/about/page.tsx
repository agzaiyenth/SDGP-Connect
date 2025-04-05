import React from 'react';

interface Props {
    // Add specific props here if needed
}

const Page: React.FC<Props> = (props) => {
    // Team members data
    const teamMembers = [
        { name: "Lakindu Samarasinghe", role: "Full Stack Developer", desc: "Weaves spells in binary" },
        { name: "Agzienth Ganaraj", role: "Full Stack Developer", desc: "Conjures visual magic" },
        { name: "Zion Ashrwardana", role: "Backend Developer", desc: "Steers through the void" },
        { name: "Zion Ashrwardana", role: "Backend Developer", desc: "Steers through the void" },
        { name: "Zion Ashrwardana", role: "Backend Developer", desc: "Steers through the void" },
        { name: "Zion Ashrwardana", role: "Backend Developer", desc: "Steers through the void" },
    ];

    // Milestones data
    const milestones = [
        { date: "April 2nd 2025", title: "The Brainstorm", desc: "The first phase of this project" },
        { date: "April 5th 2025", title: "The Implementation Phase ", desc: "Collaborate with the project" },
        { date: "April 7th 2025", title: "The Final Phase", desc: "Showcase this journey" },
    ];

    // Technologies data
    const technologies = [
        { name: "React", desc: "Threads of Interactivity" },
        { name: "TypeScript", desc: "Runes of Precision" },
        { name: "Tailwind", desc: "Winds of Design" },
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

            {/* Timeline Section */}
            <section className="py-20 px-6 bg-black">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight animate-slide-up">
                        Timeline of this Journey
                    </h2>
                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white/20"></div>
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative mb-12 ${index % 2 === 0 ? 'pr-8 md:pr-0 md:w-1/2' : 'pl-8 md:pl-0 md:w-1/2 md:ml-auto'}`}
                            >
                                <div className={`absolute w-3 h-3 bg-white rounded-full -left-1 top-2 ${index % 2 === 0 ? 'md:left-auto md:right-0 md:-mr-1.5' : 'md:left-0 md:-ml-1.5'} animate-pulse`}></div>
                                <div className="bg-gray-950 p-5 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors duration-300">
                                    <span className="text-gray-400 font-mono">{milestone.date}</span>
                                    <h3 className="text-xl font-semibold mt-2">{milestone.title}</h3>
                                    <p className="text-gray-500 mt-1">{milestone.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="py-20 px-6 bg-black border-t border-gray-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight animate-slide-up">
                        Tools of Eternity
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {technologies.map((tech, index) => (
                            <div
                                key={index}
                                className="bg-gray-950 rounded-lg p-5 text-center border border-gray-800 hover:border-white/20 transition-all duration-300 group"
                            >
                                <h3 className="text-lg font-semibold text-white group-hover:text-gray-300">{tech.name}</h3>
                                <p className="text-gray-500 text-sm mt-2">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-black text-center border-t border-gray-900">
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