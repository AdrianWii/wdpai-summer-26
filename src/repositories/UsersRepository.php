<?php

require_once 'Repository.php';

class UsersRepository extends Repository {

    public function getUsers(): ?array 
    {
        $query = $this->database->connect()->prepare(
            "
            SELECT * FROM users;
            "
        );
        $query->execute();

        $users = $query->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

  public function getUserByEmail(string $email) {
        $query = $this->database->connect()->prepare(
            "
            SELECT * FROM users WHERE email = :email
            "
        );
        $query->bindParam(':email', $email);
        $query->execute();

        $user = $query->fetch(PDO::FETCH_ASSOC);
        return $user;
    }

    public function createUser(
        string $username,
        string $email,
        string $hashedPassword,
        string $fullName
    ) {
        $query = $this->database->connect()->prepare(
            "
            INSERT INTO users (username, email, full_name, password, is_active)
            VALUES (?, ?, ?, ?, true);
            "
        );
        $query->execute([
            $username,
            $email,
            $fullName,
            $hashedPassword
        ]);
    }
}
