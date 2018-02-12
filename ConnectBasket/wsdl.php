<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include 'config.php';//make the cofig file include
global $details;//make the connection vars global


$data = json_decode( file_get_contents('php://input') );
 
if($data->method == "check_login")
{
	$username = $_POST['username'];
	$password = $_POST['password'];
	$hashpass = password_hash($password, PASSWORD_DEFAULT);
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	
	$stmt = $conn->prepare('SELECT Count(UsersTableID) FROM Users WHERE Username=? and Password=?');
	$stmt->bind_param('ss', $username,$hashpass); 


	$stmt->execute();

	$result = $stmt->get_result();
	if (mysql_num_rows($result) > 0)
	{
		$success = true;
	}
	else
	{
		$success = false;
	}
	//while ($row = $result->fetch_assoc()) {
		// do something with $row
	//}

	$jsonData=array();
	$jsonData['success']=$success;
 
	$conn->close();
	echo json_encode($jsonData);
 
}


else if($data->method == "create_user")
{
	/*$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$username = $_POST['username'];
	$password = $_POST['password'];
	$email = $_POST['email'];*/
	$firstname = $data->firstname;
	$lastname = $data->lastname;
	$username = $data->username;
	$password = $data->password;
	$email = $data->email;
	$hashpass = password_hash($password, PASSWORD_DEFAULT);
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		header("Location: http://www.google.com");
	}
	$stmt = $conn->prepare('Insert Into Users(Username, LastName, FirstName, Password, Email) Values(?,?,?,?,?)');
	$stmt->bind_param('sssss', $username,$firstname,$lastname,$hashpass,$email); 

	$stmt->execute();
	
	$stmt = $conn->prepare('SELECT Count(UsersTableID) FROM Users WHERE Username=? and Password=?');
	$stmt->bind_param('ss', $username,$hashpass); 


	$stmt->execute();

	$result = $stmt->get_result();
	if (mysql_num_rows($result) > 0)
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