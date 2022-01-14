.. Copyright (C) 2022 Wazuh, Inc.

.. _kibana_dev_tools:

Dev tools
=========

The *Dev tools* tab provides an user interface to interact with the Wazuh API. You can use it to send requests and get a response. This tab uses your currently selected API from :ref:`kibana_settings`. The interface is split into two panes: *editor pane* and *response pane*.

.. thumbnail:: ../../../images/kibana-app/features/dev-tools/dev-tools.png
  :align: center
  :width: 100%

On the editor pane, you can type API requests in several ways:

- Using *in-line parameters*, just like in a browser.
- Using *JSON-formatted parameters*.
- Combining both in-line and JSON-formatted parameters (the in-line parameter has precedence over the JSON-formatted one).
