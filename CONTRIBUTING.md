# Contributing to the Wazuh documentation

In this document you'll find instructions about how to deploy a Python virtual environment that you can use to clone this repository, add a contribution and submit a pull request for review.

At the same time, this document will give you a better idea of how to post meaningful issues that will be more easily understood, and resolved as quickly as possible.

*Note: This contribution guidelines might change in the future as we improve or change how we organize, create or compile the documentation.*

## How to report issues in the Wazuh documentation

The community is important to us. We appreciate your reports of bugs or typos in the documentation. When creating a new issue, make sure to include **the URL or section** where the error occurs, along with all the possible details that could help us solve the problem.

Keep in mind that this repository is for the Wazuh documentation. There are some cases where your issue might be more effective if it's created on the proper repository. Here you can find some tips if you have doubts about the right place for your issue:

- If you think that Wazuh is working fine but you find the documentation **inaccurate, incorrect or confusing**, then create the issue [here](https://github.com/wazuh/wazuh-documentation/issues) in this repository.
- If you have **problems, bugs or unexpected results** when using any of the Wazuh components, create the issue in its respective repository:
  - [Wazuh Core](https://github.com/wazuh/wazuh/issues)
  - [Wazuh Ruleset](https://github.com/wazuh/wazuh-ruleset/issues)
  - [Wazuh API](https://github.com/wazuh/wazuh-api/issues)
  - [Wazuh Kibana app](https://github.com/wazuh/wazuh-kibana-app/issues)
  - [Wazuh Splunk app](https://github.com/wazuh/wazuh-splunk/issues)
  - [All Wazuh repositories](https://github.com/wazuh)

In any case, **don't worry if you create an issue here**, we'll assist you with your problem.

## How to collaborate with the Wazuh documentation

The most common way of contributing consists in forking the repository, creating a new branch, make the desired changes and submit a pull request.

### Installing a Python virtual environment

The following guides created by Digital Ocean will give you a quick overview of how to install Python 3 and configure a virtual environment. This way, you can install the required dependencies for the documentation without modifying your own environments, making easier to manage and delete development environments.

- Ubuntu 16.04: [Link](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-ubuntu-16-04)
- Ubuntu 18.04: [Link](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-programming-environment-on-an-ubuntu-18-04-server)
- CentOS 7: [Link](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-centos-7)

After following one of the previous guides, you should have a Python programming environment ready to be used.

### How to fork this repository

Follow the [GitHub forking model](https://help.github.com/articles/fork-a-repo/) for collaborating on the documentation. This model assumes that you have a remote called `upstream` which points to the official repository.

### Setting up the virtual environment

Let's assume that you created a virtual environment called `wazuh_venv` and it's activated. Now we can proceed to clone our forked repository and install the dependencies:

1. Clone the repository into your computer:
```shell
(wazuh_venv) $ git clone https://github.com/<YOUR_USERNAME>/wazuh-documentation.git
```
Note that the `(wazuh_venv)` label on the terminal means that we're currently using the virtual environment that we previously created.

2. Change to the repository folder and install the dependencies. You can use `pip` for this:
```shell
(wazuh_venv) $ pip install -r requirements.txt
```

3. After installing the dependencies, you should be able to compile the documentation:
```shell
(wazuh_venv) $ make html
```
The documentation will be available at `/wazuh-documentation/build/html/index.html` to see the results just as if the documentation were available on a web server.

4. To clean the documentation, use this:
```shell
(wazuh_venv) $ make clean
```
This will delete the contents from `/wazuh-documentation/build/html`.

## Alternative Pagefind search engine

To compile the documentation with the alternative Pagefind search engine, install NodeJS 16+. Then, follow the steps from the previous section replacing with `make html-search` the command in step 3.

## How the branches work

- Our latest stable documentation is found on `master`. **You should never submit a pull request to this branch.**
- We actively work on version numbered branches (3.8, 3.9, x.y) for new additions, improvements of existing documentation, or typo fixes.
  - All new additions to this branch will be compatible with the latest stable release. That means we won't include documentation for a future release that doesn't work with the last official one.
  - The work for a future release is merged on a different branch until we make the final decission of what the next release will be.
- Every other branch different from `master` or `3.x` is a feature branch, something that we're currently working on and that will be merged in the future.
- Where appropriate, we'll backport changes into older release branches.

## Commits, pull requests and merging

- Feel free to make as many commits as you want while working on a branch.
- Please use your commit messages to include helpful information on your changes, and an explanation of *why* you made them.
- Also include an explanation of your changes in your PR description.
- Make sure to resolve merge conflicts so we can continue reviewing your pull request.
- In your PR description, add links to relevant issues, external resources, or related PRs that are useful.
- When merging, we'll squash your commits into a single commit.

That's all you need to know. Thank you so much for reading this contribution guide!

## Style guide

Listed below are some style guides and tips to help with the documentation contributions:

- [ReStructured Text basic rules](https://github.com/wazuh/wazuh-documentation/blob/master/guide/restructured-text.md)
- [Good practices and common mistakes](https://github.com/wazuh/wazuh-documentation/blob/master/guide/good-practices.md)
- [RST cheatsheet](https://github.com/wazuh/wazuh-documentation/blob/master/guide/cheatsheet.md)
- [Redirections between branches](https://github.com/wazuh/wazuh-documentation/blob/master/guide/redirections.md)
- [Empty toctree nodes](https://github.com/wazuh/wazuh-documentation/blob/master/guide/empty-nodes.md)
