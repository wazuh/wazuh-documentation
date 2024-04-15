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
| `offline-url`_            | ``<path>`` (starting with file://) |
|                           | or ``<URL>``                       |
|                           | (starting with http:// or https://)|
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

offline-url
^^^^^^^^^^^
Allows to specify a path or URL for offline content access.

+--------------------+-----------------------------+
| **Default**        | Empty                       |
+--------------------+-----------------------------+
| **Allowed values** | ``<path>``, ``<URL>``       |
+--------------------+-----------------------------+

``<path>``: A local file path starting with file://, pointing to offline content stored on the device.

``<URL>``: A URL starting with either http:// or https://, pointing to online content accessible via the internet or local network.

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
