.. _log_flow:

Log Flow
===============================

This diagram is a basic ilustration of the log flow, It will help you to understand how it works.

.. image:: ../../images/manual/log_analysis/log_flow.png
    :align: center
    :width: 100%

Wazuh Agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- **Collector** recopile all the logs from the server. The logs monitored logs are user defined.

Wazuh Manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Inside the manager, three phases can be distinguished:

- **Decode**: that extracts known fields from the log message, identifies key information (SRC IP, username...).
- **Analyze**: next step is to check if any of the rules that are internally stored, matches.
- **Alert**: once the rule is matched, the manager will create an alert.


.. note::
    More information about `Wazuh Ruleset <ruleset>`
