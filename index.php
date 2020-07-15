<?php

try{

    $db = new PDO('mysql:host=localhost;dbname=shopping','root','laromaclub2008', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        $db->exec("SET NAMES UTF8");
        echo 'salut';
        print_r($_POST);
    } catch(Exception $e){
        die('Erreur : ' . $e->getMesssage());
    }
$query = "INSERT INTO article (uri, title) VALUES (?,?)";
$insert = $db->prepare($query);
$insert->execute([$_POST['uri'],
$_POST['title']]);

?>