.. Copyright (C) 2019 Wazuh, Inc.

.. _automatic_remediation:

Active response
===============

Active responses perform various countermeasures to address active threats, such as blocking access to an agent from the threat source when certain criteria are met.

Active responses execute a script in response to the triggering of specific alerts based on the alert level or rule group. Any number of scripts can be initiated in response to a trigger, however, these responses should be considered carefully. Poor implementation of rules and responses may increase the vulnerability of the system.


.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        remediation-configuration
        remediation-faq
