.. _wazuh_agent_solaris:

Install Wazuh agent on Solaris
===============================


Solaris agent can be downloaded from our :doc:`packages list<../packages-list/index>`. Current version has been tested on Solaris 11 version 5.11 and Solaris 10 version 5.10. The installation step is:

  a) For Solaris 11 i386::

	pkg install -d wazuh-agent_2.1.0-sol11-i386.p5p wazuh-agent

  b) For Solaris 10 i386::

	pkgadd -d wazuh-agent_2.1.0-sol10-i386.pkg

  c) For Solaris 11 sparc::

	pkg install -d wazuh-agent_2.1.0-sol11-sparc.p5p wazuh-agent

  d) For Solaris 10 sparc::

	pkgadd -d wazuh-agent_2.1.0-sol10-sparc.pkg


.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our :doc:`user manual<../../user-manual/index>`.
