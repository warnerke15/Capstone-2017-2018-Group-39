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
	
	$stmt = $conn->prepare('SELECT Username, FirstName, LastName, EmailAddress, ReceiveEmails, Password FROM Users WHERE Username=?');
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
				$Notifications = $row['ReceiveEmails'];
				$success = true;
								
			}
		}
	}
	else
	{
		$success = false;
	}
	
	$stmt->close();
	
	/*if ($success)
	{
		$stmt = $conn->prepare('Call addLogMessage(?, ?, 1)');
		$stmt->bind_param('ss', $Message, $User); 

		$Message = $User . ' logged in';
		$stmt->execute();
		
		$stmt->close();
	}*/

	$jsonData=array();
	$jsonData['success']=$success;
	$jsonData['first']=$FirstName;
	$jsonData['last']=$LastName;
	$jsonData['username']=$User;
	$jsonData['email']=$Email;
	$jsonData['notifications']=$Notifications;
	
	$_SESSION['authenticated'] = $success;
	$_SESSION['firstname'] = $FirstName;
	$_SESSION['lastname'] = $LastName;
	$_SESSION['email'] = $Email;
	$_SESSION['username'] = $User;
	$_SESSION['notifications'] = $Notifications;
	
 
	$conn->close();
	echo json_encode($jsonData);
 
}

