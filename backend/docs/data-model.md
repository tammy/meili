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
Messages: List<Message UUID>

### Conversation Item
ID: UUID
Owner: User UUID

### Message: Conversation Item
Content: String

### Poll: Conversation Item
Question: String
Options: List<String>
Answers: List<Int>


## Tables
- User
- Card
- Thread
- Messages
