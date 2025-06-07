// Types for project search
export interface ProjectSearchResult {
  project_id: string;
  title: string;
  logo: string | null;
  group_num: string;
  sdgp_year: string;
}

// Types for competition search
export interface CompetitionSearchResult {
  id: string;
  name: string;
  logo: string | null;
  start_date: Date;
  end_date: Date;
}
