.. _ossec_installation_2.8.3:

OSSEC installation guide
========================

.. topic:: OSSEC HIDS Latest Stable Release (2.8.3)

           OSSEC is an Open Source Host-based Intrusion Detection System that performs log analysis, file integrity checking, policy monitoring, rootkit detection, real-time alerting and active response. It runs on most operating systems, including Linux, MacOS, Solaris, HP-UX, AIX and Windows.

           You can find more information at OSSEC HIDS `project documentation <http://ossec.github.io/docs/>`_, or the `reference manual <http://ossec.github.io/docs/manual/index.html>`_.


.. note:: This version **doesn't** allow the integration with `ELK Stack <http://documentation.wazuh.com/en/latest/ossec_elk.html>`_ neither the use of `Wazuh RESTFUL API <http://documentation.wazuh.com/en/latest/ossec_api.html>`_. For these, follow the `OSSEC Wazuh fork installation guide <http://documentation.wazuh.com/en/latest/ossec_wazuh.html/>`_.

.. toctree::
   :maxdepth: 3

   ossec_installation_deb
   ossec_installation_rpm
   ossec_installation_win
   ossec_installation_source
