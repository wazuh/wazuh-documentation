.. _intrusion-examples:

Examples
========

1. `Ignoring false positives`_

Ignoring false positives
------------------------

.. code-block:: xml

    <rule id="100100" level="0">
        <if_group>rootcheck</if_group>
        <match>/dev/.blkid.tab</match>
        <description>Ignore false positive for /dev/.blkid.tab</description>
    </rule>
