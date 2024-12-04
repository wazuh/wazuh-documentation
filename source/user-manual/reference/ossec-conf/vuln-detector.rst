.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the available options and how to configure the vulnerability detection module of Wazuh in this section of our documentation.

vulnerability-detection
=======================

This section covers the configuration for the :doc:`/user-manual/capabilities/vulnerability-detection/index` module.

.. topic:: XML section name

   .. note::

      In Wazuh 4.8.0, we rename the previous ``<vulnerability-detector>`` tag to ``<vulnerability-detection>``.

   .. code-block:: xml

      <vulnerability-detection>
      </vulnerability-detection>

Options
-------

.. contents::
   :local:
   :depth: 1
   :backlinks: none

+---------------------------+-----------------------------------------------------------------------------+
| Options                   | Allowed values                                                              |
+===========================+=============================================================================+
| `enabled`_                | ``yes``, ``no``                                                             |
+---------------------------+-----------------------------------------------------------------------------+
| `feed-update-interval`_   | Positive number + Time unit suffix                                          |
+---------------------------+-----------------------------------------------------------------------------+
| `index-status`_           | ``yes``, ``no``                                                             |
+---------------------------+-----------------------------------------------------------------------------+
| `offline-url`_            | ``file://</ABSOLUTE_PATH_TO/OFFLINE_CONTENT>``, ``http[s]://<CONTENT_URL>`` |
+---------------------------+-----------------------------------------------------------------------------+

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
.. versionadded:: 4.8.0

File path or URL for offline content access.

+--------------------+-----------------------------------------------------------------------------+
| **Default**        | Empty                                                                       |
+--------------------+-----------------------------------------------------------------------------+
| **Allowed values** | ``file://</ABSOLUTE_PATH_TO/OFFLINE_CONTENT>``, ``http[s]://<CONTENT_URL>`` |
+--------------------+-----------------------------------------------------------------------------+

Where:

-  ``file://</ABSOLUTE_PATH_TO/OFFLINE_CONTENT>``: File path pointing to offline content. For example, ``file:///var/path/to/the/cves.file.zip``
-  ``http[s]://<CONTENT_URL>``: URL starting with either ``http://`` or ``https://``, pointing to local network content or online content accessible via the internet.

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
      <offline-url>file:///var/path/to/the/cves.file.zip</offline-url> <!-- Optional -->
   </vulnerability-detection>

.. note::

   Supported compression formats include zip, xz, and gzip. The module also accepts raw JSON content in plain text files.
