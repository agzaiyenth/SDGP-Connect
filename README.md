# SDGP Connect

[![License: Non-Commercial](https://img.shields.io/badge/License-Non--Commercial-red)](https://github.com/agzaiyenth/SDGP-Connect/blob/main/LICENSE)
[![Join our WhatsApp Community](https://img.shields.io/badge/Join%20our%20WhatsApp%20Community-Click%20Here-brightgreen)](https://chat.whatsapp.com/IFJH9D1sbiT7OsNsBT4neT)

---

## What is SDGP Connect?

**[sdgp.lk](https://sdgp.lk)** is a platform built for the **Informatics Institute of Technology (IIT)** as part of the SDGP (Software Development Group Project) module. Its core mission is to **showcase student-led tech projects** and **connect them with real-world investors, mentors, and industry partners**.

This platform acts as a digital bridge between innovation and opportunity—allowing students to go beyond academic recognition and **attract funding, incubation, or partnerships** that help bring their projects to life.

> SDGP Connect was collaboratively designed and developed by a team of contributors in partnership with IIT. All rights are reserved by the contributors. Redistribution or commercial use outside this repository is not permitted.

---

## License

This project is licensed under a **Custom Non-Commercial Collaboration License**.

-  Redistribution outside this repository is prohibited  
-  Not for resale or commercial use  
-  Contributions are welcome via pull requests  
-  All contributors retain their rights and must be credited  

See [`LICENSE`](./LICENSE.md) for full terms.

---

## Reporting Website Issues

All known issues of SDGP Connect are filed at:  
https://github.com/agzaiyenth/sdgp-connect/issues  
Please check the list before opening a new issue.

### Opening an Issue

Help us make our software better!  
Submit bug reports or feature requests via GitHub:  
https://github.com/agzaiyenth/sdgp-connect/issues

### Reporting Security Issues

Please **do not** report security issues via GitHub.  
Instead, email: **[security@sdgp.lk](mailto:security@sdgp.lk)**

---

## Contributing

If you plan to contribute, please work on the latest development version. The `main` branch holds the latest released source code.

Follow the instructions below to set up the project on your local machine.

---

## Cloning the Project

```bash
git clone https://github.com/agzaiyenth/sdgp-connect.git
cd sdgp-connect
````

---

## Installing Dependencies

We use **Yarn** for dependency management:

```bash
yarn install
```

> ⚠️ Do not use npm. Always use Yarn.

---

## Setting Up Environment Variables

1. Create a `.env` file at the root of the project.
2. Add the required environment variables. (Request from @agzaiyenth or @zionashirwada)

---

## Running MySQL Server

You need a MySQL server running (e.g., via **XAMPP**):

* Ensure MySQL is active.
* Verify that `.env` credentials match your setup.

---

## Generating Prisma Client

```bash
yarn prisma generate
```

---

## Running the Project

```bash
yarn run dev
```

This will start the development server.

---

## Migrating & Generating Prisma Client After Schema Changes

After editing `schema.prisma`, run:

```bash
npx prisma migrate dev --name <your-migration-name>
yarn prisma generate
```

---

## Additional Tips

* Always pull the latest changes before development
* Run migrations + regenerate Prisma client after DB changes

---

# Coding Standards

## Branch Naming Convention

```
type/location/name

Types:
- feature
- fix
- improvement

Examples:
feature/project-showcase
fix/login-form
improvement/home-page
```

---
## Contributors

We thank all individuals who contributed to the development of SDGP Connect.

<!-- You can use contrib.rocks or list manually -->
<a href="https://github.com/agzaiyenth/SDGP-Connect/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=agzaiyenth/SDGP-Connect" />
</a>