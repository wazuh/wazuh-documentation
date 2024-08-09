.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: From Wazuh 3.0.0 version onwards, agents can be upgraded remotely. Learn more about it in this section of the Wazuh documentation. 

Remote upgrading
==================

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        upgrading-agent
        agent-upgrade-module
        custom-repository
        create-custom-wpk/create-wpk-key
        wpk-list

With version 3.0.0, agents now have the ability to be upgraded remotely. This upgrade is performed by the manager which sends each registered agent a **WPK** (Wazuh signed package) file
that contains the files needed to upgrade the agent to the new version. This securely and simply applies upgrades across your installation without the need to access each agent individually.

Wazuh provides access to an updated WPK repository for each new release. All available WPK files can be found :doc:`here <./wpk-list>`.

Custom repositories may also be added by following the steps described in :doc:`Adding custom repository <./custom-repository>`.

.. note:: Since v4.1.0, the upgrade procedure is performed by the :ref:`Agent upgrade module<agent-upgrade-module>`.
