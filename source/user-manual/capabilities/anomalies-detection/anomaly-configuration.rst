.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about anomaly and malware detection with Wazuh. In this section, we show you a basic example and how to ignore false positives. 
  
.. _anomaly-examples:

Configuration
=============

#. `Basic example`_
#. `Ignoring false positives`_

Basic example
-------------

To configure the options for syscheck and rootcheck, go to :ref:`agent.conf <reference_client_conf>`. If you want more information about the exact configuration options that are available, go to the :ref:`Syscheck section <reference_ossec_syscheck>` and :ref:`Rootcheck section <reference_ossec_rootcheck>`. Also, see the following sections: :ref:`frequency <reference_ossec_rootcheck_frequency>`, :ref:`rootkit_files <reference_ossec_rootcheck_rootkit_files>` and :ref:`rootkit_trojans <reference_ossec_rootcheck_rootkit_trojans>`.

Here is a basic example of how to configure the database for rootkits (files and trojans):

.. code-block:: xml

  <rootcheck>
    <rootkit_files>etc/shared/rootkit_files.txt</rootkit_files>
    <rootkit_trojans>etc/shared/rootkit_trojans.txt</rootkit_trojans>
  </rootcheck>

Ignoring false positives
------------------------

.. code-block:: xml

    <rule id="100100" level="0">
        <if_group>rootcheck</if_group>
        <match>/dev/.blkid.tab</match>
        <description>Ignore false positive for /dev/.blkid.tab</description>
    </rule>
