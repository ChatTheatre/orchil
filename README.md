# Orchil Client

Orchil is  a web client for SkotOS and Genesis games. It was created by Wyrhtan and expanded by @saraht45. 

The orchil client contains a few bits of code inherited from Skotos' Zealotry and Zealous clients, as well as a few snippets of generic code from StackExchange.

Orchil is licensed under the [Creative Commons Attribution-ShareAlike license](https://creativecommons.org/licenses/by-sa/4.0/).

# Installing the HTML5 Client

The HTML client allows users to connect to SkotOS games (and Genesis games!) using a modern HTML5 framework. It works as follows:

1. A connection comes in to the client, which is stored on your web server.
2. The `profiles.js` in the client directory forwards the connection on to your `nginx` using port 8080 and a `/location` suffix
3. `nginx` adjusts the connection and forwards it on a `websocket-to-tcp-tunnel` using a port number such as 8081, stored under an `upstream` section, as defined in the `default` site for `nginx`.
4. The `websocket-to-tcp-tunnel` listens for that port, based on its own `config.json`.

## -1. Plan Your Ports

You should plan out your ports in advance, so that you know how to write your config files.

Fill out the following worksheet, using the default values given in parentheses, or your own values, as you prefer:

<pre>
Port-A: `apache` Port: __________ (80) 
Port-N: `nginx` Port: __________ (8080)
Port-N1: `nginx` Suffix: _________ (/game)
Port-T: Tunnel Game Port: __________ (8081)
Port-TW: Tunnel Woe Port: __________ (8082)
</pre>

The rest of this doc describes how to set up this series of tubes.

<pre>
__Game:__
Client (apache @ Port-A) -> Nginx (@Port-N/Port-N1) -> Tunnel (@Port-T)

__Woe:__
Client (apache @ Port-A) -> Tunnel (@Port-TW)
</pre>

## 0. Upgrade to Stretch (Debian 9)

These docs use Stretch (Debian 9) as a foundation. It's likely that any other modern Linux would work about the same.

```
$ cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 9 (stretch)"
NAME="Debian GNU/Linux"
VERSION_ID="9"
VERSION="9 (stretch)"
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"

```
If you are not using stretch or better, you will need to [upgrade](https://linuxconfig.org/how-to-upgrade-debian-8-jessie-to-debian-9-stretch).

## 1. Install Nginx

Nginx is a web proxy that will allow you to grab web connections intended for the client (and Woe).

### 1.1 Install Nginx
Make sure your cache is up to date before doing any linux installs:
```
$ apt-get update
```
Then install the nginx package:
```
$ apt-get install nginx-full
```
By default, nginx will try to bind to port 80, and may well fail depending on your site's setup. No worries, you'll be setting it to a less privileged port.

### 1.2 Install Nginx Preferences

Edit /etc/nginx/sites-available/default.

**SkotOS Example:**
```
# lazarus.conf

map $http_upgrade $connection_upgrade {
    default upgrade;
        '' close;
        }

upstream lazarus {
    server 127.0.0.1:8081;
}

server {
    listen *:8080;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    location /lazarus {
      proxy_pass http://lazarus;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
    }
}
```

**Genesis Example:**
```
# eternal_city.conf

map $http_upgrade $connection_upgrade {
    default upgrade;
        '' close;
        }

upstream tec {
    server 127.0.0.1:8081;
}

server {
    listen *:8080;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    location /tec {
      proxy_pass http://tec;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
    }
}

```
This example will answer connections sent to "8080/lazarus" (in the SkotOS example) or "8080/tec" (in the Genesis example) and send them on to a tunnel program sitting at port 8081 of the local machine. This is the standard alternate port for HTML, and is the best place to put `nginx`, but if you chose a different value for __Port-N__, use that instead.

Change the name "lazarus" or "tec" for the name of your game, using the value you set for __Port-N1__. The `location` is the one that matters, because your client will use that to talk to `nginx`; you'll set it again there. But, you should also change `proxy_pass` and `upstream` for consistency.

Change the port "8081" to match the port that you set for __Port-T__. You'll see it again when you create the configuration for the tunnel. If you are connecting to a SkotOS machine, you may note that there is no connection for the Tree of Woe here. That is correct: the connection for the game goes from the client to `nginx` to the tunnel, but the connection for Woe goes straight from the client to the tunnel.

### 1.3 Open Nginx Port

If you have a firewall, you must open port 8080 (or your alternate __Port-N__) so that `nginx` can respond to non-local connections:
```
-A INPUT -p tcp --dport 8080 -j ACCEPT
```

Afterward, be sure to restart your firewall, with a command such as:
```
iptables-restore < /etc/iptables.firewall.rules
```
(The specifics will vary based on your setup. This example presumes that your firewall rules are kept in `/etc/iptables.firewall.rules`.)

### 1.4 Start Nginx

You can now start `nginx`. It should now also correctly auto-start on reboot:
```
# /etc/init.d/nginx stop
# /etc/init.d/nginx start
```

## 2. Install the Tunnel

The tunnel translates the HTML-style connection of the client into WebSockets. It's a standalone piece of code written by a player that will always be running on the game server. 

The tunnel is installed on Github, so for easy updates, we'll be installing `git`, and using that to clone the current code.

### 2.1 Install Git

Install git:
```
$ apt-get install git
```

### 2.2 Install Node.js

The tunnel is written in `node.js`, so that needs to be installed as well:
```
$ curl -sL https://deb.nodesource.com/setup_9.x | bash -
$ apt install nodejs
```
Some newer versions of Debian "helpfully" install Nodejs when you ask for 9, and this does not seem to work.

If you have this problem, you need to put:
```
Package: *
Pin: origin deb.nodesource.com
Pin-Priority: 600
```
In: `/etc/apt/preferences.d/nodesource`

And then purge and install noedjs again.

Warning: NodeJS 9 is now out of date. But, the tunnel looks like it needs to be updated.

### 2.3 Install the Tunnel

Clone the repo:
```
$ git clone https://github.com/skotostech/websocket-to-tcp-tunnel /usr/local/websocket-to-tcp-tunnel
```
You also need to install specific `node.js` packages:
```
$ cd /usr/local/websocket-to-tcp-tunnel/
$ npm install
$ chmod a+x *.sh
```
Finally, adjust the permissions of the tunnel to be owned by your web server user:
```
$ chown -R www-data.www-data /usr/local/websocket-to-tcp-tunnel/
```

### 2.4 Install Tunnel Preferences

Create a `/usr/local/websocket-to-tcp-tunnel/config.json` file.

**SkotOS Example:**
```
{
    "pidFileDirectory": "./",
    "logDirectory": "/var/log/tunnel/",
    "websocketHeartbeat": 30,
    "shutdownDelay": 60,
    "servers": [
  {
    "name": "lazarus",
    "listen": 8081,
    "send": 443,
    "host": "lazarus-game.skotos.net",
    "sendTunnelInfo": false
  },
  {
    "name": "Lazarus Tree of Woe",
    "listen": 8082,
    "send": 2090,
    "host": "lazarus-game.skotos.net",
    "sendTunnelInfo": false
  }
]

}
```

Note that for a SkotOS game, you're running two tunnels, one for the client (at a port defined in the `nginx`) and one for the Tree of Woe (at a port defined in the client).

The `host` should be the game's hostname, while the `send` port should be its standard port (for SkotOS games, usually 443, and for SkotOS WOE, usually XX90). The `listen` ports should be set to __Port-T__ and _Port-TW__.

Note that `sendTunnelInfo` is always `false` for SkotOS machines: they can't handle it.

**Genesis Example:**
```
{
    "pidFileDirectory": "./",
    "logDirectory": "/var/log/tunnel/",
    "websocketHeartbeat": 30,
    "shutdownDelay": 60,
    "servers": [
  {
    "name": "tec",
    "listen": 8081,
    "send": 6730,
    "host": "tec.skotos.net",
    "sendTunnelInfo": true
  }
]

}
```
Again, `listen` port should be __Port-T__, which should match the upstream port from `nginx` and `host` should be the game's hostname, while the `send` port should be its standard port (6730 for TEC). Note that `sendTunnelInfo` is `true` for Genesis games: they _can_ handle it.

### 2.5 Open Up More Ports

At this point you may need to open more ports, for the ports referenced by the tunnel (__Port-T__ and possibly __Port-TW__):

**SkotOS Example:**

```
-A INPUT -p tcp --dport 8081 -j ACCEPT
-A INPUT -p tcp --dport 8082 -j ACCEPT

```
**Genesis Example:**

```
-A INPUT -p tcp --dport 8081 -j ACCEPT
```
The _may_ relates to which IP addresses you are using to connect from the client and `nginx` to the tunnel, and whether those addresses are local or not. But, you'll often need to do this. When in doubt, do it, and then you can test later if you can remove them.

Afterward, be sure to restart your firewall, with a command such as:
```
iptables-restore < /etc/iptables.firewall.rules
```
(The specifics will vary based on your setup. This example presumes that your firewall rules are kept in `/etc/iptables.firewall.rules`.)

### 2.6 Prepare Tunnel Logs

Make a directory for your logs that matches the `logDirectory` in the preferences and be sure it's owned by your web server user.
```
$ mkdir /var/log/tunnel
$ chown www-data.www-data /var/log/tunnel
```

### 2.7 Start the Tunnel

You should be able to start the tunnel from the appropriate user by running the process that checks if the tunnel is running:
```
$ sudo -u www-data /usr/local/websocket-to-tcp-tunnel/search-tunnel.sh
```

### 2.8 Update Your Crontab

Finally, update your crontab for your `www-data` or other web server user to start the tunnel at bootup and to check that it's running every minute:

```
$ crontab -u www-data -e
@reboot /usr/local/websocket-to-tcp-tunnel/start-tunnel.sh
* * * * * /usr/local/websocket-to-tcp-tunnel/search-tunnel.sh
```

## 3. Set up Secondary IP Address (if Needed)

If you are running the client on the same server as a SkotOS game, then you will need to procure a second IP address for your web server, since SkotOS games already run on ports 80 and 443. (Skip this step if you are using a separate machine for your web serving, including the client, or if you are running a Genesis game.)

### 3.1 Request a New IP

The exact methodology for this will vary from site to site. At Linode, you need to enter a service request, carefully explain why a second port is required, convince them that it really *is* required, and then "Add Public IPv4" from the "Networking" page afterward.

### 3.2 Create the Interface

Once you've got a new IP on your machine, you can add it to your `interfaces`:
```
$ cat >> /etc/network/interfaces
# ====================================================================
# Web IP
# ====================================================================
iface eth0:1 inet static
 address YOUR-NEW-IP
 netmask 255.255.255.0
```
Then, restart your networking
```
# /etc/init.d/networking restart
# ifup eth0:1
```
(On some machines, you may instead need to reboot the whole machine, to get access to the new address, depending on its physical or virtual setup.)

### 3.3 Setup Your DNS for IP address (if needed)

Obviously, you'll also need to use DNS to link YOUR-NEW-IP to a domain name, if you haven't already done so. This can be done on your name server or at your name registrar, depending on your individual setup.

Note that the new server's domain must be the same as the domain that serves your authentication, else your authentication COOKIE will not carry across, and users will be forced to re-login.

## 4. Install the Client

The client is the actual HTML5 program which allows players to play your game. It goes through `nginx` and the tunnel so that it can convert from HTML to WebSockets, but the hard work is all done here.

### 4.1 Install the Client

You're now ready to install the client, which also comes from GitHub:
```
$ git clone https://github.com/skotostech/orchil /var/www/html/client
```
You will probably need to adjust `profiles.js` to include the connections for your client and your WOE. Here you're going to need to match __Port-N__ (for `port`), __Port-N1__ (for `path`), and on a SkotOS machine __Port-TW__ (for `woe_port). Obviously, the `server` will match where `nginx` is running.

**SkotOS Example:**
```
var profiles = {
        "portal_lazarus":{
                "method":   "websocket",
                "protocol": "ws",
                "server":   "lazarus.skotos.net",
                "port":      8080,
                "woe_port":  8082,
                "path":     "/lazarus",
                "extra":    "",
                "reports":   false,
                "chars":     true
        }
};
```

**Genesis Example:**
```
var profiles = {
	"portal_tec":{
		"method":   "websocket",
		"protocol": "ws",
		"server":   "tec.skotos.net",
		"port":      8080,
		"path":     "/tec",
		"extra":    "tec",
		"reports":  true,
		"chars":    false
	}
}
```

## 5. Install Apache

Apache is needed to serve the client. 

### 5.1 Install Apache Package

Install the package using `apt-get`.
```
$ apt-get install apache2
```
If you're installing on a SkotOS machine, you'll probably see errors in the install. They just have to do with `apache2` not being able to start because port 80 is already in use; no worries, you'll resolve that in the next step.

### 5.2 Setup Your Apache Configuration

You'll need to set up an apache site for the client (unless you're planning to access it through your main web site). This will require creating a `/etc/apache2/sites-available/client.conf` file that looks something like this:
```
<VirtualHost YOUR-NEW-IP:80>

	ServerName YOUR-CLIENT-DNS
	ServerAdmin webmaster@localhost

	DocumentRoot /var/www/html/client
	<Directory /var/www/html/client/>
		Options FollowSymLinks
		AllowOverride None
		Require all granted
	</Directory>
	
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```
Then enable it:
```
$ a2ensite client
Enabling site client.
```
It would be very unusual to not be using port 80 for __Port-A__, because that's the standard for web browsers. But, if you had to change that for some reason, you'd do it here and in the later sections.

### 5.3 Setup Your Apache for a Secondary IP (optional)

If you're using a secondary IP address, you'll also need to change `/etc/apache2/ports.conf`, add your IP address in front of the port numbers 80 and 443 on the `Listen` lines, followed by a colon:
```
Listen YOUR-NEW-IP:80

<IfModule ssl_module>
	Listen YOUR-NEW-IP:443
</IfModule>

<IfModule mod_gnutls.c>
	Listen YOUR-NEW-IP:443
</IfModule>

```
If you already have other IP addresses on this `apache`, just add the new one as a separate line.

### 5.4 Startup Apache

You can now start `apache`:
```
$ /etc/init.d/apache2 start
```

## 6. Add the Client to Your Game

Integrate the client in the game's startup files (for SkotOS) or its web files (for Genesis).

**SkotOS Example:**

Add something like the following to the character portal page:
```
<z name="$(UDat.name)" udat="$(UDat.Dat)">$[$username = $name; $dat = $udat;]</z>
$[$bodies = Udat::query_bodies_in_roster($user: $username); ]
<for var="thisbody" val="$(bodies)">
            <tr>
                 <td><b>$[Describe($thisbody)]</b></td>
                 <td>[<a href="javascript:bareWin('http://client.lazarus.skotos.net/lazarus/lazarus.htm?charName=$[name($thisbody)[15..strlen(name($thisbody))-1]]', '_blank', 720, 480);">Orchil</a> (experimental)]</td>
            </tr>
</for>
```

**Genesis Example:**

Create a web page that links to the client:
```
<p><b>General Clients:</b>
  <ul>
    <li><a href="http://client.tec.skotos.net/tec/tec.htm">Orchil client</a> (modern browsers)
  </ul>
```


And your client is now ready to go!

## 7. Later: Update Github Repos

At some time you may hear that the client or the web tunnel was updated. If so, you'll need to go to the directory that has that repo installed and update it. This is how to update the client:
```
$ cd /var/www/html/client
$ git pull
```

