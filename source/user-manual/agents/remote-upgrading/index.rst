.. _remote-upgrading:

Remote upgrading
==================

.. versionadded:: 3.0.0

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        upgrading-agent
        custom-repository
        create-custom-wpk
        install-custom-wpk
        wpk-list

From version 3.0.0 agents have the ability to be upgraded remotely. The manager sends each agent a **WPK** (Wazuh signed package) file
with the files needed to perform the upgrade on the agent. This functionality is intended to enable the upgrading of agents easily,
safely and without having to access the agent.

WPK files are designed to be sent by the manager to each agent to be upgraded. These packages are compressed and signed,
and contain the necessary files to upgrade the agent to a new version.

Wazuh provides access to an updated WPK repository for each new release. All available WPK files can be found :doc:`here <./wpk-list>`.

It is also possible to add a custom repository following the steps described in :doc:`Adding custom repository <./custom-repository>`.

.. note::

    In order to be able to use this functionality, it should be enabled **Active response** in agents that will be upgraded.
