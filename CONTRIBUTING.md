# Contributing to the Wazuh documentation

In this document, you'll find instructions about how to deploy a Python virtual environment that you can use to clone this repository, add a contribution and submit it with a Pull Request.

At the same time, this document will give you a better idea of how to post meaningful issues that will be more easily considered, and resolved as quickly as possible.

## How to report issues in the Wazuh documentation

The community is important to us. We appreciate your reports of bugs or typos in the documentation. When creating a new issue, make sure to include **the URL or section** where the error occurs, along with all the possible details that could help us to solve the problem.

Keep in mind that this repository is for the Wazuh documentation. There are some cases where your issue might be more effective if it's opened on the proper repository. Here you can find some tips if you have doubts about the right place to create an issue:

- If you think that Wazuh is working fine but you find the documentation **inaccurate, incorrect or confusing**, then open the issue [here](https://github.com/wazuh/wazuh-documentation/issues) in this repository.
- If you have **problems, bugs or unexpected results** when using any of the Wazuh components, open the issue on the respective repository:
  - [Wazuh core](https://github.com/wazuh/wazuh/issues)
  - [Wazuh API](https://github.com/wazuh/wazuh-api/issues)
  - [Wazuh Kibana app](https://github.com/wazuh/wazuh-kibana-app/issues)
  - [Wazuh Splunk app](https://github.com/wazuh/wazuh-splunk/issues)
  - [Wazuh organization](https://github.com/wazuh) (all repositories)

In any case, **don't worry if you open an issue here**, we'll assist you and help you to solve your problem.

## How to collaborate with the Wazuh documentation

The most common form of contributing consists of forking the repository, creating a new branch, make the desired changes and submit a pull request.

### Installing a Python virtual environment

The following guides created by Digital Ocean will give you a quick overview of how to install Python 3 and configure a virtual environment. This way, you can install the required dependencies for the documentation without modifying your own environments, making easier to manager and delete development environments.

- Ubuntu 16.04: [Link](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-ubuntu-16-04)
- Ubuntu 18.04: [Link](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-programming-environment-on-an-ubuntu-18-04-server)
- CentOS 7: [Link](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-centos-7)

### How to fork this repository

We follow the [GitHub forking model](https://help.github.com/articles/fork-a-repo/) for collaborating on the documentation. This model assumes that you have a remote called `upstream` which points to the official repository.

### How the branches work

### Branching

- The `master` branch contains the latest online documentation available [here](https://documentation.wazuh.com).
- All work goes into `3.x` branches. We use the latest `3.x` branch associated with the latest official release.
  - For example, our latest branch is `3.7`, and all the changes are merged into it.
- All work is done on feature branches and merged into the latest development branch.
- Where appropriate, we'll backport changes into older release branches.
