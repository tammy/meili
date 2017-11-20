#!/usr/bin/env bats

URL="localhost:3333"

@test "[TRIP] Can get all trips" {
    run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 6fb33f29-697f-8d5a-ac52-b40f1d89b005" "http://localhost:3333/api/v1/trips"
    [[ $output =~ 'South Bay Vacay' ]]
}

@test "[TRIP] Can get a specific trip" {
    run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 3538740c-7f9c-d53c-5375-98dc620d801e" "http://localhost:3333/api/v1/trips/0049afbc-24fc-457d-8aa8-905c24dda41d"
    [[ $output =~ '"id":"0049afbc-24fc-457d-8aa8-905c24dda41d","owner":"a1d2753b-2964-4944-ab03-e6e5c2d6e336","name":"South Bay Vacay","description":"Zzzz"' ]]
}

@test "[TRIP] Can update" {
}

@test "[TRIP] Can create" {
}

@test "[TRIP] Can delete" {
}

