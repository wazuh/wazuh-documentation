.. _upgrading_wazuh:

Upgrading to Wazuh 2.0
===================================================

This section describes how to upgrade an existing Wazuh installation to **Wazuh 2.0**, in order to access to the new features.

If you find any problem or error please let us know on our `mailing list <https://groups.google.com/d/forum/wazuh>`_

Update to Wazuh 2.0 keeping Elastic 2
-------------------------------------

- Step 1: :ref:`Upgrade manager<upgrading_manager>`
- Step 2: :ref:`Upgrade agent<upgrading_agent>`
- Step 3: :ref:`Configure Logstash<configure_logstash>`
- Step 4: :ref:`Configure Kibana<configure_kibana>`

Update to Wazuh 2.0 and Elastic 5
---------------------------------

- Step 1: :ref:`Upgrade manager<upgrading_manager>`
- Step 2: :ref:`Upgrade agent<upgrading_agent>`
- Step 3: If you have a distributed configuration, :ref:`Upgrade Logstash-forwarder to Filebeat <upgrading_lf_to_filebeat>`
- Step 4: :ref:`Upgrade ELK<upgrading_elk>`


Migrate old data
----------------

We developed new templates in order to work with Elastic 5. For that reason, you will not see the old data at first on your system.

We are currently working on a script to migrate the old data to the new configuration.

ToDo

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       upgrading_manager
       upgrading_agent
       upgrading_lf_to_filebeat
       upgrading_ELK
       configure_logstash
       configure_kibana
