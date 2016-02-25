.. _ossec_installation:

OSSEC HIDS
==========

.. topic:: OSSEC HIDS Latest Stable Release (2.8.3)

           OSSEC is an Open Source Host-based Intrusion Detection System that performs log analysis, file integrity checking, policy monitoring, rootkit detection, real-time alerting and active response. It runs on most operating systems, including Linux, MacOS, Solaris, HP-UX, AIX and Windows.

           You can find more information at OSSEC HIDS `project documentation <http://ossec.github.io/docs/>`_, or the `reference manual <http://ossec.github.io/docs/manual/index.html>`_.

.. note:: For the OSSEC manager, this version **doesn't** allow the integration with :ref:`ELK Stack <ossec_elk>` neither the use of :ref:`Wazuh RESTFUL API <ossec_api>`. If you plan to use either of these two, or both, follow the :ref:`Wazuh HIDS installation guide <wazuh_installation>` instead.

.. toctree::
   :maxdepth: 3

   ossec_installation_deb
   ossec_installation_rpm
   ossec_installation_win
   ossec_installation_source
