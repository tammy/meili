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

@test "[TRIP] Can create" {
    run curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 012a91cc-2873-48ea-cb5e-aa429bdac839" -d 'trip={   "owner": "a1d2753b-2964-4944-ab03-e6e5c2d6e336"%2C     "name": "New Trip"%2C     "description": "Zzzz" }' "http://localhost:3333/api/v1/trips"
    [[ $output =~ "New Trip" ]]
}

@test "[TRIP] Can update" {
    run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 5e7ccc67-     6798-6561-3076-4db152914904" "http://localhost:3333/api/v1/trips" | jq -c '.[] | select(.name | contains("New Trip"))' | jq .id
    run curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: bd751cec-41a6-c6c0-c91f-d431cbfef1a0" -d 'trip={   "owner": "a1d2753b-2964-4944-ab03-e6e5c2d6e336"%2C     "name": "New Trip UPDATED"%2C     "description": "Zzzz" }' "http://localhost:3333/api/v1/trips/20365975-41dd-4100-9a49-297601ba2d0b"
    run curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -H "Postman-Token: 6fb33f29-697f-8d5a-ac52-b40f1d89b005" "http://localhost:3333/api/v1/trips"
    echo $output > out
    [[ $output =~ "New Trip UPDATED" ]]
}

@test "[TRIP] Can delete" {
    #TODO: Test me
}

