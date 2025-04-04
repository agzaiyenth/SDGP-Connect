import { Table } from 'lucide-react';
import React from 'react'

interface Props {
    
}

const PendingTable = (props: Props) => {
    return (
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProjects.length === mockProjects.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedProjects(mockProjects.map(p => p.id));
                      } else {
                        setSelectedProjects([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProjects([...selectedProjects, project.id]);
                        } else {
                          setSelectedProjects(selectedProjects.filter(id => id !== project.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.groupNumber}</TableCell>
                  <TableCell>{project.submissionDate}</TableCell>
                  <TableCell>
                    <Badge>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleViewDetails(project)}>
                        View
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(project)}>
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(project)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    )
}

export default PendingTable
