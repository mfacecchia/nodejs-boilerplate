# NodeJS Boilerplate
Boilerplate for NodeJS Frontend & Backend Web Application Development

## Table of contents
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Built In - Technologies](#built-in---technologies)
- [Modules References](#modules-references)
- [Environmental Variables](#environmental-variables)

## Requirements
- [NodeJS](https://nodejs.org/en/download/package-manager) (Latest version recommended)

## Quick Start
To use this repository as a template for your brand-new project, you can [download the latest version from the releases section](https://github.com/mfacecchia/nodejs-boilerplate/releases), or directly [create a new repository from here](https://github.com/new?template_name=nodejs-boilerplate&template_owner=mfacecchia).
Once you have created your new repository, open the project in your favorite IDE and type in the terminal the following:
```zsh
cd backend
npm install
cd ../frontend
npm install
```
This will install all the node modules and libraries required to run the project.

## Built In - Technologies
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)\
![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)\
![PostCSS](https://img.shields.io/badge/postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/daisyUI-1ad1a5?style=for-the-badge&logo=daisyui&logoColor=white)
![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)\
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Modules References
#### Frontend
- [EJS](https://ejs.co/)
- [PostCSS](https://postcss.org/)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [DaisyUI](https://daisyui.com/)
#### Backend
- [Express.JS](https://expressjs.com/en/4x/api.html#express)
- [CORS](https://www.npmjs.com/package/cors)
- [RateLimiter](https://express-rate-limit.mintlify.app/)
#### Database
- [MySQL](https://dev.mysql.com/doc/refman/8.4/en/)
- [Prisma ORM](https://www.prisma.io/docs/getting-started/quickstart)
#### Authentication
- [JWT](https://www.npmjs.com/package/jsonwebtoken)

## Environmental Variables
#### Frontend

#### Backend
|Variable Name |Usage |
|--------------|------|
|PORT          |Express.JS server port |
|NODE_ENV      |Application's current environment (`development` or `production`)(if the value is on `development`, all app errors will be printed out to console |
|FRONTEND_ADDRESS | Frontend application's address and port (default to `127.0.0.1:5500`)
|DATABASE_URL  |Database connection information (`type://user@password:port/dbname`) |
|JWT_SECRET    |Json Web Token secret (used for token generation & validation) |
