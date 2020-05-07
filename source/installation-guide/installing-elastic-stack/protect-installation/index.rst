.. Copyright (C) 2020 Wazuh, Inc.

.. _protect_installation:

Protect your data in the Elastic Stack
======================================

Learn how to protect your data in the Elastic Stack in different ways. X-Pack is the official way, it comes with the Elastic Stack.
Search Guard is an open-source alternative to X-Pack, they can't be used together. We also show how to add simple authentication and SSL
for Kibana if you don't want to use X-Pack neither Search Guard.

+----------------------------------------------------+------------------------------------------------------+
| Type                                               | Description                                          |
+====================================================+======================================================+
| :ref:`X-Pack security <xpack_security>`            | Add authentication and encryption natively.          |
+----------------------------------------------------+------------------------------------------------------+
| :ref:`Search Guard <searchguard>`                  | Full security solution as an alternative to X-Pack.  |
+----------------------------------------------------+------------------------------------------------------+
| :ref:`NGINX reverse proxy for Kibana <kibana_ssl>` | Add simple authentication and SSL for Kibana.        |
+----------------------------------------------------+------------------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 2

   xpack
   searchguard
   kibana_ssl
