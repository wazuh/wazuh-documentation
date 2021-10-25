.. _poc_detect_bruteforce:

Detecting a brute-force attack
==============================

Identify SSH and RDP brute force attacks using Wazuh's out-of-the-box rules. This rules can correlate multiple authentication failure events and alert about these attacks.

Configuration
-------------

#. Install `ssh` in a system that will play as the attacker from the operating system repositories if missing.

#. Run ``yum install -y hydra`` to install `hydra`. This tool can execute automated RDP connections.

Steps to generate the alerts
----------------------------

#. Replace ``<username@rhel.agent.endpoint>`` with the appropriate destination in the following command. Run it from the attacker system to create multiple failed authentication attempts to the monitored Linux endpoint.

    .. code-block:: console

        # for i in `seq 1 10`; do sshpass -p 'wrong_password' ssh -o StrictHostKeyChecking=no <username@rhel.agent.endpoint>; done

#. Replace ``<username@win.agent.endpoint>`` with the appropriate destination in the following command. Run it from the attacker system to create multiple failed authentication attempts to the monitored Windows endpoint.
  
    .. code-block:: console

        # hydra -l Administrator -p wrong_password <username@win.agent.endpoint> rdp


Alerts
------

Related alerts can be found with:

* Linux: ``rule.id:(5710 OR 5712)``. (Other related rules are ``5711``, ``5716``, ``5720``, ``5503``, ``5504``)
* Windows: ``rule.id:(60122 OR 60137)``

Affected endpoints
------------------

- RHEL 7 agent host
- Windows agent host
