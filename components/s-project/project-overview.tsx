
import React from "react";
import { Card } from "../ui/card";

interface ProjectOverviewProps {
  problemStatement?: string;
  solution?: string;
  keyFeatures?: string;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  problemStatement,
  solution,
  keyFeatures,
}) => {
  return (
    <Card className="p-6 mt-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Problem Statement</h2>
          <p className="text-default-500">{problemStatement}</p>
        </div>
        
     
        
        <div className="border-t border-default-200 pt-4 mt-4">
          <h2 className="text-2xl font-semibold mb-3">Solution</h2>
          <p className="text-default-500">{solution}</p>
        </div>
        
  
        
        <div className="border-t border-default-200 pt-4 mt-4">
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-default-500">
        {/* TODO : wrap in markdown render */}
            {keyFeatures}
         
          </ul>
        </div>
        

        

      </div>
    </Card>
  );
};
