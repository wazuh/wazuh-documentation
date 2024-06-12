.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out a use case about Incident Response, one of the key capabilities of the Wazuh platform. Learn more about it in this section of our documentation.

Incident response
=================

A security incident refers to any adverse event or activity that risks or threatens the confidentiality, integrity, or availability of digital assets, networks, data, or resources. Such incidents include unauthorized access, data breaches, malware infections, denial-of-service attacks, and any other activities that compromise the security posture of an organization's information technology environment.

The goal of incident response is to effectively handle a security incident and restore normal business operations as quickly as possible. As organizations’ digital assets continuously grow, managing incidents manually becomes increasingly challenging, hence the need for automation.

Automated incident response involves automatic actions taken when responding to security incidents. These actions can include isolating compromised endpoints, blocking malicious IP addresses, quarantining infected devices, or disabling compromised user accounts. By automating incident response, cybersecurity teams reduce response time to detected threats, prevent or minimize the impact of incidents, and efficiently handle a large volume of security events.

Wazuh Active Response module
----------------------------

The Wazuh :doc:`Active Response </user-manual/capabilities/active-response/index>` module allows users to run automated actions when incidents are detected on endpoints. This improves an organization's incident response processes, enabling security teams to take immediate and automated actions to counter detected threats.

You can also configure the actions to be either stateless or stateful. Stateless active responses are one-time actions while stateful responses revert their actions after some time.

Default active response actions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Out-of-the-box scripts are available on every operating system that runs the Wazuh agents. Some of the :doc:`default active response </user-manual/capabilities/active-response/default-active-response-scripts>` scripts include:

=============== ===========
Name of script  Description
=============== ===========
disable-account Disables a user account
firewall-drop   Adds an IP address to the iptables deny list.
firewalld-drop  Adds an IP address to the firewalld drop list.
restart.sh      Restarts the Wazuh agent or server.
netsh.exe       Blocks an IP address using netsh.
=============== ===========

Custom active response actions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

One of the benefits of the Wazuh Active Response module is its adaptability. Wazuh allows security teams to create :doc:`custom active response </user-manual/capabilities/active-response/custom-active-response-scripts>` actions in any programming language, tailoring them to their specific needs. This ensures that when a threat is detected, the response can be customized to align with the organization's requirements.

Automating incident response with Wazuh
---------------------------------------

To leverage the Wazuh Active Response module, you need to :doc:`configure </user-manual/capabilities/active-response/how-to-configure>` the action to be carried out when a specific event occurs on a monitored endpoint. For example, you can configure the Wazuh Active Response module to delete a malicious executable from an infected endpoint. In the examples that follow, we show how the Wazuh Active Response module handles different incidents.

Removing malware
^^^^^^^^^^^^^^^^

You can use the Wazuh Active Response module in conjunction with the :doc:`File Integrity Monitoring </user-manual/capabilities/file-integrity/index>` module and :doc:`VirusTotal integration </user-manual/capabilities/malware-detection/virus-total-integration>` to detect and remove malicious files from an endpoint.

The image below shows the following activities:

#. Rule ID ``554`` is fired when a file is added to the ``Downloads`` directory which is monitored with the Wazuh File Integrity Monitoring module.
#. Rule ID ``87105`` triggers when Wazuh extracts the file hash, requests data about the file hash from the VirusTotal database via its API, and receives a malicious file response.
#. Rule ID ``553`` is fired when a file is deleted from the ``Downloads`` directory which is monitored with the Wazuh File Integrity Monitoring module.
#. Rule ID ``110006`` is fired when the Wazuh Active Response module deletes the malicious file from the endpoint.

.. thumbnail:: /images/getting-started/use-cases/incident-response/removing-malware-activities.png
   :title: Removing malware activity events
   :alt: Removing malware activity events
   :align: center
   :width: 80%

In this scenario, the Wazuh Active Response module automatically removes the malicious file, reducing the time between threat detection and mitigation.

Responding to DoS attacks
^^^^^^^^^^^^^^^^^^^^^^^^^

The primary goal of a DoS attack is to render the target inaccessible to legitimate users, causing a denial of service. In the image below, we show how the Wazuh Active Response module blocks malicious IP addresses performing a DoS against a web server on an Ubuntu endpoint.

.. thumbnail:: /images/getting-started/use-cases/incident-response/ar-module-blocks-dos-attack.png
   :title: Host blocked by Active Response alerts
   :alt: Host blocked by Active Response alerts
   :align: center
   :width: 80%

In this case, the Wazuh Active Response module automatically blocks the malicious hosts from causing a DoS attack on the web server. Thereby ensuring the availability of the web server to the authorized users.

Disabling a user account after a brute-force attack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Account lockout is a security measure used to defend against brute force attacks by limiting the number of login attempts a user can make within a specified time. We use the Wazuh Active Response module to disable the user account whose password is being guessed by an attacker.

In the image below, the Wazuh Active Response module disables the account on a Linux endpoint and re-enables it again after 5 minutes. 

.. thumbnail:: /images/getting-started/use-cases/incident-response/account-temporarily-disabled.png
   :title: Linux account temporarily disabled alerts
   :alt: Linux account temporarily disabled alerts
   :align: center
   :width: 80%

In this scenario, when an attacker tries to guess a user's password repeatedly and fails, the account becomes temporarily inaccessible. This impedes attackers who rely on brute-force methods to guess user account passwords.

By utilizing the Wazuh Active Response module, security teams can automate responses to different incidents. Thereby ensuring efficient incident response and a more resilient cybersecurity posture.
