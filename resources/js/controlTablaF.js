var subtotal;
var total;
var valor_Unitario;

/*Método que monitorea las modificaciones de un componente
$("body").on('DOMSubtreeModified', "#advertencias", function(event) {
	event.preventDefault();

    alert('changed');
    if ($(this).length){
    	$('#save').attr('disabled');
    }
});*/

/**Método que permite guardar la factura si no hay advertencias pendientes.**/
$("body").on('DOMSubtreeModified', function(event) {
	event.preventDefault();

	var vendedor = document.getElementById('empleado_id').value;
	var cliente = document.getElementById("cliente").value; 
	var table = document.getElementById('tabla_productos');
	var rows = table.getElementsByTagName('tr').length;
	var warnings = document.getElementById('advertencias');
	var divCount =warnings.getElementsByTagName('div').length;

	var btnSave = document.getElementById('save');
	//alert("filas: "+rows+"warnings: "+divCount+"vendedor: "+vendedor+"cliente: "+ cliente);
	

	if(rows > 1 && divCount == 0 && vendedor != "" && cliente != ""){
		btnSave.removeAttribute("disabled");
	}else{
		btnSave.setAttribute("disabled", "true");
	}

});

//Método para agregar producto nuevo a la tabla
function insertProduct(){
	
	var producto = document.getElementById("producto");
	var selected = producto.options[producto.selectedIndex].text;
	var valP = producto.value;
	var arrayCadena = valP.split("--");
	valor_Unitario = arrayCadena[1];
	var idProd = arrayCadena[0];
	var existencias = verificarPro(idProd);

	if($('#t'+idProd).length == 0 && producto.value != 'default' ){
		if (existencias > 0 ){
			var newRow;
				newRow ='<td><div class="row_dataIdproducto" edit_type="click" value="'+idProd+'"col_name="fid">'+arrayCadena[0]+'</div></td>';
				newRow +='<td><div class="row_dataName" edit_type="click" col_name="fname">'+selected+'</div></td>';
				newRow +='<td><div class="row_dataQuatity" edit_type="click" type="number" required="true" col_name="fquantity">'+1+'</div></td>';
				newRow +='<td><div class="row_dataValUn" edit_type="click" col_name="fvalU">'+valor_Unitario+'</div></td>';
				newRow +='<td><div class="row_dataCost" edit_type="click" col_name="fcosto">'+valor_Unitario+'</div></td>';
				newRow +='<td><div class="delete" edit_type="click" col_name="faction">'+
				'<a class="delete" style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)">'+
				'Eliminar</a></div></td>';

				var tr = document.createElement("tr");
			   	tr.innerHTML=newRow;
			   	tr.id = 't'+idProd;
		   		tr.class = 'table';
		  	  document.getElementById("tabla_productos").appendChild(tr);
		}else{
			alert("Ya no quedan existencias de este producto.");
		}
	}

	    subtotal = 0;
	    generateSubtotal();
}

//Método para generar el subtotal de la compra
function generateSubtotal(){
	$(".row_dataCost").each(function(){
	subtotal+=parseFloat($(this).html()) || 0;
	});
	setSubtotal();
}

//Método para mostrar el saldo, total y subtotal de la compra
function setSubtotal(){
	var saldoI = document.getElementById('saldo');
	var subtotalI = document.getElementById('subtotal');
	var totalI = document.getElementById('total');

	total = subtotal + (subtotal * 0.19);

	saldoI.value = subtotal;
	subtotalI.value = subtotal;
	totalI.value = total;
}

//Método para mostrar las advertencias de falta de existencias de los productos
function warning(producto, cantidad, existencias, nombrePro){
	var aviso = document.getElementById('advertencias');
	var botonGuardar = document.getElementById('');
	var diferencia = existencias - cantidad;
	var div;
	var text='';

	if(diferencia < 0 && $('#d'+producto).length == 0){
		
		div = document.createElement("div");
		 text += '<label class="align-items-center"  style="color: red">'+
		'¡Solo quedan '+existencias+' existencias del producto '+nombrePro+'! </br> </label>';	
		div.innerHTML = text;
		div.id = 'd'+producto;

		document.getElementById("advertencias").appendChild(div);
	} else if( diferencia > 0 && $('#d'+producto).length){
		$('#d'+producto).remove();
	}	

}

//--->save single field data > start
$(document).on('focusout', '.row_dataQuatity', function(event) 
{
	event.preventDefault();

	if($(this).attr('edit_type') == 'button')
	{
		return false; 
	}
	

	var row = $(this).closest('tr');
	var row_id = row.attr('row_id'); 
	
	var row_div = $(this)			
	.removeClass('bg-warning') //add bg css
	.css('padding','')

	var col_name = row_div.attr('col_name'); 
	var col_val = row_div.html(); 
	var arr = {};
	arr[col_name] = col_val;

	//use the "arr"	object for your ajax call
	$.extend(arr, {row_id:row_id});

	
	var idProd = row.find('.row_dataIdproducto').html();
	var nomProd = row.find('.row_dataName').html();

	valor_Unitario = row.find('.row_dataValUn').html();

	var existencias = verificarPro(idProd);

	warning(idProd, col_val, existencias, nomProd);

	row.find('.row_dataCost').html(col_val*valor_Unitario);
	subtotal = 0;
	generateSubtotal();
})	
//--->save single field data > end

//--->make div editable > start
$(document).on('click', '.row_dataQuatity', function(event) 
{
	event.preventDefault(); 

	if($(this).attr('edit_type') == 'button')
	{
		return false; 
	}
	//make div editable
	$(this).closest('div').attr('contenteditable', 'true');
	//add bg css
	$(this).addClass('bg-warning').css('padding','5px');
	//set type 
	$(this).attr('type', 'number');
	//set min
	$(this).attr('min', '1');

	$(this).focus();
})	
//--->make div editable > end

//Método para eliminar fila.
$(document).on('click', '.delete', function (event) {
    event.preventDefault();
    var row = $(this).closest('tr');
    subtotal = 0;
    generateSubtotal();

    //Esta parte elimina también los posibles warnings del producto que se hayan generado.
    var producto = row.find('.row_dataIdproducto').html();
    if($('#d'+producto).length){
		$('#d'+producto).remove();
	}	
			

    row.remove();
});
//Fin método eliminar fila

//Método para crear scroll en la tabla
$(document).ready(function () {
	$('#tabla_productos').DataTable({
	"scrollY": "200px",
	"scrollCollapse": true,
	});
	$('.dataTables_length').addClass('bs-select');
});

