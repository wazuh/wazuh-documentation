.. Copyright (C) 2015, Wazuh, Inc.

.. meta:: :description: Splunk for Wazuh installation guide

Customize agents status indexation
==================================

The Wazuh app for Splunk has the ability to collect and index agents’ status data periodically. This information is stored on a separate index called ``wazuh-monitoring``. It comes enabled by default, but it’s possible to disable it or adjust the polling frequency.

.. warning::
  
   At this moment, this feature only works when Splunk is installed using the :doc:`minimal Splunk distributed architecture <splunk-minimal-distributed>` mode.

-  Open the inputs file located at ``/opt/splunk/etc/apps/SplunkAppForWazuh/default/inputs.conf``. The ``[script]`` section includes the following basic configuration:

   .. code-block:: none
      :emphasize-lines: 2,4

      [script:///opt/splunk/etc/apps/SplunkAppForWazuh/bin/get_agents_status.py]
      disabled = false
      index = wazuh-monitoring
      interval = 0 * * * *
      sourcetype = _json

-  To disable the indexation of agents' status data, change the ``disabled`` field to *true*.

-  By default, the script is configured to fetch and index agents' status data every hour.

-  The ``interval`` field can be configured using a decimal number or a cron schedule.

   -  If you specify the interval as a number, it may have a fractional component; for example, 3.14
   -  To specify a cron schedule, use the following format: ``<minute> <hour> <day of month> <month> <day of week>``
   -  Cron special characters are acceptable. You can use combinations of ``*``, ``,``, ``/``, and ``-`` to specify wildcards, separate values, specify ranges of values, and step values.

   .. warning::

      Although the default interval value can be ``60.0`` seconds, we recommend a minimum frequency of one hour to avoid overloading issues due to the excessive creation of data into the index.

-  Save the file when you're done editing it, and restart Splunk:

   .. code-block:: console

      # /opt/splunk/bin/splunk restart

.. note::

   You can find useful information about the ``inputs.conf`` file in the `official documentation <http://docs.splunk.com/Documentation/Splunk/|SPLUNK_LATEST|/Admin/Inputsconf>`_.
