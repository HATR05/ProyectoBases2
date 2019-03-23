function crearVenta(){
	alert("Me llamaron?");
	var date= new Date();
	var dateVenc= new Date()+30;

	var url="/ProyectoBases2/Logica/Entidades/Factura.php"

	var empleado_id = document.getElementById("empleado_id");
	var empleado_id = empleado_id.value;
	var cliente_id = document.getElementById("cliente");
	var cliente_id = cliente_id.value;
	var nit = null;
	var fecha_factura = date.getYear()+"-"+date.getMonth()+"-"+date.getDate();
	var fecha_vencimiento = dateVenc.getYear()+"-"+dateVenc.getMonth()+"-"+dateVenc.getDate();
	var saldo = document.getElementById("saldo");
	var saldo = saldo.value;
	var subtotal = document.getElementById("subtotal");
	var subtotal = subtotal.value;
	var total = document.getElementById("total");
	var total = total.value;
	var info="opcion=crear&empleado_id"+empleado_id+"&cliente_id"+cliente_id+
	"&nit"+nit+"&fecha_factura"+fecha_factura+"&fecha_vencimiento"+fecha_vencimiento+
	"&saldo"+saldo+"&subtotal"+subtotal+"&total"+total;

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

function crearCompra(){
	var date= new Date();
	var dateVenc= new Date()+30;

	var url="/ProyectoBases2/Logica/Entidades/Factura.php"

	var empleado_id= document.getElementById("empleado_id");
	var empleado_id= empleado_id.value;
	var fecha_factura= date.getYear()+"-"+date.getMonth()+"-"+date.getDate();
	var fecha_vencimiento= dateVenc.getYear()+"-"+dateVenc.getMonth()+"-"+dateVenc.getDate();
	var saldo= document.getElementById("empleado_id");
	var info="opcion=crear$empleado_id"+empleado_id+"&fecha_factura"+fecha_factura+"&fecha_vencimiento"+fecha_vencimiento;

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

function guardar() {
	var url="/ProyectoBases2/Logica/Entidades/Factura.php"

	var cliente_id= document.getElementById("cliente_id");
	var cliente_id= cliente_id.value;
	var nit= document.getElementById("nit");
	var nit= nitCrear.value;
	var saldo= traerSaldo();
	var saldo= saldo.value;
	var subtotal= document.getElementById("subtotal");
	var subtotal= subtotal.value;
	var total= document.getElementById("total");
	var total= total.value;

	var info="opcion=crear&cliente_id="+cliente_id+"&nit="+nit+"&empleado_id"+empleado_id
	+"&fecha_factura="+fecha_factura+"&fecha_vencimiento"+fecha_vencimiento+"&saldo="+saldo
	+"&subtotal="+subtotal+"&total="+total;

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
function traerSaldo(){


}


function editar(factura_id){
	var url="/ProyectoBases2/Logica/Entidades/Factura.php"

	var nuevo_cliente= document.getElementById("nuevo_cliente");
	var nuevo_nit= document.getElementById("nuevo_nit");
	var producto_id= document.getElementById("cliente_id");
	var nuevo_cliente= document.getElementById("nuevo_cliente");
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

function traerFactura(){
	var factura_id="";
	var cliente_id="";
	var nit="";
	var empleado_id="";
	var fecha_factura="";
	var fecha_vencimiento="";
	var saldo="";
	var subtotal="";
	var total="";
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
