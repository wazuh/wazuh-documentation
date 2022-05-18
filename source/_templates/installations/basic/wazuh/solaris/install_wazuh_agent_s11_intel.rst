.. Copyright (C) 2022 Wazuh, Inc.

The Wazuh agent for Solaris 11 i386 can be downloaded from our :ref:`packages list<packages>` or directly from here: `Solaris 11 i386 <https://packages.wazuh.com/4.x/solaris/i386/11/wazuh-agent_v4.3.1-sol11-i386.p5p>`_. The current version has been tested on Solaris 11 i386 version 5.10. Install the agent as follows:

.. code-block:: console

  # pkg install -g wazuh-agent_v4.3.1-sol11-i386.p5p wazuh-agent

If the Solaris 11 zone where you want to install the package has child zones you will need to create a repository before installing the package:

.. code-block:: console

  # pkg set-publisher -g wazuh-agent_v4.3.1-sol11-i386.p5p wazuh

.. End of include file
