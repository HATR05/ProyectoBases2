var url = "/ProyectoBases2/Logica/Entidades/Factura.php"
/** Autorellenar campos**/
$(document).ready(function() {
    var titulo = document.title.split(',');
    var factura_id = titulo[1];
    //Elementos de la página
    var inputidFactura = document.getElementById("factura_id");
    var inputFecha = document.getElementById("fecha");
    var inputFechaV = document.getElementById("fechaV");
    var divCliente = document.getElementById("cliente");
    var selectCliente = document.getElementById("nameCliente");
    var divProveedor = document.getElementById("proveedor");
    var selectProveedor = document.getElementById("nameProveedor");
    var inputid_Proveedor = document.getElementById("nit");
    var selectEmpleado = document.getElementById('nameEmpleado');
    var inputSaldo = document.getElementById('saldo');
    var inputSubtotal = document.getElementById('subtotal');
    var inputTotal = document.getElementById('total');
    var button = document.getElementById('print');
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
    inputidFactura.value = factura_id;
    fechaFac = fechaFac.replace(/-/gi, ' | ');
    fechaVen = fechaVen.replace(/-/gi, ' | ');
    inputFecha.value = fechaFac;
    inputFechaV.value = fechaVen;
    //Asignación de atributos a elementos
    //Trae los valores del cliente
    selectCliente.value = idCliente;
    selectCliente.innerHtml = nombreCliente;
    selectEmpleado.value = idEmpleado;
    selectEmpleado.innerHtml = nombreEmpleado;
    inputSaldo.value = saldo;
    inputSubtotal.value = subtotal;
    inputTotal.value = total;
    var contador = 0;
    $('#tabla_productos').attr("class", "table table-bordered");
    $('#tabla_productos ').find('tr').each(function() {
        contador += 1;
    });
    if (contador < 10) {
        for (var i = 0; i < 10 - contador; i++) {
            newRow = '<td><div class="row_dataId_producto" edit_type="click" value=""col_name="fid"></div></td>';
            newRow += '<td><div class="row_dataName" edit_type="click" col_name="fname"></div></td>';
            newRow += '<td><div class="row_dataQuatity" edit_type="click" type="number" required="true" col_name="fquantity"></div></td>';
            newRow += '<td><div class="row_dataValUn" edit_type="click" col_name="fvalU"></div></td>';
            newRow += '<td><div class="row_dataCost" edit_type="click" col_name="fcosto"></div></td>';
            var btn = document.createElement("tr");
            btn.innerHTML = newRow;
            document.getElementById("tabla_productos").appendChild(btn);
        }
    }
});