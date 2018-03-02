.. _learning_wazuh_cloudtrail:

Alert on suspicious logins to your AWS Management Console
========================================================

If you are responsible for resources in the AWS Amazon Cloud such as EC2 instances or S3 buckets, it is important to monitor AWS management
events related to those resources, such as creation/deletion of EC2 instances, changes to object permissions or security groups, revisions 
to your VPC configuration, etc...  You may even need to monitor read and/or write operations to data stored in certain S3 buckets.  For these
purposes, AWS provides CloudTrail, a rich facility for establishing an audit trail of all such events.  

Wazuh natively supports the collection and analysis of CloudTrail logs.  In this lab we will enable CloudTrail in our Wazuh AWS lab 
environment, configure Wazuh to ingest these logs, and craft a couple of custom rules to ale
rt on successful off-hours logins to your AWS Management
Console. 

Create the trail
----------------

1. From your AWS console, under "Services", choose “CloudTrail”:

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/aws/aws-cloudtrail-1.png                                             |
    |     :title: cloudtrail                                                                        |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

2. Create a new trail:

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/aws/aws-cloudtrail-2.png                                             |
    |     :title: new-trail                                                                         |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

3. Set the ``Trail name`` to "my-cloudtrail". Then under **Storage location** set ``Create a new S3 bucket`` to **Yes**. Set ``S3 bucket`` to a globally unique name like "cloudtrailbucket-" followed by your company name (all lowercase and no whitespace or punctuation).  Lastly, expand the **Advanced** section and set ``Enable log file validation`` to **No**.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/create-trail.png                                 |
    |     :title: create-trail                                                                      |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

    You now have a new Trail and a new S3 bucket it will write logs to:

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/created-trail.png                                |
    |     :title: create-trail                                                                      |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+



Create and authorize an IAM user for Wazuh to use to access the bucket
----------------------------------------------------------------------

Wazuh needs permission to access your new CloudTrail bucket.  This is best accomplished by creating a new 
IAM user under your AWS account and granting it access only to this specific bucket.  

1. In your AWS console, under "Services", choose “IAM". Click on ``Users:`` and then click **[Add user]**.  Set the ``User name`` to "Wazuh-user", checkmark "Programmatic access", and click **[Next: Permissions]**.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/aws/aws-user.png                                                     |
    |     :title: create-trail-user                                                                 |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

2. Click **[Attach existing policies directly]** and then click **[Create policy]**.  This will open a new tab for us to create a bucket access policy that we will then attach to our new user.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/aws/aws-create-policy.png                                            |
    |     :title: create-policy                                                                     |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

3. Click on the **[JSON]** tab and replace the policy content with the following. **Change both instances of "cloudtrailbucket-mycompany" to match your bucket's actual name**.

    .. code-block:: json

        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "VisualEditor0",
                    "Effect": "Allow",
                    "Action": [
                        "s3:GetObject",
                        "s3:ListBucket",
                        "s3:DeleteObject"
                    ],
                    "Resource": [
                        "arn:aws:s3:::cloudtrailbucket-mycompany",
                        "arn:aws:s3:::cloudtrailbucket-mycompany/*"
                    ]
                }
            ]
        }

3. Click **[Review policy]**.  Enter the ``Name`` and ``Description`` as seen below and click **[Create policy]**.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/cloudtrail-policy-review.png                     |
    |     :title: create-policy                                                                     |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

4. Close the AWS policy tab in your browser which should return you to the IAM Management Console screen where we are now ready to assign our new policy to our new user.  Click on t

5. In the "Search" field, type "wazuh" and when it pops in in the results, checkmark the "wazuh-cloudtrail" policy and click **[Next: Review]** and then on **[Create user]**.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/cloudtrail-policy-assign.png                     |
    |     :title: create-policy                                                                     |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

6. Click on ``Show`` and then copy down the "Access key ID" and "Secret access key" values which Wazuh will use to authenticate as this user.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/aws/aws-summary-user.png                                             |
    |     :title: create-policy                                                                     |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+



