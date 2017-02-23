.. _oscap-faq:


FAQ
================================================

#. `Is there a noticeable performance impact when OpenSCAP wodle is enabled on an agent?`_
#. `Are evaluations executed in parallel?`_
#. `How does the interval work?`_
#. `Are the policies evaluated when OSSEC starts?`_
#. `Where are the policies?`_

Is there a noticeable performance impact when OpenSCAP wodle is enabled on an agent?
------------------------------------------------------------------------------------

The OpenSCAP wodle is designed to be very efficient, however the perfomance will depend on how fast oscap is (the scanner). Depending on the chosen policy, oscap can consume many resources. We recommend to test your policies in a test agent before deploying it in production.


Are evaluations executed in parallel?
-------------------------------------

No, each evaluation is executed sequentially. That means when an evaluation is finished, the next is executed. Also, each profile of an evaluation is executed sequentially.


How does the interval work?
---------------------------

The interval is the space of time between OpenSCAP executions. There are 2 scenarios:

 - Execution time less than interval: If you set an interval of 30 minutes, OpenSCAP will be executed each 30 minutes. So, if the evaluation takes 20 minutes, it will be executed again after 10 minutes.

 - Execution time more than interval: In this case, the log "interval overtaken" at /var/ossec/log/ossec.log will be generated and when the execution is finished, it will start again immediately.


Are the policies evaluated when OSSEC starts?
---------------------------------------------

Yes, by default policies are evaluated when the wodle starts. Unless, you set <scan-on-start> to 'no'. In this case, the next evaluation will be executed after the interval specified. The wodle state is saved when OSSEC is stopped.


Where are the policies?
-----------------------

Each agent must have its policies in ``/var/ossec/wodles/oscap/policies``.
