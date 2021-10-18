.. Copyright (C) 2021 Wazuh, Inc.
.. meta::
  :description: The Wazuh File integrity monitoring (FIM) is a key capability of our platform. Learn how you can capitalize on this feature to protect your system.

.. _manual_file_integrity:

File integrity monitoring
==========================

Wazuh's File integrity monitoring (FIM) system watches selected files and triggering alerts when these files are modified. The component responsible for this task is called ``syscheck``. This component stores the cryptographic checksum and other attributes of a known good file or Windows registry key and regularly compares it to the current file being used by the system, watching for changes.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        fim-configuration
