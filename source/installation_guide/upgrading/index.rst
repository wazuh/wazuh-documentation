.. _upgrading_wazuh:

Upgrading to Wazuh 2.0
===================================================

This section describes how to upgrade an existing Wazuh installation to **Wazuh 2.0**, in order to access to the new features.

If you find any problem or error please let us know on our mailing list: `mailing list <https://groups.google.com/d/forum/wazuh>`_

Singlehost Configuration
------------------------

This section helps you to update your installation, having Wazuh 1.1 + ELK2 on the same server.

Update to Wazuh 2.0 keeping Elastic 2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Step 1: :ref:`Upgrade manager<upgrading_manager>`
- Step 2: :ref:`Upgrade agent<upgrading_agent>`
- Step 3: Download the new logstash configuration:

		 ::

			curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
			curl -so /etc/logstash/wazuh-elastic2-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic2-template.json

At this point, you should have Wazuh 2.0 installed and working. ELK should be the same, but with the new templates.

Update to Wazuh 2.0 and Elastic 5
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Step 1: :ref:`Upgrade manager<upgrading_manager>`
- Step 2: :ref:`Upgrade agent<upgrading_agent>`
- Step 3: :ref:`Upgrade ELK<upgrading_elk>`

At this point, you should have Wazuh 2.0 and Elastic 5 installed and working.

Distributed Configuration
-------------------------

This section helps you to update your installation, having Wazuh 1.1 and ELK2 on different servers

Update to Wazuh 2.0 keeping Elastic 2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Step 1: :ref:`Upgrade manager<upgrading_manager>`
- Step 2: :ref:`Upgrade agent<upgrading_agent>`
- Step 3: Download the new logstash configuration:

		 ::

			curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
			curl -so /etc/logstash/wazuh-elastic2-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic2-template.json

At this point, you should have Wazuh 2.0 installed and working. ELK should be the same, but with the new templates.

Update to Wazuh 2.0 and Elastic 5
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Step 1: :ref:`Upgrade manager<upgrading_manager>`
- Step 2: :ref:`Upgrade agent<upgrading_agent>`
- Step 4: :ref:`Upgrade Logstash-forwarder to Filebeat <upgrading_lf_to_filebeat>`
- Step 3: :ref:`Upgrade ELK<upgrading_elk>`


At this point, you should have Wazuh 2.0 and Elastic 5 installed and working.

Migrate old data
----------------

We developed new templates in order to work with Elastic 5. For that reason, you will not see the old data at first on your system. But don't worry. Use this script in order to migrate the old data to the new configuration.

ToDo

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       upgrading_manager
       upgrading_agent
       upgrading_lf_to_filebeat
       upgrading_ELK
