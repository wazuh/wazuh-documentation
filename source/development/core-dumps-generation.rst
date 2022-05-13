.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Core dump generation and analysis
  
.. _dev-core-dumps-generation:


Core dump generation and analysis
=================================

A core dump is a snapshot of the process state generated when a process crashes or stops abnormally.
It lets you view part of the state the process was in when it crashed, this includes the stack trace, variable and register values, etc.

This article describes how to enable core dump generation and how to use a debugger for post-mortem crash analysis.

Some operating systems perform a core dump upon a process crash by default, others do not. This article covers how to
enable and disable core dump generation on the supported platforms [1]_.

.. [1] As the time of writing, the Wazuh compilation outputs separate debugging symbols only for Windows, macOS, and Linux.

macOS
*****

Enabling core dump generation
-----------------------------

To enable core dumps in macOS, you need to change the resource limits of a process using `ulimit`.  In this case, the
resource limit you need to change is the "cores" one, which represents the maximal size of core dumps our process is
allowed to generate.

To enable core dump generation for Wazuh, the service needs to be relaunched from a shell, this is because resource
limits are propagated to child processes, so if we set the core limit to a certain value on a shell, then all
processes spawned by it (for example by invoking a command) will inherit the resource limits. Normally, all Wazuh
processes have ``launchd`` as their parent process, which will only propagate the default system-wide resource limits.

Run the following commands as root. First, stop the service::

  # /Library/Ossec/bin/wazuh-control stop

Then, use ``ulimit`` to set the max core dump size to unlimited::

  # ulimit -c unlimited

Keep in mind that doing this will result in every command run from within this shell session will have no limit on the
size of core dumps.

There is a system setting that defines the path where core dumps will be stored. It is usually ``/cores/`` but we can
check this with::

  # sysctl kern.corefile

The default output of this command will be ``/cores/core.%P`` which means core dumps will comply to this formatting rule.
We will assume this is the case for the rest of this article.

Next, make sure the ``/cores`` folder exists::

  # mkdir -p /cores
  # chmod 755 /cores

Restart the services::

  # /Library/Ossec/bin/wazuh-control start

Now Wazuh should be running with its resourced limits altered and should create a core dump if the process crashes.


Post-mortem crash analysis: an example
--------------------------------------
In this section, we will send a signal to a Wazuh process that processes usually receive when they fail. Then, we will
use ``lldb`` to view the process state at the moment of failure. We will use the segmentation fault (SIGSEGV or 11) signal.
Make sure to have enabled core dump generation, explained in the previous section.

Use `killall` to send a SIGSEGV signal to our process::

  # killall -SEGV wazuh-syscheckd

You will see something like::

  [1]    67868 segmentation fault (core dumped)  ./wazuh-syscheckd

And then a core dump file will be created. In this case, it's ``/cores/core.67868``.

Now you can fire up the ``lldb`` debugger (making sure the working directory contains the ``wazuh-syscheckd`` executable)::

  # lldb

Once the lldb prompt is showing, enter the following command (use the right path for the core dump that was created for
the ``--core`` path)::

  (lldb) target create wazuh-syscheckd --core /cores/core.67868 

Then you will get see a message similar to this::

  Core file '/cores/core.67868' (x86_64) was loaded.

Now you can run the debugging commands as you would if you were attached to the running process, except, of course, you will not
be able to step through the code or run code.

Print the backtrace with ``bt``::

  (lldb) bt
  * thread #1
    * frame #0: 0x000000010a203034 wazuh-syscheckd`main + 4
      frame #1: 0x000000010f4fd51e dyld`start + 462

Switch to thread 1 using ``t 1`` (the source code shown here is just an example of a real intentional segmentation fault)::

  (lldb) t 1
  * thread #1
      frame #0: 0x0000000108ef6bba wazuh-syscheckd`main(argc=1, argv=0x00007ff7b7011aa8) at main.c:52:8 [opt]
    49       int start_realtime = 0;
    50  
    51       int *a = 0x0423;
  -> 52       *a = 0;
    53  
    54       /* Set the name */
    55       OS_SetName(ARGV0);

Print the value of local variables with ``frame variable`` (some variables might be missing depending on the optimization
level used when compiling)::

  (lldb) frame variable
  (int) argc = 1
  (char **) argv = 0x00007ff7b7011aa8
  (int) start_realtime = 0
  (directory_t *) dir_it = NULL
  (int) run_foreground = 0
  (int) test_config = 0
  (int) debug_level = 0
  (char *) home_path = <variable not available>
  (const char *) cfg = <variable not available>
  (int) c = <variable not available>
  (gid_t) gid = <variable not available>
  (int) r = <variable not available>
  (const char *) group = <no location, value may have been optimized out>
  (int *) a = <no location, value may have been optimized out>

Note about debugging symbols
----------------------------

Debugging symbols are created separately by default and are available to download at our
:ref:`debug packages list<macos-dbg-symbols-packages>`. This means binary files (executables and .dylib shared libraries)
have no debugging symbols in them and .dSYM bundle folders are created inside the ``<wazuh_repo>/src/symbols`` directory
when building Wazuh from sources.

For example, after compiling, you get ``src/wazuh-syscheckd`` and ``src/symbols/wazuh-syscheckd.dSYM``. The ``lldb``
debugger should automatically find the matching dSYM bundle, as long as it is findable by macOS's Spotlight [2]_. 
However, the path to the dSYM bundle can be manually specified by using the ``add-dsym``::

  (lldb) add-dsym <path to dSYM bundle>

The dSYM bundle that can be manually specified can be either downloaded or built when compiling Wazuh from sources.
However, note that you will get a warning if the identifier for the symbols and the debugging target don't match.
It is up to the developer to decide whether the warning can be ignored or not.

Lastly, a core dump can also be analyzed if we have debugging symbols embedded into the binaries (i.e., when you use the
``DISABLE_STRIP_SYMBOLS=1`` make flag). More info about building Wazuh can be found :ref:`here<wazuh_makefile>`.

.. [2] When compiling, binaries and dSYM bundles are created with a matching UUID identifier, this – and search methods including Spotlight – is what allows ``lldb`` to automatically match them.

Windows
*******

Windows use PDB as format for symbols files. Wazuh agent PDBs are compressed and can be found :ref:`here<win-dbg-symbols-packages>`.

Wazuh agent dumps generation is enabled by default during installation for Windows versions newer than Windows Server 2008 and Windows Vista with Service Pack 1 due Windows Error Reporting support.
Dumps will be created on ``<INSTALLDIR>\dumps`` folder.


To know more about Windows dumps enabling see `Collecting User-Mode Dumps
<https://docs.microsoft.com/en-us/windows/win32/wer/collecting-user-mode-dumps>`_.


Post-mortem analysis
--------------------

Core dumps could be analyzed using WinDbg following the next steps:

#. Select crash dump by picking ``<INSTALLDIR>\dumps\<process-name>.<process-PID>`` on `File > Open Crash Dump` menu.
#. Download Wazuh Windows symbols, uncompress ZIP file and select it on `File > Symbol File Path`, appending ``;srv*`` to also load Windows symbols.
#. [Optional] Download Wazuh source code and add its path on `File > Source File Path`.

The last step is to run the analysis of the core dump

   .. code-block:: console

    !analyze -v
