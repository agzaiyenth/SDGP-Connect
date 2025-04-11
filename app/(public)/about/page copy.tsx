import React from 'react';
import ModuleTeam from '@/components/about/moduleTeam';
import ImpactSection from "@/components/about/impact-section";

interface Props {
    
}

const Page: React.FC<Props> = (props) => {
    
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
               
                   
                    <ModuleTeam/>
              
            </section>
            <ImpactSection/>

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