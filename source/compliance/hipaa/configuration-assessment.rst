.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The SCA module helps to implement HIPAA compliance. Learn more about it in this section of the Wazuh documentation.

Configuration assessment
========================

The Security Configuration Assessment (SCA) module performs scans to determine if monitored endpoints meet secure configuration and hardening policies. These scans assess the configuration of the endpoint using policy files that contain rules to be tested against the actual configuration of the endpoint.

The SCA module can help to implement the following HIPAA sections:

- **Evaluation §164.308(a)(8)**: *“A covered entity or business associate must perform a periodic technical and nontechnical evaluation, based initially on the standards implemented under this rule and, subsequently, in response to environmental or operational changes affecting the security of electronic protected health information, that establishes the extent to which a covered entity's or business associate's security policies and procedures meet the requirements of this subpart.”*

  This section of the HIPAA standard requires you to conduct regular reviews of systems containing health information to ensure that they comply with security policies.

- **Access Control §164.312(a)(1) - Automatic Logoff**: *“Implement electronic procedures that terminate an electronic session after a predetermined time of inactivity.”*

  This section of the HIPAA standard requires you to implement measures that will terminate login sessions in systems that contain healthcare information after a specified period of inactivity. This includes making sure that an RDP or SSH session is automatically terminated after a predetermined duration of inactivity.

  The Wazuh SCA module scans endpoints on a regular basis to ensure they comply with specified security policies. These scans also find missing access control policies like automatic logoff configurations. Refer to the Wazuh :doc:`SCA documentation  </user-manual/capabilities/sec-config-assessment/index>` for more details on configuring SCA checks.

Use cases: SCA scan and SSH session timeout
-------------------------------------------

- In this use case, the SCA module performs periodic scans on an Ubuntu 22.04 endpoint to ensure that it complies with security policies and hardening configurations. Additionally, the SCA module on the Wazuh dashboard displays the status of the SCA checks (passed, failed, or not applicable) and the time of the last scan for a specific endpoint, as shown below:

  .. thumbnail:: /images/compliance/hipaa/02-configuration-assessment.png    
    :title: The SCA module on the Wazuh dashboard displays the status of the SCA checks 
    :align: center
    :width: 80%

  The Wazuh SCA policy ``CIS benchmark for Ubuntu Linux 22.04 LTS`` is an out-of-the-box policy based on the Center for Internet Security (CIS) benchmarks, a well-established standard for host hardening.

- In this use case, Wazuh runs SCA checks to determine the status of SSH session timeouts on an Ubuntu 22.04 endpoint. The ID of the check is ``28661``. When this SCA check is run, if SSH session timeout on the endpoint is not configured, its result is ``Failed``. Additionally, each SCA check contains the reason why the check is being performed, a description of the check and a remediation if the SCA check fails.

  .. thumbnail:: /images/compliance/hipaa/03-configuration-assessment.png    
    :title: Each SCA check contains the reason why the check is being performed 
    :align: center
    :width: 80%