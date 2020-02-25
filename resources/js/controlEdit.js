var url = "/ProyectoBases2/Logica/Entidades/Factura.php"
var factura_id;
var aux = 0;
var factura_Venta = true;
var paramstr = window.location.search.substr(1);
var paramarr = paramstr.split("&");
var params = {};
/**Valores antigüos de productos en la factura**/
var dataProduct = [];
/**Fin valores antigüos de productos en la factura*/
for (var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
/**Recepción de id de factura desde la lista de facturas**/
if (params['factura_id']) {
    var factu = document.getElementById('factura_id');
    factu.value = params['factura_id'];
    factura_id = params['factura_id'];
    rellenar_factura();
    //autorellenar_Productos();
} else {
    alert("No es posible ver su factura, intente de nuevo.")
}
/** Autorellenar campos**/
function rellenar_factura() {
    //Atributos extraídos de la BD
    var idCliente = "";
    var nombreCliente = "";
    var nit = "";
    var nombreProveedor = "";
    var idEmpleado = "";
    var nombreEmpleado = "";
    var fechaFac = "";
    var fechaVen = "";
    var saldo;
    var subtotal;
    var total;
    //Elementos de la página
    var divfacturaSell = document.getElementById('facturaSell');
    var divfacturaBuy = document.getElementById('facturaBuy');
    var inputFecha = document.getElementById("fecha");
    var inputFechaV = document.getElementById("fechaV");
    var inputSaldo = document.getElementById("saldo");
    var inputSubtotal = document.getElementById("subtotal");
    var inputTotal = document.getElementById("total");
    var btnSave = document.getElementById("save");
    //Envío de info por método post para extracción de datos 
    var info = "opcion=buscar&factura=" + factura_id;
    var xhr = new XMLHttpRequest()
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var cadena = xhr.responseText.split(",");
            idCliente = cadena[0];
            nombreCliente = cadena[1];
            nit = cadena[2];
            nombreProveedor = cadena[3];
            idEmpleado = cadena[4];
            nombreEmpleado = cadena[5];
            fechaFac = cadena[6];
            fechaVen = cadena[7];
            saldo = cadena[8];
            subtotal = cadena[9];
            total = cadena[10];
        }
    };
    xhr.send(info)
    fechaFac = fechaFac.replace(/-/gi, ' | ');
    fechaVen = fechaVen.replace(/-/gi, ' | ');
    inputFechaV.value = fechaVen;
    inputFecha.value = fechaFac;
    //Asignación de atributos a elementos
    if (nit == 0 && nombreProveedor == "--") {
        var selectCliente = document.getElementById('cliente');
        var selectVendedor = document.getElementById('vendedor_id');
        //Activación de componente de factura de venta
        factura_Venta = true;
        $("#facturaSell").show(1500);
        $("#vendedor_id").attr("required", "true");
        $("#cliente_id").attr("required", "true");
        btnSave.setAttribute("onClick", "updateSell()");
        // $("#save").attr("onclick",crearSell());
        //Estos son los campos que no se necesitan, se esconden y se despojan del atributo "required"
        $("#facturaBuy").hide(1500);
        $("#empleado_id").removeAttr('required');
        $("#proveedor_id").removeAttr('required');
        selectCliente.value = idCliente;
        selectCliente.innerHtml = nombreCliente;
        selectVendedor.value = idEmpleado;
        selectVendedor.innerHtml = nombreEmpleado;
        autorellenar_ProductosS();
    } else {
        factura_Venta = false;
        var selectProveedor = document.getElementById('proveedor');
        var selectEmpleado = document.getElementById('empleado_id');
        //componentes de factura de compra
        $("#facturaBuy").removeAttr('hidden');
        $("#facturaBuy").show(1500);
        $("#empleado_id").attr("required", "true");
        $("#proveedor_id").attr("required", "true");
        btnSave.setAttribute("onClick", "updateBuy()");
        //Estos son los campos que no se necesitan, se esconden y se despojan del atributo "required"
        $("#facturaSell").hide(1500);
        $("#vendedor_id").removeAttr('required');
        $("#cliente_id").removeAttr('required');
        $("#subtotal").removeAttr('readonly');
        $("#total").removeAttr('readonly');
        selectProveedor.value = nit;
        selectProveedor.innerHtml = nombreProveedor;
        selectEmpleado.value = idEmpleado;
        selectEmpleado.innerHtml = nombreEmpleado;
        trigger = true;
        autorellenar_ProductosB();
    }
    inputSaldo.value = saldo;
    inputSubtotal.value = subtotal;
    inputTotal.value = total;
}
/**Método para rellenar productos de venta automáticamente**/
function autorellenar_ProductosS() {
    var info = "opcion=traerProductos&factura_id=" + factura_id;
    var arrayCadena = "";
    var newRow = "";
    var atr;
    var response;
    //Query
    var xhr = new XMLHttpRequest()
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            response = xhr.responseText;
            arrayCadena = xhr.responseText.split('--');
        }
    };
    xhr.send(info)
    for (var i = 0; i < (arrayCadena.length - 1); i++) {
        atr = arrayCadena[i].split('-');
        newRow = '<td><div class="row_dataIdproducto" edit_type="click" value="' + atr[0] + '"col_name="fid">' + atr[0] + '</div></td>';
        newRow += '<td><div class="row_dataName" edit_type="click" col_name="fname">' + atr[1] + '</div></td>';
        newRow += '<td><div class="row_dataQuatity" edit_type="click" type="number" required="true" col_name="fquantity">' + atr[2] + '</div></td>';
        newRow += '<td><div class="row_dataValUn" edit_type="click" col_name="fvalU">' + atr[3] + '</div></td>';
        newRow += '<td><div class="row_dataCost" edit_type="click" col_name="fcosto">' + atr[4] + '</div></td>';
        newRow += '<td><div class="update" edit_type="click" col_name="faction">' + '<a style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)" > <img id="sidebarCollapse" src="/ProyectoBases2/resources/images/update.png"/></a></div></td>';
        var btn = document.createElement("tr");
        btn.innerHTML = newRow;
        document.getElementById("tabla_productosS").appendChild(btn);
        dataProduct[atr[0]] = arrayCadena[i];
    }
}
/**Método para rellenar productos de compra automáticamente**/
function autorellenar_ProductosB() {
    var info = "opcion=traerProductosCompra&factura_id=" + factura_id;
    var arrayCadena = "";
    var newRow = "";
    var atr;
    //Query
    var xhr = new XMLHttpRequest()
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            arrayCadena = xhr.responseText.split('--');
        }
    };
    xhr.send(info)
    for (var i = 0; i < (arrayCadena.length - 1); i++) {
        atr = arrayCadena[i].split('-');
        var newRow;
        newRow = '<td><div class="row_dataIdproducto" edit_type="click" value="' + atr[0] + '" col_name="fid">' + atr[0] + '</div></td>';
        newRow += '<td><div class="row_dataName" edit_type="click" col_name="fname">' + atr[1] + '</div></td>';
        newRow += '<td><div class="row_dataDesc" edit_type="click" type="number" required="true" col_name="fdesc">' + atr[5] + '</div></td>';
        newRow += '<td><div class="row_dataCost" edit_type="click" type="number" required="true" col_name="fcosto">' + atr[4] + '</div></td>';
        newRow += '<td><div class="row_dataValUn" edit_type="click" col_name="fvalU">' + atr[3] + '</div></td>';
        newRow += '<td><div class="row_dataQuatity" edit_type="click" type="number" required="true" col_name="fquantity">' + atr[2] + '</div></td>';
        newRow += '<td><div class="row_dataCat" edit_type="click" col_name="fcat">' + atr[6] + '</div></td>';
        newRow += '<td><div  edit_type="click" col_name="faction">' + '<a class="update" style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)" > <img id="sidebarCollapse" src="/ProyectoBases2/resources/images/update.png"/></a>';
        newRow += '<a class="delete" style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)"></a>';
        newRow += '</div></td>';
        var btn = document.createElement("tr");
        btn.innerHTML = newRow;
        document.getElementById("tabla_productosB").appendChild(btn);
        dataProduct[atr[0]] = arrayCadena[i];
    }
}

