# -- Redirects within the same release  -------------------------------------------------

# Important: the redirect is relative to the old path

redirectSameRelease = {
  '4.3': {
   '/user-manual/capabilities/vulnerability-detection/compatibility-matrix.html':
     '/user-manual/capabilities/vulnerability-detection/how-it-works.html#compatibility-matrix',
   '/user-manual/capabilities/vulnerability-detection/running-vu-scan.html':
     '/user-manual/capabilities/vulnerability-detection/configuring-scans.html',
   '/user-manual/wazuh-dashboard/single-sign-on/index.html':
     '/user-manual/user-administration/single-sign-on/index.html', 
   '/user-manual/wazuh-dashboard/single-sign-on/okta.html':
     '/user-manual/user-administration/single-sign-on/okta.html',
   '/user-manual/wazuh-dashboard/single-sign-on/azure-active-directory.html':
     '/user-manual/user-administration/single-sign-on/azure-active-directory.html',
   '/user-manual/wazuh-dashboard/single-sign-on/pingone.html':
     '/user-manual/user-administration/single-sign-on/pingone.html', 
   '/user-manual/wazuh-dashboard/single-sign-on/google.html':
     '/user-manual/user-administration/single-sign-on/google.html',
   '/user-manual/wazuh-dashboard/single-sign-on/jumpcloud.html':
     '/user-manual/user-administration/single-sign-on/jumpcloud.html',
   '/user-manual/wazuh-dashboard/single-sign-on/onelogin.html':
     '/user-manual/user-administration/single-sign-on/onelogin.html',     
   '/user-manual/securing-wazuh/index.html':
     '/user-manual/user-administration/password-management/index.html',
   '/user-manual/securing-wazuh/wazuh-indexer.html':
     '/user-manual/user-administration/password-management.html',
   '/user-manual/securing-wazuh/opendistro.html':
     '/user-manual/user-administration/password-management.html',
   '/user-manual/securing-wazuh/elastic-stack.html':  
     '/user-manual/user-administration/password-management.html',
   '/user-manual/wazuh-dashboard/rbac.html':
     '/user-manual/user-administration/rbac.html', 
   '/learning-wazuh/build-lab/install-wazuh-central-components.html':
     '/proof-of-concept-guide/index.html',
  },
  '4.2': {
    '/release-notes/release_4_2_0.html':
      '/release-notes/release-4-2-0.html',
    '/user-manual/registering/agent-enrollment.html':  
      '/user-manual/agent-enrollment/via-agent-configuration/index.html',
    '/azure/dependencies.html':  
      '/azure/index.html',
  }
}
