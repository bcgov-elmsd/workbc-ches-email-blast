# workbc-ches-email-blast


## Usage

Open the `workbc-ches-email-blast.code-workspace` in Visual Studio Code.  This contains all extensions you will need for automatic linting and managing the project.

Add your projects to the `packages` folder.  If the `packages` folder does not already exist, create it.  See below for the expected project structure.

```
📦 workbc-ches-email-blast
 ┣ ...
 ┣ 📂 packages
 ┃ ┣ 📂 project-a
 ┃ ┗ 📂 project-b
 ┗ ...
```
This monorepo uses npm workspaces.  See [here](https://docs.npmjs.com/cli/v7/using-npm/workspaces) for more information on how to interact with workspaces.

## Setting up `changeset-bot`
Configure the `changeset-bot` on your GitHub repository.  See [here](https://github.com/apps/changeset-bot) for more information.
## License

```
Copyright 2022 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```


## Database Schema
### Email
- **id**, a unique identifier generated by Prisma
- **uid**, a randomly generated, 15-character alphanumberic string ending in "uid" used for uniform identification across Matomo and the database tables
- **email**, the client's email address
- **template**, the client's randomly assigned treatment group for the trial which specifies the type of email and form to send them in the cron job
    | template                 | email (cron/templates) | form (cron/.env.sample) | Meaning                                                                 |
    |--------------------------|------------------------|-------------------------|-------------------------------------------------------------------------|    
    | Standard long            | email1                 | LONG_FORM               | standard email, link to OES                                             |
    | Standard short           | email1                 | SHORT_FORM              | standard email, link to custom form                                     |
    | AC long                  | email2                 | LONG_FORM               | active choice email, link to OES                                        |
    | AC short                 | email2                 | SHORT_FORM              | active choice email, link to custom form                                |
    | Past WorkBC Client Email | previous               | LONG_FORM               | previous client email, link to OES. To be sent at the end of the trial. |
    | Control                  | email1                 | LONG_FORM               | standard email, link to OES. To be sent one month after the trial.      |
- **status**, the current state of the email
    - pending
    - sent
    - completed
    - failed
    - cancelled
- **createdAt**, a timestamp of when the client was added to the database 
- **messageId**, the identifier of an email sent from the CHES API. Used for querying the email status
- **name**, the client's first and last name
- **catchment**, the client's WorkBC catchment
- **messageCreatedAt**, a timestamp of when the email was sent to the client

### Submission
- **id**, a unique identifier generated by Prisma
- **uid**, a randomly generated, 15-character alphanumberic string ending in "uid" used for uniform identification across Matomo and the database tables
- **email**, the client's email address
- **createdAt**, a timestamp of when the client submitted their short form
- **action**, tracks whether a client takes action to submit their form
