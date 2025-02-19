## Architecture
```
    cassino-game
    │── src
    │   ├── main
    │   │   ├── java/com/cassino/Cassino_Game
    │   │   │   ├── controller
    │   │   │   │   ├── GameController.java
    │   │   │   │   ├── PlayerController.java
    │   │   │   ├── service
    │   │   │   │   ├── GameService.java
    │   │   │   │   ├── PlayerService.java
    │   │   │   ├── model
    │   │   │   │   ├── Card.java
    │   │   │   │   ├── Player.java
    │   │   │   │   ├── Game.java
    │   │   │   ├── repository
    │   │   │   │   ├── GameRepository.java
    │   │   │   │   ├── PlayerRepository.java
    │   │   │   ├── websocket
    │   │   │   │   ├── WebSocketConfig.java
    │   │   │   │   ├── GameSessionHandler.java
    │   ├── resources
    │   │   ├── application.properties
    │── pom.xml
    │── README.md
```




# Cassino Card Game (Spring Boot)

## Overview
Cassino is a classic fishing-style card game. 
This project is a Java-based implementation using **Spring Boot** for the backend, 
WebSockets for real-time gameplay, and a database for storing game states.


 - Controller Layer → `REST APIs to interact with the frontend.`
 - Service Layer → `Game logic, rules, and player interactions.`
 - Repository Layer →` Handles database interactions for storing game state, player scores, and history.`
 - Entity Layer → `Represents game objects like cards, players, and the game board.`


## Features
- Multiplayer card game logic
- Real-time updates using WebSockets
- REST APIs for game management
- PostgreSQL/MySQL database integration
- Secure authentication (future enhancement)


## Technologies Used
- **Java 21**
- **Spring Boot** (Web, WebSocket, JPA, Validation)
- **PostgreSQL/MySQL**
- **Lombok** (for reducing boilerplate code)
- **Docker** (optional for deployment)

## Installation & Setup
### Prerequisites
- Java 21+
- Maven
- PostgreSQL or MySQL

### Clone the Repository
```sh
git clone git@github.com:mosa-retha/Cassino-game.git
cd Cassino-game
```

### Configure Database (`application.properties`)
For **PostgreSQL**:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cassino_db
spring.datasource.username=postgres
spring.datasource.password=12345678
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Build and Run the Application
```sh
mvn clean install
mvn spring-boot:run
```

## Cassino Rules
Cassino is a fishing card game where players try to capture cards from the table by matching them with their own.

### Objective
The goal is to capture cards from the table to score points.

### Setup
- 2-4 players
- A standard 40-card deck
- Each player is dealt **4 cards**
- **4 cards** are placed face-up on the table

### Gameplay
1. **Playing a Card**: On a player's turn, they must play one card from their hand.
2. **Capturing Cards**:
    - A card can **capture** if it matches a table card in rank.
    - Players can also capture by **summing** multiple cards to match the played card.
    - Face cards can only capture the same rank 
3. **Building**:
    - Players may create a "build" by grouping cards into a sum that they intend to capture later.
    - A build can only be captured by a player who made it unless another player adds to it.
4. **End of Round**:
    - Once all cards have been played, the last player to capture wins any remaining table cards.

### Scoring
- **10 of Diamonds** → 2 points
- **2 of Spades** → 1 point
- **Each Ace** → 1 point



## API Endpoints
| Method  | Endpoint                 | Description              |
|---------|--------------------------|--------------------------|
| POST    | `/game/start`            | Starts a new game        |
| POST    | `/game/{playerId}/capture` | Capture cards from table |
| POST    | `/game/{playerId}/build`   | Create a build           |
| POST    | `/game/{playerId}/play`    | Play a card              |
| GET     | `/game/{gameId}`          | Get game state           |
| GET     | `/game/{gameId}/players`  | Get players in the game  |
| GET     | `/game/{gameId}/table`    | Get cards on the table   |
| GET     | `/game/{gameId}/winner`   | Get the winner of the game |
 

## WebSocket Support
- Connect to `/game-websocket`
- Subscribe to `/topic/game-updates`

## Future Enhancements
- JWT authentication for secure sessions
- AI opponents for single-player mode

## License
MIT License

