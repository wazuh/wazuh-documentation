.. Copyright (C) 2021 Wazuh, Inc.

#. Download the `Wazuh agent for Solaris 11 Sparc <https://packages-dev.wazuh.com/pre-release/solaris/sparc/11/wazuh-agent_v4.2.0-sol11-sparc.p5p>`_. 

#. Install the agent:
   
   .. code-block:: console
   
     # pkg install -g wazuh-agent_v4.2.0-sol11-sparc.p5p wazuh-agent
   
If the Solaris 11 zone where you want to install the package has child zones, create a repository to install the Wazuh agent:

.. code-block:: console

  # pkg set-publisher -g wazuh-agent_v4.2.0-sol11-sparc.p5p wazuh && pkg install --accept wazuh-agent && pkg unset-publisher wazuh

.. End of include file
