=== Membuat Aplikasi Node.js ===

Untuk aplikasi Node.js, kita akan membangun server Node.js dengan modul HTTP yang disediakan oleh Node.js. Mari kita mulai dengan menginisialisasi proyek Node.js
const http = require("http");

const server = http.createServer((req, res) => {
  const urlPath = req.url;
  if (urlPath === "/overview") {
    res.end('Welcome to the "Technical Test" of DevOps');
  } else if (urlPath === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        product_id: "xyz12u3",
        product_name: "NginX",
      })
    );
  } else {
    res.end("Server bisa jalan");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Listening for request");
});

=== Instalasi dan Konfigurasi Nginx Reverse Proxy ===
$ apt install nginx -y
$ systemctl enable nginx
Synchronizing state of nginx.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable nginx
$
$ systemctl start nginx

Selanjutnya melakukan konfigurasi Nginx reverse Proxy
$ vim /etc/nginx/sites-available/nginx_server_project.conf

#The Nginx server instance App
server{
    listen 80;
    server_name technicaltest.id www.technicaltest.id;

    access_log /var/log/nginx/nodejstest.id_access.log;
    error_log /var/log/nginx/nodejstest.id_error.log;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        # location /overview {
        #     proxy_pass http://127.0.0.1:3000$request_uri;
        #     proxy_redirect off;
        # }
    }
}

Simpan dan silakan membuat symbolic untuk konfigurasi Nginx
$ ln -s /etc/nginx/sites-available/nginx_server_project.conf /etc/nginx/sites-enabled/

Kemudian, verifikasi konfigurasi Nginx dan silakan restart Nginx
$ nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
$
$ systemctl restart nginx

Jalankan aplikasi Node.js menggunakan perintah node seperti berikut ini:
$ cd /var/www/html/nginx_server_project/
$ node server.js
Listening for request
