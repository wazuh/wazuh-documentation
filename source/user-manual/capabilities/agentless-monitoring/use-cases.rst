.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Get answers to the most frequently asked questions about Wazuh Agentless monitoring in this FAQ section of the Wazuh documentation.

Use cases
=========

Monitoring the output of a command on an endpoint
-------------------------------------------------

In this example, we configure the agentless monitoring module to run some commands on a monitored VMware ESXI 8.0.0 endpoint and detect the output. 

Configuration
^^^^^^^^^^^^^

Wazuh server
~~~~~~~~~~~~

Perform the following steps on the Wazuh server.

#. Add the following block to the ``/var/ossec/etc/ossec.conf`` configuration file. This configuration runs a command to print the content of the ``/tmp/newfile.txt`` file every 2 minutes. It also detects the difference between the outputs each time the command is run. 

   .. code-block:: xml
      :emphasize-lines: 6        

      <agentless>
        <type>ssh_generic_diff</type>
        <frequency>200</frequency>
        <host>user@example.net</host>
        <state>periodic_diff</state>
        <arguments>cat /tmp/newfile.txt</arguments>
      </agentless>

   Replace ``user@example.net`` with the username and the hostname or IP address of your  VMware ESXI endpoint. 

#. Restart the Wazuh manager with the following command to apply the changes: 

   .. code-block:: console

      systemctl restart wazuh-manager

Test the configuration 
^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the monitored VMware ESXI endpoint.

#. Create a file ``/tmp/newfile.txt``:

   .. code-block:: console

      $ touch /tmp/newfile.txt

#. Add the text “new addition” and wait for 3 minutes: 
 
   .. code-block:: console

      $ echo “new addition” > /tmp/newfile.txt

Visualize the alert
^^^^^^^^^^^^^^^^^^^

You can visualize the alert with any of these options

- Navigate to the **Discover** section and open the visualization created in the :doc:`Visualization </user-manual/capabilities/agentless-monitoring/visualization>` section.

- Navigate to **Modules > Security events** on the Wazuh dashboard. Search for ``agentless.host:*`` to view the alert generated. 

   .. thumbnail:: /images/manual/agentless-monitoring/navigate-to-modules-security-events.png
      :title: Navigate to Modules > Security events
      :alt: Navigate to Modules > Security events
      :align: center
      :width: 80%

Expand the alert with ``rule.id:555`` to view more information about the event. In the image below, under the full log, you can see the output of the command and the difference between the commands when the file was modified.

   .. thumbnail:: /images/manual/agentless-monitoring/expand-the-alert-with-rule-id-555.png
      :title: Expand the alert with rule.id:555
      :alt: Expand the alert with rule.id:555
      :align: center
      :width: 80%

Monitor files and directories on an endpoint
--------------------------------------------

In the example, we monitor changes to a specified file and directory on a monitored Linux endpoint using the agentless monitoring capability. 

Configuration
^^^^^^^^^^^^^

Wazuh server
~~~~~~~~~~~~

Perform the following steps on the Wazuh server.

#. Add the block below to the ``/var/ossec/etc/ossec.conf`` configuration file. This configuration monitors the ``/tmp/file.conf`` file for modification every 2 minutes: 

   .. code-block:: xml
      :emphasize-lines: 6        

      <agentless>
        <type>ssh_integrity_check_linux</type>
        <frequency>120</frequency>
        <host>user@example.net</host>
        <state>periodic</state>
        <arguments>/tmp/file.conf /special_dir</arguments>
      </agentless>

   Replace ``user@example.net`` with the username and the hostname or IP address of your  Linux endpoint. 

#. Restart the Wazuh manager with the following command to apply the changes: 

   .. code-block:: console

      systemctl restart wazuh-manager

Test the configuration
^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the monitored endpoint.

#. Create a file ``/tmp/file.conf``:

   .. code-block:: console

      $ touch /tmp/file.conf

#. Modify the ``/tmp/file.conf``:

   .. code-block:: console

      $ echo demo > /tmp/file.conf

#. Make a directory ``/special_dir``:

   .. code-block:: console

      $ mkdir /special_dir 

#. Add a file to the monitored directory:

   .. code-block:: console
      
      $ cd /special_dir 
      $ touch file1 file2

#. Modify the files by adding the word “demo” and wait for 2 minutes:

   .. code-block:: console
      
      echo “demo” | tee /special_dir/file1 /special_dir/file2

Visualize the alert
^^^^^^^^^^^^^^^^^^^

You can visualize the alert with any of these options:

- Navigate to the **Discover** section and open the visualization created in the :doc:`Monitoring </user-manual/capabilities/agentless-monitoring/visualization>` section. 

- Navigate to **Modules > Security events** on the Wazuh dashboard. Search for ``agentless.host:*`` to view the alert generated. 

   .. thumbnail:: /images/manual/agentless-monitoring/search-for-agentless-host.png
      :title: Search for agentless.host:*
      :alt: Search for agentless.host:*
      :align: center
      :width: 80%

Select the ``syscheck.path`` field to add a column that shows all the monitored files.

   .. thumbnail:: /images/manual/agentless-monitoring/select-the-syscheck-path.png
      :title: Select the syscheck.path
      :alt: Select the syscheck.path
      :align: center
      :width: 80%

Expand one of the alerts with ``rule.id:550`` to find information about the changes made to the file. You can see the file size and checksum have changed in the image below.  

   .. thumbnail:: /images/manual/agentless-monitoring/expand-one-of-the-alerts-with-rule-id-550.png
      :title: Expand one of the alerts with rule.id:550
      :alt: Expand one of the alerts with rule.id:550
      :align: center
      :width: 80%