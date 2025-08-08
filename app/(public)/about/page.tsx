/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

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
            <Hero />
            <ModuleTeam />
            <StatsSection />
            <CTASection />


        </div>
    );
};

export default Page;