# Contributing to Milo

This project is an Open Development project and welcomes contributions from everyone who finds it useful or lacking.

## Code Of Conduct

This project adheres to the Adobe [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to cstaub at adobe dot com.

## Contributor License Agreement (CLA)

All third-party contributions to this project must be accompanied by a signed contributor license. This gives Adobe permission to redistribute your contributions as part of the project. [Sign our CLA](http://opensource.adobe.com/cla.html)! You only need to submit an Adobe CLA one time, so if you have submitted one previously, you are good to go!

## How to Contribute

First check if there is an existing issue in GitHub Issues (public) or JIRA (private).
Also check if there are other pull requests that might overlap or conflict with your intended contribution.

Fork the repository, make some changes on a branch on your fork, and create a pull request from your branch against `main`.

Ensure that your PR follows the [pull request template](.github/pull_request_template.md):

* description contains Issue or Ticket
* description _always_ contains at least one Milo-specific testing URL
  * `https://<branch>--milo--<user>.aem.page/?martech=off`

Ensure your PR passes all checks:

* prerequesite labels are applied
  * `trivial` or `needs-verification`
* unit tests pass
* helix-psi-check pass
* 100% test coverage (patch)
* etc.

Tips:

* Run `npm run lint` if your editor is not already doing so
* Please check that unit test pass!
  * In the case of an occasional flakey test, please rerun the job
* Rebase and rerun checks to ensure your PR is up-to-date
* Use the `do not merge` label to prevent maintainers from merging your approved PR

Also see [Submitting PRs](https://github.com/adobecom/milo/wiki/Submitting-PRs).

## Coding Styleguides

We enforce a coding styleguide using `eslint`. As part of your build, run `npm run lint` to check if your code is conforming to the style guide.

You can fix some of the issues automatically by running `npx eslint . --fix`.

## How Contributions get Reviewed

One of the maintainers will look at the pull request within one week. Feedback on the pull request will be given in writing, in GitHub.
Not having a green check will result in indeterminate review delays.

## Release Management

Milo is a hot repo, meaning all changes on main are immediately available in production.
