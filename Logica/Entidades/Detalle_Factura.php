<?php
	$opcion=$_POST["opcion"];
	$mensaje="";

	switch ($opcion) {
		case 'crear':
			$mensaje= crear();
			break;
		case 'editar':
			$mensaje= editar();
			break;
		case 'eliminar':
			$mensaje= eliminar();
			break;
	}
	

	function crear(){
		require("connect_DB.php");
		$factura_id=$_POST["factura_id"];
		$producto_id=$_POST["producto_id"];
		$cantidad=$_POST["cantidad"];
		$costo=$_POST["costo"];
		$respuesta="";

		mysqli_query($link,"insert into detalle_factura (factura_id) values('".$factura_id."');");
		mysqli_query($link,"insert into detalle_factura (producto_id) values('".$producto_id."');");
		mysqli_query($link,"insert into detalle_factura (cantidad) values('".$cantidad."');");
		mysqli_query($link,"insert into detalle_factura (costo) values('".$costo."');");
		
		$respuesta="Producto en factura creado con éxito";
		return $respuesta;
	}

	function editar(){
		require("connect_DB.php");
		$factura_id=$_POST["factura_id"];
		$newFactura_id=$_POST["newFactura_id"];
		$producto_id=$_POST["producto_id"];
		$newProducto_id=$_POST["newProducto_id"];
		$cantidad=$_POST["cantidad"];
		$newCantidad=$_POST["newCantidad"];
		$costo=$_POST["costo"];
		$newCosto=$_POST["newCosto"];
		$respuesta="";

		$query=mysqli_query($link,"SELECT factura_id from detalle_factura where factura_id='".$factura_id."';");
		$check_categoria=mysqli_fetch_array($query);
		if($check_categoria['factura_id']== $factura_id){
			mysqli_query($link,"update detalle_factura set producto_id='".$newProducto_id."' where factura_id='".$factura_id."';");
			mysqli_query($link,"update detalle_factura set cantidad='".$newCantidad."' where factura_id='".$factura_id."';");
			mysqli_query($link,"update detalle_factura set costo='".$costo."' where factura_id='".$factura_id."';");
			$respuesta="Categoría modificada con éxito";
		}else{	
			$respuesta="La categoria ".$name." no existe";
		}
		return $respuesta;
	}

	function lista(){
		$respuesta="";

		return $respuesta;
	}

	function eliminar(){
		require("connect_DB.php");
		$factura_id=$_POST["factura_id"];
		$producto_id=$_POST["roducto_id"];

		$query1=mysqli_query($link,"SELECT producto_id from detalle_factura where factura_id='".$factura_id."';");

		$check_categoria=mysqli_fetch_array($query);
		if($check_categoria['nombre']== $name){
			mysqli_query($link,"delete from categoria where factura".$name."');");
			$respuesta="Categoría creada con éxito";
		}else{	
			$respuesta="La categoría ya exite";
		}

		return $respuesta;
	}



	echo $mensaje;