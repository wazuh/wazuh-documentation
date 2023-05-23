.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: 
  
Wazuh archives
==============

The Wazuh archives refer to the storage files created by the Wazuh server that contain logs, alerts, and other security-related data collected from monitored endpoints. Wazuh archives are useful for threat hunting, as security teams use archived logs to review historical data of security incidents, analyze trends, and generate reports.

By default, Wazuh archives are disabled because they store a large number of logs on the Wazuh server. When enabled, Wazuh archives allow organizations to store and retain security data for compliance and forensic purposes. 

.. note:: Wazuh archives retain logs collected from all monitored endpoints, therefore consuming significant storage resources on the Wazuh server over time. So, it is important to consider the impact on disk space and performance before enabling them.

Enabling the Wazuh archives
---------------------------

Perform the steps below to enable the Wazuh archives on your Wazuh server.

#. Edit the Wazuh manager configuration file ``/var/ossec/etc/ossec.conf`` and set the value of the highlighted fields below to yes:

   .. code-block:: html
      :emphasize-lines: 5,6

      <ossec_config>
        <global>
          <jsonout_output>yes</jsonout_output>
          <alerts_log>yes</alerts_log>
          <logall>yes</logall>
          <logall_json>yes</logall_json>
          ...
      </ossec_config>

   Where:

   - ``<logall>`` option enables or disables archiving of all log messages. When enabled, the Wazuh server stores the logs in a syslog format. The allowed values are yes and no.
   
   - ``<logall_json>`` option enables or disables logging of events. When enabled, the Wazuh server stores the events in a JSON format. The allowed values are yes and no.    

   Depending on the format you desire, you can set one or both values of the highlighted fields to yes. However, only the ``<logall_json>yes</logall_json>`` creates an index that can be used to visualize the events on the Wazuh dashboard.

#. Restart the Wazuh manager to apply the configuration changes: 

   .. code-block:: console
   
      $ sudo systemctl restart wazuh-manager

   Depending on your chosen format, the file ``archives.log``, ``archives.json``, or both will be created in the ``/var/ossec/logs/archives/`` directory on the Wazuh server. 

   Wazuh uses a default log rotation policy. It ensures that available disk space is conserved by rotating and compressing logs on a daily, monthly, and yearly basis.

Visualizing the events on the dashboard
---------------------------------------

You can use the **Discover** dashboard to view and query events stored in the Wazuh archives.

Perform the following steps to view Wazuh archived events on the **Discover** dashboard.

Wazuh server
^^^^^^^^^^^^

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` and change the value of ``archives: enabled`` from ``false`` to ``true``:

   .. code-block:: html
      :emphasize-lines: 2

      archives:
        enabled: true

#. Restart Filebeat to apply the configuration changes:

   .. code-block:: console

     $ sudo systemctl restart filebeat

Wazuh dashboard
^^^^^^^^^^^^^^^

#. Click the upper-left menu icon and navigate to **Stack management > Index patterns > Create index pattern**. Use ``wazuh-archives-*`` as the index pattern name, and set ``timestamp`` in the **Time field** drop-down list. 

   The GIF below shows how to create the index pattern.

   .. thumbnail:: /images/manual/wazuh-archives/create-index-pattern.gif
      :title: How to create the wazuh-archives-* index pattern 
      :alt: How to create the wazuh-archives-* index pattern
      :align: center
      :width: 80%

#. To view the events on the dashboard, click the upper-left menu icon and navigate to **Discover**. Change the index pattern to ``wazuh-archives-*``. 

   .. thumbnail:: /images/manual/wazuh-archives/discover-events.png
      :title: See the events on Discovery 
      :alt: See the events on Discovery
      :align: center
      :width: 80%