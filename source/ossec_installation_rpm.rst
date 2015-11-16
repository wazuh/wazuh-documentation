.. _ossec_installation_rpm:

RPM packages
============

Yum repository
--------------

To add Wazuh yum repository, depending on your Linux distribution, create a file named ``/etc/yum.repos.d/wazuh.repo`` with the following content:

For RHEL and CentOS (versions EL5, EL6 or EL7): ::

   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/el/$releasever/$basearch
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1

For Fedora (versions 21, 22 or 23): ::

   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/fc/$releasever/$basearch
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1

OSSEC manager installation
--------------------------

To install the OSSEC manager using Yum packages manager, run the following command: ::

   $ yum install ossec-hids

On Fedora 23, to install the OSSEC manager with DNF packages manager, run the following command: ::

   $ dnf install ossec-hids

OSSEC agent installation
------------------------

To install the OSSEC agent using Yum packages manger, run the following command: ::

   $ yum install ossec-hids-agent

On Fedora 23, to install the OSSEC agent with DNF packages manager, run the following command: ::

   $ dnf install ossec-hids-agent

.. note:: If it is your first installation from our repository, you will need to accept our repository GPG key when prompted during the installation. This key can be found at: `http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC <http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC>`_