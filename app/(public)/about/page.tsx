import { AboutSection } from '@/components/about/about';
import Hero from '@/components/about/hero';
import ModuleTeam from '@/components/about/moduleTeam';
import StatsSection from '@/components/about/stats';

import React from 'react';

interface Props {
    
}

const Page: React.FC<Props> = (props) => {
    
    return (
        <div className="">
            <Hero/>
            <AboutSection/>
            <StatsSection/>
           <ModuleTeam/>
                   
          
        </div>
    );
};

export default Page;