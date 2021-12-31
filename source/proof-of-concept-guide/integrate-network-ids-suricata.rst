.. meta::
  :description: Wazuh can be integrated with Suricata, a NIDS that can detect threats by monitoring network traffic. Learn more about this in this POC.

.. _poc_ids_integration_suricata:

Network IDS integration
=======================

You can integrate Wazuh with Suricata, a network-based intrusion detection system (NIDS), to detect threats by monitoring network traffic. This solution can generate JSON logs of NIDS events and provide additional insight into your network's security with its network traffic inspection capabilities.

To see an example use case of a NIDS integration with Wazuh, go to the :ref:`Catch suspicious network traffic <learning_wazuh_suricata>` section of the documentation.


Configuration
-------------

Configure your environment as follows to test the POC.

#. Install Suricata (tested with version 6.0.3) on the CentOS 8 monitored endpoint. This requires an EPEL repository that depends on your operating system version.

    .. code-block:: console

        # yum install epel-release yum-plugin-copr
        # yum copr enable @oisf/suricata-6.0
        # yum install suricata


#. Download and extract Emerging rules.

    .. code-block:: console

        # curl -L https://rules.emergingthreats.net/open/suricata-6.0.3/emerging.rules.tar.gz -o /tmp/emerging.rules.tar.gz
        # tar -C /etc/suricata/ -xvzf /tmp/emerging.rules.tar.gz *.rules
        # chown suricata:suricata /etc/suricata/rules/*.rules
        # chmod 640 /etc/suricata/rules/*.rules

#. Download modified Suricata settings to ``/etc/suricata/suricata.yaml``.

    .. code-block:: console

        # mv /etc/suricata/suricata.yaml /etc/suricata/suricata.yaml.bak
        # curl -L http://www.branchnetconsulting.com/wazuh/suricata.yaml -o /etc/suricata/suricata.yaml

#. Start Suricata.

    .. code-block:: console

        # systemctl enable suricata
        # systemctl daemon-reload
        # systemctl start suricata

#. Add the following settings to the ``/var/ossec/etc/ossec.conf`` file of the monitored CentOS 8 endpoint. This is to configure the Wazuh agent to read the Suricata logs file.

    .. code-block:: XML

        <ossec_config>
        
          <localfile>
            <log_format>syslog</log_format>
            <location>/var/log/suricata/eve.json</location>
          </localfile>
          
        </ossec_config>


#. Restart the Wazuh agent to apply the changes. 

    .. code-block:: console

        # systemctl restart wazuh-agent


Steps to generate the alerts
----------------------------

#. Run the following command from the CentOS 8 monitored system. This web request is known to trip NIDS rules.

    .. code-block:: console

        # curl http://testmyids.com

Query the alerts
----------------

You can visualize the alert data in the Wazuh Kibana plugin. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

- ``rule.groups:suricata``

.. thumbnail:: ../images/poc/Network_IDS_integration.png
          :title: Network IDS integration - Suricata
          :align: center
          :wrap_image: No

..
  Troubleshooting
  ---------------

  * Error concerning network interface in Suricata log file ``/var/log/suricata/suricata.log``.
    
  To solve this issue, check the name of your network interface and configure it accordingly in the files ``/etc/sysconfig/suricata`` and ``/etc/suricata/suricata.yaml``.
