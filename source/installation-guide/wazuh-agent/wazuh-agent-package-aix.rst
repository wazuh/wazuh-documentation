.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to deploy the Wazuh agent on AIX using deployment variables that facilitate the task of installing, registering, and configuring the agent.

Deploying Wazuh agents on AIX endpoints
=======================================

The Wazuh agent runs on the endpoint you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

The deployment of a Wazuh agent on an AIX system uses deployment variables that facilitate the task of installing, enrolling, and configuring the Wazuh agent.

.. note::

   You need root user privileges and Bash to run all the commands described below.

#. To start the deployment process, download the `AIX installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_AIX|/aix/wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`_.

#. Run the command below to deploy the Wazuh agent to your endpoint. Replace the ``WAZUH_MANAGER`` value with your Wazuh manager IP address or hostname:

   .. code-block:: console

      # WAZUH_MANAGER="10.0.0.2" rpm -ivh wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm

   For additional deployment options such as agent name, agent group, and registration password, see :doc:`Deployment variables for AIX </user-manual/agent/agent-enrollment/deployment-variables/deployment-variables-aix>` section.

   .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables.  To learn more about the different registration methods, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.

#. Start the Wazuh agent to complete the installation process:

   .. code-block:: console

      # /var/ossec/bin/wazuh-control start

The deployment process is now complete, and the Wazuh agent is successfully running on your AIX endpoint.
