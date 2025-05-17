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
