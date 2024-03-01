.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover how to monitor your GitHub audit logs for your organization with Wazuh.

Monitoring GitHub
=================

GitHub is a cloud-based platform that provides version control and collaboration tools for software development projects. It offers an API that enables developers to interact with it programmatically. GitHub provides an audit logging feature that records events as they occur within an organization. Organizations can leverage the audit log to track changes and monitor user activities, therefore enhancing transparency.

This section describes how to monitor GitHub audit logs for your organization. Wazuh can monitor the following GitHub activities:

-  Access to your organization or repository settings.
-  Changes in repository permissions.
-  User addition or removal in an organization, repository, or team.
-  Changes in members privilege.
-  Changes to permissions of a GitHub App.
-  Git events such as cloning, fetching, and pushing.

.. topic:: Contents

  .. toctree::
    :maxdepth: 2

    monitoring-github-activity