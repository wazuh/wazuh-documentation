.. _ossec_installation_upgrade:

Upgrading OSSEC to a new version
================================

Here's a quick overview on how to upgrade the manager. The OSSEC agent (client) is simply just the binary that you install through your package manager (apt-get or yum). The OSSEC manager is installed through source, a little bit trickier but if you follow the below steps you should be on the safe side ;-)

Upgrading the OSSEC manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^

In case you need to upgrade the OSSEC manager to a new version (e.g bugfixes, or new features) you need to download the latest stable release from github and simply just run the install script. Make sure to backup both your current OSSEC installation (just in case!) including the OSSEC API.
Here's a list of most important files:

1. Make Backups of the current OSSEC installation and the API (make a tar.gz for just in case)
2. Clone the latest stable version of the Manager from https://github.com/wazuh/ossec-wazuh into the home directory
3. Backup everything that is in /var/ossec/api – especially the htpasswd as it includes the credentials to authenticate.
4. Run install.sh and select the Update option
5. After the successful update, verify the new version in /etc/ossec-init.conf::
	e.g VERSION=“v2.9.0” 

	WAZUH_VERSION=“v1.0.2”

6. Verify if all OSSEC processes are running, if they are not, check the ossec.log
7. Make sure that the API process isn't running anymore, the process is “/bin/node /var/ossec/api/server.js”. If it's running, stop/kill it.
8. Copy the content of github repository that you cloned ossec-wazuh/extensions/api into /var/ossec
9. Replace the current htpasswd file with the one you backed-up earlier. The cloned github version only contains this string::

	“foo:$apr1$QJ8XkGFE$yEK2seDYoTIG.c6r03jjT/”
   
10. Start the API process once again, by running::

	$ /bin/node /var/ossec/api/server.js > /var/ossec/api/api.log & in the background

11. Verify if the API is working correctly by running this::

	in the browser: https://server.ip:55000

	or in a terminal: curl -XGET -u username -k https://your.ip:55000/agents (replace 'username' with an existing user)

.. note:: Last but not least it also wouldn't hurt to update the latest OS packages by running “yum update” or “apt-get update && apt-get upgrade”. 


What's next
-----------

Now you have finished your ELK cluster installation and we recommend you to go to your OSSEC Wazuh manager and install OSSEC Wazuh RESTful API and OSSEC Wazuh Ruleset modules:

* :ref:`OSSEC Wazuh RESTful API <ossec_api>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
