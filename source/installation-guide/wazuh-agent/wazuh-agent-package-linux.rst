.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to deploy the Wazuh agent on Linux with deployment variables that facilitate the task of installing, registering, and configuring the agent.

Deploying Wazuh agents on Linux endpoints
=========================================

The agent runs on the host you want to monitor and communicates with the Wazuh server, sending data in near real-time through an encrypted and authenticated channel.

The deployment of a Wazuh agent on a Linux system uses deployment variables that facilitate the task of installing, registering, and configuring the agent. Alternatively, if you want to download the Wazuh agent package directly, see the :doc:`packages list </installation-guide/packages-list>` section.

.. note:: You need root user privileges to run all the commands described below.

Add the Wazuh repository
-------------------------

Add the Wazuh repository to download the official packages.

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/add_repository.rst



Deploy a Wazuh agent
--------------------

#. To deploy the Wazuh agent on your endpoint, select your package manager and edit the ``WAZUH_MANAGER`` variable to contain your Wazuh manager IP address or hostname.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" yum install wazuh-agent|WAZUH_AGENT_RPM_PKG_INSTALL|

         For additional deployment options such as agent name, agent group, and registration password, see the :doc:`Deployment variables for Linux </user-manual/agent/agent-enrollment/deployment-variables/deployment-variables-linux>` section.

          .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables. To learn more about the different registration methods, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.

      .. group-tab:: APT

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" apt-get install wazuh-agent|WAZUH_AGENT_DEB_PKG_INSTALL|

         For additional deployment options such as agent name, agent group, and registration password, see the :doc:`Deployment variables for Linux </user-manual/agent/agent-enrollment/deployment-variables/deployment-variables-linux>` section.

         .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables. To learn more about the different registration methods, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.

      .. group-tab:: ZYpp

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" zypper install wazuh-agent|WAZUH_AGENT_ZYPP_PKG_INSTALL|

         For additional deployment options such as agent name, agent group, and registration password, see the :doc:`Deployment variables for Linux </user-manual/agent/agent-enrollment/deployment-variables/deployment-variables-linux>` section.

         .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables. To learn more about the different registration methods, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.

#. Enable and start the Wazuh agent service.

   .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_agent_service.rst

The deployment process is now complete, and the Wazuh agent is successfully running on your Linux system.

- **Recommended action** -  Disable Wazuh updates

  Compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager version is later than or equal to that of the Wazuh agent. Therefore, we recommend disabling the Wazuh repository to prevent accidental upgrades. To do so, use the following command:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../_templates/installations/wazuh/yum/disabling_repository.rst



      .. group-tab:: APT


        .. include:: ../../_templates/installations/wazuh/deb/disabling_repository.rst



      .. group-tab:: ZYpp

        .. include:: ../../_templates/installations/wazuh/zypp/disabling_repository.rst
