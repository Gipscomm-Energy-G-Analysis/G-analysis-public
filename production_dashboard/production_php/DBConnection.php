<?php

class DBConnection
{
    /** Define constants for write operations */

	// const DB_HOST               		= '10.30.68.157';
	const DB_HOST               		= "sql_gc.managee.de";
    const DB_DATABASE           		= 'g008_gipshold';
    const DB_USERNAME           		= 'gipscomm';
    const DB_PASSWORD           		= 'yXFdFioIzNoGFwaQeGHo';
    const DB_PORT               		= '3306';

    /** local DB Connections */
    // const DB_HOST               		= "RUGBYHDB.seasia.in";
    // const DB_DATABASE           		= 'g002_badber';
    // const DB_USERNAME           		= 'g-analysis';
    // const DB_PASSWORD           		= 'ZWFwcC5pbzAOBg';
    // const DB_PORT               		= '3306';

    public $conn;
    public $companyConnection;

    public function __construct($db_name)
    {
        try {
            $this->conn = $this->dbConnection(self::DB_HOST, $db_name, self::DB_USERNAME, self::DB_PASSWORD,self::DB_PORT);
        } catch(PDOException $e) {
            echo "Connection failed: " . $e;
        }
    }

    /**
     * define database connections for the application
     * @param $host
     * @param $dbName
     * @param $userName
     * @param $userPass
     * @return PDO
     */
    private function dbConnection($host, $dbName, $userName, $userPass,$port)
    {
        // $host = Self::CLIENT_DB_HOST;
        //     $port = Self::CLIENT_DB_PORT;
        $charset = 'utf8mb4';
        $opt = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => true,
        ];
        
        $dbh = new PDO("sqlsrv:Server=$host;Database=$dbName", $userName, $userPass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        // $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
		return $dbh;
    }
}
