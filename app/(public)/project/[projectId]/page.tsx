/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import ProjectDetails from '@/components/ProjectDetails'
import React from 'react'

interface Props {
    params: {
        projectId: string
    }
}

const ProjectPage = async ({ params }: Props) => {
    const projectId = params.projectId;
    
    return (
        <div>
           <ProjectDetails projectID={projectId} />
        </div>
    )
}

export default ProjectPage
