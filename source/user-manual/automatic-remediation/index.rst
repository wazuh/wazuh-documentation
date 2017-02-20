.. _automatic_remediation:

Automatic remediation
==========================

.. warning::
	Draft document.

A remediation solution can perform actions or alerts configurations to prevent the access to the service or network where the threat came from.
This automated remediation is called **Active response** in Wazuh.

**Active response** allows to execute a script in response to certain triggers as specific alerts, alert levels or rule groups.
Any number of responses can be attached to any of the trigger, but it is important to be careful because a bad implementation of the rules and responses, can be dangerous.
An attacker coud use the rules against you.


.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        manual_remediation
        how_to_remediation
        faq_remediation
