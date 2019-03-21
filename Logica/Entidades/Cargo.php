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
		$name=$_POST["name"];
		$salario=$_POST["salario"];
		$respuesta="";
		$query=mysqli_query($link,"SELECT nombre from cargo where nombre='".$name."';");
		$check_categoria=mysqli_fetch_array($query);
		if($check_categoria['nombre']!= $name){
			mysqli_query($link,"insert into cargo(nombre, salario) values('".$name."', ".$salario.");");
			$respuesta="Cargo creado con éxito";
		}else{	
			$respuesta="El cargo ya exite";
		}
		return $respuesta;
	}

	function editar(){
		require("connect_DB.php");
		$name=$_POST["name"];
		$newName=$_POST["newName"];
		$respuesta="";
		$query=mysqli_query($link,"SELECT nombre from categoria where nombre='".$name."';");
		$check_categoria=mysqli_fetch_array($query);
		if($check_categoria['nombre']== $name){
			mysqli_query($link,"update categoria set nombre='".$newName."' where nombre='".$name."';");
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

	function ver(){
		$respuesta="";

		return $respuesta;
	}



	echo $mensaje;