import { IProjectStatus } from "@/types/project/type";
import React from "react";
import { Badge } from "../ui/badge";
import { ProjectDomainEnum, ProjectStatusEnum } from "@prisma/client";
import { Button } from "../ui/button";
import { Globe2Icon, Share, Share2Icon } from "lucide-react";
import Link from "next/link";

interface ProjectHeaderProps {
  title: string;
  subtitle?: string;
  domains?: ProjectDomainEnum[];
  status?: ProjectStatusEnum;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  subtitle,
  domains,
  status,
}) => {
  return (
    <div className="px-4 md:px-8 -mt-20 relative z-10">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-4">{subtitle}</p>
      
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Badge>{status}</Badge>

        
        {domains?.map((domain:ProjectDomainEnum) => (
            <Badge key={domain} variant="secondary">
                {domain}
            </Badge>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          color="primary"
          className="font-semibold"
        >
          <Link href="/projects" className="flex items-center gap-2">
          Website <Globe2Icon className="ml-2" size={16} />
          </Link>
        </Button>
        {/* TODO Add share button from the current project id */}
        <Button
          className="font-semibold"
          variant={"outline"}
        >
          Share <Share2Icon className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
};
