for (var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
if (params['factura_id']) {
    var factu = document.getElementById('codigoFactura');
    factu.value = params['factura_id'];
    factura_id = params['factura_id'];
    //factura(factura_id);
    //productos();
} else {}
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