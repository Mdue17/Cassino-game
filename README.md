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

-   Controller Layer → `REST APIs to interact with the frontend.`
-   Service Layer → `Game logic, rules, and player interactions.`
-   Repository Layer →` Handles database interactions for storing game state, player scores, and history.`
-   Entity Layer → `Represents game objects like cards, players, and the game board.`

## Features

-   Multiplayer card game logic
-   Real-time updates using WebSockets
-   REST APIs for game management
-   Post-greSQL/MySQL database integration
-   Secure authentication (future enhancement)

## Technologies Used

-   **Java 21**
-   **Spring Boot** (Web, WebSocket, JPA, Validation)
-   **PostgreSQL/MySQL**
-   **Lombok** (for reducing boilerplate code)
-   **Docker** (optional for deployment)

## Installation & Setup

### Prerequisites

-   Java 21+
-   Maven
-   PostgreSQL or MySQL

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

Collect as many points as possible by capturing cards with point values.

#### **Setup**

1. Use a **40-card deck** (remove all Jacks, Queens, and Kings from a standard 52-card deck).
2. Shuffle the deck and deal **10 cards to each player** (for 2–4 players).
3. Place the remaining deck aside for the **second half of the game** (this will be used later).

### **Gameplay**

1. Players take turns in clockwise order.
2. On your turn, you must do one of the following:

    - **Place a card on the table**: Play a card face-up in front of you to start or add to a build.
    - **Build a number**: Combine cards from your hand to create a build. For example, if you have a 3 and a 4, you can build a 7. You can only build **one numbered combination per turn**.
    - **Capture built cards**: If you have a card in your hand that matches the value of another player’s build, you can capture that build and add it to your score pile. For example, if a player has built a 7 and you play a 7, you capture their build.

3. **Building Restrictions**:

    - A player **cannot** build a number that is **already being built** by another player.

4. **Captured Cards Rule**:

    - When a player captures cards, **all captured cards are placed face-up in their score pile**.
    - The **last card** of the captured build can be used to **add to an existing build** but **cannot be used to start a new build**.

5. After placing, building, or capturing, your turn ends, and the next player takes their turn.

### Scoring

-   **10 of Diamonds** → 2 points
-   **2 of Spades** → 1 point
-   **Each Ace** → 1 point

**Additional Points** (only apply if the player has collected at least 1 point from the normal scoring above):

-   **20 cards collected** → 1 point
-   **21 cards collected** → 2 points
-   **5 Spades collected** → 1 point
-   **6 Spades collected** → 2 points

## API Endpoints

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| POST   | `/game/start`              | Starts a new game          |
| POST   | `/game/{playerId}/capture` | Capture cards from table   |
| POST   | `/game/{playerId}/build`   | Create a build             |
| POST   | `/game/{playerId}/play`    | Play a card                |
| GET    | `/game/{gameId}`           | Get game state             |
| GET    | `/game/{gameId}/players`   | Get players in the game    |
| GET    | `/game/{gameId}/table`     | Get cards on the table     |
| GET    | `/game/{gameId}/winner`    | Get the winner of the game |

## WebSocket Support

-   Connect to `/game-websocket`
-   Subscribe to `/topic/game-updates`

## Future Enhancements

-   JWT authentication for secure sessions
-   AI opponents for single-player mode

## License

MIT License
