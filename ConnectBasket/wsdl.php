<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include 'config.php';//make the cofig file include
global $details;//make the connection vars global


$data = json_decode( file_get_contents('php://input') );
 
if($data->method == "check_login")
{	
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	
	$stmt = $conn->prepare('SELECT Username, FirstName, LastName, EmailAddress, Password FROM Users WHERE Username=?');
	$stmt->bind_param('s', $username); 
	
	$username = $data->username;
	$password = $data->password;
	$hashpass = password_hash($password, PASSWORD_DEFAULT);

	$stmt->execute();

	$result = $stmt->get_result();
	if ($result->num_rows == 1)
	{
		while ($row = $result->fetch_assoc()) {
			if(password_verify($password, $row['Password']))
			{
				$User = $row['Username'];
				$FirstName = $row["FirstName"];
				$LastName = $row['LastName'];
				$Email = $row['EmailAddress'];
				$success = true;
			}
		}
	}
	else
	{
		$success = false;
	}
	

	$jsonData=array();
	$jsonData['success']=$success;
	$jsonData['first']=$FirstName;
	$jsonData['last']=$LastName;
	$jsonData['username']=$User;
	$jsonData['email']=$Email;
	
	$_SESSION['authenticated'] = true;
	$_SESSION['firstname'] = $FirstName;
	$_SESSION['lastname'] = $LastName;
	$_SESSION['email'] = $Email;
	$_SESSION['username'] = $User;
	
 
	$conn->close();
	echo json_encode($jsonData);
 
}

else if($data->method == "check_auth")
{	
	
	$jsonData=array();
	if ($_SESSION['authenticated'])
	{
		$jsonData['authenticated']=$_SESSION['authenticated'];
		$jsonData['firstname']=$_SESSION['firstname'];
		$jsonData['lastname']=$_SESSION['lastname'];
		$jsonData['username']=$_SESSION['username'];
		$jsonData['email']=$_SESSION['email'];
	}
	else
	{
		$jsonData['authenticated']=false;
		$jsonData['firstname']=$_SESSION['firstname'];
		$jsonData['lastname']=$_SESSION['lastname'];
		$jsonData['username']=$_SESSION['username'];
		$jsonData['email']=$_SESSION['email'];
	}	
	
 	echo json_encode($jsonData);
 
}

else if($data->method == "logout")
{	
	// remove all session variables
	session_unset(); 

	// destroy the session 
	session_destroy(); 
	
}

else if($data->method == "create_user")
{
	$firstname = $data->firstname;
	$lastname = $data->lastname;
	$username = $data->username;
	$password = $data->password;
	$email = $data->email;
	$hashpass = password_hash($password, PASSWORD_DEFAULT);
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	$stmt = $conn->prepare('Insert Into Users(Username, LastName, FirstName, Password, EmailAddress) Values(?,?,?,?,?)');
	$stmt->bind_param('sssss', $username,$lastname,$firstname,$hashpass,$email); 

	$stmt->execute();
	
	$stmt = $conn->prepare('SELECT Count(UsersTableID) FROM Users WHERE Username=? and Password=?');
	$stmt->bind_param('ss', $username,$hashpass); 


	$stmt->execute();

	$result = $stmt->get_result();
	if ($result->num_rows > 0)
	{
		$success = true;
	}
	else
	{
		$success = false;
	}

	$jsonData=array();
	$jsonData['success']=$success;
 
	$conn->close();
	echo json_encode($jsonData);
 
}
?>