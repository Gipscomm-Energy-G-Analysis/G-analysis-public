<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

class DBConnection

/**
 * define database connections for the application
 * @param $host
 * @param $dbName
 * @param $userName
 * @param $userPass
 * @return PDO
 */

{
    /** Define constants for write operations */

    const DB_HOST                       = 'sql_gc.managee.de';
    const DB_DATABASE                   = 'gipscomm';
    const DB_USERNAME                   = 'gipscomm';
    const DB_PASSWORD                   = 'yXFdFioIzNoGFwaQeGHo';

    public $conn;

    public function __construct(string $nameDB)
    {
        try {
            $this->conn = $this->dbConnection(self::DB_HOST, $nameDB, self::DB_USERNAME, self::DB_PASSWORD);
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e;
        }
    }

    private function dbConnection(string $host, string $nameDB, string $username, string $password): PDO
    {
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => true,
        ];

        $dbh = new PDO('sqlsrv:Server=' . $host . ';Database=' . $nameDB . ';', $username, $password, $options);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $dbh;
    }
}

function connectToDB(string $nameDB): PDO
{
    return (new DBConnection($nameDB))->conn;
}

function queryDB(PDO $conn, string | array $sqlQueries, string $mode): array
{
    switch (gettype($sqlQueries)) {
        case 'string':
            $prepVal = execQuery($conn, $sqlQueries, $mode);
            $retVal = !$prepVal ?
                ['error' => 'queryDB : Invalid query string !! -> ' . $sqlQueries] :
                $prepVal;
            break;

        case 'array':
            $retArr = array();
            foreach ($sqlQueries as $query) {
                $retArr[] = execQuery($conn, $query, $mode);
            }
            $retVal = in_array(false, $retArr) ? ['error' => 'queryDB : Queries are not all executable  !!'] : $retArr;
            break;

        default:
            $retVal = ['error' => 'The datatype of the passed SQL-query is invalid!'
                . '\n\nSQL query was passed as ' . gettype($sqlQueries)
                . '\n\nThe expected datatype is either a string'
                . '\n(one query) or an array (multiple queries)!'];
            break;
    }

    return $retVal;
}

function execQuery(PDO $conn_, string $query_, string $mode_): array
{
    $retVal = array();

    $stmt = $conn_->prepare($query_);
    $stmt->execute();

    if ($mode_ === 'read') {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // echo "<pre>";
        // print_r($result);
        // print_r($query_);
        $retVal = !$result ? ['error' => 'execQuery : No data could be read !'] : $result;

        $stmt->closeCursor();
    } else {
        $retVal = !$stmt ? ['error' => 'execQuery : No data could be inserted or updated !'] : ["query" => $query_];

        $stmt->closeCursor();
    }

    return $retVal;
}

function closeDbConn(PDO $conn): void
{
    unset($conn);
}
