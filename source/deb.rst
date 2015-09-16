Install OSSEC using DEBs packages
=================================

Installing the apt-get repository key
-------------------------------------

If it is the first installation from Wazuh repository you need to import
the GPG key::

   apt-key adv --fetch-keys http://ossec.wazuh.com/repos/apt/conf/ossec-key.gpg.key

Add the repository for Debian (available distributions are Sid, Jessie and Wheezy)
----------------------------------------------------------------------------------

Type the next command::

   echo -e "# OSSEC See http://www.ossec.net/?page_id=19
   deb http://ossec.wazuh.com/repos/apt/debian wheezy main" >> /etc/apt/sources.list.d/ossec.list

.. note:: This is respository are available for arch i386 and x86_64

Add the repository for Ubuntu (available distributions are Precise, Trusty and Utopic)
--------------------------------------------------------------------------------------

Type the next command::

   echo -e "# OSSEC See http://www.ossec.net/?page_id=19
   deb http://ossec.wazuh.com/repos/apt/ubuntu precise main" >> /etc/apt/sources.list.d/ossec.list

.. note:: This is respository are available for arch i386 and x86_64

Update the repository
---------------------

Type the next command for update the repository::

   apt-get update


Installing OSSEC
----------------

To install with **apt-get** do the following::

   apt-get install ossec-hids


Installing OSSEC agent
----------------------

To install with **apt-get** do the following::

   apt-get install ossec-hids-agent
