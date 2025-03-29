import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectSubmissionSchema } from "@/data/schemas/Project";
import { useFormContext } from "react-hook-form";

const FormStep1 = () => {
  const { control } = useFormContext<ProjectSubmissionSchema>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Project Basics
      </h2>
      <p className="text-slate-600 dark:text-slate-400">
        Tell us about your project's core information and the problem it solves.
      </p>

      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Title</FormLabel>
            <FormControl>
              <Input 
                placeholder="Eg: LEXi" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Make it concise and memorable (max 100 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="subtitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input 
                placeholder="Eg: An AI-Powered Assistive Learning Platform for Dyslexic Students" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              A short description that clearly explains your project (max 200 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="problemStatement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Problem Statement</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What problem does your project solve?" 
                className="min-h-[120px]" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Clearly articulate the problem or challenge your project addresses
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="solution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Solution</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="How does your project solve the problem?" 
                className="min-h-[120px]" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Explain how your solution works and its key benefits
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormStep1;
