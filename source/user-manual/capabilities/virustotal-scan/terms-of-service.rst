ToS: Public API vs Private API
==============================

VirusTotal' Terms of Service specify the way you could use their API, differentiating between the following situations:

Public API
------------

This method consists of using a free API with all the functionalities. However, it has some important limitations:

- Its request ratio is limited to at most four requests of any nature per minute.

- Requests done by this API have a low priority access for the VirusTotal engine.

In the VirusTotal documentation, they specify that if the user runs a honeyclient, honeypot or any other
automation that is going to provide resources to VirusTotal, in other words, not only perform requests, they reward you
with a higher request rate quota and special privileges when performing the calls to the API.

Private API
------------

VirusTotal also provides a premium Private API where the request rate and total number of queries allowed is only limited
by the user's Terms of Service. Apart from that, it provides a high priority access for requests and more advantages.

For knowing more about VirusTotal's Terms of Service and using its API you can visit its official documentation.
