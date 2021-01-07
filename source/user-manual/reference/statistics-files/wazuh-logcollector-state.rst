.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh_logcollector_state_file:

wazuh-logcollector.state
=====================

.. versionadded:: 4.2

The statistical file for **wazuh-logcollector** is located at ``/var/ossec/var/run/wazuh-logcollector.state``.

It can be helpful to identify and measure if Wazuh is collecting and sending logs consistently.

By default, this file is updated every 5 seconds. This interval can be changed by modifying the ``logcollector.state_interval`` value from the :ref:`internal configuration <reference_internal_options>` file.

Below there is an example of the content of the file:

.. code-block:: json


