/**Método para extraer el id de la factura que se desea ver en detalle**/
$(".factura").click(function(e) {
    e.preventDefault();
    var data = $(this).closest('td');
    var factura_id = data.html();
    window.location = "/ProyectoBases2/paginas/factura/View.php?factura_id=" + factura_id;
});
/**Método para eliminar alguno de los registros**/
$(document).on('click', '.delete', function(event) {
    event.preventDefault();
    var row = $(this).closest('tr');
    eliminarFactura(row.find('.factura').text());
    row.remove();
});
/**Método para mostrar facturas de venta o de compra**/
function check(checkbox) {
    var checkBill = document.getElementById('checkBill');
    otro = checkBill.querySelector("[type=checkbox]:not(#" + checkbox.id + ")");
    if (otro.checked) {
        otro.checked = false;
    }
    console.log("Ha seleccionado " + checkbox.id);
    if (checkbox.id == "facturaventa") {
        var tablaVenta = document.getElementById('tablaVenta');
        var tablaCompra = document.getElementById('tablaCompra');
        $("#tablaVenta").show(1500);
        $("#tablaCompra").hide(1500);
    }
    if (checkbox.id == "facturacompra") {
        var tablaVenta = document.getElementById('tablaVenta');
        var tablaCompra = document.getElementById('tablaCompra');
        $("#tablaCompra").show(1500);
        $("#tablaVenta").hide(1500);
    }
}