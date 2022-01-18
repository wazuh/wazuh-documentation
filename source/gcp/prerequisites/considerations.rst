.. Copyright (C) 2022 Wazuh, Inc.

.. _gcp_considerations:

Considerations for configuration
================================

Older logs
----------

The ``gcp-pubsub`` Wazuh module only looks for new logs based upon the key for last processed log object, which includes the datetime stamp. If older logs are loaded into the Cloud Storage or the ``only_logs_after`` option date is set to a datetime earlier than previous executions of the module, the older log files will be ignored and not ingested into Wazuh.
