Install OSSEC using RPM packages
================================

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

.. warning:: Fedora 23 is an Alpha version. Those packages may not work properly.

Installing OSSEC
----------------

To install with **yum** do the following::

   yum install ossec-hids

If it is the first installation from Wazuh repository you need to import
the GPG key tipping **y** after the next question::

   Obteniendo clave desde http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   Importando llave GPG 0x3B3631FB:
    Usuarioid  : "Jose Luis Ruiz <jose@wazuh.com>"
    Huella       : 9a5a 6e31 fb39 a5f6 21d8 de8b 3f9f d7b9 3b36 31fb
    Desde      : http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC
   Está de acuerdo [s/N]: s

Installing OSSEC agent
----------------------
