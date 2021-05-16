<?php
require_once 'db.php';

if ($_GET['url'] != '') {
    $req = $pdo->query('SELECT view_count FROM url_bank WHERE url = "'. $_GET['url'] .'"');
    if ($view_count = $req->fetch()) $req = $pdo->query('UPDATE url_bank SET view_count = '. ($view_count->view_count + 1) .' WHERE url = "'. $_GET['url'] .'"');
}