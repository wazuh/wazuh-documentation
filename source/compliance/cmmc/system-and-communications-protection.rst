.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps meet the CMMC System and Communications Protection (SC) requirements, with a use case that enables the host firewall on an Ubuntu endpoint.

System and Communications Protection (SC)
=========================================

SC.L2-3.13.6 Network Communication by Exception
-----------------------------------------------

SC.L2-3.13.6 requires you to deny network communications traffic by default and allow it by exception.

Wazuh helps meet SC.L2-3.13.6 with the SCA module, which checks that the host firewall of your endpoints is enabled.

Use case: Enabling the host firewall on an Ubuntu endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to find and fix the failed CIS Ubuntu Linux 24.04 LTS Benchmark check 35622, **Ensure ufw service is enabled.**, on an Ubuntu 24.04 endpoint. When you enable UFW, it denies incoming connections by default and allows only the connections that you permit.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Endpoint security** > **Configuration Assessment**.

#. Click **Explore agent**, select the Ubuntu endpoint, and switch to the **Inventory** tab.

#. In **Check**, search for and select **Ensure ufw service is enabled.** The **check.result** column shows **Failed** while UFW is inactive.

   .. thumbnail:: /images/compliance/cmmc/sca-check-35622-failed.png
      :title: Failed SCA check 35622
      :alt: Failed SCA check 35622
      :align: center
      :width: 80%

#. Click the inspect icon of the check to open its details, including the rationale and the remediation. The ``check.compliance.cmmc`` field shows AC.L1-3.1.20, CM.L2-3.4.7, SC.L1-3.13.1, and SC.L2-3.13.6.

   .. thumbnail:: /images/compliance/cmmc/sca-check-35622-details.png
      :title: Details of SCA check 35622
      :alt: Details of SCA check 35622
      :align: center
      :width: 80%

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Run the following commands on the Ubuntu endpoint to allow SSH connections and enable UFW. Allow SSH first, so that enabling UFW doesn't close your SSH session:

   .. code-block:: console

      $ sudo ufw allow 22/tcp
      $ sudo systemctl unmask ufw.service
      $ sudo systemctl --now enable ufw.service
      $ sudo ufw --force enable

#. Restart the Wazuh agent to run a new SCA scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
~~~~~~~~~~~~~~~

#. In **Configuration Assessment**, switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"Wazuh SCA check passed - Ensure ufw service is enabled."

   The finding shows that check 35622 now passes.

   .. thumbnail:: /images/compliance/cmmc/sca-check-35622-passed.png
      :title: Passed SCA check 35622
      :alt: Passed SCA check 35622
      :align: center
      :width: 80%
