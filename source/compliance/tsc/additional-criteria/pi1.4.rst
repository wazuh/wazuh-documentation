.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the processing integrity PI1.4 requirement by monitoring and reporting file changes using the FIM capability.

Processing integrity - PI1.4
==============================

The trust service criteria for **additional criteria** for processing **integrity** **PI1.4** is a set of guidelines that outline requirements for ensuring the completeness and integrity of an entity's processed data. It states: "*The entity implements policies and procedures to make available or deliver output completely, accurately, and timely in accordance with specifications to meet the entity's objectives.*"

Wazuh helps meet the **processing integrity PI1.4** requirement by monitoring and reporting file changes using the FIM capability. This use case shows how you can configure the Wazuh agent on an Ubuntu 24.04 endpoint to detect changes in the ``critical_folder`` directory. The finding generated can serve as supporting evidence for integrity control.

Use case: Detecting file changes using the Wazuh file integrity monitoring capability
------------------------------------------------------------------------------------------

The use case below demonstrates how Wazuh helps meet this requirement.

Ubuntu endpoint
^^^^^^^^^^^^^^^^

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

   .. code-block:: xml
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

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      A change has occurred

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Navigate to **Regulatory Compliance** on the Wazuh **Overview** dashboard and click on **TSC**.

   .. thumbnail:: /images/compliance/tsc/additional-criteria/overview-regulatory-compliance-tsc-card.png
      :title: Wazuh Overview dashboard - Regulatory Compliance
      :alt: Wazuh Overview dashboard - Regulatory Compliance
      :align: center
      :width: 80%

#. Select the **Findings** subsection and apply the following filter: ``wazuh.integration.name: wazuh-fim``

   .. thumbnail:: /images/compliance/tsc/additional-criteria/tsc-findings-wazuh-fim-filter.png
      :title: TSC Findings filtered by wazuh-fim
      :alt: TSC Findings filtered by wazuh-fim
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/tsc/additional-criteria/fim-file-modified-details.png
      :title: FIM file modified finding details
      :alt: FIM file modified finding details
      :align: center
      :width: 80%
