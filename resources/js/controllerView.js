var url = "/ProyectoBases2/Logica/Entidades/Factura.php"
var factura_id;
var factura_Venta = true;
var paramstr = window.location.search.substr(1);
var paramarr = paramstr.split("&");
var params = {};
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
    autorellenar_Productos();
} else {
    alert("No es posible ver su factura, intente de nuevo.")
}
/**Fin recepción de id de factura desde la lista de facturas**/
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
    fechaFac = fechaFac.replace(/-/gi, ' | ');
    fechaVen = fechaVen.replace(/-/gi, ' | ');
    inputFecha.value = fechaFac;
    inputFechaV.value = fechaVen;
    //Asignación de atributos a elementos
    if (nit == 0 && nombreProveedor == "--") {
        //Esconde el div de proveedor 
        factura_Venta = true;
        divProveedor.style.display = 'none';
        button.removeAttribute("disabled");
        //Trae los valores del cliente
        selectCliente.value = idCliente;
        selectCliente.innerHtml = nombreCliente;
    } else {
        //Esconde el div del cliente
        factura_Venta = false;
        divCliente.style.display = 'none';
        button.setAttribute("disabled", "true");
        //Trae los valores del proveedor
        selectProveedor.value = nit;
        selectProveedor.innerHtml = nombreProveedor;
        inputid_Proveedor.value = nit;
    }
    selectEmpleado.value = idEmpleado;
    selectEmpleado.innerHtml = nombreEmpleado;
    inputSaldo.value = saldo;
    inputSubtotal.value = subtotal;
    inputTotal.value = total;
}
/**Método para rellenar productos automáticamente**/
function autorellenar_Productos() {
    var info = "opcion=traerProductos&factura_id=" + factura_id;
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
        newRow = '<td><div class="row_dataId_producto" edit_type="click" value="' + atr[0] + '"col_name="fid">' + atr[0] + '</div></td>';
        newRow += '<td><div class="row_dataName" edit_type="click" col_name="fname">' + atr[1] + '</div></td>';
        newRow += '<td><div class="row_dataQuatity" edit_type="click" type="number" required="true" col_name="fquantity">' + atr[2] + '</div></td>';
        newRow += '<td><div class="row_dataValUn" edit_type="click" col_name="fvalU">' + atr[3] + '</div></td>';
        newRow += '<td><div class="row_dataCost" edit_type="click" col_name="fcosto">' + atr[4] + '</div></td>';
        var btn = document.createElement("tr");
        btn.innerHTML = newRow;
        document.getElementById("tabla_productos").appendChild(btn);
    }
}
/**Método para mostrar factura para imprimir en otra pestaña**/
function imprimir_Factura() {
    var factura_Form = document.getElementById("imprimir");
    var ventana = window.open('', 'popimpr');
    var pagina = '<html><head><title>' + document.title + ',' + factura_id + '</title>';
    pagina += '<meta charset="utf-8"/>';
    pagina += '<meta http-equiv="X-UA-Compatible" content="IE=edge"/>';
    pagina += '<META http-equiv="Content-Script-Type" content="text/javascript"/>';
    pagina += '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>';
    pagina += '<meta name="description" content=""/>';
    pagina += '<meta name="author" content=""/>';
    pagina += '<!-- Bootstrap core CSS-->';
    pagina += '<link href="/ProyectoBases2/resources/vendor/bootstrap/css/bootstrap1.min.css" rel="stylesheet"/>';
    pagina += '<!-- Custom fonts for this template-->';
    pagina += ' <link href="/ProyectoBases2/resources/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>';
    pagina += '<!-- My styles-->';
    pagina += '<link href="/ProyectoBases2/resources/css/base.css" rel="stylesheet"/>';
    pagina += ' <link href="/ProyectoBases2/resources/css/display-lg.css" rel="stylesheet"/>';
    pagina += ' <link href="/ProyectoBases2/resources/css/display-md.css" rel="stylesheet"/>';
    pagina += ' <link href="/ProyectoBases2/resources/css/display-sm.css" rel="stylesheet"/>';
    pagina += ' <link href="/ProyectoBases2/resources/css/warningTable.css" rel="stylesheet"/>';
    pagina += '</head><body ><div class="row"> ';
    pagina += '<div class="col-lg-5"><img src="/ProyectoBases2/resources/images/colmex_Logo.png"/ style="width:30%" ">';
    pagina += '<img src="/ProyectoBases2/resources/images/LogoSinFondo2.png"/ style="width:10%" "></div>';
    pagina += '<div class="col-5"><h1 class="titleCreate">Ferretería Colmex SAS.</h1>';
    pagina += '<h4 class="titleCreate">Factura de venta.</h5></div>';
    pagina += '</div>';
    pagina += '<br/>';
    pagina += '<br/> <div id="id_f" value="' + factura_id + '"> ';
    pagina += factura_Form.innerHTML;
    pagina += '</div><!-- Bootstrap core JavaScript-->';
    pagina += '<script src="/ProyectoBases2/resources/vendor/jquery/jquery.min.js"></script>';
    pagina += '<script src="/ProyectoBases2/resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>';
    pagina += '<script src="/ProyectoBases2/resources/js/rellenarFactura.js"></script>';
    pagina += '</body><footer><h6> Generada automáticamente por StockManage.</h6></footer></html>';
    ventana.document.write(pagina);
    ventana.document.close();
    //ventana.print();
    //ventana.close();
}
/**Método para extraer el id de la factura que se desea ver en detalle**/
$("#edit").click(function(e) {
    e.preventDefault();
    var data = $(this).closest('td');
    var factura_id = data.html();
    window.location = "/ProyectoBases2/paginas/factura/Edit.php?factura_id=" + document.getElementById('factura_id').value;
});