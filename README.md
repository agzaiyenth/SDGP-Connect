# SDGP Connect - Project Setup Guide

Welcome to the SDGP Connect project! Follow these instructions to set up the project on your local machine. This guide is intended to help newcomers get started quickly.

## Cloning the Project

1. Clone the project repository using:
2. Navigate into the project directory:

---

## Installing Dependencies

We use **Yarn** instead of npm. Install all the required packages with:
```bash
    yarn install
```

> **Note:** Do not use npm. Stick to Yarn for dependency management.

---

## Setting Up Environment Variables

1. Create a `.env` file at the root of the project.
2. Add environment variables. (Ask @zionashirwada for the `.env` file).

---

## Running MySQL Server

You will need to have a MySQL server running. (You can use **XAMPP**).
- If using XAMPP, make sure MySQL is running.
- Make sure your `.env` file matches your MySQL credentials.

---

## Generating Prisma Client

Generate the Prisma Client so that it can be used within the project:
```bash
    yarn prisma generate
```

---

## Running the Project

To start the development server:
```bash
    yarn run dev
```

This will launch your application on the local server.

---

## Migrating & Generating Client After Schema Changes

Whenever you update the `schema.prisma` file, you need to apply migrations and regenerate the client:

1. Apply Migrations:
```bash
    npx prisma migrate dev --name <your-migration-name>
```

2. Generate Prisma Client:
```bash
    yarn prisma generate
```

---

## Additional Tips
- Always pull the latest changes from the repository before starting work
- Always run migrations and generate the Prisma client if you see database-related errors.


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

# Features

## Core Pages

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
