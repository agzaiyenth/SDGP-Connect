import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Facebook, Instagram, Linkedin, Smartphone, Youtube, Globe, Mail } from "lucide-react";
import { ProjectSubmissionSchema } from "@/data/schemas/Project";

const FormStep4 = () => {
  const { control } = useFormContext<ProjectSubmissionSchema>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Contact Information
      </h2>
      <p className="text-slate-600 dark:text-slate-400">
        Add links to your project's website and social media accounts.
      </p>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">External Links</h3>
        
        <FormField
          control={control}
          name="externalLinks.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://yourproject.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="externalLinks.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://instagram.com/yourproject" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="externalLinks.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://facebook.com/yourproject" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="externalLinks.youtube"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                YouTube
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://youtube.com/channel/yourproject" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="externalLinks.linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://linkedin.com/company/yourproject" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
      </div>
      
      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-medium">Team Contact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="teamEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="team@yourproject.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="teamPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input 
                    type="tel"
                    placeholder="+94 77 123 4567" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormDescription>
          Team Email or a Personal Email.
        </FormDescription>
      </div>
    </div>
  );
};

export default FormStep4;
