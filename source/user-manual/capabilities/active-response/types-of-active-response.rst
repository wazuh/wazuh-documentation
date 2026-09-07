.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the difference between stateless and stateful active responses in the Wazuh documentation.

.. _active_response_types:

Types of active response
=========================

Active responses can be stateless or stateful, depending on whether the action needs to be automatically reverted.

-  A stateless active response executes an action once and does not automatically revert it. For example, a stateless response can delete a malicious file from a monitored endpoint.
-  A stateful active response executes an action for a specified period and automatically reverts it when the configured timeout expires. For example, a stateful response can temporarily block an IP address and unblock it after the timeout.

See :ref:`Developing active response scripts <developing_active_response_scripts>` for the steps a stateless or stateful script must perform to handle these actions correctly.
