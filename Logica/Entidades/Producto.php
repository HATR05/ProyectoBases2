<?php
$opcion  = $_POST["opcion"];
$mensaje = "";

switch ($opcion) {
    case 'crear':
        echo crear();
        break;
    case 'editar':
        $mensaje = editar();
        break;
    case 'eliminar':
        $mensaje = eliminar();
        break;
    case 'ver':
        $mensaje = ver();
        break;
    case 'buscar':
        $mensaje = buscar();
        break;
    case 'buscar_Nombre':
        $mensaje = buscar_Nombre();
        break;
    case 'restarProductos':
        $mensaje = restarProductos();
        break;
    case 'actualizar_Stock':
        $mensaje = actualizar_Stock();
        break;
    case 'ultimo_Producto':
        $mensaje = ultimo_Producto();
        break;

}
echo $mensaje;

function crear()
{
    require "connect_DB.php";
    $name            = $_POST["name"];
    $desc            = $_POST["desc"];
    $valor           = $_POST["unidad"];
    $cant            = $_POST["cantidad"];
    $cate            = $_POST["categoria"];
    $respuesta       = "";
    $query           = mysqli_query($link, "SELECT nombre from producto where nombre='" . $name . "';");
    $check_categoria = mysqli_fetch_array($query);
    if ($check_categoria['nombre'] != $name) {
        $query           = mysqli_query($link, "SELECT tipo_id from categoria where nombre='" . $cate . "';");
        $check_categoria = mysqli_fetch_array($query);
        $respuesta       = mysqli_query($link, "INSERT into producto (categoria_id,nombre,descripcion,valor_unidad,cantidad) values(" . $check_categoria['tipo_id'] . ",'" . $name . "','" . $desc . "'," . $valor . "," . $cant . ");");
    } else {
        $respuesta = "El produto ya existe";
    }
    return $respuesta;
}

function editar()
{
    require "connect_DB.php";
    $producto = $_POST["producto"];
    $name     = $_POST["nombre"];
    $desc     = $_POST["desc"];
    $valor    = $_POST["valUnitario"];
    $cant     = $_POST["cantidad"];
    $cate     = $_POST["categoria"];
    $query    = mysqli_query($link, "select cantidad from producto where producto_id=" . $producto . ";");
    $check    = mysqli_fetch_array($query);
    mysqli_query($link, "update producto set nombre='" . $name . "' where producto_id=" . $producto . ";");
    mysqli_query($link, "update producto set categoria_id=" . $cate . " where producto_id=" . $producto . ";");
    mysqli_query($link, "update producto set descripcion='" . $desc . "' where producto_id=" . $producto . ";");
    mysqli_query($link, "update producto set valor_unidad=" . $valor . " where producto_id=" . $producto . ";");
    $calCantidad = intval($check['cantidad']) + $cant;
    mysqli_query($link, "update producto set cantidad=" . $calCantidad . " where producto_id=" . $producto . ";");

    return "Modificación exitosa";
}

function eliminar()
{
    require "connect_DB.php";
    $idPro          = $_POST["idPro"];
    $respuesta      = "";
    $query          = mysqli_query($link, "SELECT * from producto where producto_id='" . $idPro . "';");
    $check_producto = mysqli_fetch_array($query);
    if ($check_producto['producto_id'] == $idPro) {
        mysqli_query($link, "delete from producto where producto_id=" . $idPro . ";");
        $respuesta = "Producto " . $check_producto['nombre'] . " eliminado con éxito";
    } else {
        $respuesta = "El produto con id " . $idPro . " no existe";
    }
    return $respuesta;
}

function buscar()
{
    require "connect_DB.php";
    $selectInfo     = $_POST["selectInfo"];
    $respuesta      = "";
    $query          = mysqli_query($link, "SELECT * from producto where producto_id='" . $selectInfo . "';");
    $check_producto = mysqli_fetch_array($query);
    $respuesta      = $check_producto['nombre'] . "," . $check_producto['descripcion'] . "," . $check_producto['valor_unidad'];
    return $respuesta;
}

function buscar_Nombre()
{
    require "connect_DB.php";
    $selectInfo = $_POST["selectInfo"];
    $nomProd    = $selectInfo;
    $respuesta  = false;

    $query          = mysqli_query($link, "SELECT p.producto_id producto_id, p.nombre nombre, p.descripcion descripcion, p.valor_unidad valor_unidad, c.nombre categoria  from producto p, categoria c where categoria_id=tipo_id and  p.nombre COLLATE UTF8_GENERAL_CI LIKE '" . $nomProd . "';");
    $check_producto = mysqli_fetch_array($query);
    $respuesta      = $check_producto['producto_id'] . "," . $check_producto['nombre'] . "," . $check_producto['descripcion'] . "," . $check_producto['valor_unidad'] . "," . $check_producto['categoria'];
    if ($check_producto['producto_id'] == '') {
        $respuesta = $respuesta . "," . false;
    } else {
        $respuesta = $respuesta . "," . true;
    }

    return $respuesta;
}
function restarProductos()
{
    require "connect_DB.php";
    $producto_id  = $_POST["producto"];
    $cantidad     = $_POST["cantidad"];
    $respuesta    = 'Error al restar productos al stock.--' . false;
    $queryOldCant = mysqli_query($link, "SELECT cantidad FROM producto WHERE producto_id='" . $producto_id . "';");
    $oldCant      = mysqli_fetch_array($queryOldCant);
    $nuevaCant    = $oldCant['cantidad'] - $cantidad;

    mysqli_query($link, "UPDATE producto SET cantidad = '" . $nuevaCant . "' WHERE producto_id='" . $producto_id . "';");
    $respuesta = 'Productos restados al stock satisfactoriamente.--' . true;
    return $respuesta;
}

function actualizar_Stock()
{
    require "connect_DB.php";
    $producto_id    = $_POST["id"];
    $cantidad       = $_POST["cantidad"];
    $respuesta      = 'Actualización de stock fallido.--' . false;
    $query          = mysqli_query($link, "SELECT cantidad from producto where producto_id='" . $producto_id . "';");
    $check_producto = mysqli_fetch_array($query);
    $oldCantidad    = $check_producto['cantidad'];
    $newCantidad    = $cantidad + intval($oldCantidad);
    mysqli_query($link, "UPDATE producto set cantidad='" . $newCantidad . "' where producto_id='" . $producto_id . "';");
    $respuesta = 'Actualización de stock realizada satisfactoriamente.--' . true;
    return $respuesta;
}
function ultimo_Producto()
{
    require "connect_DB.php";
    $query      = mysqli_query($link, "SELECT MAX(producto_id) AS id FROM producto;");
    $check_Last = mysqli_fetch_array($query);
    $respuesta  = $check_Last['id'];

    return $respuesta;
}
