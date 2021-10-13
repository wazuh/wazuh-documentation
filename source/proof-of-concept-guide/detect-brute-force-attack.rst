.. _poc_detect_bruteforce:


Detecting a brute-force attack
==============================

Brute forcing SSH (on Linux) or RDP (on Windows) are common attack vectors. Wazuh provides out of the box rules capable of identifying brute-force attacks, by correlating multiple authentication failure events.

Configuration
-------------

- Ensure you have SSH installed and enabled.

- If you want to execute automated RDP connections you can use ``hydra``:

    .. code-block:: console

      yum install -y hydra

Steps to Generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run multiple failed authentication failure attempts against the monitored endpoints:

- Linux example:

    .. code-block:: XML

        for i in `seq 1 10`; do sshpass -p 'wrong_password' ssh -o StrictHostKeyChecking=no <rhel-agent-endpoint>; done

- Windows example:
  
    .. code-block:: XML

        hydra -l Administrator -p wrong_password <win-agent-endpoint> rdp


Alerts
^^^^^^
- Linux: ``rule.id:(5710 OR 5712)`` (other related rules are 5711, 5716, 5720, 5503, 5504)
- Windows: ``rule.id:(60122 OR 60137)``

Affected endpoints
^^^^^^^^^^^^^^^^^^

- Linux RHEL
- Windows