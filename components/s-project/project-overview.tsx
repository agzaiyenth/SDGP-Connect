import React from "react";
import { Card } from "../ui/card";

interface ProjectOverviewProps {
  problemStatement: string;
  solution: string;
  keyFeatures: string[];
  completionPercentage: number;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  problemStatement,
  solution,
  keyFeatures,
  completionPercentage,
}) => {
  return (
    <Card className="p-6 mt-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Problem Statement</h2>
          <p className="text-default-500">{problemStatement}</p>
        </div>
        
        <Divider />
        
        <div>
          <h2 className="text-2xl font-semibold mb-3">Solution</h2>
          <p className="text-default-500">{solution}</p>
        </div>
        
        <Divider />
        
        <div>
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-default-500">
            {keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <Divider />
        
        <div>
          <h2 className="text-2xl font-semibold mb-3">Project Progress</h2>
          <Progress
            value={completionPercentage}
            color="primary"
            className="w-full"
            showValueLabel
          />
        </div>
      </div>
    </Card>
  );
};
