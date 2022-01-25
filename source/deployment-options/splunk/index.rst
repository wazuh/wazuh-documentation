.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn how to install Splunk Enterprise as a single or multi-instance cluster along with the Splunk forwarder and the Wazuh Splunk app. 

.. _installation_splunk:

Installing Wazuh with Splunk
============================

This guide describes how to install Splunk Enterprise as a single instance or as a multi-instance cluster along with the Splunk forwarder and the Wazuh Splunk app.

- :ref:`Single-instance installation <splunk_basic>`: Install Splunk using the single-instance architecture. It is recommended for testing and evaluation purposes, or for small-medium sized environments.

- :ref:`Splunk cluster installation <splunk_distributed>`: Install a cluster with Splunk multi-instance architecture. It is recommended to replicate data along different indexes and make distributed searches.

To learn more about how Splunk works, see the `Splunk documentation <https://docs.splunk.com/Documentation>`_. Additionally, you can check the `Splunk Distributed Deployment Manual <http://docs.splunk.com/Documentation/Splunk/|SPLUNK_LATEST|/Deploy/Distributedoverview>`_ to learn how to scale your environments using Splunk Enterprise.

.. note::
  On Linux systems, the Splunk software **requires a 64-bit version** of the operating system. Although Splunk can be installed on different OS, the Splunk app is **only compatible with Linux systems**.

.. topic:: Contents

  .. toctree::
    :maxdepth: 1

    splunk-wazuh
    splunk-basic
    splunk-distributed
    splunk-app
    splunk-reverse-proxy
    splunk-polling
