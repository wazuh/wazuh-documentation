Using RPM packages
==================

Adding yum repository
---------------------

To add Wazuh yum repository, create a file named /etc/yum.repos.d/wazuh.repo::

    cd /etc/yum.repos.d
    vi wazuh.repo

.. note:: This is respository are available for arch i386 and x86_64

**For RHEL / CentOS**::

   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/el/$releasever/$basearch
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1

**For Fedora 21, 22**::


   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/fc/$releasever/$basearch
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1

Installing OSSEC
----------------

Installing OSSEC agent
----------------------
