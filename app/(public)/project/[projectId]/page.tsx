import ProjectDetails from '@/components/ProjectDetails'
import React from 'react'

interface Props {
    params: {
        projectId: string
    }
}

const ProjectPage = ({ params }: Props) => {
    return (
        <div>
           <ProjectDetails projectID={params.projectId} />
            
        </div>
    )
}

export default ProjectPage
