'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Tilt from 'react-parallax-tilt';

const stats = [
  { number: 240, label: 'Student Projects' },
  { number: 53, label: 'Industry Partners' },
  { number: 15, label: 'SDGs Addressed' },
  { number: 3, label: 'Funded Startups' }
];

export default function ImpactSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#040404] via-[#181918] to-[#040404] p-10">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-white mb-16"
      >
        Our Impact
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, index) => (
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className=" bg-card rounded-2xl p-10 flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 shadow-[0_0_8px_#282929]"
              // style={{ backgroundColor: '#202120' }}
            >
              <div className="text-5xl font-extrabold text-white">
              <CountUp 
                start={0} 
                end={stat.number} 
                duration={
                    stat.number > 100 ? 5   
                    : stat.number >= 50 ? 7  
                    : 9                   
                }
                suffix="+"
              />  
              </div>
              <div className="text-gray-400 mt-4 text-center text-lg font-medium" style={{ color: '#444645' }}>
                {stat.label}
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}