function updateSell() {
    var eliminar = false;
    eliminar = eliminarDetalle(factura_id);
    var nuevoCli = document.getElementById('cliente').value;
    var nuevoEmp = document.getElementById('vendedor_id').value;
    var nuevoSaldo = document.getElementById("saldo").value;
    var nuevoSubtotal = document.getElementById("subtotal").value;
    var nuevoTotal = document.getElementById("total").value;
    var nuevoPro = null;
    var actualizar = false;
    var actualizarDetalle = false;
    if (eliminar) {
        alert("Se ha eliminado detalle de factura correctamente");
        actualizar = actualizarFactu(factura_id, nuevoCli, nuevoPro, nuevoEmp, nuevoSaldo, nuevoSubtotal, nuevoTotal);
        if (actualizar) {
            actualizarDetalle = actuDetalleS();
            if (actualizarDetalle) {
                alert("Factura actualizada satisfactoriamente");
            }
        }
    } else {
        alert('No se pudo eliminar el detalle de factura');
    }
}

function updateBuy() {
    alert("update Buy");
    var eliminar = true;
    var actualizar = false;
    var nuevoCli = null
    var nuevoPro = document.getElementById('proveedor').value;;
    var nuevoEmp = document.getElementById('vendedor_id').value;
    var nuevoSaldo = document.getElementById("saldo").value;
    var nuevoSubtotal = document.getElementById("subtotal").value;
    var nuevoTotal = document.getElementById("total").value;
    //eliminar = eliminarDetalle(factura_id);
    if (eliminar) {
        alert("Se ha eliminado detalle de factura correctamente");
        actualizar = actualizarFactu(factura_id, nuevoCli, nuevoPro, nuevoEmp, nuevoSaldo, nuevoSubtotal, nuevoTotal);
        if (actualizar) {
            actualizarDetalle = actuDetalleB();
            if (actualizarDetalle) {
                alert("Factura actualizada satisfactoriamente");
            }
        } else {
            alert('No se pudo actualizar factura');
        }
    } else {
        alert('No se pudo eliminar el detalle de factura');
    }
}
//Método para actualizar fila de producto.
$(document).on('click', '.update', function(event) {
    event.preventDefault();
    var contador = 0;
    var producto = null;
    var nombre_Prod;
    var cantidad;
    var costo;
    var oldData;
    var restar = false;
    var row = $(this).closest('tr');
    subtotal = 0;
    generateSubtotal();
    //Esta parte elimina también los posibles warnings del producto que se hayan generado.
    var producto = row.find('.row_dataIdproducto').html();
    if (factura_Venta == true) {
        row.find('td').each(function() {
            switch (contador) {
                case 0:
                    producto = $(this).text();
                    contador++;
                    break;
                case 1:
                    nombre_Prod = $(this).text();
                    contador++;
                    break;
                case 2:
                    cantidad = $(this).text();
                    contador++;
                    break;
                case 3:
                    contador++;
                    break;
                case 4:
                    costo = $(this).text();
                    contador++;
                    break;
                case 5:
                    contador = 0;
                    break;
            }
        });
        auxiliarV(producto, cantidad);
    } else {
        var producto_id = null;
        var nombre_Prod;
        var desc;
        var cantidad;
        var costo;
        var valor_Unidad;
        var categoria;
        row.find('td').each(function() {
            switch (contador) {
                case 0:
                    producto_id = $(this).text();
                    contador++;
                    break;
                case 1:
                    nombre_Prod = $(this).text();
                    contador++;
                    break;
                case 2:
                    desc = $(this).text();
                    contador++;
                    break;
                case 3:
                    costo = $(this).text();
                    contador++;
                    break;
                case 4:
                    valor_Unidad = $(this).text();
                    contador++;
                    break;
                case 5:
                    cantidad = $(this).text();
                    contador++;
                    break;
                case 6:
                    categoria = $(this).text();
                    contador++;
                    break;
                case 7:
                    contador = 0;
                    break;
            }
        });
        if (existe(nombre_Prod)) {
            auxiliarB(producto, cantidad);
        } else {
            crear_Manual(nombre, desc, valUnitario, cantidad, categoria);
            crearDetalle(factura_id, producto_id, cantidad, costo)
        }
    }
});

function auxiliarV(producto, cantidad) {
    var oldData;
    oldData = String(dataProduct[producto]).split('-');
    if (cantidad > oldData[2]) {
        var resto = cantidad - oldData[2];
        restar = restar_Productos(producto, resto);
    } else if (cantidad < oldData[2]) {
        suma = cantidad - oldData[2];
        restar = restar_Productos(producto, suma);
    }
    alert("Producto " + producto + " actualizado");
}

function auxiliarB(producto, cantidad) {
    var oldData;
    oldData = String(dataProduct[producto]).split('-');
    if (cantidad > oldData[2]) {
        var resto = cantidad - oldData[2];
        restar = actualizar_Stock(producto, resto);
    } else if (cantidad < oldData[2]) {
        suma = cantidad - oldData[2];
        restar = actualizar_Stock(producto, suma);
    }
    alert("Producto " + producto + " actualizado");
}
//Fin método actualizar fila