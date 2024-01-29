.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the available options and how to configure the vulnerability detection module of Wazuh in this section of our documentation.

vulnerability-detection
=======================

This section covers the configuration for the :doc:`/user-manual/capabilities/vulnerability-detection/index` module.

.. topic:: XML section name

	.. code-block:: xml

		<vulnerability-detection>
		</vulnerability-detection>

Options
-------

.. contents::
   :local:
   :depth: 1
   :backlinks: none

+---------------------------+------------------------------------+
| Options                   | Allowed values                     |
+===========================+====================================+
| `enabled`_                | ``yes``, ``no``                    |
+---------------------------+------------------------------------+
| `feed-update-interval`_   | Positive number + Time unit suffix |
+---------------------------+------------------------------------+
| `index-status`_           | ``yes``, ``no``                    |
+---------------------------+------------------------------------+

enabled
^^^^^^^

Enables the vulnerability detection module.

+--------------------+-----------------------------+
| **Default**        | ``yes``                     |
+--------------------+-----------------------------+
| **Allowed values** | ``yes``, ``no``             |
+--------------------+-----------------------------+

feed-update-interval
^^^^^^^^^^^^^^^^^^^^

Time interval for periodic feed updates.

+--------------------+------------------------------------------------------------------------------------------------------+
| **Default**        | ``60m``                                                                                              |
+--------------------+------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number containing a time unit suffix character. For example ``2h`` for 2 hours            |
+--------------------+------------------------------------------------------------------------------------------------------+

index-status
^^^^^^^^^^^^

Enables indexing of vulnerability inventory data.

+--------------------+-----------------------------+
| **Default**        | ``yes``                     |
+--------------------+-----------------------------+
| **Allowed values** | ``yes``, ``no``             |
+--------------------+-----------------------------+

interval
^^^^^^^^

.. deprecated:: 4.8.0

run_on_start
^^^^^^^^^^^^

.. deprecated:: 4.8.0

retry_interval
^^^^^^^^^^^^^^

.. deprecated:: 4.8.0

provider
^^^^^^^^

.. deprecated:: 4.8.0

Example of configuration
------------------------

.. code-block:: xml

   <vulnerability-detection>
      <enabled>yes</enabled>
      <index-status>yes</index-status>
      <feed-update-interval>60m</feed-update-interval>
   </vulnerability-detection>

   <indexer>
      <enabled>yes</enabled>
      <hosts>
         <host>https://0.0.0.0:9200</host>
      </hosts>
      <ssl>
         <certificate_authorities>
         <ca>/etc/filebeat/certs/root-ca.pem</ca>
         </certificate_authorities>
         <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
         <key>/etc/filebeat/certs/filebeat-key.pem</key>
      </ssl>
   </indexer>
