.. _ossec_wazuh:

OSSEC Wazuh fork
================

In this section we will guide you through the installation of our `OSSEC HIDS forked version <https://github.com/wazuh/ossec-wazuh>`_. It provides compliance support, extended logging and management features. These capabilities are required for the integration with :ref:`ELK Stack <ossec_elk>` and :ref:`OSSEC Wazuh RESTful API <ossec_api>`.

In order to start with the installation, first we need to set up the compilation environment by installing development tools and compilers. In Linux this can easily be done using your distribution packages manager:

For RPM based distributions: :: 

   $ sudo yum groupinstall 'Development Tools'
   $ sudo yum install git
 
For Debian based distributions: ::

   $ sudo apt-get install build-essential git

Now we are ready to clone our Github repository and compile the source code, to install OSSEC: ::

   $ cd ~
   $ mkdir ossec_tmp && cd ossec_tmp
   $ git clone https://github.com/wazuh/ossec-wazuh.git
   $ cd ossec-wazuh
   $ sudo ./install.sh

Choose ``server`` when being asked about the installation type and answer the rest of questions as desired.

Configuration
-------------

In order to enable alerts JSON output we need to change our OSSEC manager configuration file ``/var/ossec/etc/ossec.conf`` and add the following line in between ``<global>`` and ``</global>`` tags. ::

  <jsonout_output>yes</jsonout_output>

Now start your OSSEC Manager ::

  $ sudo /var/ossec/bin/ossec-control start

Here are some useful commands to check that everything is working as expected. You should get  a similar output in your system. ::

  $ ps aux | grep ossec
  root     31362  0.0  0.1  27992   824 ?        S    23:01   0:00 /var/ossec/bin/ossec-execd
  ossec    31366  0.1  0.4  29968  2960 ?        S    23:01   0:00 /var/ossec/bin/ossec-analysisd
  root     31370  0.0  0.1  19648   844 ?        S    23:01   0:00 /var/ossec/bin/ossec-logcollector
  root     31382  0.0  0.1  19800   808 ?        S    23:01   0:00 /var/ossec/bin/ossec-syscheckd
  ossec    31385  0.0  0.1  28140   832 ?        S    23:01   0:00 /var/ossec/bin/ossec-monitord
  root     31407  0.0  0.1   7832   876 pts/0    S+   23:02   0:00 grep ossec
  
  $ lsof /var/ossec/logs/alerts/alerts.json 
  COMMAND     PID  USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
  ossec-ana 31366 ossec   10w   REG  202,0      245 274582 /var/ossec/logs/alerts/alerts.json
  
  $ cat /var/ossec/logs/alerts/alerts.json 
  {"rule":{"level":3,"comment":"Ossec server started.","sidid":502,"groups":["ossec","pci_dss"],"PCI_DSS":["10.6.1"]},"full_log":"ossec: Ossec started.","hostname":"vpc-agent-debian","timestamp":"2015 Nov 08 23:01:28","location":"ossec-monitord"}


A last step is necessary if you are planning to use OSSEC RESTful API. ::

 $ sudo mkdir /var/ossec/dev/
 $ sudo mount -o bind /dev /var/ossec/dev/ 


Agents installation
-------------------

Agent deployment is fully explained in our :ref:`OSSEC installation guide <ossec_installation>`. There you will find instructions to install pre-compiled binaries for different operating systems, as well as instructions to install them compiling the source code. 

What's next
-----------

Once you have OSSEC Wazuh installed you can move forward and try out ELK integration, the API RESTful or the custom security compliance Ruleset, check them on:

* :ref:`OSSEC integration with Elk Stack<ossec_elk>`
* :ref:`OSSEC Wazuh RESTful API <ossec_api>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
