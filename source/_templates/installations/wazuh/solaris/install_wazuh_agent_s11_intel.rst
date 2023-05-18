.. Copyright (C) 2015, Wazuh, Inc.

#. Download the `Wazuh agent for Solaris 11 i386 <https://packages.wazuh.com/4.x/solaris/i386/11/wazuh-agent_v4.4.2-sol11-i386.p5p>`_. 

#. Install the Wazuh agent.

   .. code-block:: console
   
     # pkg install -g wazuh-agent_v4.4.2-sol11-i386.p5p wazuh-agent
   
If the Solaris 11 zone where you want to install the package has child zones, create a repository to install the Wazuh agent:

.. code-block:: console

  # pkg set-publisher -g wazuh-agent_v4.4.2-sol11-i386.p5p wazuh && pkg install --accept wazuh-agent && pkg unset-publisher wazuh

.. End of include file
