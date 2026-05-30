<?php

require_once 'AppController.php';
require_once __DIR__.'/../repositories/UsersRepository.php';

class UsersController extends AppController {

    public function search() {
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

         if ($contentType === "application/json") {
            $userRepository = new UsersRepository();
            $input = json_decode(file_get_contents("php://input"), true);
            $searchTerm = $input["search"] ?? '';

            $results = $userRepository->searchUsers($searchTerm);

            header('Content-type: application/json');
            http_response_code(200);

            echo json_encode($results);
            return;

         } else {
             http_response_code(400);
             echo json_encode(["error" => "Content type must be application/json"]);
             return;
         }

        
        http_response_code(404);
    }
}
