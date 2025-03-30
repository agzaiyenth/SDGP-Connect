'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { projectDomainOptions } from "@/data/delete_after_db/ProjectDomains";
import { projectStatusOptions } from "@/data/delete_after_db/ProjectStatus";
import { projectTypeOptions } from "@/data/delete_after_db/projectTypeOptions";
import { ProjectSubmissionSchema } from "@/data/schemas/Project";
import { sdgGoals } from "@/data/delete_after_db/SDGoals";
import { techStackOptions } from "@/data/techStack";
import { cn } from "@/lib/utils";
import { StackType, TechStackItem } from "@/types/project";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const FormStep3 = () => {
    const { control, watch } = useFormContext<ProjectSubmissionSchema>();

    const [isTechStackOpen, setIsTechStackOpen] = useState(false);  
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false);  

  // Grouping tech stack options by their `type`
   type GroupedTechStackOptions = {
    [key in StackType]?: TechStackItem[];
};
  const groupedTechStackOptions: GroupedTechStackOptions = techStackOptions.reduce<GroupedTechStackOptions>((groups, option) => {
    if (!groups[option.type]) groups[option.type] = [];
    groups[option.type]?.push(option);
    return groups;
}, {});


    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Project Classification
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
                Help us categorize your project to increase its visibility.
            </p>

            <div className="space-y-8">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Project Classification
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                    Help us categorize your project to increase its visibility.
                </p>

                {/* Two Dropdowns in One Row */}


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Tech Stack Dropdown */}
                    <FormField
                        control={control}
                        name="techStack"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tech Stack</FormLabel>
                                <div className="relative mt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsTechStackOpen(!isTechStackOpen);
                                            setIsProjectTypeOpen(false);  // Close the other dropdown
                                        }}
                                        className="w-full border border-gray-700 rounded-lg p-2 text-left bg-white dark:bg-background"
                                    >
                                        Select Tech Stack
                                    </button>

                                    {isTechStackOpen && (
                                        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-700 rounded-lg shadow-lg dark:bg-background max-h-64 overflow-y-auto">
                                            {Object.keys(groupedTechStackOptions).map((group) => (
                                                <div key={group} className="border-b border-gray-700 p-2">
                                                    <div className="font-semibold text-gray-700 dark:text-white mb-1">{group.toUpperCase()}</div>
                                                    {groupedTechStackOptions[group].map(option => {
                                                        const isSelected = field.value?.includes(option.value) || false;
                                                        return (
                                                            <div key={option.value} className="flex items-center space-x-2 mb-2 pl-4">
                                                                <Checkbox
                                                                    checked={isSelected}
                                                                    onCheckedChange={(checked) => {
                                                                        const updatedValue = checked
                                                                            ? [...(field.value || []), option.value]
                                                                            : (field.value || []).filter((val) => val !== option.value);
                                                                        field.onChange(updatedValue);
                                                                    }}
                                                                />
                                                                <option.icon size={20} className="mr-2" />
                                                                <label className="text-sm text-gray-700 dark:text-white">{option.label}</label>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Project Type Dropdown */}
                    <FormField
                        control={control}
                        name="projectType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Type</FormLabel>
                                <div className="relative mt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsProjectTypeOpen(!isProjectTypeOpen);
                                            setIsTechStackOpen(false);  // Close the other dropdown
                                        }}
                                        className="w-full border border-gray-700 rounded-lg p-2 text-left bg-white dark:bg-background"
                                    >
                                        Select Project Type
                                    </button>

                                    {isProjectTypeOpen && (
                                        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-700 rounded-lg shadow-lg dark:bg-background max-h-64 overflow-y-auto">
                                            {projectTypeOptions.map((option) => {
                                                const isSelected = field.value?.includes(option.value) || false;
                                                return (
                                                    <div key={option.value} className="flex items-center space-x-2 my-2 pl-4">
                                                        <Checkbox
                                                            checked={isSelected}
                                                            onCheckedChange={(checked) => {
                                                                const updatedValue = checked
                                                                    ? [...(field.value || []), option.value]
                                                                    : (field.value || []).filter((val) => val !== option.value);
                                                                field.onChange(updatedValue);
                                                            }}
                                                        />
                                                        <option.icon size={20} className="mr-2" />
                                                        <label className="text-sm text-gray-700 dark:text-white">{option.label}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={control}
                    name="projectStatus"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Project Status</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-wrap gap-6"
                                >
                                    {projectStatusOptions.map((status) => (
                                        <div className="flex items-center space-x-2" key={status.value}>
                                            <RadioGroupItem value={status.value} id={status.value} />
                                            <Label htmlFor={status.value}>{status.label}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormDescription>
                                Current development stage of your project
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

<FormField
  control={control}
  name="sdgGoals"
  render={({ field }) => (
    <FormItem>
      <FormLabel>UN Sustainable Development Goals</FormLabel>
      <FormDescription className="mb-2">
        Which SDGs does your project address? (Optional)
      </FormDescription>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {sdgGoals.map((goal) => {
          const isSelected = field.value?.includes(goal.id);

          return (
            <div
              key={goal.id}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-colors",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50"
              )}
              onClick={() => {
                const updatedValue = isSelected
                  ? field.value?.filter((id) => id !== goal.id) || []
                  : [...(field.value || []), goal.id];
                field.onChange(updatedValue);
              }}
            >
              <img
                src={goal.icon}
                alt={goal.name}
                className="w-12 h-12 mb-2"
              />
              <div className="text-xs text-center font-medium">{goal.name}</div>
              <p className="text-xs text-center text-gray-500 mt-1">
                {goal.description.length > 50
                  ? `${goal.description.substring(0, 50)}...`
                  : goal.description}
              </p>
            </div>
          );
        })}
      </div>
      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={control}
  name="projectDomains"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Project Domains</FormLabel>
      <div className="mt-2 relative">
        <Card className="bg-background dark:bg-background-dark border border-slate-200 dark:border-gray-700">
          <CardContent className="p-4 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {projectDomainOptions.map((option) => {
                const isSelected = field.value?.includes(option.value) || false;

                return (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center p-3 rounded-lg border cursor-pointer transition-colors space-x-2",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-slate-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), option.value]
                          : (field.value || []).filter((val) => val !== option.value);

                        field.onChange(updatedValue);
                      }}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-slate-900 dark:text-white">{option.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <FormDescription className="text-slate-600 dark:text-slate-400">
        Select all domains that apply to your project
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>


            </div>
        </div>
    );
};

export default FormStep3;