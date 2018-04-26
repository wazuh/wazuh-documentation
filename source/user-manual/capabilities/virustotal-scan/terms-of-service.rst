.. Copyright (C) 2018 Wazuh, Inc.

ToS: Public API vs Private API
==============================

VirusTotal's Terms of Service specify the two ways the VirusTotal API may be used:

Public API
----------

This method uses a free API with many of VirusTotal's functionalities, however, it has some important limitations, such as:

- the request ratio limitation to no more than four requests of per minute, and

- low priority access of requests done by this API for the VirusTotal engine.

The VirusTotal documentation, indicates that users who run a honeyclient, honeypot or any other automation that provides resources to VirusTotal are rewarded with a higher request rate quota and special privileges when performing the calls to the API.

Private API
------------

VirusTotal also provides a premium Private API where the request rate and total number of queries allowed is only limited by the user's Terms of Service. Apart from that, it provides high priority access for requests, along with additional advantages.

To find out more about VirusTotal, its Terms of Service and using its API, please visit their `website <https://developers.virustotal.com/v2.0/reference>`_.
