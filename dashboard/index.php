<?php
session_start();
$session_val = $_SESSION["login_state"];
if(isset($_SESSION))
{
  if(!$_SESSION['username'])
  {
    $url_path = $_SERVER['REQUEST_URI']; 
    $ar_url_path = explode('/',$url_path);
    $redirect_path = '';
    if(count($ar_url_path) > 3){
      $redirect_path = "/$ar_url_path[1]/login.html";
    }
    else{
      $redirect_path = "/login.html";
    }
    header('Location:'.$redirect_path);
    die;
  }
}
include_once("headerfiles.php");
?>                                                                    
<div class="container-scroller">
    <?php                                                         
        include_once("navbar.php");
    ?>
   <div class="container-fluid page-body-wrapper">
     <input type="hidden" id="nameDashboardDB">
      <?php
        include_once("sidebar.php");
        include_once("html/alerts/alert.php");
        include_once("html/helps/help.php");
        include_once("html/dashboard/dashboard.php");
        include_once("html/charts/charts.php");
        include_once("html/tables/energy_table.php");
        include_once("html/tables/measurement_table.php");
        include_once("html/tables/production_data_table.php");
        include_once("html/tables/production_table.php");
        include_once("html/wert/wert.php");
      ?>
   </div>
    <!-- page-body-wrapper ends -->
</div>
  <!-- container-scroller -->
<?php
include_once("script.php");
?>