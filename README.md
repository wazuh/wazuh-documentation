# Wazuh documentation

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. It protects workloads across on-premises, virtualized, containerized, and cloud-based environments.

Wazuh helps organizations and individuals to protect their data assets against security threats. It is widely used by thousands of organizations worldwide, from small businesses to large enterprises.

This repository contains the source files for the official Wazuh documentation, available at [documentation.wazuh.com](https://documentation.wazuh.com).

## Branches

| Branch | Content |
|--------|---------|
| `main` | Documentation for the [latest development version](https://github.com/wazuh/wazuh-documentation/blob/main/source/_variables/settings.py#L24) |
| `4.14`, `4.13`, `4.12`, ..., `2.1` | Documentation for each stable release |

If you are looking for the documentation source of a specific Wazuh release, switch to the corresponding version branch.

## Built with

- [Sphinx](https://www.sphinx-doc.org/) — documentation generator
- [reStructuredText](https://docutils.sourceforge.io/rst.html) — markup language
- [Pagefind](https://pagefind.app/) — optional alternative search engine

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) to set up a local Python environment, build the docs with `make html`, and submit a pull request.

To report a bug or typo in the documentation, open an issue in this repository.

If you have found a problem with Wazuh itself rather than its documentation, please report it in the [appropriate component repository](https://github.com/wazuh).

## Community

Join the conversation and get help at [wazuh.com/community](https://wazuh.com/community/).

## License

Copyright (C) 2015, Wazuh, Inc.

This documentation is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 2 of the License, or (at your option) any later version.