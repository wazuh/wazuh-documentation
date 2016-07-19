.. _ossec_splunk:

Splunk app
==================================

.. topic:: Introduction

    Reporting and Management for Wazuh, also known as Splunk for Wazuh, is a Splunk app which provides a full integration with OSSEC Wazuh HIDS.

    The integration between OSSEC Wazuh HIDS and Splunk for Wazuh is accomplished by using the JSON logging capabilities to work with the OSSEC Wazuh RESTful API.

    Reporting and Management for Wazuh capabilities:

    * Search and visualize data in OSSEC Wazuh HIDS alerts.
    * Search and visualize the agents' status.
    * Perform actions over the managers or the agents through OSSEC Wazuh RESTful API.
    * Based on Reporting and Management for OSSEC.
    * Brand new dashboards: Wazuh Overview, Wazuh PCI Compliance and Wazuh File Integrity.

.. image:: images/splunk/ossec-splunk-example.png
   :align: center
   :width: 80%

.. topic:: Documentation sections

    .. toctree::
       :maxdepth: 2

       ossec_splunk_installation
       ossec_splunk_reference
