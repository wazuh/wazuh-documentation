.. Copyright (C) 2018 Wazuh, Inc.

.. _installation_splunk:

Installing Splunk
=================

This guide describes the Splunk Enterprise installation process for two different types of distributed architecture, along with the Splunk forwarder and the Wazuh app for Splunk.

- The **single-instance architecture** is recommended for testing and evaluation purposes, or also for small-medium sized environments.
- The **multi-instance architecture** is recommended for larger environments with huge amounts of data (in this case, Wazuh alerts) and users.

+------------------------------------------------------------------------+-------------------------------------------------------------+
| Installation type                                                      | Description                                                 |
+========================================================================+=============================================================+
| :ref:`Single-instance installation <splunk_basic>`                     | Install Splunk using the single-instance architecture.      |
+------------------------------------------------------------------------+-------------------------------------------------------------+
| :ref:`Multi-instance installation <splunk_distributed>`                | Install Splunk using the multi-instance architecture.       |
+------------------------------------------------------------------------+-------------------------------------------------------------+

Find more information about how to scale your environments using Splunk Enterprise on the `official documentation <http://docs.splunk.com/Documentation/Splunk/7.2.1/Deploy/Distributedoverview>`_.

.. warning::
  The Wazuh app for Splunk requires the installation of a Wazuh manager and Wazuh API in order to work properly. Check out the :ref:`installation guide <installation>` before proceeding with Splunk.

.. note::
  On Linux systems, the Splunk installation procedure **requires a 64-bit version** of the operating system.

  Although Splunk can be installed on different OS, the Splunk app is **only compatible with Linux systems**.

.. topic:: Contents

  .. toctree::
    :maxdepth: 1

    splunk-basic
    splunk-distributed
    splunk-app
    splunk-forwarder
    splunk-reverse-proxy
