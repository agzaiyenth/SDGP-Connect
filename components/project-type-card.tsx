import React from 'react'
import { projectTypeOptions } from '../types/project/mapping'
import { IconType } from 'react-icons'

interface Props {
  projectTypes?: typeof projectTypeOptions;
  onSelect?: (value: string) => void;
}

const ProjectTypeCard = ({ projectTypes = projectTypeOptions, onSelect }: Props) => {
 
  
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex gap-2 justify-center items-center">
        {projectTypes.map((type) => {
          const Icon = type.icon as IconType;
          
          return (
            <button key={type.value} className="flex gap-3 justify-center items-center cursor-pointer text-white font-semibold bg-background px-7 py-3 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900" onClick={() => onSelect && onSelect(type.value)}>
              {Icon && <Icon className=" text-white" />}   {type.label}
            </button>
          );
        })}
      </div>
     
    </div>
  )
}

export default ProjectTypeCard
