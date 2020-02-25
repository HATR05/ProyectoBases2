<?php $link = mysqli_connect("localhost", "root", ""); if ($link) { mysqli_select_db($link, "ferreteriacolmex"); } ?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Administrador - Ferretería Colmex
        </title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <META http-equiv="Content-Script-Type" content="text/javascript"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="description" content=""/>
        <meta name="author" content=""/>
        <!-- Bootstrap core CSS-->
        <link href="/ProyectoBases2/resources/vendor/bootstrap/css/bootstrap1.min.css" rel="stylesheet"/>
        <!-- Custom fonts for this template-->
        <link href="/ProyectoBases2/resources/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <!-- My styles-->
        <link href="/ProyectoBases2/resources/css/base.css" rel="stylesheet"/>
        <link href="/ProyectoBases2/resources/css/display-lg.css" rel="stylesheet"/>
        <link href="/ProyectoBases2/resources/css/display-md.css" rel="stylesheet"/>
        <link href="/ProyectoBases2/resources/css/display-sm.css" rel="stylesheet"/>
        <link href="/ProyectoBases2/resources/css/warningTable.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="wrapper">
            <!-- Barra lateral en tamaños grandes y medianos  -->
            <nav id="sidebar">
                <div class="header">
                    <h4>
                        <img id="sidebarCollapse" src="/ProyectoBases2/resources/images/LogoCirculo1.png"/>
                        <a data-toggle="collapse" href="#bienvenida" role="button">
                            StockManage
                        </a>
                    </h4>
                    <strong id="sm">
                        <a data-toggle="collapse" id="linkSm">
                            <img src="/ProyectoBases2/resources/images/LogoCirculo1.png"/>
                        </a>
                    </strong>
                </div>
                <ul class="list-unstyled components">
                    <li>
                        <a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="add" class="nav-link">
                            <i class="fa fa-plus">
                            </i>
                            Agregar
                        </a>
                    </li>
                    <li>
                        <a data-toggle="collapse" href="#list" role="button" aria-expanded="false" aria-controls="list" class="nav-link">
                            <i class="fa fa-list-alt">
                            </i>
                            Listar
                        </a>
                    </li>
                   <li>
                        <a data-toggle="collapse" href="#list" role="button" aria-expanded="false" aria-controls="list" class="nav-link"><i class="fa fa-list-alt"></i> Listar </a>
                    </li>
                        <a data-toggle="collapse" href="#settings" role="button" aria-expanded="false" aria-controls="settings" class="nav-link">
                            <i class="fa fa-support">
                            </i>
                            Funciones Base
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" data-toggle="modal" data-target="#confirm" href="">
                            <i class="fa fa-power-off" id="cerrar">
                            </i>
                            <span class="nav-link-text">
                                Cerrar sesión
                            </span>
                        </a>
                    </li>
                </ul>
                <div class="footer">
                    <h6>
                        Ferretería COLMEX S.A.S &copy;
                    </h6>
                </div>
            </nav>
            <!--Navbar para telefonos -->
            <nav class="ocultar navbarSh navbar navbar-expand-lg navbar-light bg-light">
                <a data-toggle="collapse" class="navbar-brand" href="#bienvenida">
                    StockManage
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="add" class="nav-link">
                                <i class="fa fa-plus">
                                </i>
                                Agregar
                            </a>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#list" role="button" aria-expanded="false" aria-controls="list" class="nav-link">
                                <i class="fa fa-list">
                                </i>
                                Listar
                            </a>
                        </li>
                       <li class="nav-item">
                            <a href="/ProyectoBases2/paginas/factura/List.php" class="nav-link"><i class="fa fa-book"></i> Facturas </a>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#settings" role="button" aria-expanded="false" aria-controls="settings" class="nav-link">
                                <i class="fa fa-support">
                                </i>
                                Funciones Base
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="modal" data-target="#confirm" href="">
                                <i class="fa fa-fw fa-power-off">
                                </i>
                                <span class="nav-link-text">
                                    Cerrar sesión
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <!-- Contenido de la pagina  -->
            <div id="content" class="background-page">
                <!--Espacio para "inicio"-->
                <div class="collapse" id="bienvenida">
                    <div class="contenido">
                        <h2>
                            ¡Bienvenido!
                        </h2>
                        <p>
                            Aquí deberíamos poner información chévere, quiza algunas de las funciones analíticas o una vista
                        </p>
                    </div>
                </div>
                <!--Contenido de agregar nueva factura-->
                <div class="contenido">
                    <h1 class="titleCreate">
                        Editar factura.
                    </h1>
                    <br/>
                    <!-- id de factura-->
                    <div class="form-group row">
                        <label class="col-md-2 " for="factura_id" readonly>
                            No. Factura:
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control"  value="" id="factura_id" required="true" readonly/>
                        </div>
                    </div>
                    <div class="form-group row" id="fechas">
                        <label class="col-md-2 col-form-label" for="fecha" readonly>
                            Fecha:
                        </label>
                        <div class="col-md-3">
                            <input type="text" class="form-control"  value="" id="fecha" required="true" readonly/>
                        </div>
                        <label class="col-md-2 col-form-label" for="fechaV" readonly>
                            Fecha de Vencimiento:
                        </label>
                        <div class="col-md-3">
                            <input type="text" class="form-control"  value="" id="fechaV" required="true" readonly/>
                        </div>
                    </div>
                    <!--Fin Componente para venta o compra-->
                    <form>
                        <!--Componentes necesarios para factura de venta-->
                        <div id="facturaSell">
                            <!--Componentes para escoger un vendedor-->
                            <div class="form-group row justify-content-center" id ="vendedordiv">
                                <label class="col-md-2 " for="vendedor_id">
                                    Vendedor:
                                </label>
                                <div class="col-md-7">
                                    <select id="vendedor_id"  class="browser-default custom-select">
                                        <option value="">
                                            -------------------
                                        </option>
                                        ;
                                        <?php $consultaEmpleado = mysqli_query($link, "SELECT CONCAT(nombre,' ',apellido) AS nombre, empleado_id FROM empleado WHERE cargo_id =(SELECT cargo_id FROM cargo WHERE nombre = 'Vendedor');"); while ($row = mysqli_fetch_array($consultaEmpleado)) { echo "   <option value=" . $row['empleado_id'] . "> " . $row['nombre'] . "   </option> "; } ?>
                                    </select>
                                    <br/>
                                </div>
                                <a class="col-md-2 " href="/ProyectoBases2/paginas/empleado/Create.php" target="_blank" style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)">
                                    Crear un nuevo vendedor.
                                </a>
                            </div>
                        </p>
                        <!--Componentes para escoger un cliente-->
                        <div class="form-group row justify-content-center" id ="clientediv">
                            <label class="col-md-2" for="nombre_cliente">
                                Cliente:
                            </label>
                            <div class="col-md-7 ">
                                <select id="cliente" class="browser-default custom-select">
                                    <option value="">
                                        -------------------
                                    </option>
                                    ;
                                    <?php $consultaCliente = mysqli_query($link, "SELECT CONCAT(nombre,' ',apellido) AS nombre, cliente_id from cliente;"); while ($row = mysqli_fetch_array($consultaCliente)) { echo "   <option value=" . utf8_encode($row['cliente_id']) . "> " . utf8_encode($row['nombre']) . "   </option> "; } ?>
                                </select>
                            </div>
                            <a class="col-md-2 " href="/ProyectoBases2/paginas/cliente/Create.php" target="_blank" style="color: #ffc107" onmousemove="underline(this)" onmouseout="blankunderline(this)">
                                Crear un nuevo cliente.
                            </a>
                        </div>
                        <!-- Selección de productos a vender -->
                        <div class="form-group row justify-content-center" id="productSell">
                            <label class="col-md-2" for="nombre_producto">
                                Seleccione los productos que desea añadir:
                            </label>
                            <div class="col-md-7 col-form-label">
                                <select id="producto" class="browser-default custom-select" onchange="insertProductS()">
                                    <option value="default">
                                        -------------------
                                    </option>
                                    ;
                                    <?php $consultaProducto = mysqli_query($link, "SELECT producto_id, nombre, valor_unidad FROM producto;"); while ($row = mysqli_fetch_array($consultaProducto)) { echo "   <option value=" . utf8_encode($row['producto_id']) . "--" . utf8_encode($row['valor_unidad']) . "> " . utf8_encode($row['nombre']) . "   </option> "; } ?>
                                </select>
                            </div>
                            <a class="col-md-2 " href="/ProyectoBases2/paginas/producto/Create.php" target="_blank" style="color: #ffc107" onmousemove="underline(this)" onmouseout="blankunderline(this)">
                                Agregar nuevo producto.
                            </a>
                        </div>
                        <!--
                           Tabla para ir mostrando los productos que se quieran añadira factura de venta -->
                        <div class="table-responsive">
                            <table id="tabla_productosS" class="table table-light text-font">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">
                                            Id_Producto
                                        </th>
                                        <th scope="col">
                                            Producto
                                        </th>
                                        <th scope="col">
                                            Cantidad
                                        </th>
                                        <th scope="col">
                                            Valor Unidad
                                        </th>
                                        <th scope="col">
                                            Costo
                                        </th>
                                        <th scope="col">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--Fin componentes de factura de venta-->
                    <!-- Componentes de factura de compra-->
                    <div   id="facturaBuy" hidden>
                        <!--Componentes para seleccionar un empleado -->
                        <div class="form-group row justify-content-center" id="empleadodiv">
                            <label class="col-md-2 " for="nombre_empleado">
                                Empleado:
                            </label>
                            <div class="col-md-7">
                                <select id="empleado_id" class="browser-default custom-select">
                                    <option value="">
                                        -------------------
                                    </option>
                                    ;
                                    <?php $consultaEmpleado = mysqli_query($link, "SELECT CONCAT(nombre,' ',apellido) AS nombre, empleado_id FROM empleado ;"); while ($row = mysqli_fetch_array($consultaEmpleado)) { echo "   <option value=" . $row['empleado_id'] . "> " . $row['nombre'] . "   </option> "; } ?>
                                </select>
                                <br/>
                            </div>
                            <a class="col-md-2 " href="/ProyectoBases2/paginas/empleado/Create.php" target="_blank" style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)">
                                Crear un nuevo empleado.
                            </a>
                        </div>
                        <!--Fin componentes para seleccionar un empleado -->
                        <p>
                        </p>
                        <!--Componentes para escoger un proveedor-->
                        <div class="form-group row justify-content-center" id="proveedordiv">
                            <label class="col-md-2" for="nombre_proveedor">
                                Proveedor:
                            </label>
                            <div class="col-md-7 " col-form-label>
                                <select  id="proveedor" class="browser-default custom-select">
                                    <option value="">
                                        -------------------
                                    </option>
                                    ;
                                    <?php $consultaProveedor = mysqli_query($link, "SELECT nombre, nit from proveedor;"); while ($row = mysqli_fetch_array($consultaProveedor)) { echo "   <option value=" . utf8_encode($row['nit']) . "> " . utf8_encode($row['nombre']) . "   </option> "; } ?>
                                </select>
                            </div>
                            <a class="col-md-2 " href="/ProyectoBases2/paginas/proveedor/Create.php" target="_blank" style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)">
                                Crear un nuevo proveedor.
                            </a>
                        </div>
                        <!--Fin componentes para escoger un proveedor-->
                        <hr/>
                        <!--Componentes para agregar un producto-->
                        <div class="form-group row justify-content-center">
                            <label class="col-md-3 " for="idProducto">
                                Id del producto:
                            </label>
                            <div class="col-md-7">
                                <input id="idProducto" readonly class="form-control"/>
                            </div>
                            <div class="col-md-2 ">
                            </div>
                        </div>
                        <div class="form-group row justify-content-center">
                            <label class="col-md-3" for="nameProducto">
                                Nombre del producto:
                            </label>
                            <div class="col-md-7">
                                <input id="nameProducto" class="form-control" onblur="autorellenar_Prueba(this.value)"/>
                            </div>
                            <div class="col-md-2 ">
                            </div>
                        </div>
                        <div class="form-group row justify-content-center">
                            <label class="col-md-3" for="desc">
                                Descripción:
                            </label>
                            <div class="col-md-7">
                                <input id="desc" class="form-control"/>
                            </div>
                            <div class="col-md-2 ">
                            </div>
                        </div>
                        <div class="form-group row justify-content-center" min="1" pattern="^[0-9]+">
                            <label class="col-md-3" for="costo">
                                Costo:
                            </label>
                            <div class="col-md-7">
                                <input type="number" id="costo" class="form-control"/>
                            </div>
                            <div class="col-md-2 ">
                            </div>
                        </div>
                        <div class="form-group row justify-content-center">
                            <label class="col-md-3" for="valor" min="1" pattern="^[0-9]+">
                                Valor unitario de venta:
                            </label>
                            <div class="col-md-7">
                                <input type="number" id="valor" class="form-control"/>
                            </div>
                            <div class="col-md-2 ">
                            </div>
                        </div>
                        <div class="form-group row justify-content-center">
                            <label class="col-md-3" for="stock" min="1" pattern="^[0-9]+">
                                Cantidad de ingreso:
                            </label>
                            <div class="col-md-7">
                                <input type="number" id="stock" class="form-control"/>
                            </div>
                            <div class="col-md-2 ">
                            </div>
                        </div>
                        <hr/>
                        <div class="form-group row justify-content-center">
                            <label class="col-md-2" for="stock">
                                Categoría:
                            </label>
                            <div class="col-md-7">
                                <select id="optionCat" class="form-control">
                                    <?php $consultaCategoria = mysqli_query($link, "SELECT tipo_id,nombre from categoria;"); while ($row = mysqli_fetch_array($consultaCategoria)) { echo "   <option value=" . $row['nombre'] . "> " . $row['nombre'] . "   </option> "; } ?>
                                </select>
                            </div>
                            <a class="col-md-2 " href="/ProyectoBases2/paginas/categoria/Create.html" target="_blank" style="color: #ffc107"onmousemove="underline(this)" onmouseout="blankunderline(this)">
                                Crear nueva categoría.
                            </a>
                            <!-- Botón de guardar -->
                            <button id="saveB" class="justify-content-left col-md-2 btn btn-ambar">
                                Agregar
                            </button>
                        </div>
                        <!--Componentes para agregar un producto-->
                        <!-- Tabla para ir mostrando los productos que se quieran añadira factura de compra  -->
                        <div class="table-responsive">
                            <table id="tabla_productosB" class="table table-light text-font">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">
                                            Id_Producto
                                        </th>
                                        <th scope="col">
                                            Producto
                                        </th>
                                        <th scope="col">
                                            Descripción
                                        </th>
                                        <th scope="col">
                                            Costo
                                        </th>
                                        <th scope="col">
                                            Valor Unidad
                                        </th>
                                        <th scope="col">
                                            Cantidad
                                        </th>
                                        <th scope="col">
                                            Categoría
                                        </th>
                                        <th scope="col">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <!-- Fin tabla para ir mostrando los productos que se quieran añadira factura de compra  -->
                    </div>
                    <!-- Componentes generales-->
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <label class="col-md-1" id="saldolabel">
                            Saldo
                        </label>
                        <input class="col-md-2 " type="number" min="0" id="saldo" value="0"/>
                        <br/>
                        <label class="col-md-1" id="Subtotallabel">
                            Subtotal
                        </label>
                        <input class="col-md-2 " type="number" min="1" id="subtotal" value="0" readonly/>
                        <br/>
                        <label class="col-md-1" id="Totallabel">
                            Total
                        </label>
                        <input class="col-md-2" type="number" min="1" id="total" value="0" readonly/>
                        <br/>
                    </div>
                    <!-- Div para advertencias de existencias-->
                    <div id="advertencias" class="warningDiv">
                    </div>
                    <br/>
                </form>
                <!-- Botón de guardar -->
                <button id="save" type="submit" class="btn btn-ambar" onclick="createSell()" disabled>
                    Guardar Factura
                </button>
                <!-- Botón de mostrar todas las categorías -->
                <button id="mostrar" class="btn btn-ambar" onclick ="location.href='./List.php' ">
                    Lista de facturas
                </button>
                <!-- Botón de inicio
                <button class="btn btn-ambar" onclick ="location.href='/ProyectoBases2/administrador.html">Inicio</button>
                -->
                <!-- Fin componentes generales-->
            </div>
            <!--espacio agregar-->
            <div class="collapse" id="add">
                <div class="contenido">
                    <h3>
                        Agregar
                    </h3>
                    <p>
                        ¿Te hace falta algo? No te preocupes, aquí puedes agregar lo que haga falta. Solo recuerda que tienes que
                        ser un poco ordenado.
                    </p>
                    <div class="row">
                        <div class="col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Proveedor
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/proveedor/Create.php" class="btn btn-danger">
                                        Agregar
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Cliente
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/cliente/Create.php" class="btn btn-danger">
                                        Agregar
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4 ">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Producto
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/producto/Create.php" class="btn btn-danger">
                                        Agregar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-4">
                        <div class="offset-md-2 col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Empleado
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/empleado/Create.php" class="btn btn-danger">
                                        Agregar
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Categoria de producto
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/categoria/Create.html" class="btn btn-danger">
                                        Agregar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Espacio Listar-->
            <div class="collapse" id="list">
                <div class="contenido">
                    <h3>
                        Listas
                    </h3>
                    <p>
                        Estos son las cosas mas importantes para listar, recuerda que puedes ver detalles, editar o eliminar los registros.
                    </p>
                    <div class="row">
                        <div class="col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Proveedor
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/proveedor/List.php" class="btn btn-danger">
                                        Mostrar
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Cliente
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/cliente/List.php" class="btn btn-danger">
                                        Mostrar
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Producto
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/producto/List.php" class="btn btn-danger">
                                        Mostrar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-4">
                        <div class="col-sm-12 offset-md-2 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Empleado
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/empleado/List.php" class="btn btn-danger">
                                        Mostrar
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Categoria de producto
                                    </h5>
                                    <p class="card-text">
                                        Aquí va información acerca de algo.
                                    </p>
                                    <a href="/ProyectoBases2/paginas/categoria/List.php" class="btn btn-danger">
                                        Mostrar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Espacio funciones basicas-->
            <div class="collapse" id="settings">
                <div class="contenido">
                    <h3>
                        Funciones Base
                    </h3>
                    <p>
                        Aquí encontraras información que quizá te interece sin embargo te recomendamos no tocar mucho de esto y si lo haces
                        que sea con ayuda de un experto.
                    </p>
                    <ul class="list-group">
                        <li class="list-group-item" aria-disabled="true">
                            <a href="/ProyectoBases2/paginas/departamento/List.php">
                                Lista de Departamentos
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="/ProyectoBases2/paginas/ciudad/List.php">
                                Lista de Ciudades
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="/ProyectoBases2/paginas/barrio/List.php">
                                Lista de Barrios
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="/ProyectoBases2/paginas/ubicacion/List.php">
                                Lista de Direcciones
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="/ProyectoBases2/paginas/cargo/List.php">
                                Lista de Cargos
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--Letrero de confirmación en cierre de sesion-->
        <div class="modal fade" id="confirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Confirmación
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">
                                &times;
                            </span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            ¿Seguro que quieres cerrar sesión?
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            Cancelar
                        </button>
                        <a class="btn btn-ambar" href="/ProyectoBases2/index.html">
                            Cerrar sesión
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Bootstrap core JavaScript-->
<script src="/ProyectoBases2/resources/vendor/jquery/jquery.min.js"></script>
<script src="/ProyectoBases2/resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- Core plugin JavaScript-->
<script src="/ProyectoBases2/resources/vendor/jquery-easing/jquery.easing.min.js"></script>
<!--Mis scripts-->
<script type="text/javascript" src="/ProyectoBases2/resources/js/controlBarra.js"></script>
<script type="text/javascript" src="/ProyectoBases2/resources/js/effects.js"></script>
<!--script type="text/javascript" src="/ProyectoBases2/resources/js/controlTablaBuy.js"></script-->
<script type="text/javascript" src="/ProyectoBases2/resources/js/controlFactura.js"></script>
<script type="text/javascript" src="/ProyectoBases2/resources/js/controlEdit.js"></script>
<script type="text/javascript" src="/ProyectoBases2/Logica/Javascript/Factura.js"></script>
<script type="text/javascript" src="/ProyectoBases2/Logica/Javascript/Producto.js"></script>
<!--<script type="text/javascript" src="/ProyectoBases2/resources/js/controlFacturaSell.js"></script>-->
</body>
</html>
