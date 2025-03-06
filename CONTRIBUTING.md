# Contributing to the Wazuh documentation

This document provides instructions for deploying a Python virtual environment, cloning the repository, contributing changes, and submitting a pull request. It also explains how to report issues clearly so that we can resolve them quickly.


*Note: These contribution guidelines might change in the future as we improve or change how we organize, create, and compile the documentation.*

## How to report issues in the Wazuh documentation

The community is important to us. We value your feedback on bugs or typos in the documentation. When reporting an issue, include the **URL or section** where the error occurs and provide all relevant details to help us resolve it.

Keep in mind that this repository is for the Wazuh documentation. In some cases, your issue might be more effectively addressed if it's reported in the appropriate repository. Here you can find some tips if you have doubts about the right place for your issue:

- If Wazuh works fine but something in the documentation seems inaccurate, unclear, or confusing, let us know by creating an issue [here](https://github.com/wazuh/wazuh-documentation/issues).
- If you have **problems, bugs or unexpected results** when using any of the Wazuh components, create the issue in its respective repository:
  - [Wazuh Core](https://github.com/wazuh/wazuh/issues)
  - [Wazuh API](https://github.com/wazuh/wazuh-api/issues)
  - [Wazuh indexer](https://github.com/wazuh/wazuh-indexer/issues)
  - [Wazuh dashboard](https://github.com/wazuh/wazuh-dashboard/issues)
  - [All Wazuh repositories](https://github.com/wazuh)

In any case, **don't worry if you create an issue here**, we'll assist you with your problem.

## How to collaborate with the Wazuh documentation

Contribute by forking the repository, creating a new branch, making your changes, and submitting a pull request.

### Installing a Python virtual environment

The Digital Ocean guides below provide an overview of installing Python 3 and configuring a virtual environment. This approach lets you install the required dependencies without altering your primary environment, making it easier to manage and remove development setups.

- Ubuntu 22.04: [Link](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-programming-environment-on-ubuntu-22-04)
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

To compile the documentation with the alternative Pagefind search engine, install NodeJS 22+. Replace the command in step 3 with:

```shell
 (wazuh_venv) $ make html-search

## How the branches work

- The latest stable documentation is on the `main` branch. **Do not submit pull requests directly to this branch.**
- We actively work on version numbered branches (4.10, 4.11, x.y) for new additions, improvements of existing documentation, or typo fixes.
  - All new additions to this branch will be compatible with the latest stable release. That means we won't include documentation for a future release that doesn't work with the last official one.
  - The work for a future release is merged on a different branch until we make the final decission of what the next release will be.
- All branches other than `main` or version branches (e.g., 4.x) are feature branches under development and will be merged later.
- Where appropriate, we'll backport changes into older release branches.

## Commits, pull requests and merging

- Feel free to make as many commits as you want while working on a branch.
- Please use your commit messages to include helpful information on your changes, and an explanation of *why* you made them.
- Also include an explanation of your changes in your PR description.
- Make sure to resolve merge conflicts so we can continue reviewing your pull request.
- In your PR description, add links to relevant issues, external resources, or related PRs that are useful.
- Your commits will be squashed into a single commit upon merging.

This guide covers everything you need to know. Thank you for contributing!
