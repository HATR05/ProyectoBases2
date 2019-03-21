function crear() {
	var url="/ProyectoBases2/Logica/Entidades/Cliente.php"
	var ubicacion = document.getElementById("ubicacion").value;
	var nombre = document.getElementById("nombre").value;
	var apellido = document.getElementById("apellido").value;
	var telefono = document.getElementById("telefono").value;
	var info="opcion=crear&nombreCargo=" + nombreCargo + "&nombre=" + nombre + "&apellido=" + apellido + "&telefono=" + telefono;
	var xhr = new XMLHttpRequest();
	xhr.open("POST",url,true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			alert(xhr.responseText);
		}
	};
	xhr.send(info);
}

function editar(){
	var url="/ProyectoBases2/Logica/Entidades/Cliente.php"
	var oldEmpleado= document.getElementById("empleado").value;
	var nombreCargo= document.getElementById("nombreCargo").value;
	var nombre = document.getElementById("nombre").value;
	var apellido = document.getElementById("apellido").value;
	var telefono = document.getElementById("telefono").value;
	var info="opcion=editar&oldEmpleado=" + oldEmpleado + "&nombreCargo=" + nombreCargo + "&nombre=" + nombre + "&apellido=" + apellido + "&telefono=" + telefono;
	var xhr = new XMLHttpRequest();
	xhr.open("POST",url,true);
	alert("Before");
	alert("After");
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			alert(xhr.responseText);
		}
	};
	xhr.send(info);
}