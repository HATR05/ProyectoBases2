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
		case 'listar':
			$mensaje= lista();
			break;
		case 'ver':
			$mensaje= ver();
			break;
	}
	

	function crear(){
		require("connect_DB.php");
		$empleado_id = $_POST["empleado_id"];
		$cliente_id = $_POST["cliente_id"];
		$nit = $_POST["nit"];
		$fecha_factura = $_POST["fecha_factura"];
		$fecha_vencimiento = $_POST["fecha_vencimiento"];
		$saldo = $_POST["saldo"];
		$subtotal = $_POST["subtotal"];
		$total = $_POST["total"];

		$respuesta = "";
		mysqli_query($link,"insert into factura (empleado_id) values('".$empleado_id."');");
		mysqli_query($link,"insert into factura (cliente_id) values('".$cliente_id."');");
		mysqli_query($link,"insert into factura (nit) values('".$nit."');");
		mysqli_query($link,"insert into factura (fecha_factura) values('".$fecha_factura."');");
		mysqli_query($link,"insert into factura (fecha_vencimiento) values('".$fecha_vencimiento."');");
		mysqli_query($link,"insert into factura (saldo) values('".$saldo."');");
		mysqli_query($link,"insert into factura (subtotal) values('".$subtotal."');");
		mysqli_query($link,"insert into factura (total) values('".$total."');");

		$respuesta = "Factura creada con éxito";
		return $respuesta;
	}

	function editar(){
		require("connect_DB.php");
		$factura_id=$_POST["factura_id"];
		$newCliente=$_POST["newCliente"];
		$newNit=$_POST["newNit"];
		$newEmpleado_id=$_POST["newEmpleado_id"];
		$newFecha_factura=$_POST["newFecha_factura"];
		$newFecha_vencimiento=$_POST["newFecha_vencimiento"];
		$newSaldo=$_POST["newSaldo"];
		$newSubtotal=$_POST["newSubtotal"];
		$newTotal=$_POST["newTotal"];
		
		$respuesta="";

		$query=mysqli_query($link,"SELECT factura_id from factura where nombre='".$factura_id."';");
		$check_categoria=mysqli_fetch_array($query);
		if($check_categoria['factura_id']== $factura_id){
			mysqli_query($link,"update factura set cliente_id='".$newCliente."' where factura_id='".$factura_id."';");
			mysqli_query($link,"update factura set nit='".$newNit."' where factura_id='".$factura_id."';");
			mysqli_query($link,"update factura set empleado_id='".$newEmpleado_id."' where factura_id='".$factura_id."';");
			mysqli_query($link,"update factura set fecha_factura='".$newFecha_factura."' where factura_id='".$factura_id."';");
			mysqli_query($link,"update factura set fecha_vencimiento='".$newFecha_vencimiento."' where factura_id='".$factura_id."';");
			mysqli_query($link,"update factura set saldo='".$newSaldo."' where factura_id='".$factura_id."';");
			mysqli_query($link,"update factura set subtotal='".$newSubtotal."' where factura_id='".$factura_id."';");
			mysqli_query($link,"update factura set total='".$newTotal."' where factura_id='".$factura_id."';");
			$respuesta="Factura modificada con éxito";
		}else{	
			$respuesta="La Factura ".$factura_id." no existe";
		}

		return $respuesta;
	}

	function lista(){
		$respuesta="";

		return $respuesta;
	}

	function ver(){
		$respuesta="";

		return $respuesta;
	}



	echo $mensaje;