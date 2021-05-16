<?php
require_once 'db.php';

if ($_GET['url'] != '') {
    $req = $pdo->query('SELECT id FROM url_bank WHERE url = "'. $_GET['url'] .'"');
    if (!$req->fetch()) $req = $pdo->query('INSERT INTO url_bank SET url = "'. $_GET['url'] .'", register_date = NOW(), is_new = 2');
}