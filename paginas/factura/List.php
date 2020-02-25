<?php
    $link =mysqli_connect("localhost","root","");
    if($link){
        mysqli_select_db($link,"ferreteriacolmex");
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Administrador - Ferretería Colmex</title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
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

    </head>
    <body>
        <div class="wrapper">
            <!-- Barra lateral en tamaños grandes y medianos  -->
            <nav id="sidebar">
                <div class="header">
                    <h4>
                        <img id="sidebarCollapse" src="/ProyectoBases2/resources/images/LogoCirculo1.png"/>
                        <a data-toggle="collapse" href="#bienvenida" role="button">StockManage</a>
                    </h4> 
                    <strong id="sm">
                        <a data-toggle="collapse" id="linkSm" >
                            <img src="/ProyectoBases2/resources/images/LogoCirculo1.png"/>
                        </a>
                    </strong>
                </div>
                <ul class="list-unstyled components">
                    <li>
                        <a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="add" class="nav-link"><i class="fa fa-plus"></i> Agregar </a>
                    </li>
                    <li>
                        <a data-toggle="collapse" href="#list" role="button" aria-expanded="false" aria-controls="list" class="nav-link"><i class="fa fa-list-alt"></i> Listar </a>
                    </li>
                    <li>
                        <a href="paginas/factura/List.php" class="nav-link"><i class="fa fa-book"></i> Facturas </a>
                    </li>
                     <li>
                        <a data-toggle="collapse" href="#settings" role="button" aria-expanded="false" aria-controls="settings" class="nav-link"><i class="fa fa-support"></i> Funciones Base </a>
                    </li>
                    <li>
                        <a class="nav-link" data-toggle="modal" data-target="#confirm" href="">
                            <i class="fa fa-power-off" id="cerrar"></i><span class="nav-link-text">Cerrar sesión</span>
                        </a>
                    </li>
                </ul>
                <div class="footer">
                    <h6>Ferretería COLMEX S.A.S &copy;</h6>
                </div>
            </nav>
        
        
            <!--Navbar para telefonos -->
            <nav class="ocultar navbarSh navbar navbar-expand-lg navbar-light bg-light">
                <a data-toggle="collapse" class="navbar-brand" href="#bienvenida">StockManage</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="add" class="nav-link"><i class="fa fa-plus"></i> Agregar </a>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#list" role="button" aria-expanded="false" aria-controls="list" class="nav-link"><i class="fa fa-list"></i> Listar </a>
                        </li>
                        <li class="nav-item">
                            <a href="paginas/factura/List.php" class="nav-link"><i class="fa fa-book"></i> Facturas </a>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#settings" role="button" aria-expanded="false" aria-controls="settings" class="nav-link"><i class="fa fa-support"></i> Funciones Base </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="modal" data-target="#confirm" href="">
                                <i class="fa fa-fw fa-power-off"></i><span class="nav-link-text">Cerrar sesión</span>
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
                        <h2>¡Bienvenido!</h2>
                        <p>Aquí deberíamos poner información chévere, quiza algunas de las funciones analíticas o una vista</p>
                    </div>
                </div>    


                <!--Contenido de agregar nueva factura-->
                <div class="contenido">

                    <h1 class="titleCreate">Facturas</h1>
                    
                 <label class="col-md-6" >Nota: Si desea ver información adicional de una factura, haga click en el número de su id.</label>
                  <!-- Componentes para determinar si es factura de compra o venta-->
                     <div class="form-group row">
                            <label class="col-md-3 text-center" for="tipo_factura">Tipo de factura a listar: </label>
                            <div class="col-md  justify-content-rigth" id="checkBill">
                                <div class="custom-control custom-checkbox  custom-control-inline">
                                   <input type="checkbox" class="custom-control-input" id="facturaventa" onchange = "check(this)">
                                   <label class="custom-control-label" for="facturaventa" >Factura de Venta.</label>
                                </div>
                                 
                                <div class="custom-control custom-checkbox  custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="facturacompra" onchange = "check(this)">
                                    <label class="custom-control-label" for="facturacompra">Factura de Compra.</label>
                                </div>
                                
                            </div>
                        </div>
                    <!--Fin Componente para venta o compra--> 
                <!--Contenido de listar facturas de venta-->
                    <div id ="tablaVenta" class="table table-responsive">
                        <table class="table table-light text-font table-sm"id="tabla_productos">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">id_Factura</th>
                                    <th scope="col">Vendedor</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Saldo</th>
                                    <th scope="col">Subtotal</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $consultaProducto=mysqli_query($link,"SELECT factura_id, CONCAT(c.nombre,' ',c.apellido) as cliente, empleado, fecha_factura, saldo, subtotal,total  from cliente c natural join (select factura_id,cliente_id, CONCAT(e.nombre,' ',e.apellido) AS empleado, fecha_factura, saldo,subtotal,total from factura natural join empleado e)df;");
                                while($row= mysqli_fetch_array($consultaProducto)){
                                    echo "<tr>";
                                        echo "<td class=\"factura\" style=\"color: #ffc107\" onmousemove=\"underline(this)\" onmouseout=\"blankunderline(this)\" value=\"".$row['factura_id']."\">".$row['factura_id']."</td>";
                                        echo "<td>".$row['empleado']."</td>";
                                        echo "<td>".$row['cliente']."</td>";
                                        echo "<td>".$row['fecha_factura']."</td>";
                                        echo "<td>".$row['saldo']."</td>";
                                        echo "<td>".$row['subtotal']."</td>";
                                        echo "<td>".$row['total']."</td>";
                                        echo "<td> <a class=\"delete\" style=\"color: #ffc107\"onmousemove=\"underline(this)\" onmouseout=\"blankunderline(this)\"> Eliminar</a></td>";
                                    echo "</tr>";
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                    <p>
                    
                    </p>
                    <!--FinContenido de listar facturas de venta--> 
                    <!--Contenido de listar facturas de compra-->
                    <div id ="tablaCompra" class="table table-responsive" >
                        <table class="table table-light text-font table-sm"id="tabla_productos">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">id_Factura</th>
                                    <th scope="col">Empleado</th>
                                    <th scope="col">Proveedor</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Saldo</th>
                                    <th scope="col">Subtotal</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $consultaProducto=mysqli_query($link," SELECT factura_id, nombre AS proveedor, empleado, fecha_factura, saldo, subtotal,total  from proveedor p natural join (select factura_id,nit, CONCAT(e.nombre,' ',e.apellido) AS empleado, fecha_factura, saldo,subtotal,total from factura natural join empleado e)df;");
                                while($row= mysqli_fetch_array($consultaProducto)){
                                    echo "<tr>";
                                        echo "<td class=\"factura\" style=\"color: #ffc107\" onmousemove=\"underline(this)\" onmouseout=\"blankunderline(this)\" value=\"".$row['factura_id']."\">".$row['factura_id']."</td>";
                                        echo "<td>".$row['empleado']."</td>";
                                        echo "<td>".$row['proveedor']."</td>";
                                        echo "<td>".$row['fecha_factura']."</td>";
                                        echo "<td>".$row['saldo']."</td>";
                                        echo "<td>".$row['subtotal']."</td>";
                                        echo "<td>".$row['total']."</td>";
                                        echo "<td> <a class=\"delete\" style=\"color: #ffc107\"onmousemove=\"underline(this)\" onmouseout=\"blankunderline(this)\"> Eliminar</a></td>";
                                    echo "</tr>";
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                    <!--Fin Contenido de listar facturas de compra-->
                     <form>
                        <!-- Botón de mostrar todas las categorías -->
                        <button type="button" class="btn btn-ambar" onclick=" location.href='/ProyectoBases2/paginas/factura/Create.php' " value="Vamos" name="boton" /> Crear factura.</button>
                        <!-- Botón de inicio -->
                        <button type="button" class="btn btn-ambar" onclick=" location.href='/ProyectoBases2/administrador.html' " value="Vamos" name="boton" /> Atrás</button>
                    </form>

                </div>    
                <!--espacio agregar-->
                <div class="collapse" id="add">
                    <div class="contenido">
                        <h3>Agregar</h3>
                        <p>¿Te hace falta algo? No te preocupes, aquí puedes agregar lo que haga falta. Solo recuerda que tienes que 
                        ser un poco ordenado.</p>
                        <div class="row">
                            <div class="col-sm-12 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Proveedor</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/proveedor/Create.php" class="btn btn-danger">Agregar</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Cliente</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/cliente/Create.php" class="btn btn-danger">Agregar</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4 ">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Producto</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/producto/Create.php" class="btn btn-danger">Agregar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row my-4">
                            <div class="offset-md-2 col-sm-12 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Empleado</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/empleado/Create.php" class="btn btn-danger">Agregar</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Categoria de producto</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/categoria/Create.php" class="btn btn-danger">Agregar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!--Espacio Listar-->
                <div class="collapse" id="list">
                    <div class="contenido">
                        <h3>Listas</h3>
                        <p>Estos son las cosas mas importantes para listar, recuerda que puedes ver detalles, editar o eliminar los registros.</p>
                        <div class="row">
                            <div class="col-sm-12 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Proveedor</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/proveedor/List.php" class="btn btn-danger">Mostrar</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Cliente</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/cliente/List.php" class="btn btn-danger">Mostrar</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Producto</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/producto/List.php" class="btn btn-danger">Mostrar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row my-4">
                            <div class="col-sm-12 offset-md-2 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Empleado</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/empleado/List.php" class="btn btn-danger">Mostrar</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Categoria de producto</h5>
                                        <p class="card-text">Aquí va información acerca de algo.</p>
                                        <a href="paginas/categoria/List.php" class="btn btn-danger">Mostrar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!--Espacio Factura-->
            <div class="collapse  " id="bill">
                <div class="contenido">
                    <h3>
                        Facturas
                    </h3>
                    <p>
                        Estas son algunas acciones que puedes hacer con las facturas.
                    </p>
                    <div class="row my-4">
                        <div class="offset-md-2 col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Crear factura
                                    </h5>
                                    <p class="card-text">
                                        Aquí puedes crear facturas tanto de venta como de compra para tu negocio.
                                    </p>
                                    <a href="paginas/factura/Create.php" class="btn btn-danger">
                                        Crear
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Lista de Facturas
                                    </h5>
                                    <p class="card-text">
                                        Aquí puedes ver un listado de las facturas, tanto de venta como de compra.
                                    </p>
                                    <a href="paginas/factura/List.php" class="btn btn-danger">
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
                        <h3>Funciones Base</h3>
                        <p>Aquí encontraras información que quizá te interece sin embargo te recomendamos no tocar mucho de esto y si lo haces
                        que sea con ayuda de un experto.</p>
                        <ul class="list-group">
                            <li class="list-group-item" aria-disabled="true">
                                <a href="paginas/departamento/List.php">Lista de Departamentos</a>
                            </li>
                            <li class="list-group-item">
                                <a href="paginas/ciudad/List.php">Lista de Ciudades</a>
                            </li>
                            <li class="list-group-item">
                                <a href="paginas/barrio/List.php">Lista de Barrios</a>
                            </li>
                            <li class="list-group-item">
                                <a href="paginas/ubicacion/List.php">Lista de Direcciones</a>
                            </li>
                            <li class="list-group-item">
                                <a href="paginas/cargo/List.php">Lista de Cargos</a>
                            </li>
                            <li class="list-group-item">
                                <a href="paginas/ubicacion/List.php">Lista de Ubicaciones</a>
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
                            <h5 class="modal-title" id="exampleModalLabel">Confirmación</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>¿Seguro que quieres cerrar sesión?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <a class="btn btn-ambar" href="index.php">Cerrar sesión</a>
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
        <script src="/ProyectoBases2/resources/js/controlBarra.js"></script>

        <script type="text/javascript" src="/ProyectoBases2/resources/js/controlList.js"></script>
        <script src="/ProyectoBases2/resources/js/effects.js"></script>
        <script src="/ProyectoBases2/Logica/Javascript/Factura.js"></script>

    </body>
</html>