import React from "react";
import Markdown from "markdown-to-jsx";
import { Card } from "../ui/card";

interface ProjectOverviewProps {
  problemStatement?: string;
  solution?: string;
  keyFeatures?: string;
  teamNumber: string;
  projectYear: string;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  problemStatement,
  solution,
  keyFeatures,
  teamNumber,
  projectYear
}) => {
  return (
    <Card className="p-6 mt-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Team</h2>
          <p className="text-default-500">{teamNumber} | {projectYear}</p>
        </div>
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
            {keyFeatures && (
              <Markdown
                options={{
                  overrides: {
                    h1: { props: { className: 'text-2xl font-bold mb-4' } },
                    h2: { props: { className: 'text-xl font-bold mb-3' } },
                    h3: { props: { className: 'text-lg font-bold mb-2' } },
                    p: { props: { className: 'mb-4' } },
                    ul: { props: { className: 'list-disc pl-6 mb-4' } },
                    ol: { props: { className: 'list-decimal pl-6 mb-4' } },
                    li: { props: { className: 'mb-1' } }
                  }
                }}
              >
                {keyFeatures}
              </Markdown>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
};
