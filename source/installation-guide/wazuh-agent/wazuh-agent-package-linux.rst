.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to deploy the Wazuh agent on Linux with deployment variables that facilitate the task of installing, enrolling, and configuring the agent.

Deploying Wazuh agents on Linux endpoints
=========================================

The Wazuh agent runs on the endpoint you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

The deployment of a Wazuh agent on a Linux endpoint uses deployment variables that facilitate the task of installing, enrolling, and configuring the Wazuh agent. Alternatively, if you want to download the Wazuh agent package directly, see the :doc:`packages list </installation-guide/packages-list>` section.

.. note:: You need root user privileges to run all the commands described below.

.. _agent-installation-add-wazuh-repository:

Add the Wazuh repository
-------------------------

Add the Wazuh repository to download the official packages.

.. tabs::

   .. group-tab:: APT

      .. include:: /_templates/installations/wazuh/deb/add_repository.rst

   .. group-tab:: Yum

      .. include:: /_templates/installations/wazuh/yum/add_repository.rst

   .. group-tab:: DNF

      .. include:: /_templates/installations/wazuh/dnf/add_repository.rst

   .. group-tab:: ZYpp

      .. include:: /_templates/installations/wazuh/zypp/add_repository.rst

Deploy a Wazuh agent
--------------------

Follow these steps to deploy the Wazuh agent on your Linux endpoint.

.. warning::

   To monitor an endpoint that runs a Wazuh manager, install a Wazuh agent with the same major version as the Wazuh manager. Wazuh 4.x agent packages declare a conflict with the ``wazuh-manager`` package, so a Wazuh 4.x agent and a Wazuh 5.x manager cannot coexist on the same endpoint. Depending on the package manager, the installation fails or removes the Wazuh manager to resolve the conflict.

#. Select your package manager and run the command below.

   Replace

   -  ``WAZUH_MANAGER`` value with your Wazuh manager IP address or hostname
   -  ``WAZUH_REGISTRATION_PASSWORD`` value with the Wazuh manager enrollment password.

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD='XXXXXXXXXXXX' apt-get install wazuh-agent|WAZUH_AGENT_DEB_PKG_INSTALL|

      .. group-tab:: Yum

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD='XXXXXXXXXXXX' yum install wazuh-agent|WAZUH_AGENT_RPM_PKG_INSTALL|

      .. group-tab:: DNF

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD='XXXXXXXXXXXX' dnf install wazuh-agent|WAZUH_AGENT_RPM_PKG_INSTALL|

      .. group-tab:: ZYpp

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD='XXXXXXXXXXXX' zypper install wazuh-agent|WAZUH_AGENT_ZYPP_PKG_INSTALL|

   .. note::

      Alternatively, if you want to install an agent without enrolling it, omit the deployment variables. To learn more about the different enrollment methods, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.

#. Enable and start the Wazuh agent service:

   .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_agent_service.rst

The deployment process is now complete and the Wazuh agent is successfully running on your Linux endpoint.

Disable Wazuh updates
---------------------

Compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager version is later than or equal to that of the Wazuh agent. Therefore, we recommend disabling the Wazuh repository to prevent accidental upgrades. To do so, use the following command:

.. tabs::

   .. group-tab:: APT

      .. include:: /_templates/installations/wazuh/deb/disabling_repository.rst

   .. group-tab:: Yum

      .. include:: /_templates/installations/wazuh/yum/disabling_repository.rst

   .. group-tab:: DNF

      .. include:: /_templates/installations/wazuh/dnf/disabling_repository.rst

   .. group-tab:: ZYpp

      .. include:: /_templates/installations/wazuh/zypp/disabling_repository.rst
