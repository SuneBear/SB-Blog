<?php
	$songID = intval($_GET['id']);

	// $xmlurl = 'http://www.xiami.com/song/playlist/id/'.$songID.'/object_name/default/object_id/0';
	// $xmlContents = trim(@file_get_contents($xmlurl));
	// $pos1 = strpos($xmlContents, '<location>') + strlen('<location>');
	// $pos2 = strpos($xmlContents, '</location>');
	// $location = substr($xmlContents, $pos1, $pos2 - $pos1);
	// echo $location;

	$jsonURL = 'http://www.duoluohua.com/api/xiami/getsong/?action=getsong&appname=xiamimusicscript&version=1.0.9&songid='.$songID;
	$jsonContents = trim(@file_get_contents($jsonURL));
	$jsonData = @json_decode($jsonContents);
	echo $jsonData->location;
?>