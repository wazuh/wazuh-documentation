.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh data analysis engine is responsible for decoding logs, triggering rules, and generating alerts in Wazuh. Learn more in this section of the documentation.
  
Data analysis
=============

Wazuh provides security monitoring for various platforms, including endpoints, containers, and cloud environments. It collects log data from these platforms through multiple methods such as the Wazuh agent, agentless monitoring, syslog, and APIs. Once collected, the log data is processed by the Wazuh data analysis engine. This engine utilizes decoders to parse the log messages into useful fields and matches these fields against out-of-the-box or custom rules. The analyzed data is then utilized for threat detection, security configuration assessment, and other Wazuh capabilities.

The Wazuh data analysis engine is responsible for decoding logs, triggering rules, and generating alerts in Wazuh using the following scheme:

#. **Log collection**: Wazuh gathers logs from monitored endpoints, applications, and network devices. These logs come from various sources including operating system logs, syslog-enabled devices, cloud provider logs, and custom logs. See the :doc:`log data collection </user-manual/capabilities/log-data-collection/index>` documentation for more information.
#. **Log decoding**: The Wazuh server analyzes the collected logs in real-time using decoders. Decoders are responsible for parsing and normalizing log data, converting raw log data into a unified and structured format, and extracting the most relevant fields that Wazuh can process effectively.
#. **Rule matching and alert visualization**: After decoding, the Wazuh server compares logs against its ruleset and triggers alerts when specific conditions are met. The alerts generated are recorded in ``/var/ossec/logs/alerts/alerts.log`` and ``/var/ossec/logs/alerts/alerts.json`` on the Wazuh server. Then, using Filebeat, the logs are forwarded and stored on the Wazuh indexer.  These alerts can then be accessed through the Wazuh dashboard **Security Events** tab, where users can conduct real-time log data queries, apply filters, and identify anomalies and potential security incidents within their environment.

While the Wazuh development team continuously contributes to improving the Wazuh ruleset, we also encourage contributions from the Wazuh community to ensure its continuous improvement. As users adopt diverse technologies tailored to their specific requirements, the constant development of new security-relevant devices and software programs worldwide becomes increasingly relevant. Wazuh recognizes this need for adaptability and offers a comprehensive range of rules and decoders within its data analysis engine. Moreover, Wazuh empowers users with the flexibility to develop custom rules and decoders in addition to over 3000 rules and decoders that come out-of-the-box. For more information about the out-of-the-box rules and decoders, refer to the `ruleset directory <https://github.com/wazuh/wazuh/tree/master/ruleset>`__ on our GitHub repository.

Directory layout
----------------

Below, we show the structure of the ruleset directory on the Wazuh server:

.. code-block:: none

   /var/ossec/
           ├─ etc/
           │   ├─ decoders/
           |   |        └─ local_decoder.xml
           │   └─ rules/
           |         └─ local_rules.xml
           └─ ruleset/
                   ├─ decoders/
                   └─ rules/

.. note::
   
   You can find all the out-of-the-box rules and decoders inside the ``/var/ossec/ruleset/ directory``. All files within this directory are overwritten or modified during the Wazuh upgrade process. Therefore, we do not recommend editing or adding your custom files here. Instead, we recommend making custom changes in the ``/var/ossec/etc/`` directory. Here, you can add your own decoders and rules files or use the default ``/var/ossec/etc/decoders/local_decoder.xml`` and ``/var/ossec/etc/rules/local_rules.xml`` files.

GitHub repository
-----------------

Visit the `Wazuh GitHub <https://github.com/wazuh/wazuh/tree/master/ruleset>`__ repository to view the ruleset in detail.

In the repository, you will find:

-  **New rules and decoders**

   We update and maintain the out-of-the-box rules and decoders to increase detection coverage and accuracy. These rules and decoders  assist in meeting regulatory compliance standards, threat detection, security configuration assessment, and mapping events and alerts to the MITRE ATT&CK framework more accurately.

-  **Tools**

   We provide useful tools such as the `wazuh-logtest </user-manual/reference/tools/wazuh-logtest>`__, which allows for testing rules and decoders before using them. This tool processes only log per line and is available in ``/var/ossec/bin/wazuh-logtest`` on the Wazuh server, along with various other binaries which help in managing the Wazuh server and agents. For more information you can take a look at `Wazuh tools </user-manual/reference/tools/index>`__ documentation.

.. topic:: Content

   .. toctree::
      :maxdepth: 2

      decoders/index
      rules/index
      ruleset-xml-syntax/index
      testing
      cdb-list
      mitre
