.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the processing integrity PI1.4 requirement by monitoring and reporting file changes using the FIM module.

Processing integrity - PI1.4
============================

The trust service criteria for *additional criteria* for processing integrity *PI1.4* is a set of guidelines that outline the requirements for ensuring the completeness and integrity of the processed data of an entity. It states: *"The entity implements policies and procedures to make available or deliver output completely, accurately, and timely in accordance with specifications to meet the entity’s objectives."*. The following actions are performed to achieve this:

-  **Protects output**: Output is protected when stored or delivered, or both, to prevent theft, destruction, corruption, or deterioration that would prevent output from meeting specifications.
-  **Distributes output only to intended parties**: Output is distributed or made available only to intended parties.
-  **Distributes output completely and accurately**: Procedures are in place to provide for the completeness, accuracy, and timeliness of distributed output.
-  **Creates and maintains records of system output activities**: Records of system output activities are created and maintained completely and accurately in a timely manner.

The use case below demonstrates how Wazuh assists in meeting this requirement.

Use case: Detecting file changes using the Wazuh File Integrity Monitoring module
---------------------------------------------------------------------------------

This use case shows how Wazuh helps meet the *processing integrity PI1.4* requirement by monitoring and reporting file changes using the FIM module. In this scenario, we show how you can configure the Wazuh agent on a Ubuntu 22.04 endpoint to detect changes in the ``critical_folder`` directory.

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Switch to the ``root`` user:

   .. code-block:: console

      $ sudo su

#. Create the directory ``critical_folder`` in the ``/root`` directory:

   .. code-block:: console

      # mkdir /root/critical_folder

#. Create the file ``special_data.txt`` in the ``/root/critical_folder`` directory and add some content:

   .. code-block:: console

      # touch /root/critical_folder/special_data.txt
      # echo "The content in this file must maintain integrity" >> /root/critical_folder/special_data.txt

#. Add the configuration highlighted to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: XML
      :emphasize-lines: 2

      <syscheck>
        <directories realtime="yes" check_all="yes" report_changes="yes">/root/critical_folder</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Modify the file by changing the content of ``special_data.txt`` from ``The content in this file must maintain integrity`` to ``A change has occurred``:

   .. code-block:: console

      # echo "A change has occurred" > /root/critical_folder/special_data.txt
      # cat /root/critical_folder/special_data.txt

   .. code-block:: none
      :class: output

      A change has occurred

#. Select **TSC** from the Wazuh dashboard to view the alert with rule ID ``550``.

   .. thumbnail:: /images/compliance/tsc/additional-criteria/rule-id-550-alert.png
      :title: Rule id 550 alert
      :align: center
      :width: 80%
   
   The alert is tagged with ``PI1.4`` and other compliance tags with requirements that intersect with this use case.

   .. thumbnail:: /images/compliance/tsc/additional-criteria/alert-tagged-pi1.4.png
      :title: Alert tagged PI1.4
      :align: center
      :width: 80%
