---
layout: post
title: !binary |-
  R2l0IHJlcG9zaXRvcnkgaG9zdGluZyBpbiA1IG1pbnV0ZXMgd2l0aCBHaXRv
  c2lzIGluIERlYmlhbiBMZW5ueQ==
created: 1240307756
comments: true
categories: !binary |-
  ZGViaWFuIGVuX3Vz
---
After many months experiencing with SVN, we want to try to shoot with GIT.

We will use a great tool for manage our git repositories: <strong>gitosis</strong>.

<!--break-->

<code>aptitude install gitosis
sudo -H -u gitosis gitosis-init < SSH_KEY.pub</code>
where ssh_key.pub is a file that contains a public rsa key generated with ssh-keygen (as default is saved on ~/.ssh/id_rsa.pub).
The key is used to authenticate the repositories admin, so can even be on another host with ssh access.

Now on your local machine (even different where gitosis was installed, but you need the private rsa key on it):
</code><code>git clone gitosis@YOUR_SERVER_IP:gitosis-admin.git</code>
This repository contains configuration data for gitosis, you will modify it, commit and push, and gitosis automatically reload itself.

Modify gitosis.conf:
<code>[gitosis]
[group gitosis-admin]
writable = gitosis-admin
members = scorp@antani
[group developers]
writable = sandbox
members = scorp@antani</code>

The group gitosis-admin is the one that can manage the gitosis configuration (we are doing it now).
The group developers i've added it's the one with all developers will use to access our repositories. You can even create many different groups for many different repositories.
Sandbox is the name of a testing git repository i am going to create (not exists yet, i've only specified that the user scorp@antani can push commits into).

To render effetive changes, do:
<code>git commit -a -m "Allow scorp write access to sandbox"
git push</code>

Now let's try the new toy, we should initialize the sandbox repository:
<code>mkdir sandbox
cd sandbox
git init
git remote add origin gitosis@YOUR_SERVER_IP:sandbox.git
touch helloworld.txt
git add helloworld.txt
git commit -m 'first test commit'
git push origin master:refs/heads/master
</code>

Happy now? Good Coding.



Common errors

<code>~/sandbox$ git push origin master:refs/heads/master
No refs in common and none specified; doing nothing.
Perhaps you should specify a branch such as 'master'.
fatal: The remote end hung up unexpectedly
error: failed to push some refs to 'gitosis@192.168.1.1:sandbox.git'</code>

You should remember to commit changes before to push it ;)
