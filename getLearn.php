<?php
    include('connection.php');

    $query = "SELECT * FROM questions
        WHERE ID IN (
            SELECT MIN(ID) FROM questions 
            GROUP BY CORRECT_ANSWER
        ) 
        ORDER BY RAND()
        LIMIT 4";
    $result = $conn->query($query);

    $countries = [];
    while ($row = $result->fetch_assoc()) {
        $qtn[] = $row;
    }

    $choicesJSON = json_encode($qtn);

    echo $choicesJSON;
?>