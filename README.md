# Kaholo Bitbucket Plugin
This plugin uses the [bitbucket npm package](https://www.npmjs.com/package/bitbucket) to extend Kaholo's functionality to include listing Bitbucket pipelines and Downloads and uploading new download artifacts. To trigger Kaholo pipelines when there is a merge or push to Bitbucket, please use the [Kaholo Bitbucket Trigger](https://github.com/Kaholo/kaholo-trigger-bitbucket) instead.

## Authentication and Access
Authentication for this plugin is handled by means of an access token. This is not the standard Jira API token but a Bitbucket-specific [Repository Access Token](https://support.atlassian.com/bitbucket-cloud/docs/repository-access-tokens/), which is configured in Repository Settings in Bitbucket. These tokens are not specific to any user but instead a repository. As such, no username is required.

The Access Token must be stored in the Kaholo Vault and then configured in a Kaholo Account. This is done in Kaholo's `Settings | Plugins | Bitbucket | Accounts`. The name of the Bitbucket plugin in `Settings | Plugins` is a hyperlink that will take you to Accounts. Once a default account is created all Bitbucket Actions added to pipelines will automatically use that account unless another is created and selected.

## Bitbucket Project
Bitbucket repositories within a Bitbucket account are grouped by Workspace and then Project. A repository name is unique within a Workspace so Project is never a required parameter.

## Repository names vs slugs
The repository name may include special characters and spaces that require the repository URL to use a "slug", which is a simplified string. For example "Nedžla's Repo" will become `nedzlas-repo` in the URL. Use the simpler form, the slug, in the Kaholo parameters.

## Method: List Pipelines
This method will list the pipelines configured for a repository

### Parameter: Workspace
The name of the workspace (not project) that contains the repository

### Parameter: Repository
The name of the repository who's pipelines you want to list. Use the slug name, as it appears in the URL in the browser.

## Method: Get Download Links
This method gets Links for a repository's downloads

### Parameter: Workspace
The name of the workspace (not project) that contains the repository

### Parameter: Repository
The name of the repository who's pipelines you want to list. Use the slug name, as it appears in the URL in the browser.

## Method: Upload New Download Artifact
This method uploads artifacts (files) that will appear in the "Downloads" list of a repository

### Parameter: Workspace
The name of the workspace (not project) that contains the repository

### Parameter: Repository
The name of the repository who's pipelines you want to list. Use the slug name, as it appears in the URL in the browser.

### Parameter: File Path
The path on the Kaholo agent to the file to be uploaded. This may be either relative or absolute path. If relative it is relative to the agent's home folder, which is typically `/twiddlebug/workspace`. Use the Command Line plugin to run command 'pwd' if you want to confirm the home folder for a Kaholo agent.
