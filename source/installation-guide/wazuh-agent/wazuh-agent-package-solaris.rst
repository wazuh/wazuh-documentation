.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on Solaris systems in this section of our Installation Guide.

Installing Wazuh agents on Solaris endpoints
============================================

The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

To start the installation process, select your architecture: i386 or SPARC.

.. note:: You need root user privileges to run all the commands described below.

.. tabs::

   .. group-tab:: i386

      Select your Solaris Intel version.

      .. tabs::

         .. group-tab:: Solaris 10

            #. Download the `Wazuh agent for Solaris 10 i386 <https://packages.wazuh.com/4.x/solaris/i386/10/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_i386|-sol10-i386.pkg>`_ package.

            #. Install the Wazuh agent.

               .. code-block:: console

                  # pkgadd -d wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_i386|-sol10-i386.pkg wazuh-agent

         .. group-tab:: Solaris 11

            #. Download the `Wazuh agent for Solaris 11 i386 <https://packages.wazuh.com/4.x/solaris/i386/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p>`_.

            #. Install the Wazuh agent.

               .. code-block:: console

                  # pkg install -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p wazuh-agent

            If the Solaris 11 zone where you want to install the package has child zones, create a repository to install the Wazuh agent:

            .. code-block:: console

               # pkg set-publisher -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p wazuh && pkg install --accept wazuh-agent && pkg unset-publisher wazuh

   .. group-tab:: SPARC

      Select your Solaris SPARC version.

      .. tabs::

         .. group-tab:: Solaris 10

            #. Download the `Wazuh agent for Solaris 10 SPARC <https://packages.wazuh.com/4.x/solaris/sparc/10/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_SPARC|-sol10-sparc.pkg>`_ package.

            #. Install the Wazuh agent.

               .. code-block:: console

                  # pkgadd -d wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_SPARC|-sol10-sparc.pkg wazuh-agent

         .. group-tab:: Solaris 11

            #. Download the `Wazuh agent for Solaris 11 SPARC <https://packages.wazuh.com/4.x/solaris/sparc/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p>`_.

            #. Install the Wazuh agent.

               .. code-block:: console

                  # pkg install -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p wazuh-agent

            If the Solaris 11 zone where you want to install the package has child zones, create a repository to install the Wazuh agent:

            .. code-block:: console

               # pkg set-publisher -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p wazuh && pkg install --accept wazuh-agent && pkg unset-publisher wazuh

The installation process is now complete, and the Wazuh agent is successfully installed on your Solaris endpoint. The next step is to register and configure the agent to communicate with the Wazuh server. To perform this action, see the :doc:`Wazuh agent enrollment </user-manual/agent-enrollment/index>` section.
