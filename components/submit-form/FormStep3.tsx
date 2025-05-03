import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { projectStatusOptions, projectTypeOptions, sdgGoals, techStackOptions } from "@/types/project/mapping";
import { ProjectSubmissionSchema } from "@/validations/submit_project";
import { ProjectDomainEnum } from "@prisma/client";
import { useFormContext } from "react-hook-form";
import { MultiSelect } from "../ui/Multi-Select";


// Create domain options directly from the enum
const projectDomainOptions = Object.values(ProjectDomainEnum).map(domain => {
  // Format the domain name for display (e.g., AI_ML -> AI/ML)
  const label = domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return {
    value: domain,
    label: label
  };
});

const FormStep3 = () => {
  const { control } = useFormContext<ProjectSubmissionSchema>();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Project Classification
      </h2>
      <p className="text-slate-600 dark:text-slate-400">
        Help us categorize your project to increase its visibility.
      </p>

      {/* Project Type & Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Project Type Dropdown */}
        <FormField
          control={control}
          name="projectTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type</FormLabel>
              <MultiSelect
                options={projectTypeOptions}
                onValueChange={(values) => field.onChange(values)}
                placeholder='Select Project Type'
                popoverClass='w-96'
                maxCount={3}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tech Stack Dropdown */}
        <FormField
          control={control}
          name="techStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <MultiSelect
                options={techStackOptions}
                onValueChange={(values) => field.onChange(values)}
                placeholder='Select Tech Stack'
                popoverClass='w-96'
                maxCount={3}
              />
              <FormMessage />
            </FormItem>
          )}
        />

      </div>

      {/* Project Domains */}
      <FormField
        control={control}
        name="domains"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Domains</FormLabel>
            <FormDescription className="mb-2">
              Select the domains your project belongs to
            </FormDescription>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {projectDomainOptions.map((domain) => {
                const isSelected = field.value?.includes(domain.value);

                return (
                  <div
                    key={domain.value}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-colors",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      const updatedValue = isSelected
                        ? field.value?.filter((value) => value !== domain.value) || []
                        : [...(field.value || []), domain.value];
                      field.onChange(updatedValue);
                    }}
                  >
                    <div className="text-sm text-center font-medium">{domain.label}</div>
                  </div>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Project Status */}
      <FormField
        control={control}
        name="status.status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Status</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {projectStatusOptions.map((status) => {
                const isSelected = field.value === status.value;

                return (
                  <div
                    key={status.value}
                    className={cn(
                      "flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-colors",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50"
                    )}
                    onClick={() => field.onChange(status.value)}
                  >
                    <div className="text-lg font-medium text-center text-slate-900 dark:text-white">
                      {status.label}
                    </div>
                    <p className="text-sm text-center text-gray-500 mt-1">
                      {status.description || ""}
                    </p>
                  </div>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* SDG Goals */}
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
                const isSelected = field.value?.includes(goal.name);

                return (
                  <div
                    key={goal.id}
                    className={cn(
                      "flex items-center p-3 rounded-lg border cursor-pointer transition-colors gap-3",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      const updatedValue = isSelected
                        ? field.value?.filter((name) => name !== goal.name) || []
                        : [...(field.value || []), goal.name];
                      field.onChange(updatedValue);
                    }}
                  >
                    <img
                      src={goal.icon}
                      alt={goal.name}
                      className="w-12 h-12"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium break-all">{goal.name}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        {goal.description.length > 50
                          ? `${goal.description.substring(0, 50)}...`
                          : goal.description}
                      </p>
                    </div>


                  </div>

                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />



    </div>
  );
};

export default FormStep3;
