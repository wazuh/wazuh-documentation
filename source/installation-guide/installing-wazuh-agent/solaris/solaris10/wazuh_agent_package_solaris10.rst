.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_package_solaris10:

Solaris 10 from package
=======================

The Wazuh agent for Solaris 10 can be downloaded from our :ref:`packages list<packages>`. The current version has been tested on Solaris 10 version 5.10. Install the agent as follows:

  a) For Solaris 10 i386:

    .. code-block:: console

      # pkgadd -d wazuh-agent_v|WAZUH_LATEST|-sol10-i386.pkg

  b) For Solaris 10 SPARC:

    .. code-block:: console

      # pkgadd -d wazuh-agent_v|WAZUH_LATEST|-sol10-sparc.pkg

After creating the repository install the package:

    .. code-block:: console

        # pkg install --accept wazuh-agent

Finally, remove the publisher:

    .. code-block:: console

        # pkg unset-publisher wazuh

Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

Uninstall
---------

To uninstall the agent in Solaris 10:

    .. code-block:: console

      # pkgrm wazuh-agent