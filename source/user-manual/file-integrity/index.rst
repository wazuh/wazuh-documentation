.. _manual_file_integrity:

File integrity monitoring
==========================

.. warning::
	Draft section.

Wazuh monitors the file system, identifying changes in permissions, attributes, contents or ownership.

The component responsible for this task is called **syscheck**. This component, compares the cryptographic checksum of a known good file against the checksum of the same file after it has been modified.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        manual_syscheck
        how_to_fim
        syscheck_settings
        faqs_fim
