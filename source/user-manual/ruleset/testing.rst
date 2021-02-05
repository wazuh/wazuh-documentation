.. Copyright (C) 2021 Wazuh, Inc.

.. _ruleset_testing:

Testing decoders and rules
===============================

The tool *wazuh-logtest* allow us to test how an event is decoded and if an alert is generated.

Run the tool */var/ossec/bin/wazuh-logtest* and paste the following log::

    Mar  8 22:39:13 ip-10-0-0-10 sshd[2742]: Accepted publickey for root from 73.189.131.56 port 57516


.. code-block:: console

    $ /var/ossec/bin/wazuh-logtest

.. code-block:: none
    :class: output

    Mar  8 22:39:13 ip-10-0-0-10 sshd[2742]: Accepted publickey for root from 73.189.131.56 port 57516

    **Phase 1: Completed pre-decoding.
           full event: 'Mar  8 22:39:13 ip-10-0-0-10 sshd[2742]: Accepted publickey for root from 73.189.131.56 port 57516'
           hostname: 'ip-10-0-0-10'
           program_name: 'sshd'
           log: 'Accepted publickey for root from 73.189.131.56 port 57516'

    **Phase 2: Completed decoding.
           decoder: 'sshd'
           dstuser: 'root'
           srcip: '73.189.131.56'

    **Phase 3: Completed filtering (rules).
           Rule id: '5715'
           Level: '3'
           Description: 'sshd: authentication success.'
    **Alert to be generated.

.. warning::

    The decoder name showed in *Phase 2* will be the name of the parent decoder.
