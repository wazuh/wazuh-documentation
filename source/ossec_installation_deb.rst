.. _ossec_installation_deb:

Debian packages
===============

Apt-get repository key
----------------------

If it is the first installation from Wazuh repository you need to import the GPG key: ::

   $ apt-key adv --fetch-keys http://ossec.wazuh.com/repos/apt/conf/ossec-key.gpg.key

Debian repositories
-------------------

To add your Debian repository, depending on your distribution, run these commands:

For Wheezy: ::

   $ echo -e "deb http://ossec.wazuh.com/repos/apt/debian wheezy main" >> /etc/apt/sources.list.d/ossec.list

For Jessie: ::

   $ echo -e "deb http://ossec.wazuh.com/repos/apt/debian jessie main" >> /etc/apt/sources.list.d/ossec.list

For Stretch: ::

   $ echo -e "deb http://ossec.wazuh.com/repos/apt/debian stretch main" >> /etc/apt/sources.list.d/ossec.list

For Sid: ::

   $ echo -e "deb http://ossec.wazuh.com/repos/apt/debian sid main" >> /etc/apt/sources.list.d/ossec.list

Ubuntu repositories
-------------------

To add your Ubuntu repository, depending on your distribution, run these commands:

For Precise::

   $ echo -e "deb http://ossec.wazuh.com/repos/apt/ubuntu precise main" >> /etc/apt/sources.list.d/ossec.list

For Trusty::

   $ echo -e "deb http://ossec.wazuh.com/repos/apt/ubuntu trusty main" >> /etc/apt/sources.list.d/ossec.list

For Vivid::

   $ echo -e "deb http://ossec.wazuh.com/repos/apt/ubuntu vivid main" >> /etc/apt/sources.list.d/ossec.list

For Wily::

   $ echo -e "deb http://ossec.wazuh.com/repos/apt/ubuntu wily main" >> /etc/apt/sources.list.d/ossec.list

For Xenial::

   $ echo -e "deb http://ossec.wazuh.com/repos/apt/ubuntu xenial main" >> /etc/apt/sources.list.d/ossec.list

Update the repository
---------------------

Type the next command to update the repository::

   $ apt-get update


OSSEC manager installation
--------------------------

To install the OSSEC manager debian package, from our repository, run this command: ::

   $ apt-get install ossec-hids


OSSEC agent installation
------------------------

To install the OSSEC agent debian package, from our repository, run this command: ::

   $ apt-get install ossec-hids-agent
