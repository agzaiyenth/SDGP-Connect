import { IProjectAssociation } from "@/types/project/type";
import React from "react";
import { Card } from "../ui/card";
import { sdgGoals, projectTypeOptions } from "@/types/project/mapping";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AssociationType } from "@prisma/client";
import ProjectTypeCard from "../project-type-card";

interface SDGSectionProps {
    associations: IProjectAssociation[];
}

export const ProjectAssociation: React.FC<SDGSectionProps> = ({
    associations,
}) => {
  // Filter associations to get SDG goals
  const sdgAssociations = associations.filter(assoc => assoc.type === AssociationType.PROJECT_SDG);
  
  // Filter associations to get project domains
  const domainAssociations = associations.filter(assoc => assoc.type === AssociationType.PROJECT_DOMAIN);
  // Filter associations to get project types
  const typeAssociations = associations.filter(assoc => assoc.type === AssociationType.PROJECT_TYPE);

  // Filter associations to get tech stacks
  const techStackAssociations = associations.filter(assoc => assoc.type === AssociationType.PROJECT_TECH);

  return (
    <Card className="mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-4">SDG Goals & Domains</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Sustainable Development Goals</h3>
          <div className="flex flex-wrap gap-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            
            {sdgAssociations.length > 0 ? (
              sdgAssociations.map((association) => {
                // Find the matching SDG goal from the mapping
                const sdgGoal = sdgGoals.find(goal => goal.name === association.sdgGoal);
                
                if (!sdgGoal) return null; // Skip if no matching SDG found
                
                return (
                  <div key={association.id} className="flex justify-between space-x-4 border border-primary/10 rounded-lg p-4">
                    <img src={sdgGoal.icon} alt={sdgGoal.name} className="h-12 rounded-xs" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{sdgGoal.name.replace(/_/g, ' ')}</h4>
                      <p className="text-sm">
                        {sdgGoal.description}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-4">No SDG goals associated with this project</div>
            )}
                       </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Project Domains</h3>
          <div className="flex flex-wrap gap-2">
            {/* TO DO: Implement Domain Rendering */}
            {domainAssociations.length > 0 ? (
              domainAssociations.map((domain) => (
                <div key={domain.id} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                  {domain.domain?.replace(/_/g, ' ')}
                </div>
              ))
            ) : (
              <div className="text-center py-2 w-full">No domains associated with this project</div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Project Type</h3>
          <div className="flex flex-wrap gap-2">
            {typeAssociations.length > 0 ? (
              <ProjectTypeCard 
                projectTypes={projectTypeOptions.filter(type => 
                  typeAssociations.some(assoc => assoc.projectType === type.value)
                )}
              />
            ) : (
              <div className="text-center py-2 w-full">No project types associated with this project</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