Set up wazuh-server to fetch and analyze the CloudTrail logs
------------------------------------------------------------

1. Install boto3 and its dependencies. Wazuh relies upon boto3 for interacting with AWS.

    .. code-block:: console

        # yum -y install epel-release
        # yum -y install python-pip
        # pip install boto3

2. On wazuh-server, edit ``/var/ossec/etc/ossec.conf``, adding this new wodle configuration section above and separate from the other wodle sections. Change “cloudtrailbucket-mycompany” to match your bucket’s actual name.  Replace YOUR-ACCESS-KEY and YOUR-SECRET-KEY below with your IAM user's access and secret key which you recorded previously.  Save and close the file.

    .. code-block:: xml

        <wodle name="aws-cloudtrail">
            <disabled>no</disabled>
            <bucket>cloudtrailbucket-mycompany</bucket>
            <access_key>YOUR-ACCESS-KEY</access_key>
            <secret_key>YOUR-SECRET-KEY</secret_key>
            <remove_from_bucket>yes</remove_from_bucket>
            <interval>10m</interval>
            <run_on_start>yes</run_on_start>
        </wodle>

3. Restart Wazuh manager with ``ossec-control restart`` on wazuh-server

4. Confirm wazuh-server is fetching CloudTrail logs successfully, by looking at the logs.

    .. code-block:: console

        # grep aws-cloud /var/ossec/logs/ossec.log

    You should see the aws-cloudtrail module start and then fetch logs every 10 minutes.

    .. code-block:: console

        2018/02/28 22:03:30 wazuh-modulesd:aws-cloudtrail: INFO: Module AWS-CloudTrail started
        2018/02/28 22:03:31 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs started
        2018/02/28 22:03:38 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs finished.
        2018/02/28 22:13:31 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs started
        2018/02/28 22:13:31 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs finished.
        2018/02/28 22:23:31 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs started
        2018/02/28 22:23:31 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs finished.



Generate some events and find them in Kibana and in the ruleset
---------------------------------------------------------------

1. **Set up Wazuh-user for AWS Console access.**  Go back to the IAM section of the AWS Console, click on ``Users``, and then on "Wazuh-user".  Click on the **[Security credentials]** tab and next to ``Console password``, click "Manage password".  Set ``Console access`` to "Enable" and set the password however you like.

2. Using the Console login link now listed for Wazuh-user, attempt to log into the AWS Console as Wazuh-user, first with the wrong password and then with the correct one.

3. Wait about 15 minutes for AWS to post logs about these events and then restart Wazuh manager on wazuh-server with ``ossec-control restart`` to force an immediate import of CloudTrail logs.

4. Log into Kibana and search for "location:Wazuh-AWS".  Pick some relevant fields for columnar display based on the below example and peruse your CloudTrail events.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/cloudtrail-results.png                           |
    |     :title: cloudtrail-results                                                                |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

    .. error:: 
        There is an error in the Wazuh ruleset that causes AWS Console login failures to be classified as successful rather than failed logon attempts.  The fix is pending and can be found at https://github.com/wazuh/wazuh-ruleset/pull/90.

5. Take time to explore the variety of other kinds of CloudTrail events already collected by Wazuh.  Also, explore the Wazuh rules relevant to CloudTrail at ``/var/ossec/ruleset/rules/0350-amazon_rules.xml`` on wazuh-server.

Custom alert on off-hours logins to AWS Management console
----------------------------------------------------------

child rule of 80253 - Amazon: signin.amazonaws.com - ConsoleLogin - User Login Success.
<time>6 am - 6 pm</time>
The time is when the event actually reaches wazuh-server, not compared to timestamp in log recorded



Custom alert on logins to AWS Management console from unauthorized IP blocks
----------------------------------------------------------------------------

IP CDB

add your office public IP block to CDB

add list to ossec.conf and make-lists it

child of 80253 again, but this time with a negative lookup

<list field="aws.sourceIPAddress" lookup="not_address_match_key">etc/lists/aws-console-IPs</list>

logout and back in to AWS console from your local system
then RDP to windows-agent and login to AWS console from there.





