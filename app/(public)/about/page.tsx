import Hero from '@/components/about/hero';
import ModuleTeam from '@/components/about/moduleTeam';

import React from 'react';

interface Props {
    
}

const Page: React.FC<Props> = (props) => {
    
    return (
        <div className="">
            <Hero/>
           <ModuleTeam/>
                   
          
        </div>
    );
};

export default Page;