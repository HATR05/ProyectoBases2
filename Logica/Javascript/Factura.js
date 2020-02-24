var url = "/ProyectoBases2/Logica/Entidades/Factura.php"
//Método para crear facturas de venta
function createSell() {
    var date = new Date();
    var dateVenc = new Date();
    dateVenc.setDate(dateVenc.getDate() + 30)
    var vendedor_id = document.getElementById("vendedor_id").value;
    var cliente_id = document.getElementById("cliente").value;
    var nit = null;
    var fecha_factura = date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate());
    var fecha_vencimiento = dateVenc.getFullYear() + "-" + addZero(dateVenc.getMonth() + 1) + "-" + addZero(dateVenc.getDate());
    var saldo = document.getElementById("saldo").value;
    var subtotal = document.getElementById("subtotal").value;
    var total = document.getElementById("total").value;
    var createsell = false;
    var mensaje;
    if (vendedor_id == "" || cliente_id == "") {
        mensaje = "Existen campos vacíos, por favor, seleccione algún valor antes de continuar.";
        alert(mensaje);
    } else {
        var info = "opcion=crear&empleado=" + vendedor_id + "&cliente=" + cliente_id + "&nitE=" + nit + "&fecha=" + fecha_factura + "&fechavenc=" + fecha_vencimiento + "&sal=" + saldo + "&subt=" + subtotal + "&t=" + total;
        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded", false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                createsell = xhr.responseText;
            }
        };
        xhr.send(info)
        if (createsell == true) {
            var guardarproducto = guardarProductos();
        }
        if (createsell == true && guardarproducto == true) {
            mensaje = "Factura guardada exitosamente";
        } else {
            mensaje = createsell == false ? "Error al guardar factura." : "Error al guardar detalle de factura.";
            eliminarUltimaFactura();
        }
        alert(mensaje);
    }
}
/**Método para guardar detalle_factura de venta*/
var guardarProductos = function() {
    var contador = 0;
    var producto = null;
    var nombre_Prod;
    var cantidad;
    var costo;
    var respuesta = false;
    var response = false;
    var detalle = false;
    var resta = false;
    $('#tabla_productosS ').find('tr').each(function() {
        $(this).find('td').each(function() {
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
        if (producto != null) {
            alert('El producto no es nulo');
            if ($('#warningDiv').html()) {
                alert("Existen algunas advertencias pendientes, solucionelas antes de seguir, por favor.");
            } else {
                var info = "opcion=crearDetalle&producto=" + producto + "&cantidad=" + cantidad + "&costo=" + costo;
                var xhr = new XMLHttpRequest()
                xhr.open("POST", url, false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        detalle = xhr.responseText.split('--');
                    }
                };
                xhr.send(info)
                console.log(detalle[0]);
                detalle = detalle[1];
                var restarProductos = restar_Productos(producto, cantidad).split('--');
                console.log(restarProductos[0]);
                resta = restarProductos[1];
                if (detalle == true && resta == true) {
                    respuesta = true;
                }
            }
        }
    });
    return respuesta;
}
//Método para crear facturas de compra (Verificar)
function createBuy() {
    var date = new Date();
    var dateVenc = new Date();
    dateVenc.setDate(dateVenc.getDate() + 30)
    var empleado_id = document.getElementById("empleado_id").value;
    var nit = document.getElementById("proveedor").value;
    var cliente_id = null;
    var fecha_factura = date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate());
    var fecha_vencimiento = dateVenc.getFullYear() + "-" + addZero(dateVenc.getMonth() + 1) + "-" + addZero(dateVenc.getDate());
    var saldo = document.getElementById("saldo").value;
    var subtotal = document.getElementById("subtotal").value;
    var total = document.getElementById("total").value;
    var createbuy = false;
    //var agregarProductos = false;
    var mensaje = "Error en el método createBuy";
    if (empleado_id == "" || nit == "") {
        mensaje = "Existen campos vacíos, por favor, seleccione algún valor antes de continuar.";
        alert(mensaje);
    } else {
        var info = "opcion=crear&empleado=" + empleado_id + "&cliente=" + cliente_id + "&nitE=" + nit + "&fecha=" + fecha_factura + "&fechavenc=" + fecha_vencimiento + "&sal=" + saldo + "&subt=" + subtotal + "&t=" + total;
       
        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded", false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                createbuy = xhr.responseText;
            }
        };
        xhr.send(info)
        if (createbuy == true) {
            var agregarProd = agregarProductos();
            console.log('Factura de compra creada satisfactoriamente.....');
        }
        if (createbuy == true && agregarProd == true) {
            mensaje = "Factura guardada exitosamente";
        } else {
            mensaje = createbuy == false ? "Error al guardar factura." : "Error al guardar detalle de factura.";
            eliminarUltimaFactura();
        }
        alert(mensaje);
    }
}
/**Método para añadir productos de factura de compra al almacén**/
function agregarProductos() {
    var contador = 0;
    var producto_id = null;
    var nombre_Prod;
    var desc;
    var cantidad;
    var costo;
    var valor_Unidad;
    var categoria;
    var response = "";
    var result = false;
    var detalle = false;
    var actua = false;
    $('#tabla_productosB').find('tr').each(function() {
        $(this).find('td').each(function() {
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
        if (producto_id != null) {
            if ($('#warningDiv').html()) {
                alert("Existen algunas advertencias pendientes, solucionelas antes de seguir, por favor.");
            } else {
                //Verificación de que el producto ya se encuentre en la base de datos.
                var existeProducto = existe(nombre_Prod).split(',');
                if (existeProducto[existeProducto.length - 1] == true) {
                    var info = "opcion=crearDetalle&producto=" + producto_id + "&cantidad=" + cantidad + "&costo=" + costo;
                    var xhr = new XMLHttpRequest()
                    xhr.open("POST", url, false);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            response = xhr.responseText.split('--');
                        }
                    };
                    xhr.send(info)
                    console.log(response[0]);
                    detalle = response[1];
                    if (detalle == true) {
                        var aux = actualizar_Stock(producto_id, cantidad);
                        actua = aux.split('--');
                        console.log(actua[0]);
                        actua = actua[1];
                    }
                    if (detalle == true && actua == true) {
                        result = true;
                    }
                } else {
                    var info = "opcion=crearDetalle&producto=" + producto_id + "&cantidad=" + cantidad + "&costo=" + costo;
                    var xhr = new XMLHttpRequest()
                    xhr.open("POST", url, false);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            response = xhr.responseText.split('--');
                        }
                    };
                     xhr.send(info)
                    console.log(response[0]);
                    detalle = response[1];
                    if (detalle == true) {
                        actua = crear_Manual(nombre_Prod, desc, valor_Unidad, cantidad, categoria);
                    }
                    if (detalle == true && actua == true) {
                        result = true;
                    }
                }
            }
        }
    });
    return result;
}
/**Métodos para editar factura**/
/**Método para la actualización de facturas**/
function actualizarFactu() {
    var codFac = document.getElementById('codigoFactura').value;
    var nuevoEmp = document.getElementById('nameEmpleado').value;
    var nuevoCli = document.getElementById("nameCliente").value;
    var nuevoPro = document.getElementById("nameProveedor").value;
    var nuevoSaldo = document.getElementById('saldo').value;
    var nuevoSubtotal = document.getElementById('subtotal').value;
    var nuevoTotal = document.getElementById('total').value;
    var info = "opcion=editar&factura_id=" + codFac + "&newClient=" + nuevoCli + "&newNit=" + nuevoPro + "&newEmpleado_id=" + nuevoEmp + "&newSaldo=" + nuevoSaldo + "&newSubtotal=" + nuevoSubtotal + "&newTotal=" + nuevoTotal;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send(info);
    actuDetalle(codFac);
}
/**Método para actualizar productos de factura guardados en la tabla Detalle_Factura**/
function actuDetalle(factura_id) {
    var contador = 0;
    var producto = null;
    var nombre_Prod;
    var cantidad;
    var costo;
    $('#tabla_productos ').find('tr').each(function() {
        $(this).find('td').each(function() {
            switch (contador) {
                case 0:
                    producto = $(this).text();
                    contador++;
                    break;
                case 1:
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
        if (producto != null) {
            var info = "opcion=editarDetalle&factura=" + factura_id + "&producto_id=" + producto + "&cantidad=" + cantidad + "&costo=" + costo;
            var xhr = new XMLHttpRequest()
            xhr.open("POST", url, false);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    alert("hola");
                }
            };
            xhr.send(info)
        }
    });
}
/**Fin métodos para editar factura**/
/**Método para eliminación total de la factura**/
function eliminarFactura(factura) {
    var factura_id = factura;
    var info = "opcion=eliminar&factura=" + factura_id;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send(info);
}
/**Método auxiliar, en caso de que el guardado de productos salga mal, en ese caso,
 ** se borra el registro en la tabla Factura**/
function eliminarUltimaFactura() {
    var info = "opcion=eliminar_Ultimafactura";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(info);
}
/**Método auxiliar para verificar que hayan existencias 
 **suficientes del producto**/
var verificarPro = function(producto) {
    //console.log("Verificando productos...");
    var info = "opcion=verificarExistencias&producto_id=" + producto;
    var response = 0;
    var xhr = new XMLHttpRequest()
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            response = xhr.responseText;
        }
    };
    xhr.send(info)
    return response;
}
/**Método auxiliar para años en guardado de factura de compra**/
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}