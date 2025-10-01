.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on Solaris systems in this section of our Installation Guide.

Deploying Wazuh agents on Solaris endpoints
===========================================

.. warning::

   Support for Solaris systems ends in Wazuh 5.0.0.

The Wazuh agent runs on the endpoint you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

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

            #. Edit the ``/var/ossec/etc/ossec.conf`` file and replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address of the Wazuh manager:

               .. code-block:: xml
                  :emphasize-lines: 3

                  <client>
                    <server>
                      <address><WAZUH_MANAGER_IP_ADDRESS></address>
                    </server>
                  </client>

               To learn more about this enrollment method, see the :doc:`Linux/Unix agent enrollment via agent configuration </user-manual/agent/agent-enrollment/enrollment-methods/via-agent-configuration/linux-endpoint>` section.

            #. Start the Wazuh agent to complete the installation process:

               .. code-block:: console

                  # /var/ossec/bin/wazuh-control start

         .. group-tab:: Solaris 11

            #. Download the `Wazuh agent for Solaris 11 i386 <https://packages.wazuh.com/4.x/solaris/i386/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p>`_.

            #. Install the Wazuh agent.

               .. code-block:: console

                  # pkg install -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p wazuh-agent

               If the Solaris 11 zone where you want to install the package has child zones, create a repository to install the Wazuh agent:

               .. code-block:: console

                  # pkg set-publisher -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p wazuh && pkg install --accept wazuh-agent && pkg unset-publisher wazuh

            #. Edit the ``/var/ossec/etc/ossec.conf`` file and replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address of the Wazuh manager:

               .. code-block:: xml
                  :emphasize-lines: 3

                  <client>
                    <server>
                      <address><WAZUH_MANAGER_IP_ADDRESS></address>
                    </server>
                  </client>

               To learn more about this enrollment method, see the :doc:`Linux/Unix agent enrollment via agent configuration </user-manual/agent/agent-enrollment/enrollment-methods/via-agent-configuration/linux-endpoint>` section.

            #. Start the Wazuh agent to complete the installation process:

               .. code-block:: console

                  # /var/ossec/bin/wazuh-control start

   .. group-tab:: SPARC

      Select your Solaris SPARC version.

      .. tabs::

         .. group-tab:: Solaris 10

            #. Download the `Wazuh agent for Solaris 10 SPARC <https://packages.wazuh.com/4.x/solaris/sparc/10/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_SPARC|-sol10-sparc.pkg>`_ package.

            #. Install the Wazuh agent.

               .. code-block:: console

                  # pkgadd -d wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_SPARC|-sol10-sparc.pkg wazuh-agent

            #. Edit the ``/var/ossec/etc/ossec.conf`` file and replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address of the Wazuh manager:

               .. code-block:: xml
                  :emphasize-lines: 3

                  <client>
                    <server>
                      <address><WAZUH_MANAGER_IP_ADDRESS></address>
                    </server>
                  </client>

               To learn more about this enrollment method, see the :doc:`Linux/Unix agent enrollment via agent configuration </user-manual/agent/agent-enrollment/enrollment-methods/via-agent-configuration/linux-endpoint>` section.

            #. Start the Wazuh agent to complete the installation process:

               .. code-block:: console

                  # /var/ossec/bin/wazuh-control start

         .. group-tab:: Solaris 11

            #. Download the `Wazuh agent for Solaris 11 SPARC <https://packages.wazuh.com/4.x/solaris/sparc/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p>`_.

            #. Install the Wazuh agent.

               .. code-block:: console

                  # pkg install -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p wazuh-agent

               If the Solaris 11 zone where you want to install the package has child zones, create a repository to install the Wazuh agent:

               .. code-block:: console

                  # pkg set-publisher -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p wazuh && pkg install --accept wazuh-agent && pkg unset-publisher wazuh

            #. Edit the ``/var/ossec/etc/ossec.conf`` file and replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address of the Wazuh manager:

               .. code-block:: xml
                  :emphasize-lines: 3

                  <client>
                    <server>
                      <address><WAZUH_MANAGER_IP_ADDRESS></address>
                    </server>
                  </client>

               To learn more about this enrollment method, see the :doc:`Linux/Unix agent enrollment via agent configuration </user-manual/agent/agent-enrollment/enrollment-methods/via-agent-configuration/linux-endpoint>` section.

            #. Start the Wazuh agent to complete the installation process:

               .. code-block:: console

                  # /var/ossec/bin/wazuh-control start

The installation process is now complete and the Wazuh agent is successfully installed on your Solaris endpoint.
