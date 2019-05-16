.. Copyright (C) 2019 Wazuh, Inc.

.. _build_lab_access_ec2_instances:

Establish access to your EC2 instances
======================================

Before you can actually access your new EC2 instances you must first set up public IPs through which to reach them, as well as use
your Wazuh Lab key pair for authentication.


Elastic IPs
-----------

We will set up an Elastic IP for each new EC2 instance.  You will use these IPs only for reaching your EC2 instances from outside
of the VPC, like for SSH, RDP, or HTTPS.  The instances will communicate with each other exclusively via their
VPC private IPs.

Separately for each new EC2 instance, do the following

- From your `EC2 Dashboard <https://console.aws.amazon.com/ec2/v2/home>`_, click **[Elastic IPs]**.
- Click **[Allocate new address]**, choose "VPC" and click **[Allocate]** and then **[Close]**.
- Select only the unassociated EIP (has no Instance yet).
- Click **[Actions]** and choose "Associate address".
- Click on the empty *Instance* field select your EC2 instance to assign this EIP to it.
- Click on the empty *Private IP* field and pick the IP that pops up.  There will only be one.
- Click **[Associate]**.


SSH access to Linux instances via Windows Putty client
------------------------------------------------------

Putty is a popular Windows SSH client.  Download and run the MSI installer for Putty `here <https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html>`_.

Use PuTTYgen to convert your key file into a form Putty can authenticate with
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    - Run PuTTYgen (**c:\\Program Files (x86)\\PuTTY\\puttygen.exe**)
    - File -> Load private key
    - Change file type selector to "All Files"
    - Browse to and Open your WazuhLab.pem file.  It will be imported and look like this:

    .. thumbnail:: ../../images/learning-wazuh/build-lab/puttygen.png
        :title: PuTTYgen
        :align: center
        :width: 50%

    - Click **[Save private key]**, confirm that you don't want to use a password and click **[Yes]**.
    - Store the key in a location convenient to you.  For the following example, we will assume you put it in **c:\\ssh\\** under the name "WazuhLab" with .ppk file type.
    - Close PuTTYgen.
    - Run PuTTY (**c:\\Program Files (x86)\\PuTTY\\putty.exe**)
    - Under *Host Name* put the Elastic IP associated with the Linux EC2 instance.
    - Under *Saved Session* put the instance name (i.e. Wazuh Server)
    - Under Connection->Data, set the *Auto-login username* to "centos".

    .. thumbnail:: ../../images/learning-wazuh/build-lab/putty-2.png
        :title: PuTTY
        :align: center
        :width: 50%

    - Under Connection->SSH->Auth, click **[Browse]** and choose the WazuhLab.ppk file you just saved from PuTTYgen.
    - Scroll back up and click on "Session" and then on **[Save]** to save all of this for future use.
    - Click **[Open]** and **[Yes]** for the security alert.
    - You should be in now:

.. thumbnail:: ../../images/learning-wazuh/build-lab/putty-3.png
    :title: PuTTY
    :align: center
    :width: 75%


SSH access to Linux instances via command-line SSH client
---------------------------------------------------------

First of all, make sure your WazuhLab.pem file is only readable by you.  The SSH client will not use it if it is world readable.
Then log in something like this, substituting the EIP of your Linux instance for the 1.2.3.4 below:

.. code-block:: console

    ssh -i WazuhLab.pem centos@1.2.3.4

The exact syntax of this command may vary depending on your operating system and specific ssh client.  Consult your system's
and/or ssh client's documentation if the above does not work for you.


RDP access to Windows instance
------------------------------

- From your `EC2 Dashboard <https://console.aws.amazon.com/ec2/v2/home>`_, click "Instances".
- Select only the "Windows Agent" instance.
- Click **[Actions]** and then **[Get Windows Password]**.
- Click **[Choose File]** and select the WazuhLab.pem that was downloaded when you created the key pair.
- Click **[Decrypt Password]**.
- Save the Administrator password somewhere so you don't lose it.
- Open and RDP session with the Elastic IP you associated with your Windows instance, using the Administrator account and the password you just acquired.
- When prompted in Windows about making your PC be discoverable, choose "No".
