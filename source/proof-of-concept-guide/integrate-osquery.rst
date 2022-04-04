.. meta::
  :description: Wazuh agent can be integrated with Osquery, making it easy to capture additional information from the endpoint. Learn more about this in this PoC.


.. _poc_integrate_osquery:

Osquery integration
===================

Wazuh agent can be integrated with Osquery, making it easy to capture additional information from the endpoint. This integration can be helpful for telemetry and threat hinging.

More information about using Osquery with Wazuh can be found in the :ref:`Osquery <osquery>` section of our documentation.

Configuration
-------------

Configure your environment as follows to test the PoC.

#. Install Osquery on the monitored Ubuntu 20 endpoint.

    .. code-block:: console

        # wget https://pkg.osquery.io/deb/osquery_4.5.1_1.linux.amd64.deb
        # apt install ./osquery_4.5.1_1.linux.amd64.deb -y

#. Add this content block to the Osquery configuration file ``/etc/osquery/osquery.conf``

    .. code-block:: JSON

        {
        "options": {
            "config_plugin": "filesystem",
            "logger_plugin": "filesystem",
            "utc": "true"
        },

        "schedule": {
            "system_info": {
                "query": "SELECT hostname, cpu_brand, physical_memory FROM system_info;",
                "interval": 3600
            },
            "high_load_average": {
                "query": "SELECT period, average, '70%' AS 'threshold' FROM load_average WHERE period = '15m' AND average > '0.7';",
                "interval": 900,
                "description": "Report if load charge is over 70 percent."
            },
            "low_free_memory": {
                "query": "SELECT memory_total, memory_free, CAST(memory_free AS real) / memory_total AS memory_free_perc, '10%' AS threshold FROM memory_info WHERE memory_free_perc < 0.1;",
                "interval": 1800,
                "description": "Free RAM is under 10%."
            }
        },

        "packs": {
            "osquery-monitoring": "/usr/share/osquery/packs/osquery-monitoring.conf",
            "incident-response": "/usr/share/osquery/packs/incident-response.conf",
            "it-compliance": "/usr/share/osquery/packs/it-compliance.conf",
            "vuln-management": "/usr/share/osquery/packs/vuln-management.conf",
            "hardware-monitoring": "/usr/share/osquery/packs/hardware-monitoring.conf",
            "ossec-rootkit": "/usr/share/osquery/packs/ossec-rootkit.conf"
            }
        }

#. Edit ``/var/ossec/etc/ossec.conf`` on the monitored Ubuntu 20 endpoint and enable the Osquery wodle.

    .. code-block:: XML

        <ossec_config>
            <wodle name="osquery">
                <disabled>no</disabled>
                <run_daemon>yes</run_daemon>
                <bin_path>/usr/bin</bin_path>
                <log_path>/var/log/osquery/osqueryd.results.log</log_path>
                <config_path>/etc/osquery/osquery.conf</config_path>
                <add_labels>no</add_labels>
            </wodle>
        </ossec_config>

#. Start Osqueryd service.

    .. code-block:: console

        # systemctl start osqueryd


#. Restart the Wazuh agent to apply changes.

    .. code-block:: console

        # systemctl restart wazuh-agent

Steps to generate the alerts
----------------------------

No action is required. Wazuh automatically reads the ``/var/log/osquery/osqueryd.results.log`` file and generates alerts based on these logs.

Query the alerts
----------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

* ``rule.groups:osquery``

.. thumbnail:: ../images/poc/Osquery-integration.png
          :title: Osquery integration
          :align: center
          :wrap_image: No
