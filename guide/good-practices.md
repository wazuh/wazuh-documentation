# Good practices and common errors

## Auto-numbered lists

The auto-numbered  Sphinx option creates self-numbered list items. While hardcoding item numbers is technically correct, these lists will be harder to maintain since indexes must be updated every time the list changes.

Example of hardcoded list numbers:

```
1. First item
2. Second item
3. Third item
```

Example of auto-numbered list:

```
#. First item
#. Second item
#. Third item
```

## Code-blocks inside lists

To include code-blocs inside a list, position the code-block directive flush with the text in the list. That is, indent three spaces for ordered lists and two spaces for unordered lists. Otherwise, the code-block will break the list into several individual lists, which is semantically incorrect and particularly noticeable in auto-numbered lists.

Example of incorrect auto-numbered lists containing a code block:

```
#. First item has a code-block

  .. code-block:: console

    # yum install elasticsearch-7.8.0

#. Second item has a code-block

  .. code-block:: yaml

    # network.host: <elasticsearch_ip>

#. Third item
```

The result will look like this:

```
1. First item has a code-block

 # yum install elasticsearch-7.8.0

1. Second item has a code-block

 # network.host: <elasticsearch_ip>

1. Third item
```

Example of correct auto-numbered lists containing a code block:

```
#. First item has a code-block

   .. code-block:: console

     # yum install elasticsearch-7.8.0

#. Second item has a code-block

   .. code-block:: yaml

     # network.host: <elasticsearch_ip>

#. Third item
```

The result will look like this:

```
1. First item has a code-block

   # yum install elasticsearch-7.8.0

2. Second item has a code-block

   # network.host: <elasticsearch_ip>

3. Third item
```

## Always specify code-blocks language

Code blocks can be defined using an abbreviated syntax, as follows:

```
::
  <rule id="100345" level="0">
  <if_group>syscheck</if_group>
  <match>/var/www/htdocs</match>
  <description>Ignore changes to /var/www/htdocs</description>
  </rule>
::
  <rule id="100345" level="12">
  <if_group>syscheck</if_group>
  <match>/var/www/htdocs</match>
  <description>Changes to /var/www/htdocs - Critical file!</description>
  </rule>
```

It will compile without errors, but defining a code block like this will make Sphinx guess the programming language to apply pigmentation. It can result in pigmentation errors or no pigmentation at all.

```python
  <rule id="100345" level="0">
  <if_group>syscheck</if_group>
  <match>/var/www/htdocs</match>
  <description>Ignore changes to /var/www/htdocs</description>
  </rule>
```

```
  <rule id="100345" level="12">
  <if_group>syscheck</if_group>
  <match>/var/www/htdocs</match>
  <description>Changes to /var/www/htdocs - Critical file!</description>
  </rule>
```

To prevent this, always specify the programming language in code blocks. When it's not any known language, 'default' option can be used.

```
.. code-block:: xml
  <rule id="100345" level="0">
  <if_group>syscheck</if_group>
  <match>/var/www/htdocs</match>
  <description>Ignore changes to /var/www/htdocs</description>
  </rule>
.. code-block:: xml
  <rule id="100345" level="12">
  <if_group>syscheck</if_group>
  <match>/var/www/htdocs</match>
  <description>Changes to /var/www/htdocs - Critical file!</description>
  </rule>
```

This will generate the following output:

```xml
  <rule id="100345" level="0">
  <if_group>syscheck</if_group>
  <match>/var/www/htdocs</match>
  <description>Ignore changes to /var/www/htdocs</description>
  </rule>
```

```xml
  <rule id="100345" level="12">
  <if_group>syscheck</if_group>
  <match>/var/www/htdocs</match>
  <description>Changes to /var/www/htdocs - Critical file!</description>
  </rule>
```

## Use ref instead of doc for referencing documents

Documents can be referenced using both the `:doc:` and `:ref:` directives. Both of them are correct, but `:doc:` is harder to maintain.

`:doc:` directive takes the file path as an argument, while `:ref:` takes the file identifier.

```
Learn more about this new mechanism at :doc:`Anti-flooding mechanism <../user-manual/capabilities/antiflooding>`.

More information in about syscheck configuration in the :ref:`File integrity monitoring <fim-examples>` section.
```

File paths change more often than file identifiers, so it is a better practice to use `:ref:` for document references.

## Make sure it compiles without warnings

Before making a pull request, make sure the documentation compiles without warnings. Warning messages can be a signal of usability errors, and also look unprofessional.

## Don't call Wazuh UI 'app'

The proper names are: Wazuh User Interface, Wazuh WUI or Wazuh Kibana plugin.

## Use a spellchecker

Some examples are:

- For Atom: [Linter Spell](https://atom.io/packages/linter-spell), [AutoCorrect](https://atom.io/packages/autocorrect-en), [Spell Check](https://atom.io/packages/spell-check).
- For Visual Studio Code: [VSCode Spell Checker](https://github.com/streetsidesoftware/vscode-spell-checker), [Offline Spell Checker](https://github.com/swyphcosmo/vscode-spellchecker), [Spell Right](https://github.com/bartosz-antosik/vscode-spellright).
- For Sublime Text: [Spell Checking](https://www.sublimetext.com/docs/3/spell_checking.html).

Some text editors, such as Google Docs or Microsoft Word, also come with an integrated spell checker.

## Use output blocks

Code blocks are meant to be copied by the user, making the documentation easier to follow. If you want to show an example output for a code block, use a separate output block to prevent it from being copied by the user.

Output blocks are just regular code blocks with the output class.

```
.. code-block:: console
  $ command

.. code-block:: console
  :class: output

  Command example output
```

## Image lightboxes

To use a image lightbox, replace the `image` directive with `thumbnail`. It accepts the same arguments and options.

```
.. thumbnail:: <URL>
```
