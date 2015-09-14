RPMs for CentOS
===============

CentOS 6 i386
-------------

To add Wazuh yum repository, create a file named /etc/yum.repos.d/wazuh.repo and paste one of the configurations below::


   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/el6/i386/
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1

CentOS 6 x86_64
---------------

To add Wazuh yum repository, create a file named /etc/yum.repos.d/wazuh.repo and paste one of the configurations below::

   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/el6/x86_64/
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1


CentOS 7 i386
--------------

To add Wazuh yum repository, create a file named /etc/yum.repos.d/wazuh.repo and paste one of the configurations below::

   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/el7/i386/
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1

CentOS 7 x86_64
---------------

To add Wazuh yum repository, create a file named /etc/yum.repos.d/wazuh.repo and paste one of the configurations below::

   [wazuh]
   name = WAZUH OSSEC Repository - www.wazuh.com
   baseurl = http://ossec.wazuh.com/el7/x86_64/
   gpgcheck = 1
   gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   enabled = 1

OR
you can download this :download:`script <./scripts/repo-el7-x86_64.sh>` and execute for create the repo.
