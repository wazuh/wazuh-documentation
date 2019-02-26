.. Copyright (C) 2019 Wazuh, Inc.

How it works
============

- `State vs alerts`_
- `Available information of scans`_
- `Integrity mechanism`_
- `Starting to work`_

State vs alerts
---------------

ToDo:

- Last state is stored in the DB.
- Only events with differences between scans are sent to the manager. It avoids flooding of unnecessary events.
- Alerts about differences between scans.

Available information of scans
------------------------------

ToDo:

- Queriable information of the scans.
- Check status.
- Enabled policies.

Integrity mechanism
-------------------

ToDo:

- Explain how the integrity mechanism works.
- Explain how it ensures the database recoveries by its own when it has outdated information.

Starting to work
----------------

ToDo:

- A brief explain of how it works during scans.

