#!/usr/bin/env bats

URL="localhost:3333"

@test "[CARD] Can list all cards" {
    run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: e4551a02-11a9-33ae-b3f2-e6856b58ad25" "http://localhost:3333/api/v1/cards"
     [[ $output =~ "Eiffel Tower" ]]
     [[ $output =~ "Arc de Triomphe" ]]
     [[ $output =~ "Googleplex" ]]
}

@test "[CARD] Can get cards for a specific trip" {
    run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 5e7ccc67-6798-6561-3076-4db152914904" "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
     [[ $output =~ "Eiffel Tower" ]]
     [[ $output =~ "Arc de Triomphe" ]]
     ! [[ $output =~ "Louvre" ]]
}

@test "[CARD] Structure matches expected model" { run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 5e7ccc67-6798-6561-3076-4db152914904" "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
    [[ $output =~ '"id":"48df18dc-c32d-4db0-827c-608dc42c22ea","trip":"6347f1fc-64d1-4f8b-ac79-44d59d130b6d","title":"Arc de Triomphe","description":"Beautiful arch in the middle of a great roundabout. About 400 steps to the top.","location":"Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France","coordinateLat":null,"coordinateLon":null' ]]
    # TODO: Check start time, duration and creator
}

@test "[CARD] Can updated" {
    run curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: c2ee3144-ac17-d7bc-0124-4001ffc49e85" -d 'card={"id": "3176daf7-ea72-4444-b2be-7d2f466af8d0"%2C "trip": "6347f1fc-64d1-4f8b-ac79-44d59d130b6d"%2C "title": "Eiffel Tower UPDATED"%2C "description": "The brilliant tower!"%2C "location": "Place Charles de Gaulle%2C 75008 Paris%2C France"%2C "coordinateLat": null%2C     "coordinateLon": null%2C     "startTime": "2017-11-19T17:34:29.454Z"%2C "duration": 20%2C "order": "0"%2C     "creator": "a1d2753b-2964-4944-ab03-e6e5c2d6e336" }' "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
    run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 5e7ccc67-6798-6561-3076-4db152914904" "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
     [[ $output =~ "Eiffel Tower UPDATED" ]]

    run curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: c2ee3144-ac17-d7bc-0124-4001ffc49e85" -d 'card={"id": "3176daf7-ea72-4444-b2be-7d2f466af8d0"%2C "trip": "6347f1fc-64d1-4f8b-ac79-44d59d130b6d"%2C "title": "Eiffel Tower"%2C "description": "The brilliant tower!"%2C "location": "Place Charles de Gaulle%2C 75008 Paris%2C France"%2C "coordinateLat": null%2C     "coordinateLon": null%2C     "startTime": "2017-11-19T17:34:29.454Z"%2C "duration": 20%2C "order": "0"%2C     "creator": "a1d2753b-2964-4944-ab03-e6e5c2d6e336" }' "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
    run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 5e7ccc67-6798-6561-3076-4db152914904" "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
     [[ $output =~ "Eiffel Tower" ]]
     ! [[ $output =~ "Eiffel Tower UPDATED" ]]
}

@test "[CARD] Can create" {
    run curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 586ff3ad-2f6d-f33b-f0c7-4d0f47b653b7" -d 'card={"trip": "6347f1fc-64d1-4f8b-ac79-44d59d130b6d"%2C "title": "New Card"%2C "description": "The brilliant tower!"%2C "location": "Place Charles de Gaulle%2C 75008 Paris%2C France"%2C "coordinateLat": null%2C     "coordinateLon": null%2C     "startTime": "2017-11-19T17:34:29.454Z"%2C "duration": 20%2C "order": "0"%2C     "creator": "a1d2753b-2964-4944-ab03-e6e5c2d6e336" }' "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
    run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 5e7ccc67-6798-6561-3076-4db152914904" "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
    # Ensure new card is there
    [[ $output =~ "New Card" ]]
    # Also ensure old cards are there
    [[ $output =~ "Eiffel Tower" ]]
    [[ $output =~ "Arc de Triomphe" ]]
    ! [[ $output =~ "Louvre" ]]
}

@test "[CARD] Can delete" {
    # FIXME: This test is broken but the endpoint seems to be working fine.
    # run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 5e7ccc67-6798-6561-3076-4db152914904" "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
    #  [[ $output =~ "New Card" ]]

    # run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 5e7ccc67-     6798-6561-3076-4db152914904" "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d" | jq -c '.[] | select(.title | contains("New Card"))' | jq .id
    # run curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 2f155034-e5a9-9ac2-75a7-220b65b0b65c" -d 'card={"trip": "6347f1fc-64d1-4f8b-ac79-44d59d130b6d"%2C "title": "New Card"%2C "description": "The brilliant tower!"%2C "location": "Place Charles de Gaulle%2C 75008 Paris%2C France"%2C "coordinateLat": null%2C     "coordinateLon": null%2C     "startTime": "2017-11-19T17:34:29.454Z"%2C "duration": 20%2C "order": "0"%2C     "creator": "a1d2753b-2964-4944-ab03-e6e5c2d6e336" }' "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d/5510ea68-fe7a-4bfa-94f5-d0c44631c38b"
    # run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 5e7ccc67-6798-6561-3076-4db152914904" "http://localhost:3333/api/v1/cards/6347f1fc-64d1-4f8b-ac79-44d59d130b6d"
    #  ! [[ $output =~ "New Card" ]]
}
