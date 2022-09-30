.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This PoC shows how Wazuh provides out-of-the-box rules capable of identifying brute-force attacks. Learn more about it in this section of the documentation.

.. _poc_detect_bruteforce:

Detecting a brute-force attack
==============================

Brute forcing SSH (on Linux) or RDP (on Windows) are common attack vectors. Wazuh provides out-of-the-box rules capable of identifying brute-force attacks by correlating multiple authentication failure events.

To see an example use case where you configure an active response to block the IP of an attacker, check the :ref:`Blocking attacks with Active Response <blocking_attacks_active_response>` section of the documentation.


Configuration
-------------

Configure your environment as follows to test the PoC.

- Make sure you have SSH installed and enabled in a system chosen to play as an attacker.

- Install Hydra on an external Linux system to execute brute-force attacks.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: XML

            # yum install -y hydra

      .. group-tab:: Apt

        .. code-block:: XML

            # apt-get install -y hydra


Steps to generate the alerts
----------------------------

#. Replace ``<ubuntu.agent.endpoint>`` for Linux and ``<win.agent.endpoint>`` for Windows with the appropriate destination in the following commands and run multiple failed authentication failure attempts against the monitored endpoints.

    - For the monitored Linux endpoint:

        .. code-block:: console

            # hydra -l badguy -p wrong_password <ubuntu.agent.endpoint> ssh

    - For the monitored Windows endpoint:

        .. code-block:: console

            # hydra -l Administrator -p wrong_password <win.agent.endpoint> rdp


Query the alerts
----------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

- Linux: ``rule.id:(5710 OR 5712)``. Other related rules are ``5711``, ``5716``, ``5720``, ``5503``, ``5504``.


.. thumbnail:: ../images/poc/Detecting-a-brute-force-attack-1.png
          :title: Detecting a brute-force attack on Linux
          :align: center
          :wrap_image: No


- Windows: ``rule.id:(60122 OR 60137 OR 60204)``

.. thumbnail:: ../images/poc/Detecting-a-brute-force-attack-2.png
          :title: Detecting a brute-force attack on Windows
          :align: center
          :wrap_image: No
