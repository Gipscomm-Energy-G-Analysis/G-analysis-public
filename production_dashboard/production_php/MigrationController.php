<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

class MigrationController{

    public function __construct() {
        global $conn;
        $nameDB = isset($_REQUEST['nameDB']) && !empty($_REQUEST['nameDB']) ? $_REQUEST['nameDB'] : 'g002_badber';
        $action = $_REQUEST['action'];
        $this->schema = 'dbo';
        $this->username = $_SESSION['username'];
        $this->conn = $conn;
    }

    public function runMigrations() {
        self::createSubGroupConfigurationTable();
        self::createDashboardProduktionConfigTable();
        self::createMachineTableConfigurations();
        self::createSubGroupOptionTable();
        self::createMachinePriorityTable();
        self::createGraphConfigurationTable();
        return ['SubGroupConfiguration','dashboardProduktionConfig','machine_table_config','subGroupOptions','machine_priority','graph_configurations'];
    }

    public function createMigrationTable($dbname){
        $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$this->schema' 
         AND  TABLE_NAME = 'migrationTable'";
        $table_exits = queryDB ( $this->conn, $query, "read");
        if (empty($table_exits)) {
            $tableQuery = "CREATE TABLE $this->schema.migrationTable (
                id INT PRIMARY KEY IDENTITY (1, 1),
                table_name VARCHAR(200) NULL,
                status VARCHAR(10) NOT NULL CHECK (status IN('0', '1')),
                created_at DATETIME2 NULL,
                updated_at DATETIME2 NULL,
            )";
            $createTable = $this->conn->prepare($tableQuery)->execute();
            $tableData = self::runMigrations();
            $insertMigration = self::saveMigrationDetails($tableData,$dbname);
        } else {
            $migrationTable = "SELECT * FROM migrationTable";
            // $migrationTableData = $this->conn->query($migrationTable)->fetchAll();
            $migrationTableData = queryDB ( $this->conn, $query, "read");
            $dbArray = ['SubGroupConfiguration', 'dashboardProduktionConfig', 'machine_table_config','subGroupOptions','graph_configurations'];

            foreach($migrationTableData as $tables) {
                if(in_array($tables['table_name'], $dbArray)) {
                    continue;
                }  
            
                switch ($tables['table_name']){
                    case 'SubGroupConfiguration':
                        self::createSubGroupConfigurationTable();
                        break;
                    case 'dashboardProduktionConfig':
                        self::createDashboardProduktionConfigTable();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         roduktionConfigTable();
                        break;
                    case 'machine_table_config':
                        self::createMachineTableConfigurations();
                        break;
                    case 'subGroupOptions':
                        self::createSubGroupOptionTable();
                        break;
                    case 'machine_priority':
                        self::createMachinePriorityTable();
                        break;
                    case 'graph_configurations':
                        self::createGraphConfigurationTable();
                        break;
                    default:
                        break;
                }
            }
        }
    }

    public function saveMigrationDetails($tableData,$dbname) {
        try {
            foreach($tableData as $value) {
                $insertquery = "INSERT INTO migrationTable (table_name, status) VALUES ('$value', '1')";
                // $insert_records = $this->conn->prepare($insertquery)->execute();
                $insert_records = queryDB ( $this->conn, $query, "write");
            }
        } catch (Exception $exc) {
            // print_r($exc);
        }
    }


    public function createSubGroupConfigurationTable() {
        $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$this->schema'
         AND  TABLE_NAME = 'SubGroupConfiguration'";
        // $table_exits = $this->conn->query($query)->fetch();
        $table_exits = queryDB ( $this->conn, $query, "read");
        if (empty($table_exits)) {
            $tableQuery = "CREATE TABLE $this->schema.SubGroupConfiguration (
                id INT PRIMARY KEY IDENTITY (1, 1),
                group_id INT NULL,
                sub_group_id INT NULL,
                user_id INT NULL,
                username VARCHAR(200) NULL,
                table_name VARCHAR(200) NULL,
                column_name VARCHAR(200) NULL,
                label_name VARCHAR(200) NULL,
                primary_key VARCHAR(200) NULL,
                foreign_key VARCHAR(200) NULL,
                status VARCHAR(10) NOT NULL CHECK (status IN('0', '1')),
                is_graph VARCHAR(10) NOT NULL CHECK (is_graph IN('0', '1')) DEFAULT '0',
                created_at DATETIME2 NULL,
                updated_at DATETIME2 NULL,
            )";
            $createTable = $this->conn->prepare($tableQuery)->execute();
            $insertquery = "INSERT INTO migrationTable (table_name, status) VALUES ('SubGroupConfiguration', '1')";
            // $insert_records = $this->conn->prepare($insertquery)->execute();
            $insert_records = queryDB ( $this->conn, $query, "write");
        }
        return;
    }

    public function createDashboardProduktionConfigTable() {
        // $table_exits = DB::getSchemaBuilder()->hasTable('dashboardProduktionConfig');
        $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$this->schema'
         AND  TABLE_NAME = 'dashboardProduktionConfig'";
        // $table_exits = $this->conn->query($query)->fetch();
        $table_exits = queryDB ( $this->conn, $query, "read");
        if (empty($table_exits)) {
            $tableQuery = "CREATE TABLE $this->schema.dashboardProduktionConfig (
                id INT PRIMARY KEY IDENTITY (1, 1),
                anl_ID INT NULL,
                user_id INT NULL,
                username VARCHAR(200) NULL,
                dbName VARCHAR(200) NULL,
                table_name VARCHAR(200) NULL,
                column_name VARCHAR(200) NULL,
                label_name VARCHAR(200) NULL,
                primary_key VARCHAR(200) NULL,
                foreign_key VARCHAR(200) NULL,
                status VARCHAR(10) NOT NULL CHECK (status IN('0', '1')),
                is_graph VARCHAR(10) NOT NULL CHECK (is_graph IN('0', '1')) DEFAULT '0',
                created_at DATETIME2 NULL,
                updated_at DATETIME2 NULL,
            )";
            $createTable = $this->conn->prepare($tableQuery)->execute();
            $insertquery = "INSERT INTO migrationTable (table_name, status) VALUES ('dashboardProduktionConfig', '1')";
            // $insert_records = $this->conn->prepare($insertquery)->execute();
            $insert_records = queryDB ($this->conn, $query, "write");
        }
        return;
    }

    public function createMachineTableConfigurations() {
        // $table_exits = DB::getSchemaBuilder()->hasTable('machine_table_config');
        $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$this->schema' 
        AND  TABLE_NAME = 'machine_table_config'";
        // $table_exits = $this->conn->query($query)->fetch();
        $insert_records = queryDB ( $this->conn, $query, "read");
        if (empty($table_exits)) {
            $tableQuery = "CREATE TABLE $this->schema.machine_table_config (
                id INT PRIMARY KEY IDENTITY (1, 1),
                user_id INT NULL,
                username VARCHAR(200) NULL,
                table_name VARCHAR(200) NULL,
                column_name VARCHAR(200) NULL,
                label_name VARCHAR(200) NULL,
                status VARCHAR(10) NOT NULL CHECK (status IN('0', '1')),
                created_at DATETIME2 NULL,
                updated_at DATETIME2 NULL,
            )";
            $createTable = $this->conn->prepare($tableQuery)->execute();
            $insertquery = "INSERT INTO migrationTable (table_name, status)  ('machine_table_config', '1')";
            // $insert_records = $this->conn->prepare($insertquery)->execute();
            $insert_records = queryDB ( $this->conn, $query, "write");
        }
        return;
    }

    public function createSubGroupOptionTable() {
        // $table_exits = DB::getSchemaBuilder()->hasTable('subGroupOptions');
        $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$this->schema' 
        AND  TABLE_NAME = 'subGroupOptions'";
        // $table_exits = $this->conn->query($query)->fetch();
        $table_exits = queryDB ( $this->conn, $query, "read");
        if (empty($table_exits)) {
            $tableQuery = "CREATE TABLE $this->schema.subGroupOptions (
                id INT PRIMARY KEY IDENTITY (1, 1),
                user_id INT NULL,
                username VARCHAR(200) NULL,
                option_name VARCHAR(200) NULL,
                group_id VARCHAR(200) NULL,
                status VARCHAR(10) NOT NULL CHECK (status IN('0', '1')),
                created_at DATETIME2 NULL,
                updated_at DATETIME2 NULL,
            )";
            $createTable = $this->conn->prepare($tableQuery)->execute();
            $insertquery = "INSERT INTO migrationTable (table_name, status) VALUES ('subGroupOptions', '1')";
            // $insert_records = $this->conn->prepare($insertquery)->execute();
            $insert_records = queryDB ( $this->conn, $query, "write");
        }
        return;
    }

    public function createMachinePriorityTable() {
        // $table_exits = DB::getSchemaBuilder()->hasTable('machine_priority');
          $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$this->schema' 
          AND  TABLE_NAME = 'machine_priority'";
        //   $table_exits = $this->conn->query($query)->fetch();
        $insert_records = queryDB ( $this->conn, $query, "read");
        if (empty($table_exits)) {
            $tableQuery = "CREATE TABLE $this->schema.machine_priority (
                id INT PRIMARY KEY IDENTITY (1, 1),
                user_id INT NULL,
                username VARCHAR(200) NULL,
                machines TEXT NULL,
                order VARCHAR(200) NULL,
                limit INT NULL,
 
                created_at DATETIME2 NULL,
                updated_at DATETIME2 NULL,
            )";
            $createTable = $this->conn->prepare($tableQuery)->execute();
            $insertquery = "INSERT INTO migrationTable (table_name, status) VALUES ('machine_priority', '1')";
            // $insert_records = $this->conn->prepare($insertquery)->execute();
            $insert_records = queryDB ( $this->conn, $query, "write");
        }
        return;
    }

    public function createGraphConfigurationTable() {
        // $table_exits = DB::getSchemaBuilder()->hasTable('graph_configurations');
        $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo'
        AND  TABLE_NAME = 'graph_configurations'";
        // $table_exits = $this->conn->query($query)->fetch();
        $table_exits = queryDB ( $this->conn, $query, "read");
        if (empty($table_exits)) {
            $tableQuery = "CREATE TABLE $this->schema.graph_configurations (
                id INT PRIMARY KEY IDENTITY (1, 1),
                anl_ID INT NULL,
                user_id INT NULL,
                username VARCHAR(200) NULL,
                graph_name VARCHAR(200) NULL,
                table_name VA0RCHAR(200) NULL,
                primary_key VARCHAR(200) NULL,
                foreign_key VARCHAR(200) NULL,
                label VARCHAR(200) NULL,
                data VARCHAR(200) NULL,
                type VARCHAR(200) NULL,
                is_open VARCHAR(200) NULL,
                limit VARCHAR(200) NULL,
                status VARCHAR(10) NOT NULL CHECK (status IN('0', '1')),
                created_at DATETIME2 NULL,
                updated_at DATETIME2 NULL,
            )";
            $createTable = $this->conn->prepare($tableQuery)->execute();
            $insertquery = "INSERT INTO migrationTable (table_name, status) VALUES ('graph_configurations', '1')";
            // $insert_records = $this->conn->prepare($insertquery)->execute();
            $insert_records = queryDB ( $this->conn, $query, "write");
        }
        return;
    }

    public function checkMigration($tableName) {
        $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$this->schema' AND  TABLE_NAME = '$tableName'";
        // $table_exits = $this->conn->query($query)->fetch();
        $table_exits = queryDB ( $this->conn, $query, "read");
        if (empty($table_exits)) {
            return false;
        }
        return true;
    }

    public function createTable() {
          $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = dbo 
          AND  TABLE_NAME = 'ProdData_'";
        //   $table_exits = $this->conn->query($query)->fetch();
        $table_exits = queryDB ( $this->conn, $query, "read");
        if (empty($table_exits)) {
            $tableQuery = "CREATE TABLE dbo.ProdData_ (
                mstID INT,
                anl_ID INT NULL,
                nameMSt VARCHAR(50) NULL,
                anlageMst VARCHAR(101) NULL, 
                maschinenID BIGINT NULL,
                maschine CHAR(60) NULL,
                maschinentyp BIGINT NULL,
                zeitstempel DATETIME2(7) NULL,
                auftrag CHAR(60) NULL,
                artikelnummer  VARCHAR(9) NULL,
                werkzeug CHAR(60) NULL,
                sollmenge FLOAT NULL,
                gutmenge FLOAT NULL,
                ausschuss FLOAT NULL,
                nester FLOAT NULL,
                zykluszeit FLOAT NULL,
                fortschrittProzent FLOAT NULL,
                zustandAuftrag INT NULL,
                verbleibendeZeit INT NULL,
            )";
            $createTable = $this->conn->prepare($tableQuery)->execute();
        }
        return;
    }
}
$obj = new MigrationController();

