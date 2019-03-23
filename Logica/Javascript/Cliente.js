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
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			alert(xhr.responseText);
		}
	};
	xhr.send(info);
}

function getCities(){
	var url="/ProyectoBases2/Logica/Entidades/Cliente.php"
	var departamento = document.getElementById("departamento").value;
	var info="opcion=getCities&departamento=" + departamento;
	var xhr = new XMLHttpRequest();
	xhr.open("POST",url,true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
	xhr.onreadystatechange = function(){		
		if(xhr.readyState == 4 && xhr.status == 200){
			var cities = xhr.responseText.split(",");
			var city = document.getElementById("ciudad");
			var opcion="<option>---------------</option>";
			for(var i=0; i<cities.length; i++){
				if(i%2==0){
					opcion=opcion+"<option value='"+cities[i]+"'>"+cities[i+1]+"</option>";
				}
			}
			city.innerHTML=opcion;
			city.setAttribute("onchange","getBarrio()");
		}
	};
	xhr.send(info);
}

function getBarrio(){
	var url="/ProyectoBases2/Logica/Entidades/Cliente.php"
	var ciudad = document.getElementById("ciudad").value;
	var info="opcion=getBarrio&ciudad=" + ciudad;
	var xhr = new XMLHttpRequest();
	xhr.open("POST",url,true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
	xhr.onreadystatechange = function(){		
		if(xhr.readyState == 4 && xhr.status == 200){
			var barrios = xhr.responseText.split(",");
			var barrio = document.getElementById("barrio");
			var opcion="<option>---------------</option>";
			for(var i=0; i<barrios.length; i++){
				if(i%2==0){
					opcion=opcion+"<option value='"+barrios[i]+"'>"+ barrios[i+1]+"</option>";
				}
			}
			barrio.innerHTML=opcion;
			barrio.setAttribute("onchange","getAddress()");
		}
	};
	xhr.send(info);
}

function getAddress(){
	var url="/ProyectoBases2/Logica/Entidades/Cliente.php"
	var barrio = document.getElementById("barrio").value;
	var info="opcion=getAddress&barrio=" + barrio;
	var xhr = new XMLHttpRequest();
	xhr.open("POST",url,true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
	xhr.onreadystatechange = function(){		
		if(xhr.readyState == 4 && xhr.status == 200){
			var address = xhr.responseText.split(",");
			var adr = document.getElementById("ubicacion");
			var opcion="<option>---------------</option>";
			for(var i=0; i<address.length; i++){
				if(i%2==0){
					opcion=opcion+"<option value='"+address[i]+"'>"+ address[i+1]+"</option>";
				}
			}
			adr.innerHTML=opcion;
		}
	};
	xhr.send(info);	
}