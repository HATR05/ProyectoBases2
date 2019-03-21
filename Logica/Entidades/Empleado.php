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
		$nombreCargo=$_POST["nombreCargo"];
		$nombre=$_POST["nombre"];
		$apellido=$_POST["apellido"];
		$telefono=$_POST["telefono"];
		$respuesta="";
		//Trae el nombre de los empleados
		$queryName=mysqli_query($link,"SELECT nombre from empleado where nombre='".$nombre."';");
		$check_name=mysqli_fetch_array($queryName);
		//Trae el apellido de los empleados
		$querySurname=mysqli_query($link,"SELECT apellido from empleado where apellido='".$apellido."';");
		$check_surname=mysqli_fetch_array($querySurname);
		//Valida que no exista el empleado
		if($check_name['nombre']!= $nombre && $check_surname['apellido']!= $apellido){
			//Trae el Id del cargo
			$queryCargo=mysqli_query($link,"SELECT cargo_id from cargo where nombre='".$nombreCargo."';");
			$check_cargo=mysqli_fetch_array($queryCargo);
			mysqli_query($link,"insert into empleado(cargo_id, nombre, apellido, telefono) values(".$check_cargo['cargo_id'].", '".$nombre."', '" .$apellido. "', " .$telefono. ");");
			$respuesta="Empleado creado con éxito";
		}else{	
			$respuesta="El Empleado ya exite";
		}
		return $respuesta;
	}

	function editar(){
		require("connect_DB.php");
		$oldEmpleado=$_POST["oldEmpleado"];
		$nombreCargo=$_POST["nombreCargo"];
		$nombre=$_POST["nombre"];
		$apellido=$_POST["apellido"];
		$telefono=$_POST["telefono"];
		$respuesta="";
		$query=mysqli_query($link,"SELECT nombre, apellido from cargo where concat(nombre, ' ', apellido)='".$oldEmpleado."';");
		$check_empleado=mysqli_fetch_array($query);
		if(($check_empleado['nombre']." ".$check_empleado['apellido']) == $oldEmpleado){
			mysqli_query($link,"update empleado set cargo_id='".$nombreCargo."' where concat(nombre, ' ', apellido)='".$oldEmpleado."';");
			mysqli_query($link,"update empleado set nombre='".$nombre."' where concat(nombre, ' ', apellido)='".$oldEmpleado."';");
			mysqli_query($link,"update empleado set apellido='".$apellido."' where nombre='".$nombre."';");
			mysqli_query($link,"update empleado set telefono='".$telefono."' where nombre='".$nombre."';");
			$respuesta="Categoría modificada con éxito";
		}else{	
			$respuesta="El empleado ".$nombre." no existe";
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