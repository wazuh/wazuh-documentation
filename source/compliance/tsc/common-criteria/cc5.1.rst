.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the Information processing aspect of the COSO Principle 10 CC5.1 control activities requirement by providing several modules.

Common criteria 5.1 (COSO Principle 10)
=======================================

The TSC *common criteria CC5.1*: The principle states, *“The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.”*. This means that the organization should design and implement controls appropriate for its specific business environment aligned with its overall goals and objectives. Examples of control activities include policies, authorizations and approvals processes, information management, and physical controls.

This principle is a crucial part of the overall control metrics of an organization and is frequently applied in the context of internal control and risk management. It aids organizations in detecting and reducing risks and ensuring compliance with laws and regulations.

The use case below shows how Wazuh assists in meeting this requirement.

Use case: Monitoring user accounts on a CentOS endpoint
-------------------------------------------------------

Wazuh helps meet the Information processing aspect of the *COSO Principle 10 CC5.1 control activities* requirement by providing several modules. One of these modules is the File Integrity Monitoring (FIM) module, which tracks changes to files and directories on an endpoint’s filesystem. It monitors for file creation, modification, or deletion from directories or files under observation. The FIM module generates alerts when a change occurs and records the file, folder, Windows Registry key, cryptographic checksum, and other useful information. The Wazuh FIM module is an example of a preventive control for mitigating risk by detecting suspicious file modifications.

In this case, we use the FIM module to track changes to the ``/etc/passwd`` file on a monitored CentOS 7 endpoint. Monitoring the ``/etc/passwd`` file is important for user management, security, and compliance purposes. By detecting changes to this file, you can quickly identify and remediate potential security risks, ensuring the security and compliance of your systems. You can track these events and actions on the Wazuh dashboard.

#. Add the configuration below to the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file to monitor the ``/etc/passwd`` file for changes:

   .. code-block:: XML

      <syscheck>
          <directories report_changes="yes" realtime="yes">/etc/passwd</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Add a new user on the CentOS endpoint:

   .. code-block:: console

      # useradd randomuser

You can see an alert generated to show that the file ``/etc/passwd`` file has been modified.

.. thumbnail:: /images/compliance/tsc/common-criteria/etc-passwd-file-modified-alert.png
   :title: /etc/passwd file modified alert
   :align: center
   :width: 80%

The use case above is an example of a scenario that intersects between several similar compliance controls and requirements such as the ``nist_800_53_SI.7``, ``tsc_PI1.4``, ``tsc_CC6.1``, ``tsc_CC6.8``, and ``tsc_CC7.2``.