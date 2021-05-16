<!DOCTYPE html>
<html lang="fr-FR">

    <head>
        <link rel="alternate" hreflang="fr" href="https://luxeach.tk/html/search.php" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Aytixel">
        <link rel="icon" type="image/png" sizes="32x32" href="/ressources/img/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/ressources/img/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ressources/img/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/ico" href="/ressources/img/favicon/favicon.ico" />
        <title>Luxeach</title>
		<link rel="preload stylesheet" as="style" type="text/css" href="/css/style-font.css" />
		<link rel="preload stylesheet" as="style" type="text/css" href="/css/style-2.css" />
		<link rel="preload stylesheet" as="style" type="text/css" href="/css/menu.css" />
		<link rel="preload stylesheet" as="style" type="text/css" href="/css/result.css" />
        <script type="text/javascript">
        NodeList.forEach||(NodeList.prototype.forEach=function(a,b){void 0===b&&(b=this);array=this;for(var index=0;index<b.length;++index)a(b[index],index,array)});"addEventListener"in window||(Window.prototype.addEventListener=HTMLDocument.prototype.addEventListener=Element.prototype.addEventListener=function(a,b){var c=this;this.attachEvent("on"+a,function(){b.call(c,window.event)})});
function getXMLHttpRequest(){var a=null;if(window.XMLHttpRequest||window.ActiveXObject)if(window.ActiveXObject)try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){a=new ActiveXObject("Microsoft.XMLHTTP")}else a=new XMLHttpRequest;else return alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest..."),null;return a}function debounce(a,b){var c;return function(){var d=arguments,e=this;clearTimeout(c);c=setTimeout(function(){a.apply(e,d)},b)}}
function throttle(a,b){var c,d;return function(){var e=this,f=+new Date,g=arguments;c&&f<c+b?(clearTimeout(d),d=setTimeout(function(){c=f;a.apply(e,g)},b)):(c=f,a.apply(e,g))}}function preventThrottle(a,b){return function(){var c=arguments;c[0].preventDefault();throttle(a,b).apply(this,c)}};
        </script>
        <script src="/js/scroll.js" async></script>
        <script src="/js/result.js" async></script>
        <script src="/js/search.js" defer async></script>
        <script src="/js/menu.js" defer async></script>
    </head>
    
    <body>
        <div class="menu-button">
            <div id="_1"></div>
            <div id="_2"></div>
            <div id="_3"></div>
        </div>
        
        <div class="menu">
            <h1 class="title">Menu</h1>
            <ul>
                <li><a href="https://luxeach.tk/"><h4>Accueil</h4></a></li>
                <li><a href="https://luxeach.tk/html/save-new-page.htm"><h4>Enregistrer une nouvelle page</h4></a></li>
            </ul>
            
            <h2>Extensions</h2>
            <ul>
                <li><a target="_blank" href="https://luxeach.tk/chrome-extension"><h4>Chrome</h4></a></li>
                <li><a target="_blank" href="https://luxeach.tk/opera-extension"><h4>Opera</h4></a></li>
            </ul>
            
            <div class="creator-footer">Createur Aytixel : <a target="_blank" href="https://www.youtube.com/channel/UCGKDropdJD3YoxSXtW3RKmg">Youtube</a> <a target="_blank" href="https://discord.gg/3xuGRrB">Discord</a></div>
        </div>
        <div class="menu-mask"></div>
        
        <div class="top">
            <form action="/html/search.php" method="get">
                <input type="text" placeholder="Que cherchez-vous ?" autocomplete="off" name="rq" class="search in" />
            </form>
        </div>
        
        <div class="body">
            <div class="results" rq="<?php echo urlencode(utf8_encode($_GET['rq'])) ?>"></div>
        </div>
    </body>
    
</html>