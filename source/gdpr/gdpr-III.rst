.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr_III:

GDPR III 
============

Chapter III, Rights of the data subject 
---------------------------------------

Regulation of the data subject rigths. Formal requirement.


Chapter III, Article 14, Head 2 (c)
-----------------------------------

.. note::
	**Article 14**  Information to be provided where personal data have not been obtained from the data subject. **Head 2(c)**. In addition to the information referred to in paragraph 1, the controller shall provide the data subject with the following information necessary to ensure fair and transparent processing in respect of the data subject: the existence of the right to request from the controller access to and rectification or erasure of personal data or restriction of processing concerning the data subject and to object to processing as well as the right to data portability.

Occasionally, an individual may request that the processing of his or her personal data be temporarily restricted. The entity in charge of processing and storing such data must ensure that within the stipulated period of time there is no access to such data.

`Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_  can be used to meet the GDPR requirement found in chapter III Rights of the data subject, article 14, head 2(c).

Temporary access restrictions (Syscheck) is possible with Wazuh, we can review the alerts generated checking that there are no alerts in the period stipulated using Syscheck.

Use cases
^^^^^^^^^

Chapter III, Article 17
-----------------------
.. note::
	**Article 17**  Right to erasure ('right to be forgotten'). 

In some scenarios, an individual may request the permanent deletion of their personal information. In this case, the entity in charge of the processing and storing of the subject's data must delete such information as long as the individual's request for deletion is accepted, normally when the storage of the same is meaningless.

`Syscheck <http://ossec-docs.readthedocs.org/en/latest/manual/syscheck/index.html>`_  can be used again to meet the GDPR requirement found in chapter III Rights of the data subject, article 17.

Permanent data deletion (Syscheck). Wazuh has the ability to monitor deleted files using Syscheck, ensuring that the individual's personal data has been permanently deleted in response to your request. 


Use cases
^^^^^^^^^