.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on Solaris 11 Sparc

.. _wazuh_agent_package_solaris11_sparc:

Solaris 11 Sparc
================

The Wazuh agent for Solaris 11 Sparc can be downloaded from our :ref:`packages list<packages>`. The current version has been tested on Solaris 11 Sparc version 5.11. Install the agent as follows:

  .. code-block:: console

    # pkg install -g wazuh-agent_v3.10.2-sol11-sparc.p5p wazuh-agent

If the Solaris 11 zone where you want to install the package has child zones you will need to create a repository before installing the package:

  .. code-block:: console

      # pkg set-publisher -g wazuh-agent_v3.10.2-sol11-sparc.p5p wazuh

After creating the repository install the package:

  .. code-block:: console

      # pkg install --accept wazuh-agent

Finally, remove the publisher:

  .. code-block:: console

      # pkg unset-publisher wazuh

Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

Uninstall
---------

To uninstall the agent in Solaris 11 Sparc:

  .. code-block:: console

    # pkg uninstall wazuh-agent