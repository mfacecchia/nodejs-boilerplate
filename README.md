# NodeJS Boilerplate
Boilerplate for NodeJS Frontend & Backend Web Application Development

## Table of contents
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Built In - Technologies](#built-in---technologies)
- [Modules References](#modules-references)
- [Environmental Variables](#environmental-variables)
- [Features](#built-in-features)
- [Browser Support](#browser-support)
- [Bug Reports](#bug-reports)
- [Support The Project](#support-the-project)

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
- [Express.JS](https://expressjs.com/en/4x/api.html#express)
- [Validate.JS](https://validatejs.org/#validate-js)
#### Backend
- [Express.JS](https://expressjs.com/en/4x/api.html#express)
- [CORS](https://www.npmjs.com/package/cors)
- [RateLimiter](https://express-rate-limit.mintlify.app/)
- [Validate.JS](https://validatejs.org/#validate-js)
- [NodeMailer](https://nodemailer.com/about/)
#### Database
- [MySQL](https://dev.mysql.com/doc/refman/8.4/en/)
- [Prisma ORM](https://www.prisma.io/docs/getting-started/quickstart)
#### Authentication
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
#### Security
- [CSRF](https://www.npmjs.com/package/csrf)
- [Argon2](https://www.npmjs.com/package/argon2)

## Environmental Variables
A `.env.sample` file is provided in the project for both the [Frontend](https://github.com/mfacecchia/nodejs-boilerplate/blob/main/frontend/.env.sample) and the [Backend](https://github.com/mfacecchia/nodejs-boilerplate/blob/main/backend/.env.sample) with all instructions on how to use it in your project and customize it based on your needs.
#### Frontend
|Variable Name |Usage |
|--------------|------|
|PORT          |Express.JS server port |
|NODE_ENV      |Application's current environment (`development` or `production`)(if the value is on `development`, all app errors will be printed out to console |
|BACKEND_ADDRESS |Backend application's address and port (default to `127.0.0.1:3000`) |
#### Backend
|Variable Name |Usage |
|--------------|------|
|PORT          |Express.JS server port |
|NODE_ENV      |Application's current environment (`development` or `production`)(if the value is on `development`, all app errors will be printed out to console |
|FRONTEND_ADDRESS |Frontend application's address and port (default to `127.0.0.1:5500`) |
|DATABASE_URL  |Database connection string (`type://user@password:port/dbname`) |
|REDIS_URL    |Redis database connection string (`redis://user:password@host:port/dbNumber`)|
|JWT_SECRET    |Json Web Token secret (used for token generation & validation)  |
|NODEMAILER_HOST  |SMTP hostname (ex. `smtp.google.com`) |
|NODEMAILER_USER  |Email address to use to send messages (ex. `hello@world.com`) |
|NODEMAILER_PASSWORD  |Email password |

## Built-In Features
- Custom classes with the most commonly generated errors & relative errors handling function
- JWT & CSRF Token Generation and Validation middlewares
- Most common rate limiters for all the endpoints
- Sign-Up & Log-In endpoints (data validation middleware included)
- User CRUD (Obtain, Update, and Delete all user's related information)
- Email Verification & Password Reset endpoints
- Most common utility functions & fetch operations (Frontend)
- ...*and more to come* 👀...

## Browser Support
This project uses PostCSS along with the AutoPrefixer Plugin to support all the latest and stable releases of all major browsers.

## Bug Reports
Feel like this boilerplate needs some adjustments or have you just found out a bug or worse a vulnerability that needs to be resolved? Feel free to [open an issue](https://github.com/mfacecchia/nodejs-boilerplate/issues/new) and I will try to do my best to implement that new functionality  or to fix that bug as soon as possible!
#### Notes to issue a Bug or a Vulnerability
- Check if the issue has already been fixed
- Check if the issue is already open from the [Issues Tracker](https://github.com/mfacecchia/nodejs-boilerplate/issues). It may have already been reported by somebody else
- Provide a good test case, and write down the most descriptive and detailed explanation you can give. A good bug report should include:
  - OS Version
  - Browser Version
  - How to reproduce the bug
  - A video demonstration of the bug (if possible)
  - What you'd expect the functionality to do

Any contribution is highly apreciated!

## Support The Project
Tried this project and want to support the developer in some way? I opened a [Buymeacoffee](https://buymeacoffee.com/mfacecchia) account which you can donate to. Any contribution, even a tiny one is highly appreciated and will spur me continue developing projects like this! Thank you so much 🖤
