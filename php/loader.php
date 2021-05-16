<?php
require_once '../php/db.php';

if ($_GET['rq'] != '') {
    $req = $pdo->query('SELECT  url, title, description FROM url_bank WHERE is_new = 0 AND title LIKE "%'. $_GET['rq'] .'%" LIMIT '. $_GET['limit_low'] .', '. $_GET['limit_high']);
    $results_data;
    $i = 0;

    while ($data = $req->fetch()) {
        $results_data[$i]['url'] = utf8_encode($data->url);
        $results_data[$i]['title'] = utf8_encode($data->title);
        $results_data[$i]['description'] = utf8_encode($data->description);
        
        $i++;
    }
    
    echo json_encode($results_data);
} else echo json_encode(null);