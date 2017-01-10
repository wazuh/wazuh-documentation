.. _pci_dss_file_integrity_monitoring:

File integrity monitoring
=========================

File integrity Monitoring (syscheck) is performed by comparing the cryptographic checksum of a known good file against the checksum of the file after it has been modified. The Wazuh agent scans the system at an interval you specify, and it sends the checksums of the monitored files and registry keys (for Windows systems) to the Wazuh server. The server stores the checksums and looks for modifications by comparing the newly received checksums against the historical checksum values of that file or registry key. An alert is sent if anything changes.

`Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_  can be used to meet PCI DSS requirement 11.5:

*11.5 Deploy a change-detection mechanism (for example, file-integrity monitoring tools) to alert personnel to unauthorized modification (including changes, additions, and deletions) of critical system files, configuration files, or content files; and configure the software to perform critical file comparisons at least weekly.*

Use cases
---------

In this example, we have configured OSSEC to detect changes in the file */root/credit_cards*.

::

    <syscheck>
        <directories check_all="yes" report_changes="yes">/root/credit_cards</directories>
    </syscheck>

So, when we modify the file, OSSEC generates an alert.

.. thumbnail:: ../images/pci/fim_1.png
    :title: Modifying a monitored file
    :align: center
    :width: 75%

As you can see, syscheck alerts are tagged with the requirement 11.5.

.. thumbnail:: ../images/pci/fim_2.png
    :title: Alert on Wazuh Manager
    :align: center
    :width: 75%

.. thumbnail:: ../images/pci/fim_3.png
    :title: Alert visualization at Kibana Discover
    :align: center
    :width: 100%

.. thumbnail:: ../images/pci/fim_4.png
    :title: Filtering alerts by PCI DSS and file path
    :align: center
    :width: 100%
