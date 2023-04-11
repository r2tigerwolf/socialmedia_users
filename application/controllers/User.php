<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//session_start();

class User extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */
	public function index()
	{
		$this->load->view('user_info');
	}

	public function user_info()
	{
		$data['h'] = "";
		//if(isset($_SESSION["login"]) && $_SESSION["login"] == 1) {
			//load the database  
			$this->load->database();  
			//load the model  
			$this->load->model('Userdb');  
			//load the method of model  
			$data['h']=$this->Userdb->select();  							
			//return the data in view  
		//}
		$this->load->helper('url');
		$this->load->view('user_info', $data);  
	}

	public function user_load() 
	{
		$data['h'] = "";

		//if(isset($_SESSION["login"]) && $_SESSION["login"] == 1) {
			$this->load->database();  
			$this->load->model('Userdb');  
			$data['h']=$this->Userdb->select();  	
		//}
		$this->load->helper('url');
		$this->load->view('user_load', $data);  
   }

   public function user_record() 
	{
		$data['h'] = "";		
		$this->load->database();  
		$this->load->model('Userdb');  
		echo $this->Userdb->recordnumber();
		//$data['h'] = $this->Userdb->recordnumber();  			
		//$this->load->helper('url');
		//$this->load->view('user_load', $data);  
   }

   public function user_update()
   {
		$userid = $this->input->post('userid');
		$status = $this->input->post('status');

		// For Fetch Ajax
		$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
		if ($contentType === "application/json") {
			//Receive the RAW post data.
			$statusjson = file_get_contents("php://input");
			$statusjson = json_decode($statusjson);
			$userid = $statusjson->statusid;
			$status = $statusjson->status;
		}

		$data = array (
		  'userid' => $userid,
		  'status' => $status
		);

		//load the database  
		$this->load->database();  
		//load the model  
		$this->load->model('Userdb');  
		//load the method of model   
		if($this->Userdb->update_user_status($data) === TRUE) {
			echo json_encode(array("update_status"=>"success", "userid"=>$userid, "status"=>$status));
		} else {
			echo json_encode(array("update_status"=>"error", "userid"=>$userid, "status"=>$status));
		}
   }

   public function flag_update()
   {
		$flagid = $this->input->post('flagid');
		$flag = $this->input->post('flag');

		// For Fetch Ajax
		$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
		if ($contentType === "application/json") {
			//Receive the RAW post data.
			$flagjson = file_get_contents("php://input");
			$flagjson = json_decode($flagjson);
			$flagid = $flagjson->flagid;
			$flag = $flagjson->flag;
		}

		$data = array (
		  'flagid' => $flagid,
		  'flag' => $flag
		);

		//load the database  
		$this->load->database();  
		//load the model  
		$this->load->model('Userdb');  
		//load the method of model   
		if($this->Userdb->update_comment_flag($data) === TRUE) {
			echo json_encode(array("update_status"=>"success", "flagid"=>$flagid, "status"=>$flag));
		} else {
			echo json_encode(array("update_status"=>"error", "flagid"=>$flagid, "status"=>$flag));
		}
   }

   public function user_field_update()
   {
		$userid = $this->input->post('userid');
		$fieldname = $this->input->post('fieldname');
		$value = $this->input->post('value');

		// For Fetch Ajax
		$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
		if ($contentType === "application/json") {
			//Receive the RAW post data.
			$userjson = file_get_contents("php://input");
			$userjson = json_decode($userjson);
			$userid = $userjson->userid;
			$fieldname = $userjson->fieldname;
			$value = $userjson->value;
		}

		$data = array (
		  'userid' => $userid,
		  'fieldname' => $fieldname,
		  'value' => $value
		);

		//load the database  
		$this->load->database();  
		//load the model  
		$this->load->model('Userdb');  
		//load the method of model   
		if($this->Userdb->update_user_field($data) === TRUE) {
			echo json_encode(array("update_status"=>"success", "userid"=>$userid, "status"=>"test status"));
		} else {
			echo json_encode(array("update_status"=>"error", "userid"=>$flagid, "status"=>"test status"));
		}
   }

   public function user_login()
   {
		$salt = 'aUJGgadjasdgdj';
		$password_text = "";
		$password_text = $this->input->post('password_entered');
		
		// For Fetch Ajax
		$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
		if ($contentType === "application/json") {
			//Receive the RAW post data.
			$password_text = file_get_contents("php://input");
			$password_text = json_decode($password_text);
			$password_text = $password_text->password_entered;
		}

		$password_hashed = $this->hash($password_text);
		
		$password_data = array (
			'password_entered' => $password_hashed,
		);
		//load the database  
		$this->load->database();  
		//load the model  
		$this->load->model('Userdb');  
		//$password_hashed = $this->input->post('password');
		
		$data['p']=$this->Userdb->selectpassword($password_data); 
		
		$this->load->view('user_login', $data);  

		echo json_encode(array("loginstatus"=>$password_hashed));
   }
     
   public function hash($password) {
		$salt = 'aUJGgadjasdgdj';
		return sha1($salt . $password);
	}

	public function user_logout()
	{
		//$_SESSION["login"] = false;
		echo json_encode(array("loginstatus"=>"logout"));
		//session_destroy();
	}
}