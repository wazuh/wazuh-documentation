.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: The Wazuh File integrity monitoring (FIM) is a key capability of our platform. Learn how you can capitalize on this feature to protect your system.

.. _manual_file_integrity:

File integrity monitoring
==========================

Wazuh File integrity monitoring (FIM) system watches selected files and triggers alerts when these files are modified. The component responsible for this task is called ``syscheck``. This component stores the cryptographic checksum and other attributes of files or Windows registry keys and regularly compares them with the current files being used by the system, watching for changes.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        fim-fields-rule-mapping
        fim-configuration
