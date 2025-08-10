// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
import ProjectDetails from '@/components/ProjectDetails'
import React from 'react'

interface Props {
    params: Promise<{
        projectId: string
    }>
}

const ProjectPage = async ({ params }: Props) => {
    const { projectId } = await params;
    
    return (
        <div>
           <ProjectDetails projectID={projectId} />
        </div>
    )
}

export default ProjectPage
