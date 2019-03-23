function crear() {
	var url="/ProyectoBases2/Logica/Entidades/Categoria.php"
	var producto_id= document.getElementById("producto_id");
	var producto_id= producto_id.value;
	var cantidad= document.getElementById("cantidad");
	var cantidad= cantidad.value;
	var info="opcion=crear&name="+nombre;
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
	var url="/ProyectoBases2/Logica/Entidades/Categoria.php"
	var nombre_categoria= document.getElementById("nombre");
	var nuevo_categoria= document.getElementById("nuevoNombre");
	var nombre= nombre_categoria.value;
	var nuevoNombre= nuevo_categoria.value;
	var info="opcion=editar&name="+nombre+"&newName="+nuevoNombre;
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


function eliminar(){
	var idCat=document.getElementById("idCat");
	var url="/ProyectoBases2/Logica/Entidades/Categoria.php"
	var text_idCat= idCat.value;
	var info="opcion=eliminar&idCat="+text_idCat;
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
