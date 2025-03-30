# SDGP Connect

SDGP Connect is a full-stack web application built with Next.js 14, using the App Router, Tailwind CSS, and TypeScript. It provides a platform to explore and showcase SDGP (Software Development Group Project) initiatives, following a Netflix-style UI.

---
# Coding Standards

## Branch Naming Convention
When creating a new branch, follow this pattern:
```
type/location/name

Types:
- feature    (new additions)
- fix        (fixing issues)
- improvement (enhancing existing features)


Example:
feature/product-showcase
bug/login-form
improvement/home-page
```

## Features

### Core Pages

- **Home Page (`/`)**
  - Hero banner with tagline and CTA buttons: “Browse Projects”, “Become an Investor”
  - Brief description of the SDGP module
  - Carousel showcasing featured projects
  - Impact stats (e.g., "240+ Projects", "3 Startups Funded")
  - Horizontal scrollable chips for domain-based exploration

- **Project Explorer Page (`/projects`)**
  - Smart search bar (placeholder for AI search)
  - Sidebar filters: Domain, Year, Status, Tags
  - Sorting: Trending, Newest, Startup Potential
  - Grid layout displaying project cards

- **Project Detail Page (`/projects/:id`)**
  - Large cover image or embedded video
  - Title, subtitle, problem statement, solution, features
  - Tech stack tags
  - Project type and status
  - Slide deck viewer (gallery of up to 10 images)
  - SDG Goals and Domains (multi-select chips)
  - Similar project recommendations (placeholder)

- **About Page (`/about`)**
  - Overview of the SDGP module
  - Team section with module lecturers’ bios and images

- **Contact Page (`/contact`)**
  - Static page listing module team contact details (emails/roles)

## UI & UX

- Floating left-side vertical navbar for navigation
- Dark theme with smooth transitions
- Responsive design for mobile, tablet, and desktop
- UI components powered by `@shadcn/ui`

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Database**: Prisma ORM
- **Authentication & Storage**: Supabase (boilerplate setup)
- **Package Manager**: Yarn

## Folder Structure

```
├── app/          # App Router structure
├── components/   # Reusable UI components
├── lib/          # Utility functions and hooks
├── types/        # TypeScript types
├── prisma/       # Prisma schema and database management
├── supabase/     # Supabase integration setup
├── public/       # Static assets
├── styles/       # Global styles
├── pages/        # Static and dynamic pages
├── README.md     # Project documentation
```

## Setup & Installation

### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [Yarn](https://yarnpkg.com/)
- Install PostgreSQL (for Prisma database)
- Set up a Supabase project

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/agzaiyenth/sdgp-connect.git
   cd sdgp-connect
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add Supabase credentials and database connection string
4. Run database migrations:
   ```sh
   yarn prisma migrate dev
   ```
5. Start the development server:
   ```sh
   yarn dev
   ```

## Mock Data
To simulate real data, we have included dummy JSON data for 3–5 projects in the `lib/mockData.ts` file.

## Future Enhancements
- AI-powered smart search
- Investor dashboard
- Real-time project updates using Supabase subscriptions

## Contributions
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).
