###############################################################################
#
# Redirects within the same release
#
# This file contains the dictionary redirects within each release
# For every release having redirects in the same release there must exist a 
# key with the release number 'X.Y':
#
# redirectSameRelease = {
#     'X.Y': <value>
#     ...
# }
#
# Where <value> is a new dictionary where the keys represent the old path
# of the html file and the values the new one:
# 
# redirectSameRelease = {
#     'X.Y': {
#         '/old/path.html': '/new/path.html',
#         ...
#     },
#     ...
# }
#

redirectSameRelease = {
}
