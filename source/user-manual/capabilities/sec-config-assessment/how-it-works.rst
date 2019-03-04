.. Copyright (C) 2019 Wazuh, Inc.

How it works
============

- `State vs alerts`_
- `Available information of scans`_
- `Integrity mechanism`_
- `Starting to work`_

State vs alerts
---------------

Agents have their own local database inf the form of a hash table where they store the state of each check: *passed* or *failed*. It allows the agent to send
only the differences between each scan, if nothing has changed from the last scan, only the summary will be send, avoiding network flooding every time 
a scan ends.

On the manger side, the results for each check are stored in the agents sqlite database. This allows to find out if the state of a check has changed between scans, avoiding
if it has changed then an altert is generated for that check.


Available information of scans
------------------------------

- Queriable information of the scans.
- Check status.
- Enabled policies.

Integrity mechanism
-------------------

To maintain the correct correlation between the agent state for each check and the managers database for that agent, an integrity mechanism has been developed.

Let's look how it works with an example.

On the agent side we have the following hash table:

+------------------------------+----------------+
| Check ID                     | State          |
+------------------------------+----------------+
| 1000                         | passed         |
+------------------------------+----------------+
| 1001                         | failed         |
+------------------------------+----------------+
| 1002                         | failed         |
+------------------------------+----------------+
| 1003                         | passed         |
+------------------------------+----------------+

It will send an MD5 hash with the result of the concatenation ``passed,failed,failed,passed`` being it ``C97B411C70B9F38FB20BA0458FDCE7A3``.


On the manager side let's asume the database is as follows:

+------------------------------+----------------+
| Check ID                     | State          |
+------------------------------+----------------+
| 1000                         | passed         |
+------------------------------+----------------+
| 1001                         | failed         |
+------------------------------+----------------+
| 1003                         | passed         |
+------------------------------+----------------+

The ID 1002 is missing, so the concatenation ``passed,failed,passed`` produces the MD5 hash ``02A7C566386C09071B563B90332DB65C``.

As the MD5 of the agent ``C97B411C70B9F38FB20BA0458FDCE7A3`` and the MD5 of the manager ``02A7C566386C09071B563B90332DB65C`` do not match, the manager will request a full database dump to the agent.


Starting to work
----------------

During a policy file scan it follows the steps described below:

- Load and parse the policy file
- Check if the requirements are meet (if any)
- Execute each rule defined for each check
- Compare the result for every check with the internal database
- If it has changed, send an alert to the manager and update the database



