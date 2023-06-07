.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how agentless monitoring can help you monitor systems with no agent via SSH, such as routers, firewalls, switches, and Linux/BSD systems.  
  
.. _agentless-examples:

Configuration
=============

You need to configure the Wazuh server to monitor the connected agentless endpoints. To configure the agentless monitoring capability, install the ``expect`` package, then add the agentless monitoring configuration setting on the Wazuh server. 

Execute the following command as the root user to install the ``expect`` package:

.. tabs::

   .. tab:: Yum

      .. code-block:: console

         # yum install -y expect

   .. tab:: Apt

      .. code-block:: console

         # apt install -y expect

To view configuration options for agentless monitoring, refer to the `supported attributes`_ section below. 

Supported attributes
--------------------

The following table explains the different attributes the agentless monitoring module supports. 

+-----------+------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+
| Attribute | Allowed values                                                                                                                           | Description                                                                             |
+===========+==========================================================================================================================================+=========================================================================================+
| type      | ssh_integrity_check_bsd                                                                                                                  | Defines the agentless configuration type to be run on the monitored endpoint.           |
+           +------------------------------------------------------------------------------------------------------------------------------------------+                                                                                         +
|           | ssh_integrity_check_linux                                                                                                                |                                                                                         |
+           +------------------------------------------------------------------------------------------------------------------------------------------+                                                                                         +
|           | ssh_pixconfig_diff                                                                                                                       |                                                                                         |
+           +------------------------------------------------------------------------------------------------------------------------------------------+                                                                                         +
|           | ssh_generic_diff                                                                                                                         |                                                                                         |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+
|frequency  | An integer in seconds                                                                                                                    | Controls the number of seconds between each check of the agentless endpoint.            |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+
| host      | Any username and host (``username@hostname``)                                                                                            | Defines the username and the hostname or IP address of the agentless endpoint.          |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+
| state     | periodic                                                                                                                                 | Output from each check is analyzed with the Wazuh ruleset as if it is a monitored log.  |
+           +------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+
|           | periodic_diff                                                                                                                            | Output from each agentless check is compared to the output of the previous run.         |
+           +                                                                                                                                          +                                                                                         +
|           |                                                                                                                                          | Changes are alerted on, similar to file integrity monitoring.                           |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+
| arguments | For *BSD integrity check* and *Linux integrity check* settings, this is a space-delimited list of files or directories to be monitored.  | Defines the arguments passed to the agentless check.                                    |
|           |                                                                                                                                          |                                                                                         |
|           | For *generic diff* settings, this is a command to be run on the endpoint.                                                                |                                                                                         |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------+

Monitoring files, directories, or configuration settings on an endpoint
-----------------------------------------------------------------------

This setting allows the agentless monitoring module to monitor changes to files, directories, and the configuration of an endpoint. You can configure this using the following agentless configuration types:

- `BSD integrity check`_
- `Linux integrity check`_
- `Pix config`_

BSD integrity check
^^^^^^^^^^^^^^^^^^^

You need to set the ``type`` as ``ssh_integrity_check_bsd`` for BSD endpoints, as referenced in the sample configuration below. A space-separated list of files or directories may be referenced in the configuration section using the ``<arguments>`` tag. Using this configuration, Wazuh performs an integrity check on the specified files or directories of the monitored endpoint. An alert is triggered if the specified files or directories change.

Add the setting below to the ``/var/ossec/etc/ossec.conf`` configuration file of the Wazuh server to monitor the file integrity of  ``/bin`` and ``/var`` directories:

   .. code-block:: xml
      :emphasize-lines: 6        

      <agentless>
        <type>ssh_integrity_check_bsd</type>
        <frequency>20000</frequency>
        <host>user@test.com</host>
        <state>periodic</state>
        <arguments>/bin /var/</arguments>
      </agentless>

Multiple files or directories may be included in the ``<arguments>`` tag, separated by a space.

Linux integrity check 
^^^^^^^^^^^^^^^^^^^^^

You need to set the ``type`` as ``ssh_integrity_check_linux`` for Linux endpoints, as referenced in the sample configuration below. Here also, a space-separated list of directories may be referenced in the configuration section using the ``<arguments>`` tag. Using this configuration, Wazuh performs an integrity check on the specified files or directories of the monitored endpoint.

Add the setting below to the ``/var/ossec/etc/ossec.conf`` configuration file of the Wazuh server to monitor the ``/bin``, ``/etc``, and ``/sbin`` directories:

   .. code-block:: xml
      :emphasize-lines: 6        

      <agentless>
        <type>ssh_integrity_check_linux</type>
        <frequency>36000</frequency>
        <host>user@test.com</host>
        <state>periodic</state>
        <arguments>/bin /etc /sbin</arguments>
      </agentless>

Multiple files or directories may be included in the ``<arguments>`` tag, separated by a space.

Pix config
^^^^^^^^^^

This option triggers an alert if a Cisco PIX/router configuration changes. Set the ``type`` to ``ssh_pixconfig_diff`` as referenced in the sample configuration below. 

Add the setting below to the ``/var/ossec/etc/ossec.conf`` configuration file of the Wazuh server to monitor a Cisco PIX or router configuration:

   .. code-block:: xml

      <agentless>
        <type>ssh_pixconfig_diff</type>
        <frequency>36000</frequency>
        <host>pix@pix.fw.local</host>
        <state>periodic_diff</state>
      </agentless>

Running commands on an endpoint
-------------------------------

This configuration setting allows the agentless monitoring module to run a command on a monitored endpoint. When the output of the command changes, this triggers an alert on the Wazuh server. 

You can configure this using the following agentless configuration type:

- `Generic diff`_

Generic diff
^^^^^^^^^^^^

You can configure a command to run on a monitored endpoint. Wazuh will alert you if the output of the command changes. For this option, set the ``type`` as ``ssh_generic_diff``, as shown below.

In the configuration below, the ``ls -la /etc`` command will execute every ``20000`` seconds. An alert is triggered if the output of the commands changes.

   .. code-block:: xml

      <agentless>
        <type>ssh_generic_diff</type>
        <frequency>20000</frequency>
        <host>user@test.com</host>
        <state>periodic_diff</state>
        <arguments>ls -la /etc</arguments>
      </agentless>

.. Note::   
   To use ``su`` in a command, ``use_su`` must be set before the hostname. In the previous example, this would appear as ``<host>use_su user@test.com</host>``

Checking the agentless monitoring setup
---------------------------------------

After  you configure the agentless monitoring on the Wazuh server, restart the Wazuh manager with the following command to apply the configuration: 

.. code-block:: console

   systemctl restart wazuh-manager

When the ``expect`` package is present, and Wazuh is restarted, you should see a message similar to the following in the ``/var/ossec/logs/ossec.log`` file:

.. code-block:: console

   wazuh-agentlessd: INFO: Test passed for 'ssh_integrity_check_linux'.

When Wazuh has connected to the monitored endpoint, you should see a message similar to the following in the same log file:

.. code-block:: console

   wazuh-agentlessd: INFO: ssh_integrity_check_linux: user@example_adress.com: Starting.
   wazuh-agentlessd: INFO: ssh_integrity_check_linux: user@example_adress.com: Finished.
