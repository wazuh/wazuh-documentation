.. Copyright (C) 2019 Wazuh, Inc.

.. _anomaly-examples:

Configuration
=============

#. `Basic example`_
#. `Ignoring false positives`_

Basic example
-------------

To configure the options for syscheck and rootcheck, go to :ref:`ossec.conf <reference_ossec_conf>`. If you want more information about the exact configuration options that are available, go to the :ref:`Syscheck section <reference_ossec_syscheck>` and :ref:`Rootcheck section <reference_ossec_rootcheck>`. Also, see the following sections: :ref:`frequency <reference_ossec_rootcheck_frequency>`, :ref:`rootkit_files <reference_ossec_rootcheck_rootkit_files>` and :ref:`rootkit_trojans <reference_ossec_rootcheck_rootkit_trojans>`.

Here is a basic example of how to configure the database for rootkits (files and trojans):

.. code-block:: xml

  <rootcheck>
    <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
    <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
  </rootcheck>

Ignoring false positives
------------------------

.. code-block:: xml

    <rule id="100100" level="0">
        <if_group>rootcheck</if_group>
        <match>/dev/.blkid.tab</match>
        <description>Ignore false positive for /dev/.blkid.tab</description>
    </rule>