else if($data->method == "check_auth")
{	
	
	$jsonData=array();
	if (isset($_SESSION['authenticated']))
	{
		$jsonData['authenticated']=$_SESSION['authenticated'];
		$jsonData['firstname']=$_SESSION['firstname'];
		$jsonData['lastname']=$_SESSION['lastname'];
		$jsonData['username']=$_SESSION['username'];
		$jsonData['email']=$_SESSION['email'];
		$jsonData['notifications']=$_SESSION['notifications'];
	}
	else
	{
		$jsonData['authenticated']=false;
		$jsonData['firstname']="";
		$jsonData['lastname']="";
		$jsonData['username']="";
		$jsonData['email']="";
		$jsonData['notifications']=$_SESSION['notifications'];
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
		
		$stmt = $conn->prepare('Call addLogMessage(?, ?, 2)');
		$stmt->bind_param('ss', $Message, $User); 

		$User = $_SESSION['username'];
		$Message = $username . ' was created';
		$stmt->execute();
		
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

else if($data->method == "change_status")
{
	$status = $data->status;
	// $id = $data->id;

	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	$stmt = $conn->prepare('UPDATE Messages SET Status=? WHERE MessagesTableID=1');
	$stmt->bind_param('s', $status); 
	// $stmt->bind_param('ss', $status,$id); 

	$stmt->execute();
	
	// $stmt = $conn->prepare('Select Count(MessagesTableID) WHERE Status="?" and MessagesTableID=?');
	// $stmt->bind_param('ss', $status,$id); 

	// $stmt->execute();
	// $result = $stmt->get_result();
	// if ($result->num_rows > 0)
	// {
		$success = $conn->error;
	// }
	// else
	// {
		// $success = false;
	// }

	$jsonData=array();
	$jsonData['success']=$success;
 
	$conn->close();
	echo json_encode($jsonData);
 
}




else if($data->method == "edit_profile")
{
	$username = $_SESSION['username'];
	$email = $data->email;
	$notifications = $data->notifications;
	$groups = explode("|",$data->groups);
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	$stmt = $conn->prepare('Call updateUserInfo(?,?,?)');
	$stmt->bind_param('sss', $email, $notifications, $username); 

	$stmt->execute();	
	
	$stmt = $conn->prepare('Call addLogMessage(?, ?, 6)');
	$stmt->bind_param('ss', $Message, $username); 

	$Message = 'Updated profile. EmailAddress now: ' . $email . ', ReceiveEmails now: ' . $notifications;
	$stmt->execute();
	
	$stmt = $conn->prepare('Call removeUserGroups(?)');
	$stmt->bind_param('s', $username); 

	$stmt->execute();	
	
	foreach ($groups as $g)
	{
		$stmt = $conn->prepare('Call addUserToGroup(?,?)');
		$stmt->bind_param('ss', $g, $username); 

		$stmt->execute();
		
		$stmt = $conn->prepare('Call addLogMessage(?, ?, 6)');
		$stmt->bind_param('ss', $Message, $username); 

		$Message = 'User was added to group: ' . $g;
		$stmt->execute();
	}	
	
	$success = true;
	
	$jsonData=array();
	$jsonData['success']=$success;
 
	$conn->close();
	echo json_encode($jsonData);
 
}

else if($data->method == "create_owner")
{
	$firstname = $data->firstname;
	$lastname = $data->lastname;
	$address = $data->address;
	$city = $data->city;
	$state = $data->state;
	$zipcode = $data->zipcode;
	$phone = $data->phone;
	$email = $data->email;
	
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	$stmt = $conn->prepare('Insert Into Owners(FirstName, LastName, Address, City, State, ZipCode, PhoneNumber, EmailAddress) Values(?,?,?,?,?,?,?,?)');
	$stmt->bind_param('ssssssss', $firstname,$lastname,$address,$city,$state,$zipcode,$phone,$email); 

	$stmt->execute();
	
	$stmt = $conn->prepare('SELECT Count(OwnersTableID) FROM Owners WHERE FirstName=? and LastName=?');
	$stmt->bind_param('ss', $firstname,$lastname); 


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

else if($data->method == "create_pet")
{
	$name = $data->name;
	$age = $data->age;
	$species = $data->species;
	$breed = $data->breed;
	$color = $data->color;
	
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	$stmt = $conn->prepare('Insert Into Pets(Name, Age, Species, Breed, Color) Values(?,?,?,?,?)');
	$stmt->bind_param('sssss', $name,$age,$species,$breed,$color); 

	$stmt->execute();
	
	$stmt = $conn->prepare('SELECT Count(PetsTableID) FROM Pets WHERE Name=? and Age=?');
	$stmt->bind_param('ss', $name,$age); 


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

else if($data->method == "create_message")
{
	$username = $_SESSION['username'];
	$caseNumber = $data->caseNumber;
	$patientName = $data->patientName;
	$ownerName = $data->ownerName;
	$category = $data->category;
	$body = $data->body;
	$recipient = $data->recipient;
	$contactMethod = $data->contactMethod;
	$urgency = $data->urgency;
	
	header('Location: https://www.google.com');
	
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	$stmt = $conn->prepare('call addMessage(?,?,?,?,?,?,?,?');
	$stmt->bind_param('ssssssss', $caseNumber,$patientName,$ownerName,$category,$body,$recipient,$contactMethod,$urgency); 
	
	$stmt->execute();
	
	
	
	$stmt = $conn->prepare('Call addLogMessage(?, ?, 3)');
	$stmt->bind_param('ss', $Message, $username); 

	$Message = 'New message created. Sent to: ' . $recipient ;
	$stmt->execute();
		
	$success = true;
	
	$jsonData=array();
	$jsonData['success']=$success;
 
	$conn->close();
	echo json_encode($jsonData);
 
}

else if($data->method == "get_messages")
{
	$username = $_SESSION['username'];
	
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	
	$stmt = $conn->prepare('Call getMessagesForUser(?)');
	$stmt->bind_param('s', $username);
	
	$stmt->execute();

	
    $arr = array();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) 
	{
		$arr[] = array( 'CreateDate' => $row['CreateDate'], 'CreatedBy' => $row['CreatedBy'], 'Subject' => $row['Subject']);
	}

	$conn->close();
	echo json_encode(array('messages' => $arr)); 
}

else if($data->method == "get_groups")
{
	
	$username = $_SESSION['username'];
	
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	
	$stmt = $conn->prepare('CALL getUserGroups(?)');
	$stmt->bind_param('s', $username); 
	
	$stmt->execute();

	
    $arr = array();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) 
	{
		$arr[] = array( 'Group' => $row['GroupName'], 'Member' => $row['Member']);
	}

	$conn->close();
	echo json_encode(array('groups' => $arr)); 
}

else if($data->method == "get_categories")
{
	
	$username = $_SESSION['username'];
	
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	
	$stmt = $conn->prepare('CALL getCategories()');
	
	$stmt->execute();

	
    $arr = array();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) 
	{
		$arr[] = array( 'Category' => $row['CategoryName']);
	}

	$conn->close();
	echo json_encode(array('categories' => $arr)); 
}

else if($data->method == "get_logs")
{
	
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	
	$stmt = $conn->prepare('SELECT LogMessage, Username, DBCreateDate FROM LogMessages Order By DBCreateDate desc');

	$stmt->execute();

	
    $arr = array();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) 
	{
		$arr[] = array( 'LogMessage' => $row['LogMessage'], 'User' => $row['Username'], 'CreateDate' => $row['DBCreateDate']);
	}

	$conn->close();
	echo json_encode(array('logs' => $arr)); 
}

else if($data->method == "add_note")
{
	
	$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);	
	if ($conn->connect_error)
	{
		die("Connection failed: " . $conn->connect_error);
	}
	
	$stmt = $conn->prepare('SELECT Body FROM Messages');

	$stmt->execute();

	$result = $stmt->get_result();

	$jsonData=array();
	$jsonData['messages']=$result;
 
	$conn->close();
	echo json_encode($jsonData);
 
}
?>