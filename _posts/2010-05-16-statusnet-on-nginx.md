---
layout: post
title: !binary |-
  U3RhdHVzTmV0IG9uIG5naW54
created: 1274023164
comments: true
categories: !binary |-
  ZW5fdXM=
---
StatusNet is an opensource <a href="http://en.wikipedia.org/wiki/Twitter">twitter</a>-like clone. You can install StatusNet on your own server and run your private status server for people in your organization.

Install is pretty straight-forward, so I am not showing here any bit to you.
I am attaching here my nginx configuration file and the relevant option in StatusNet config.php to enable fancy URLs.

<pre lang="bash">
server {
    listen 109.74.198.23:80;
    server_name bits.scorpionworld.it;
    access_log /srv/www/bits.scorpionworld.it/logs/access.log;
    error_log /srv/www/bits.scorpionworld.it/logs/error.log;

    location ~* (\.jpg|\.png|\.gif|\.jpeg)$ {
      valid_referers none blocked *.scorpionworld.it;
      if ($invalid_referer) {
        return 403;
      }
      root   /srv/www/bits.scorpionworld.it/public_html;
    }

    location / {
        root   /srv/www/bits.scorpionworld.it/public_html;
        index  index.php;
        if (!-e $request_filename) {
                rewrite  ^(.*)$  /index.php?p=$1  last;
                break;
        }
    }


    location ~ \.php$ {
        include /etc/nginx/fastcgi_params;
        fastcgi_pass  127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param  SCRIPT_FILENAME  /srv/www/bits.scorpionworld.it/public_html$fastcgi_script_name;
    }
}
</pre>

And add to /config.php:
<pre lang="bash">
$config['site']['fancy'] = true;
</pre>
