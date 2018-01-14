.. _installation_agents:

Installing Wazuh agent
======================

The Wazuh agent runs on the hosts that you want to monitor. It is multi-platform and provides the following capabilities: log and data collection, file integrity monitoring, rootkits and malware detection, and security policy monitoring. In addition, it talks to the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

There are several options to install a Wazuh agent, depending on the operating system and whether or not you wish to build from source. Consult the table below and choose how to proceed for a given agent:

+-------------------------------------------------+--------------------------------------------------+
| Type                                            | Description                                      |
+=================================================+==================================================+
| :doc:`RPM packages <wazuh_agent_rpm>`           | Install Wazuh agents on CentOS/RHEL/Fedora.      |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`DEB packages <wazuh_agent_deb>`           | Install Wazuh agents on Debian/Ubuntu.           |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Windows installer <wazuh_agent_windows>`  | Install Wazuh agents on Windows.                 |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Mac OS installer <wazuh_agent_macos>`     | Install Wazuh agents on Mac OS                   |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Solaris installer <wazuh_agent_solaris>`  | Install Wazuh agents on Solaris                  |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`HP-UX installer <wazuh_agent_hpux>`       | Install Wazuh agents on HP-UX                    |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`AIX 5.3 installer <wazuh_agent_aix>`      | Install Wazuh agents on AIX                      |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Sources <wazuh_agent_sources>`            | Install Wazuh agents from source code.           |
+-------------------------------------------------+--------------------------------------------------+

.. note:: Deploying agents to a large number of servers or endpoints can be easier using automation tools like Puppet, Chef, SCCM or Ansible. Consider exploring these options if that is your case.

.. toctree::
    :hidden:
    :maxdepth: 2

    wazuh_agent_rpm
    wazuh_agent_deb
    wazuh_agent_windows
    wazuh_agent_macos
    wazuh_agent_solaris
    wazuh_agent_hpux
    wazuh_agent_aix
    wazuh_agent_sources
