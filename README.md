# Parse Issue Template

<p align="center">
  <a href="https://github.com/devops-testbed/parse-issue-template/actions"><img alt="javscript-action status" src="https://github.com/devops-testbed/parse-issue-template/workflows/units-test/badge.svg"></a>
</p>

Use this template to bootstrap the creation of a JavaScript action.:rocket:

This template includes tests, linting, a validation workflow, publishing, and versioning guidance.

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Create an action from this template

Click the `Use this Template` and provide the new repo details for your action

## Code in Main

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)
...
```


## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage

You can now consume the action by referencing the v1 branch

```yaml

#on: repository_dispatch
- name: parse issue
  uses: devops-testbed/parse-issue-template@c42ca5e2a7133cbd690fab87ea27c417cf580986 # pin to sha
  id: issue-parser
  with:
    body: ${{ github.event.client_payload.github.payload.issue.body }}
    
#on: issues
- name: check inputs
  uses: devops-testbed/parse-issue-template@c42ca5e2a7133cbd690fab87ea27c417cf580986
  id: issue-parser
  with:
    body: ${{ github.event.issue.body }}
```

See the [actions tab](https://github.com/devops-testbed/parse-issue-template) for runs of this action! :rocket:
