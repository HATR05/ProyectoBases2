var subtotal;
var total;
var valor_Unitario;
var id_count = 0;
var iva = 0.19;
var trigger = false;
/**Método para crear scroll en la tabla**/
$(document).ready(function() {
    $("table").DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
});
//Método para configurar la página inicialmente
function hide() {
    $("#vendedor_id").attr("required", "true");
    $("#cliente_id").attr("required", "true");
    $("#empleadodiv").hide(1500);
    $("#empleado_id").removeAttr('required');
    $("#proveedordiv").hide(1500);
    $("#proveedor_id").removeAttr('required');
}
/** Método de acción en caso de ser factura de compra o venta**/
var check = function(checkbox) {
    var checkBill = document.getElementById('checkBill');
    var btnSave = document.getElementById('save');
    var productos = document.getElementById('products');
    otro = checkBill.querySelector("[type=checkbox]:not(#" + checkbox.id + ")");
    if (otro.checked) {
        otro.checked = false;
    }
    console.log("Ha seleccionado " + checkbox.id);
    if (checkbox.id == "facturaventa") {
        //Activación de componente de factura de venta
        $("#facturaSell").show(1500);
        $("#vendedor_id").attr("required", "true");
        $("#cliente_id").attr("required", "true");
        btnSave.setAttribute("onClick", "createSell()");
        // $("#save").attr("onclick",crearSell());
        //Estos son los campos que no se necesitan, se esconden y se despojan del atributo "required"
        $("#facturaBuy").hide(1500);
        $("#empleado_id").removeAttr('required');
        $("#proveedor_id").removeAttr('required');
    }
    if (checkbox.id == "facturacompra") {
        //componentes de factura de compra
        $("#facturaBuy").removeAttr('hidden');
        $("#facturaBuy").show(1500);
        $("#empleado_id").attr("required", "true");
        $("#proveedor_id").attr("required", "true");
        btnSave.setAttribute("onClick", "createBuy()");
        //Estos son los campos que no se necesitan, se esconden y se despojan del atributo "required"
        $("#facturaSell").hide(1500);
        $("#vendedor_id").removeAttr('required');
        $("#cliente_id").removeAttr('required');
        $("#subtotal").removeAttr('readonly');
        $("#total").removeAttr('readonly');
    }
};
/**Método que permite guardar la factura si no hay advertencias pendientes.**/
$("body").on('DOMSubtreeModified', function(event) {
    event.preventDefault();
    var tableSell = document.getElementById('tabla_productosS');
    var rowsSell = tableSell.getElementsByTagName('tr').length;
    var tableBuy = document.getElementById('tabla_productosB');
    var rowsBuy = tableBuy.getElementsByTagName('tr').length;
    var warnings = document.getElementById('advertencias');
    var divCount = warnings.getElementsByTagName('div').length;
    var btnSave = document.getElementById('save');
    //alert("filas: "+rows+"warnings: "+divCount+"vendedor: "+vendedor+"cliente: "+ cliente);
    if (rowsSell > 1 || rowsBuy > 1 && divCount == 0) {
        btnSave.removeAttribute("disabled");
    } else {
        btnSave.setAttribute("disabled", "true");
    }
});
//Método para agregar producto nuevo a la tabla
function insertProductS() {
    var producto = document.getElementById("producto");
    var selected = producto.options[producto.selectedIndex].text;
    var valP = producto.value;
    var arrayCadena = valP.split("--");
    valor_Unitario = arrayCadena[1];
    var idProd = arrayCadena[0];
    var existencias = verificarPro(idProd);
    if ($('#t' + idProd).length == 0 && producto.value != 'default') {
        if (existencias > 0) {
            var newRow;
            newRow = '<td><div class="row_dataIdproducto" edit_type="click" value="' + idProd + '"col_name="fid">' + arrayCadena[0] + '</div></td>';
            newRow += '<td><div class="row_dataName" edit_type="click" col_name="fname">' + selected + '</div></td>';
            newRow += '<td><div class="row_dataQuatity" edit_type="click" type="number" required="true" col_name="fquantity">' + 1 + '</div></td>';
            newRow += '<td><div class="row_dataValUn" edit_type="click" col_name="fvalU">' + valor_Unitario + '</div></td>';
            newRow += '<td><div class="row_dataCost" edit_type="click" col_name="fcosto">' + valor_Unitario + '</div></td>';
            newRow += '<td><div class="delete" edit_type="click" col_name="faction">' + '<a class="delete" style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)">' + 'Eliminar</a></div></td>';
            var tr = document.createElement("tr");
            tr.innerHTML = newRow;
            tr.id = 't' + idProd;
            tr.class = 'table';
            document.getElementById("tabla_productosS").appendChild(tr);
        } else {
            alert("Ya no quedan existencias de este producto.");
        }
    }
    subtotal = 0;
    generateSubtotal();
}
//Método para agregar productos comprados a la tabla de factura comprada
function insertProductB() {
    var id_producto = document.getElementById("idProducto");
    var producto = document.getElementById("nameProducto");
    var desc = document.getElementById("desc");
    var costo = document.getElementById("costo");
    var valor_Unitario = document.getElementById("valor");
    var quantity = document.getElementById("stock");
    var optionCat = document.getElementById("optionCat");
    var categoria = optionCat;
    if ($('#t' + id_producto.value).length == 0 && id_producto.value != "" && producto.value != "" && desc.value != "" && costo.value != "" && quantity.value != "" && valor_Unitario.value != "") {
        var newRow;
        newRow = '<td><div class="row_dataIdproducto" edit_type="click" value="' + id_producto.value + '" col_name="fid">' + id_producto.value + '</div></td>';
        newRow += '<td><div class="row_dataName" edit_type="click" col_name="fname">' + producto.value + '</div></td>';
        newRow += '<td><div class="row_dataDesc" edit_type="click" type="number" required="true" col_name="fdesc">' + desc.value + '</div></td>';
        newRow += '<td><div class="row_dataCost" edit_type="click" type="number" required="true" col_name="fcosto">' + costo.value + '</div></td>';
        newRow += '<td><div class="row_dataValUn" edit_type="click" col_name="fvalU">' + valor_Unitario.value + '</div></td>';
        newRow += '<td><div class="row_dataQuatity" edit_type="click" type="number" required="true" col_name="fquantity">' + quantity.value + '</div></td>';
        newRow += '<td><div class="row_dataCat" edit_type="click" col_name="fcat">' + categoria.value + '</div></td>';
        newRow += '<td><div class="delete" edit_type="click" col_name="faction">' + '<a class="delete" style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)">' + 'Eliminar</a></div></td>';
        var tr = document.createElement("tr");
        tr.innerHTML = newRow;
        tr.id = 't' + id_producto.value;
        tr.class = 'table';
        document.getElementById("tabla_productosB").appendChild(tr);
        subtotal = 0;
        iva = 0;
        generateSubtotal();
    }
}
//Método auxiliar para agregar el evento al botón para agregar productos a la factura de compra
$("#saveB").on("click", function(event) {
    event.preventDefault();
    insertProductB()
});
//Método para generar el subtotal de la compra si el producto existe
function autorellenar_Prueba(nomProd) {
    var result_Busq = existe(nomProd).split(',');
    if (result_Busq[result_Busq.length - 1] == true) {
        var id_producto = document.getElementById("idProducto");
        var producto = document.getElementById("nombreProducto");
        var desc = document.getElementById("desc");
        var costo = document.getElementById("costo");
        var valor_Unitario = document.getElementById("valor");
        var quantity = document.getElementById("stock");
        var optionCat = document.getElementById("optionCat");
        var categoria = optionCat;
        id_producto.value = result_Busq[0];
        desc.value = result_Busq[2];
        valor_Unitario.value = result_Busq[3];
        categoria.value = result_Busq[4];
    } else {
        var id_producto = document.getElementById("idProducto");
        if (id_count == 0) {
            id_count = Number.parseInt(ultimo_Producto()) + 1;
        } else {
            id_count += 1;
        }
        id_producto.value = id_count;
    }
}

function generateSubtotal() {
    $(".row_dataCost").each(function() {
        subtotal += parseFloat($(this).html()) || 0;
    });
    setSubtotal();
}
//Método para mostrar el saldo, total y subtotal de la compra
function setSubtotal() {
    var saldoI = document.getElementById('saldo');
    var subtotalI = document.getElementById('subtotal');
    var totalI = document.getElementById('total');
    total = subtotal + (subtotal * iva);
    saldoI.value = subtotal;
    subtotalI.value = subtotal;
    totalI.value = total;
}
//Método para mostrar las advertencias de falta de existencias de los productos
function warning(producto, cantidad, existencias, nombrePro) {
    var aviso = document.getElementById('advertencias');
    var botonGuardar = document.getElementById('');
    var diferencia = existencias - cantidad;
    var div;
    var text = '';
    if (diferencia < 0 && $('#d' + producto).length == 0) {
        div = document.createElement("div");
        text += '<label class="align-items-center"  style="color: red">' + '¡Solo quedan ' + existencias + ' existencias del producto ' + nombrePro + '! </br> </label>';
        div.innerHTML = text;
        div.id = 'd' + producto;
        document.getElementById("advertencias").appendChild(div);
    } else if (diferencia > 0 && $('#d' + producto).length) {
        $('#d' + producto).remove();
    }
}
//--->save single field data > start
$(document).on('focusout', '.row_dataQuatity', function(event) {
    event.preventDefault();
    if ($(this).attr('edit_type') == 'button') {
        return false;
    }
    var row = $(this).closest('tr');
    var row_id = row.attr('row_id');
    var row_div = $(this).removeClass('bg-warning') //add bg css
        .css('padding', '')
    var col_name = row_div.attr('col_name');
    var col_val = row_div.html();
    var arr = {};
    arr[col_name] = col_val;
    //use the "arr" object for your ajax call
    $.extend(arr, {
        row_id: row_id
    });
    var idProd = row.find('.row_dataIdproducto').html();
    var nomProd = row.find('.row_dataName').html();
    valor_Unitario = row.find('.row_dataValUn').html();
    if (trigger == false) {
        var existencias = verificarPro(idProd);
        warning(idProd, col_val, existencias, nomProd);
        row.find('.row_dataCost').html(col_val * valor_Unitario);
    }
    subtotal = 0;
    generateSubtotal();
})
//--->save single field data > end
//--->make div editable > start
$(document).on('click', '.row_dataQuatity', function(event) {
    event.preventDefault();
    if ($(this).attr('edit_type') == 'button') {
        return false;
    }
    //make div editable
    $(this).closest('div').attr('contenteditable', 'true');
    //add bg css
    $(this).addClass('bg-warning').css('padding', '5px');
    //set type 
    $(this).attr('type', 'number');
    //set min
    $(this).attr('min', '1');
    $(this).attr('pattern', '^[0-9]+');
    $(this).focus();
})
//--->make div editable > end
//Método para eliminar fila.
$(document).on('click', '.delete', function(event) {
    event.preventDefault();
    var row = $(this).closest('tr');
    subtotal = 0;
    generateSubtotal();
    //Esta parte elimina también los posibles warnings del producto que se hayan generado.
    var producto = row.find('.row_dataIdproducto').html();
    if ($('#d' + producto).length) {
        $('#d' + producto).remove();
    }
    row.remove();
});
//Fin método eliminar fila