<?php
    // system/application/models/user.php

    class Userdb extends CI_Model {

            function __construct()
            {
                // Call the Model constructor
                parent::__construct();
            }

            public function select() {          
                /*
select distinct user_info.*, user_comments.user_id, user_comments.comments, user_comments.flag, user_country.country_name
FROM user_info
LEFT JOIN user_comments
ON user_info.id = user_comments.user_id
LEFT JOIN user_country 
on user_info.country_code = user_country.country_code  
ORDER BY `user_info`.`id` ASC;
                */
                $this->db->from('users_view');                  
                $this->db->limit(50);
                //$this->db->join('users', 'users_info.users_info_id = users.user_id');
                $query = $this->db->get();
                return $query;        
            }    

            public function recordnumber() {   
                $this->db->select('id');       
                $this->db->from('user_info');                  
                $this->db->limit(50);
                $query = $this->db->get();                
                return $query->num_rows();        
            }  

            public function selectpassword($password_data) {         
                //var_dump($password_data);
                $this->db->select('password');    
                $this->db->from('admin');     
                $this->db->where('password', $password_data["password_entered"]);             
                $query = $this->db->get();
                return $query;        
            }    

            public function update_user_status($data) {
                $this->db->set('enabled',$data['status'])
                ->where('id',$data['userid'])
                ->update('user_info');
                $this->db->trans_complete();
                // was there any update or error?
                if ($this->db->affected_rows() == '1') {
                    return TRUE;
                } else {
                    // any trans error?
                    if ($this->db->trans_status() === FALSE) {
                        return false;
                    }
                    return true;
                }
            }
            public function update_user_field($data) {
                $this->db->set($data['fieldname'], strip_tags($data['value']))
                ->where('id', $data['userid'])
                ->update('user_info');
                $this->db->trans_complete();
                // was there any update or error?
                if ($this->db->affected_rows() == '1') {
                    return TRUE;
                } else {
                    // any trans error?
                    if ($this->db->trans_status() === FALSE) {
                        return false;
                    }
                    return true;
                }
            }

            public function update_comment_flag($data) {
                $this->db->set('flag',$data['flag'])
                ->where('user_id',$data['flagid'])
                ->update('user_comments');
                $this->db->trans_complete();
                // was there any update or error?
                if ($this->db->affected_rows() == '1') {
                    return TRUE;
                } else {
                    // any trans error?
                    if ($this->db->trans_status() === FALSE) {
                        return false;
                    }
                    return true;
                }
            }

    }
?>