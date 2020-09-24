.. Copyright (C) 2020 Wazuh, Inc.

.. _logtest_faq:

FAQ
===

#. `What happens when trying to start a new session if the maximum session limit has already been reached?`_
#. `When is a session closed?`_
#. `What happens when trying to use an invalid logtest token?`_
#. `In a Wazuh Cluster, where are the logs processed?`_
#. `What events are recognized by the Wazuh-Logtest solution?`_

What happens when trying to start a new session if the maximum session limit has already been reached?
------------------------------------------------------------------------------------------------------
If reached the maximum number of sessions and initialized a new session, then the session that has been inactive for the longest time is closed.

What happens when trying to use an invalid logtest token?
---------------------------------------------------------
Logtest will detect when the token is not valid, process the log and return the result along with identify of the new session.

When is a session closed?
-------------------------
There are 3 reasons why a session has been closed
    - Force logout via a logout request.
    - The session has been idle longer than the `session_timeout` defined in the test_rule configuration in ossec.conf.
    - The maximum number of sessions has been reached and a new session replaces the session that has been idle the longest.

In a Wazuh Cluster, where are the logs processed?
-------------------------------------------------
In a Wazuh Cluster, the master node processes the request.

What events are recognized by the Wazuh-Logtest solution?
---------------------------------------------------------
Currently Wazuh-Logtest solution check rules and decoders with syslog and json event format 