###############################################################################
#
# Release settings
#
# This file contains the information the release settings that is unique to
# this branch:
#
# * is_latest_release: this variable must be set to False except for the
#     latest release, where it must set to True.
# * version: short X.Y version
# * release: long X.Y.z version
# * apiURL: URL of the Wazuh API reference spec in the Wazih repository (public)
# * api_tag: use this variable to change the branch containing the specs that
#     has to be shown.
#

# The short X.Y version
version = '4.8'
is_latest_release = True

# The full version, including alpha/beta/rc tags
# Important: use a valid branch (4.0) or, preferably, tag name (v4.0.0)

release = '4.8.2'
api_tag = 'v4.8.2'

apiURL = 'https://raw.githubusercontent.com/wazuh/wazuh/'+api_tag+'/api/api/spec/spec.yaml'
