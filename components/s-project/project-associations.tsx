import { IProjectAssociation } from "@/types/project/type";
import React from "react";
import { Card } from "../ui/card";
import { sdgGoals, projectTypeOptions } from "@/types/project/mapping";
import { AssociationType } from "@prisma/client";
import ProjectTypeCard from "../project-type-card";
import TechCard from "../techcard";
import Image from "next/image";

interface SDGSectionProps {
  associations: IProjectAssociation[];
}

export const ProjectAssociation: React.FC<SDGSectionProps> = ({
  associations,
}) => {
  const sdgAssociations = associations.filter(
    (assoc) => assoc.type === AssociationType.PROJECT_SDG
  );

  const domainAssociations = associations.filter(
    (assoc) => assoc.type === AssociationType.PROJECT_DOMAIN
  );

  const typeAssociations = associations.filter(
    (assoc) => assoc.type === AssociationType.PROJECT_TYPE
  );

  const techStackAssociations = associations.filter(
    (assoc) => assoc.type === AssociationType.PROJECT_TECH
  );

  return (
    <Card className="mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-4">SDG Goals & Domains</h2>

      <div className="space-y-6">
        {/* SDG Goals Section */}
        <div>
          <h3 className="text-lg font-medium mb-3">Sustainable Development Goals</h3>

          {sdgAssociations.length > 0 ? (
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3`}
            >
              {sdgAssociations.map((association) => {
                const sdgGoal = sdgGoals.find(
                  (goal) => goal.name === association.sdgGoal
                );
                if (!sdgGoal) return null;

                return (
                  <div
                    key={association.id}
                    className="flex items-center px-2 py-2 rounded-lg border gap-3 cursor-default transition-colors border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-shrink-0 h-14 w-14">
                      <img
                        src={sdgGoal.icon}
                        alt={sdgGoal.name}
                        className="h-full w-full object-contain rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 leading-tight max-h-[3.5rem] overflow-y-auto pr-1 scroll-hide">
                        {sdgGoal.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="col-span-full text-center py-4">
              No SDG goals associated with this project
            </div>
          )}
        </div>

        {/* Domains */}
        <div>
          <h3 className="text-lg font-medium mb-3">Project Domains</h3>
          <div className="flex flex-wrap gap-1.5">
            {domainAssociations.length > 0 ? (
              domainAssociations.map((domain) => (
                <div
                  key={domain.id}
                  className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium transition-colors border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  {domain.domain?.replace(/_/g, " ")}
                </div>
              ))
            ) : (
              <div className="text-center py-2 w-full text-sm text-muted-foreground">
                No domains associated with this project
              </div>
            )}
          </div>
        </div>

        {/* Project Type */}
        <div>
          <h3 className="text-lg font-medium mb-3">Project Type</h3>
          <div className="flex flex-wrap gap-1.5">
            {typeAssociations.length > 0 ? (
              <ProjectTypeCard
                projectTypes={projectTypeOptions.filter((type) =>
                  typeAssociations.some(
                    (assoc) => assoc.projectType === type.value
                  )
                )}
              />
            ) : (
              <div className="text-center py-2 w-full text-sm text-muted-foreground">
                No project types associated with this project
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-lg font-medium mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-1.5">
            <TechCard techStacks={techStackAssociations} />
          </div>
        </div>
      </div>
    </Card>
  );
};
