function crear() {
    var url = "/ProyectoBases2/Logica/Entidades/Producto.php"
    var nombre_Producto = document.getElementById("nombreProducto");
    var descripcion = document.getElementById("desc");
    var valorUn = document.getElementById("valor");
    var stock = document.getElementById("stock");
    var cat = document.getElementById("optionCat");
    var nombre = nombre_Producto.value;
    var des = descripcion.value;
    var valUnitario = valorUn.value;
    var cantidad = stock.value;
    var categoria = cat.value;
    var info = "opcion=crear&name=" + nombre + "&desc=" + des + "&unidad=" + valUnitario + "&cantidad=" + cantidad + "&categoria=" + categoria;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send(info);
}

function crear_Manual(nombre, desc, valUnitario, cantidad, categoria) {
    var result = false;
    var response;
     var url = "/ProyectoBases2/Logica/Entidades/Producto.php"
    var info = "opcion=crear&name=" + nombre + "&desc=" + desc + "&unidad=" + valUnitario + "&cantidad=" + cantidad + "&categoria=" + categoria;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            response = xhr.responseText;
        }
    };
    xhr.send(info);
    result =true;
    return result;
}

function editar() {
    var url = "/ProyectoBases2/Logica/Entidades/Producto.php"
    var txtProducto = document.getElementById("nameProducto");
    var txtNombre = document.getElementById("newName");
    var txtDesc = document.getElementById("newDesc");
    var txtValor = document.getElementById("newValor");
    var txtCantidad = document.getElementById("newStock");
    var cat = document.getElementById("optionCat");
    var producto = txtProducto.value;
    var nombre = txtNombre.value;
    var des = txtDesc.value;
    var valUnitario = txtValor.value;
    var cantidad = txtCantidad.value;
    var categoria = cat.value;
    var info = "opcion=editar&producto=" + producto + "&nombre=" + nombre + "&desc=" + des + "&valUnitario=" + valUnitario + "&cantidad=" + cantidad + "&categoria=" + categoria;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send(info);
}

function eliminar() {
    var idPro = document.getElementById("idPro");
    var url = "/ProyectoBases2/Logica/Entidades/Producto.php"
    var text_idPro = idPro.value;
    var info = "opcion=eliminar&idPro=" + text_idPro;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send(info);
}

function buscar() {
    var txtNombre = document.getElementById("newName");
    var txtDesc = document.getElementById("newDesc");
    var txtValor = document.getElementById("newValor");
    var selectInfo = document.getElementById("nameProducto");
    var url = "/ProyectoBases2/Logica/Entidades/Producto.php"
    var infoProducto = selectInfo.value;
    var info = "opcion=buscar&selectInfo=" + infoProducto;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var cadena = xhr.responseText.split(",");
            txtNombre.value = cadena[0];
            txtDesc.value = cadena[1];
            txtValor.value = cadena[2];
        }
    };
    xhr.send(info);
}
/**Método para restar productos del stock / se usa en factura de venta**/
function restar_Productos(producto, cantidad) {
    var url = "/ProyectoBases2/Logica/Entidades/Producto.php"
    var response = "LLega a restar producto";
    alert(response);
    var info = "opcion=restarProductos&producto=" + producto + "&cantidad=" + cantidad;
    var xhr = new XMLHttpRequest()
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            response = xhr.responseText;
        }
    };
    xhr.send(info)
    alert(response);
    return response;
}
/**Método para verificar si un producto existe, búsqueda según nombre del producto en la BD/ se uusa en factura de compra**/
function existe (nomProduct){
	var url = "/ProyectoBases2/Logica/Entidades/Producto.php"
    var info = "opcion=buscar_Nombre&selectInfo=" + nomProduct;
    var response;
    var arrayResult;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
             response = xhr.responseText;            
        }
    };
    xhr.send(info);
    return response;
}
/**Método para ver cuál es el último id de producto / se usa en factura de compra**/
function ultimo_Producto(){
    var url = "/ProyectoBases2/Logica/Entidades/Producto.php"
    var info = "opcion=ultimo_Producto";
    var response;
    var arrayResult;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
             response = xhr.responseText;            
        }
    };
    xhr.send(info);
    return response;
}
/**Método para agregar productos al stock/ se usa en factura de compra**/
function actualizar_Stock(producto_id, cantidad) {
    var url = "/ProyectoBases2/Logica/Entidades/Producto.php"
    var response;
    var info = "opcion=actualizar_Stock&id=" + producto_id + "&cantidad=" + cantidad;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
             response = xhr.responseText;
        }
    };
    xhr.send(info);
    return response;
}