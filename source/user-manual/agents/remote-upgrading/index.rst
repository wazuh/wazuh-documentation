.. Copyright (C) 2018 Wazuh, Inc.

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

With version 3.0.0, agents now have the ability to be upgraded remotely. This upgrade is performed by the manager which sends each registered agent a **WPK** (Wazuh signed package) file
that contains the files needed to upgrade agent to the new version. This securely and simply applies upgrades across your installation without the need to access each agent individually.

Wazuh provides access to an updated WPK repository for each new release. All available WPK files can be found :doc:`here <./wpk-list>`.

Custom repositories may also be added by following the steps described in :doc:`Adding custom repository <./custom-repository>`.
