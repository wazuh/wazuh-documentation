.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Discover how to monitor your GitHub audit logs for your organization with Wazuh.

Monitoring GitHub
=================

GitHub is a cloud-based platform that provides version control and collaboration tools for software development projects. It offers an API that enables developers to interact with it programmatically. GitHub provides an audit logging feature that records events as they occur within an organization.

Organizations can use the audit log to track changes and monitor user activities, which enhances transparency.

You can monitor GitHub audit logs for your organization with Wazuh. Wazuh monitors the following GitHub activities:

-  Access to your organization or repository settings.
-  Changes in repository permissions.
-  User addition or removal in an organization, repository, or team.
-  Changes in a member’s privilege.
-  Changes to permissions of a GitHub app.
-  Git events such as cloning, fetching, and pushing.

.. topic:: Contents

   .. toctree::
     :maxdepth: 2

     monitoring-github-activity