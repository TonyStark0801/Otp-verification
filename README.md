<div align="center">
<p style="display; ">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/twilio.svg" width="200" alt="Twilio Logo" /></a>
</p>
</div>


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <h1 align="center"> OTP Verification Backend App: Powered by <a href="http://nestjs.com/" target="_blank">Next.js</a> and <a href="https://www.twilio.com/docs/messaging" target="_blank">Twilio </h1>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Description

Implement a secure OTP verification feature seamlessly with our Backend App, powered by [Next.js](http://nestjs.com/) and [Twilio](https://www.twilio.com/docs/messaging) Integration. Elevate user authentication on your website or app by integrating our reliable solution, ensuring a streamlined and secure verification process. Boost the trust and security of your platform effortlessly.

![Architecture](./asset/architecture.png)

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
4. [Endpoints](#endpoints)
7. [License](#license)

## Installation
#### Clone the repository
```bash
$ git clone https://github.com/TonyStark0801/Otp-verification.git
```
#### Install dependencies
```bash
$ npm install 
```

## Usage

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

1. **Send OTP**
   - Endpoint: `/auth/send_otp`
   - Description: Sends a One-Time Password (OTP) to the user's registered phone number for authentication.
   - Method: POST
   - URL: `http://localhost:3000/auth/send_otp`
   - Request Body: JSON format with the user's phone number.
   
      ```json
      {
        "phone": "9445xxxxxx"
      }
      ```

   ### Response

   #### Successful Response (HTTP 201 CREATED)
   ```json
   {   
      "message": "OTP sent successfully.",
      "VerificationStatus": "pending"
   }

2. **Verify OTP**
   - Endpoint: `/auth/verify_otp`
   - Description: Verify the provided OTP against the sent OTP for the user's phone number.
   - Method: POST
   - URL: `http://localhost:3000/auth/verify_otp`
   - Request Body: JSON format with the user's phone number and the entered OTP.
   
      ```json
      {
        "phone": "9445xxxxxx",
        "otp": "123456"
      }
      ```
   ### Response

   #### Successful Response (HTTP 201 CREATED)
   ```json
   {   
      "VerificationStatus": "approved"
   }
   ```


## Stay in touch

- Author - [Shubham Mishra](https://www.linkedin.com/in/shubhammishra8149/)
- Twitter - [@shubhamMishra](https://twitter.com/mishras85003094)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
