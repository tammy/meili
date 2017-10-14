# Meili Data Model

Data types available: https://www.cockroachlabs.com/docs/stable/data-types.html

## Objects
### User
ID: UUID
Name: String
Email: String
Profile Picture: String?

### Card
ID: UUID
Title: String?
Location: String?
Coordinates: (Decimal, Decimal)?
Start time: Timestamp?
Duration: Interval?
Description: String?
Votes: (Int, Int)?
Creator: User UUID

### Thread
ID: String
Resolved: Boolean
Start Message: Conversation Item UUID
Messages: List<Message UUID>?

### Conversation Item
ID: UUID
Owner: User UUID
Content: String

### Message: Conversation Item

### Poll: Conversation Item
Options: List<String>
Answers: List<Int>


## Tables
- User
    - Columns are properties above
- Card
    - Columns are properties above
- Thread
    - Columns are properties above
- Messages
    - Columns: 
        ID: UUID
        Owner: User UUID
        Question: String
        Type: Enum [MESSAGE | POLL]
        Options: List<String>?
        Answers: List<Int>?
        Content: String?
