Installing from RPM packages
============================

Adding yum repository
---------------------

To add Wazuh yum repository, create a file named /etc/yum.repos.d/wazuh.repo::

   $ cd /etc/yum.repos.d
   $ vi wazuh.repo

.. note:: Those respositores are available for arch i386 and x86_64

**For RHEL / CentOS**::

   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/el/$releasever/$basearch
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1

**For Fedora 21, 22, 23**::


   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/fc/$releasever/$basearch
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1

.. warning:: Fedora 23 is an Alpha version. Those packages may not work properly.

Installing OSSEC manager
------------------------

To install using **yum** do the following:: 

   $ yum install ossec-hids

In **Fedora 23** install with **dnf** do the following::

   $ dnf install ossec-hids

Installing OSSEC agent
----------------------

To install with **yum** do the following::

   $ yum install ossec-hids-agent

In **Fedora 23** install with **dnf** do the following::

   $ dnf install ossec-hids-agent

Installing Wazuh GPG key
------------------------

If it is the first installation from Wazuh repository you need to import
the GPG key typing **y** after the next question::

   Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
   Importing GPG key 0xF4A80EB5:
    Userid     : "CentOS-7 Key (CentOS 7 Official Signing Key) <security@centos.org>"
    Fingerprint: 6341 ab27 53d7 8a78 a7c2 7bb1 24c6 a8a7 f4a8 0eb5
    Package    : centos-release-7-1.1503.el7.centos.2.8.x86_64 (@anaconda)
    From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
   Is this ok [y/N]: 

.. note:: If you don't install the Wazuh GPG key yum can't install the RPMs for security reasons.
