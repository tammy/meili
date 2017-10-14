# Meili Data Model

Data types available: https://www.cockroachlabs.com/docs/stable/data-types.html

## Objects and Tables
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
Creator: User UUID

### Thread
ID: String
Resolved: Boolean
Topic: String
Poll: String?
Options: List<String>?
Answers: List<Int>?
Replies: List<Message UUID>?

### Message
ID: UUID
Owner: User UUID
Content: String
