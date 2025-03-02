# TalkSynk - Chat Application

Welcome to **TalkSynk**, a simple command-line chat application built using **Kafka**. TalkSynk allows users to create chat rooms, join rooms, send messages, and list available rooms and users. This project leverages **Kafka** for real-time messaging and **Inquirer.js** for interactive command-line prompts.

---

## Features

-   **Create Room**: Create a new chat room.
-   **Join Room**: Join an existing chat room.
-   **Send Message**: Send messages to a selected room.
-   **List Rooms**: View all available chat rooms.
-   **List Users**: View all active users (based on Kafka consumer groups).
-   **Exit**: Exit the application.

---

## Installation

### Prerequisites

-   **Node.js**: Ensure Node.js is installed on your machine. You can download it from [here](https://nodejs.org/).
-   **Kafka**: This application uses Apache Kafka for messaging. You need a Kafka instance running on your machine or a Kafka service you can connect to. You can find installation instructions [here](https://kafka.apache.org/quickstart).

### Steps to Run

1.  Clone this repository to your local machine:

    ```bash
    git clone [https://github.com/narottamandeep2003/TalkSynk.git](https://github.com/narottamandeep2003/TalkSynk.git)
    cd talksynk
    ```

2.  Install the necessary dependencies:

    ```bash
    npm install
    ```

3.  Make sure Kafka is running locally on port 9092. If you need a Kafka setup, follow the Kafka Quick Start Guide.

4.  Run the application:

    ```bash
    node app.js
    ```

# Documentation

## How It Works

### Main Menu

Once the application starts, the user is presented with the following options in the main menu:

1.  **Create Room**: Creates a new Kafka topic (room).
2.  **Join Room**: Join an existing room (topic) and start receiving messages.
3.  **Send Message**: Send a message to an existing room.
4.  **List Rooms**: List all the available rooms (Kafka topics).
5.  **List Users**: List all active users (based on consumer groups in Kafka).
6.  **Exit**: Exit the application.

### Core Functionality

**Kafka Setup**

This application connects to Kafka using the `kafkajs` library. It supports the following Kafka components:

-   **Producer**: Used to send messages to rooms (Kafka topics).
-   **Consumer**: Used to listen and consume messages from rooms.
-   **Admin**: Used for administrative tasks like creating topics and listing rooms.

**Actions**

**Create Room:**

-   Prompts the user for a room name.
-   Creates a Kafka topic based on the room name.

**Join Room:**

-   Prompts the user to select an available room.
-   Prompts the user to input their name.
-   Subscribes to the selected room and listens for incoming messages.

**Send Message:**

-   Prompts the user to input a message.
-   Sends the message to the selected room (Kafka topic).

**List Rooms:**

-   Lists all available rooms (Kafka topics), excluding internal topics (those starting with `__`).

**List Users:**

-   Lists all consumer groups (active users).

## Example Usage

1.  **Create a Room**

    **Input:**

    ```bash
    Please choose an action:
    > Create Room
    Enter Room Name: General
    ```

    **Output:**

    ```bash
    Creating topic: General
    Topic "General" created successfully.
    ```

2.  **Join a Room**

    **Input:**

    ```bash
    Please choose an action:
    > Join Room
    Select a Room to Join: General
    Enter your Name: JohnDoe
    ```

    **Output:**

    ```bash
    Subscribed to topic: General
    User: JohnDoe - Message: Hello everyone!
    ```

3.  **Send a Message**

    **Input:**

    ```bash
    Please choose an action:
    > Send Message
    Select a Room to Join: General
    Enter your Name: JohnDoe
    Enter your message: Hello, how are you all?
    ```

    **Output:**

    ```bash
    Message sent successfully to General
    ```

4.  **List Rooms**

    **Input:**

    ```bash
    Please choose an action:
    > List Rooms
    ```

    **Output:**

    ```bash
    Listing available rooms (topics):
    1. General
    2. TechTalk
    ```

5.  **List Users**

    **Input:**

    ```bash
    Please choose an action:
    > List Users
    ```

    **Output:**

    ```bash
    Group ID: JohnDoe
    Group ID: Alice
    ```