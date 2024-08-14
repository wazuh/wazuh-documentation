.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh agents can be upgraded remotely from the Wazuh server. Learn more in this section of the documentation.

Remote upgrading
==================

Wazuh agents can be upgraded remotely from the Wazuh server. The Wazuh manager performs this upgrade and sends each enrolled agent a WPK (Wazuh signed package) file containing the files needed to upgrade to the new version. This streamlines the upgrade process across your installation and eliminates the need to access each agent individually.

Wazuh provides access to an updated WPK repository for each new release. All available WPK files can be found :doc:`here <wpk-list>`. Users can also generate custom WPK files and host them in a custom repository. Custom WPK files can be created by following the steps described in :doc:`Custom WPK creation <>`.

.. note::

   The upgrade procedure is performed by the :doc:`agent upgrade module <agent-upgrade-module>`.

Learn more about remote upgrading of the Wazuh agents in the following sections:

.. toctree::
   :maxdepth: 2

   upgrading-agent
   agent-upgrade-module
   custom-repository
   create-custom-wpk/create-wpk-key
   install-custom-wpk
   wpk-list

