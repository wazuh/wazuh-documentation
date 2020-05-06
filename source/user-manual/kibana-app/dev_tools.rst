.. _kibana_dev_tools:

Dev tools
^^^^^^^^^

This section provides an user interface to interact with the currently selected Wazuh API set in the :ref:`Wazuh API configuration <kibana_settings>`. The interface is split into an editor pane and a response pane:

.. thumbnail:: ../../images/kibana-app/sections/dev-tools/wazuh-kibana-dev-tools.png
  :align: center
  :width: 100%

On the editor pane, the API requests can be typed in several ways:

- Using ``in-line parameters``, just like in a browser.
- Using ``JSON-formatted parameters``.
- Combining both in-line and JSON-formatted parameters, where the in-line parameter has precedence over the JSON-formatted one.
