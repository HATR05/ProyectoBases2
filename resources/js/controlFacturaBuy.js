var valor_Unitario;
var subtotalvalor;
var total;
function insertProduct() {
  var producto = document.getElementById("producto");
  var selected = producto.options[producto.selectedIndex].text;
  valor_Unitario = producto.value;

  if(valor_Unitario != 0){

	  var fila="<tr><td><div class=\"row_dataUneditable\" "+
	  "col_name=\"fproducto\">"+selected+"</div></td>"+
	  "<td><div class=\"row_dataEditable\" edit_type=\"click\" col_name=\"fcantidad\">1</div></td>"+
	  "<td><div class=\"row_dataValorU\" edit_type=\"click\" col_name=\"fvalorU\">"+valor_Unitario+"</div></td>"+
	  "<td><div class=\"row_datacosto\"  col_name=\"fcosto\">"+valor_Unitario+"</div></td>";
	  //Botones
	  fila +="<span class=\"btn_delete\" > <a class=\"btn btn-link\"style=\"color: #ffc107\""+
	  "onmousemove=\"underline(this)\" onmouseout=\"blankunderline(this)\"> Eliminar</a></span>";


	  fila += "</td></tr>";
	  
	   

	  var btn = document.createElement("tr");
	  btn.innerHTML=fila;
	  document.getElementById("tabla_productos").appendChild(btn);
	  subtotalvalor = 0;
	  ingresarSubtotal();
  }
}

//Edit .rowData if click
$(document).on('click', '.row_dataEditable', function(event) 
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

	$(this).focus();
})	

//--->Save value when focusOut
$(document).on('focusout', '.row_dataEditable', function(event) 
{
	event.preventDefault();

	if($(this).attr('edit_type') == 'button')
	{
		return false; 
	}

	var tab_row = $(this).closest('tr');
	var row_id = tab_row.attr('row_id'); 
	
	var row_div = $(this)			
	.removeClass('bg-warning') //add bg css
	.css('padding','')

	var col_name = row_div.attr('col_name'); 
	var col_val = row_div.html(); 
	var arr = {};
	arr[col_name] = col_val;

	var valor_Unitario = tab_row.find('.row_dataValorU').html();
	var datacost = tab_row.find('.row_datacosto');
	datacost.html(col_val*valor_Unitario);
	//use the "arr"	object for your ajax call
	$.extend(arr, {row_id:row_id});
	subtotalvalor=0;
	ingresarSubtotal();
	//out put to show
	$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');

})	

//Maneja el evento onClick delbotón "Eliminar"
$(document).on('click', '.btn_delete', function (event) {	
    event.preventDefault();
    var costo = $(this).closest('tr').find ('.row_datacosto').html();
    $(this).closest('tr').remove();
    restarCosto(costo);
});

var ingresarSubtotal = function(){
    $('#tabla_productos td').find('.row_datacosto').each(function (index) 
	  {
	    subtotalvalor += parseFloat($(this).html());  
	  });
	setSubtotal(subtotalvalor);
};

var restarCosto= function(costo){
	subtotal = document.getElementById('subtotal').value;
	subtotal = subtotal - costo;
	setSubtotal(subtotal);
};

//Función para actualizar subtotal y total
function setSubtotal( subtotal){
	total = subtotal+(subtotal * 0.19);
	document.getElementById('subtotal').value = subtotal;
	document.getElementById('total').value = total;
	document.getElementById('saldo').value = total;
}

function keepData(){
	var mensaje;
    var opcion = confirm("¿Está seguro de que desea guardar la factura?");
    if (opcion == true) {
    	var empleado_id=document.getElementById('empleado_id').value;
    	var cliente_id=document.getElementById('cliente').value;
    	


        mensaje = "Factura agregada satisfactoriamente.";
	} else {
	}
	document.getElementById("mensaje").innerHTML = mensaje;
}