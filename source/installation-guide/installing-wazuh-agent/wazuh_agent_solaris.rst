.. _wazuh_agent_solaris:

Install Wazuh agent on Solaris
===============================

The Wazuh agent for Solaris can be downloaded from our :doc:`packages list<../packages-list/index>`. The current version has been tested on Solaris 11 version 5.11 and Solaris 10 version 5.10. Install the agent as follows:

  a) For Solaris 11 i386::

	pkg install -g wazuh-agent_v3.2.0-sol11-i386.p5p wazuh-agent

  b) For Solaris 10 i386::

	pkgadd -d wazuh-agent_v3.2.0-sol10-i386.pkg

  c) For Solaris 11 sparc::

	pkg install -g wazuh-agent_v3.2.0-sol11-sparc.p5p wazuh-agent

  d) For Solaris 10 sparc::

	pkgadd -d wazuh-agent_v3.2.0-sol10-sparc.pkg


.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/registering/index>`.
