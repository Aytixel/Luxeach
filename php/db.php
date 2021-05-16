<?php
$pdo = new PDO('mysql:dbname=luxeach_database;host=mariadb', 'commun', 'MDEyOWF5dGl4ZWw=');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);