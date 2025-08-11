# SDGP Connect
[![License: Non-Commercial](https://img.shields.io/badge/License-Non--Commercial-red)](https://github.com/agzaiyenth/SDGP-Connect/blob/main/LICENSE.md)
[![Join our WhatsApp Community](https://img.shields.io/badge/Join%20our%20WhatsApp%20Community-Click%20Here-brightgreen)](https://chat.whatsapp.com/IFJH9D1sbiT7OsNsBT4neT)
---
## What is SDGP Connect?

**[sdgp.lk](https://sdgp.lk)** is a platform built for the **Informatics Institute of Technology (IIT)** as part of the SDGP (Software Development Group Project) module. Its core mission is to **showcase student-led tech projects** and **connect them with real-world investors, mentors, and industry partners**.

This platform acts as a digital bridge between innovation and opportunity—allowing students to go beyond academic recognition and **attract funding, incubation, or partnerships** that help bring their projects to life.

> Initally developed by [Psycode Labs](https://psycodelabs.lk) in collaboration with IIT for commercial use.


## Reporting Website issues

All known issues of SDGP Connect are filed at: https://github.com/agzaiyenth/sdgp-connect/issues. Please check this list before opening a new issue.

### Opening an issue

Help us make our software better! Submit any bug reports or feature requests through GitHub:  https://github.com/agzaiyenth/sdgp-connect/issues.

### Reporting security issues

Please **do not** report security issues via GitHub issues. Instead, Email [SDGP Security Vulnerability Reports](security@sdgp.lk).

## Contributing

If you are planning on contributing to the development efforts of SDGP Connect, you can do so by checking out the latest development version. The master branch holds the latest released source code.

Follow these instructions to set up the project on your local machine. This guide is intended to help newcomers get started quickly.

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
2. Add environment variables. (Ask Admin's for the `.env` file).

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