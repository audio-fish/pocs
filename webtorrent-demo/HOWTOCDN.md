# HOW TO WEBTORRENT CDN

1. ### INSTALL TORRENT CREATOR

   1. ### `npm install create-torrent`

2. ### CREATE YOUR TORRENT

   1. `create-torrent --urlList http://127.0.0.1:8080/demo.wav demo.wav > demo.wav.torrent`

   2. remember to include url of original static file location in the urlList param (Web seed url)

   3. upload that `demo.wav.torrent` file to your host

   4. now you can start downloading + seeding! : 

   5. ```
        1 <html>
        2   <body>
        3     <script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>
        4     <script>
        5       var client = new WebTorrent()
        6       client.add('http://127.0.0.1:8080/demo.wav.torrent', function (torrent) {
        7         console.log('torrent.numPeers', torrent.numPeers);
        8         // Got torrent metadata!
        9         console.log('Client is downloading:', torrent.infoHash)
       10         torrent.files[0].appendTo('body')
       11       })
       12     </script>
       13   </body>
       14 </html>
      ~                                                                                       
      ```
