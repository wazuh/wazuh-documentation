.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out some Active Response use cases in this section of the Wazuh documentation.

.. _active_response_use_cases:

Use cases
=========

These use cases show how to configure an active response and an Active Response monitor with a trigger and an action, then test them with a simulated attack:

-  :doc:`Blocking web attacks with active response <blocking-web-attacks>`: Blocks the IP address of a cross-site scripting attacker. You need an Ubuntu endpoint with a Wazuh agent and Apache, and a Linux endpoint with curl.

-  :doc:`Removing a malicious file with active response <removing-malicious-file>`: Deletes a test malware file that file integrity monitoring detects. You need a Windows endpoint with a Wazuh agent and Python 3.

.. toctree::
   :maxdepth: 1
   :hidden:

   blocking-web-attacks
   removing-malicious-file
