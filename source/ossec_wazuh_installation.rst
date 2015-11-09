.. _ossec_wazuh_installation:

Installing OSSEC Wazuh
======================

In this section we will guide you through the installation our `OSSEC HIDS forked version <https://github.com/wazuh/ossec-wazuh>`_. You can learn more about it, and how it can be integrated with ELK Stack and our restful API at the :ref:`introduction <ossec_wazuh>` of OSSEC Wazuh documentation.

In order to start with this installation, first we need to set up the compillation environment by installing development tools and compilers. In Linux this can easily be done using your distribution packages manager:

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

Follow the installation steps OSSEC choosing ``server`` when asked about the installation type. You can let all other default answers by pressing ENTER at every question that ``install.sh`` script asks you. 

Configuration
-------------

In order to enable alerts JSON output we will change our OSSEC manager configuration file ``/var/ossec/etc/ossec.conf`` and add the following line in between ``<global>`` and ``</global>`` tags. ::

   <jsonout_output>yes</jsonout_output>

That's all! Now start your OSSEC Manager ::

   $ sudo /var/ossec/bin/ossec-control start

Here are some useful commands to know that everything is working as expected. You should expect a similar output in your system. ::

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


This last step is necessary if you are planning to use OSSEC RESTful API. ::

 $ sudo mkdir /var/ossec/dev/
 $ sudo mount -o bind /dev /var/ossec/dev/ 


Agents installation
-------------------

Agent deployment is fully explained in our :ref:`OSSEC installation guide <ossec_installation>`. There you will find instructions to install pre-compiled binaries for different operating systems, as well as instructions to install them compiling the source code. 

Next steps
----------

Once you have OSSEC Wazuh installed you can move forward and try out ELK integration, the API RESTful or the custom security compliance Ruleset, check them on:

* :ref:`ELK Integration Guide <ossec_wazuh_elk>`
* :ref:`API RESTful Installation Guide <ossec_wazuh_api>`
* :ref:`Ruleset <ossec_rule_set>`