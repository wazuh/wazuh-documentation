.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the Information processing aspect of the COSO Principle 10 CC5.1 control activities requirement by providing several modules.

Common criteria 5.1 (COSO Principle 10)
=======================================

The TSC *common criteria CC5.1*: The principle states, *“The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.”* This means that the organization should design and implement controls appropriate for its specific business environment aligned with its overall goals and objectives. Examples of control activities include policies, authorizations and approvals processes, information management, and physical controls.

One of the points of focus for this criteria is that an effective control framework should include a diverse mix of control activities, considering different approaches to address risks and incorporating a combination of manual and automated, preventive and detective controls.

This principle is a crucial part of the overall control metrics of an organization and is frequently applied in the context of internal control and risk management. It aids organizations in detecting and reducing risks and ensuring compliance with laws and regulations.

The use case below shows how Wazuh assists in meeting this requirement.

Use case: Security Configuration Assessment of a monitored endpoint
-------------------------------------------------------------------

Wazuh helps meet this aspect of the *COSO Principle 10 CC5.1 control activities* requirement by providing several modules. One of these modules is the Security Configuration Assessment (SCA) module. This module allows a user to scan system components and configurations to detect misconfigurations that could lead to security issues. The Wazuh SCA module is an example of a detective control for proactively identifying misconfiguration issues for timely remediation.

In this case, we use the SCA module to evaluate a monitored Windows 10 endpoint against the CIS Benchmark for Windows 10. By monitoring and detecting security configuration issues, you can quickly identify and remediate potential security risks, ensuring the security and compliance of your systems. You can track these events and actions on the Wazuh dashboard:

#. Navigate to the **Configuration Assessment** module from the Wazuh dashboard. Select the monitored Windows 10 endpoint.

You can see the result of the assessment of the monitored endpoint.

.. thumbnail:: /images/compliance/tsc/common-criteria/password-assurance-checks.png
   :title: Password assurance checks
   :alt: Password assurance checks
   :align: center
   :width: 80%
