Basic Configuration
===================

If you made your installation from Sources or DEBs you can continue with the `Agent configuration`_ 
but if you make your install from RPMs repository need to make changes in the `Manager configuration`_

Manager configuration
---------------------

If you made the Manager installation from RPMs need to add the mail configuration, for this
follow the next steps

To access and modify OSSEC's files and directories, you need to switch to the root user.::

   $ sudo su
   $ cd /var/ossec/etc

We make a backup from **ossec.conf**::

   $ cp ossec.conf ossec.conf.backup

Then open the original with your favorite text editor.::

   $ vi ossec.conf

.. role:: red

The mail settings are at the top of the file::

   <ossec_config>
     <global>
       <email_notification>yes</email_notification>
       <email_to>:red:`jose@xxx.com`</email_to>
       <smtp_server>smtp.xxx.com.</smtp_server>
       <email_from>ossecm@ossec.xxx.com.</email_from>
     </global>

Agent configuration
-------------------
