.. _ruleset_contribute:

Contribute to the ruleset
===========================

If you have created new rules, decoders or rootchecks and you would like to contribute to our repository, please fork our `Github repository <https://github.com/wazuh/wazuh-ruleset>`_ and submit a pull request.

If you are not familiar with Github, you can also share them through our `users mailing list <https://groups.google.com/d/forum/wazuh>`_, to which you can subscribe by sending an email to ``wazuh+subscribe@googlegroups.com``. As well do not hesitate to request new rules or rootchecks that you would like to see running in OSSEC and our team will do our best to make it happen.

.. note:: In our repository you will find that most of the rules contain one or more groups called pci_dss_X. This is the PCI DSS control related to the rule. We have produced a document that can help you tag each rule with its corresponding PCI requirement: http://www.wazuh.com/resources/PCI_Tagging.pdf

What's next
============

Once you have your ruleset up to date we encourage you to move forward and try out ELK integration or the API RESTful, check them on:


* :ref:`ELK Stack integration guide <installation_elastic>`
* :ref:`Wazuh RESTful API installation Guide <api>`
