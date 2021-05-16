<?php
require_once 'db.php';

if ($_GET['id'] != '' && $_GET['decision'] != '') {
    if ($_GET['decision'] == 'true')  $req = $pdo->query('UPDATE url_bank SET is_new = 1 WHERE is_new = 2 AND id = '. $_GET['id']);
    else $req = $pdo->query('DELETE FROM url_bank WHERE is_new = 2 AND id = '. $_GET['id']);
}