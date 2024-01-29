.. Copyright (C) 2015, Wazuh, Inc.

#. To create the username and password for the indexer, use the Keystore tool, which will provide greater security and better handling of sensitive information. Be sure to change <INDEXER_USERNAME> and <INDEXER_PASSWORD> to the values you want. 

      .. code-block:: console

         # /var/ossec/bin/wazuh-keystore -f indexer -k username -v <INDEXER_USERNAME>
         # /var/ossec/bin/wazuh-keystore -f indexer -k password -v <INDEXER_PASSWORD>


.. End of include file
