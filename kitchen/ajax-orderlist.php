<?php

	$mongo = new Mongo();
	$db = $mongo->selectDB('kiosk');
	$collection = new MongoCollection($db, 'orders');
    
	
	$keys = array("food_name" => 1);

	$initial = array("count" => 0);

	$reduce = "function (obj, prev) {prev.count += 1;}";

	$conditions = array('type'=> 'dinner');
	
	$conditions1 = array('type'=> 'lunch');

	$dinner = $collection->group($keys, $initial, $reduce, array('condition'=>$conditions));

	$lunch = $collection->group($keys, $initial, $reduce, array('condition'=>$conditions1));

	echo json_encode($g['retval']);

	$connection->close();
    
	echo json_encode($data);
    

?> 