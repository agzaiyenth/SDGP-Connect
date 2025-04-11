import { AboutSection } from '@/components/about/about';
import { CTASection } from '@/components/about/cta';
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
           <CTASection/>
                   
          
        </div>
    );
};

export default Page;