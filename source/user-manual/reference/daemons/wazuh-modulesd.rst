.. _wazuh-modulesd:

wazuh-modulesd
==============

The wazuh-modulesd program manages the Wazuh modules described below.

.. topic:: Database wodle

  The Wazuh core uses list-based databases to store information related to agent keys and FIM / Rootcheck event data. Such information is highly optimized to be handled by the core.

  In order to provide well-structured data that could be accessed by the user or the Wazuh API, new **SQLite-based databases** have been introduced in the Wazuh manager. The Database Synchronization Module is a **user-transparent component** that collects the following information from the core:

  - Agent's name, address, encryption key, last connection time, operating system, agent version and shared configuration hash.
  - FIM data: creation, modification and deletion of regular files and Windows registry entries.
  - Rootcheck detected defects: issue message, first detection date and last alert time.
  - Static core settings, such as maximum permitted agents or SSL being enabled for Authd.

.. topic:: OpenSCAP wodle

  The OpenSCAP module integrates a SCAP scanner into Wazuh agents providing security compliance under
  OpenSCAP policies as well as vulnerability assessments, identifying and classifying vulnerabilities.

  The complete documentation about this wodle can be found at its dedicated section: :doc:`OpenSCAP integration<../../capabilities/policy-monitoring/openscap/index>`.

wazuh-modulesd options
----------------------

  +---------+---------------------------+
  | **-d**  | Increase debug mode.      |
  +---------+---------------------------+
  | **-f**  | Run in the foreground.    |
  +---------+---------------------------+
  | **-h**  | Display the help message. |
  +---------+---------------------------+
  | **-t**  | Test configuration.       |
  +---------+---------------------------+
