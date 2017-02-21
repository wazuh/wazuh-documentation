.. _manual_anomalie_detection:

Intrusion and anomalie detection
===================================

.. warning::
	Draft document.

Anomaly detection refers to the action of finding patterns in the system that do not match the expected behavior. Once a malware (e.g rootkits) is installed on a system, it modifies the system to be hidden from the user. Although the malware uses a lot of techniques for this purpose, Wazuh is able to detect a pattern in them and alert about possible intruders.

The component responsible for this task is *rootcheck*, although *syscheck* also plays an important role.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        manual_intrusions
        how_to_intrusions
        faqs_intrusions
        intrusions_settings
