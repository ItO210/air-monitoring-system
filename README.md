# IoT Air Quality Monitoring System  

This project is an IoT-based Air Quality Monitoring System that uses an ESP32 microcontroller to collect environmental data (temperature, humidity, and air quality) from sensors. The data is sent to a REST API, stored in a MySQL database, and visualized on a web-based dashboard.

This project was developed in **September 2023**

## Features

- **Real-time Sensor Data Collection**: The ESP32 reads temperature, humidity, and air quality values from connected sensors.
- **Wi-Fi Data Transmission**: The ESP32 sends sensor data to a REST API for storage and processing.
- **REST API & Database Integration**: A backend Node.js API records incoming sensor data in a MySQL database for historical tracking.
- **Web-Based Dashboard**: A frontend interface allows users to view real-time and historical data in a graphical format.
- **Data Visualization**: Users can analyze environmental trends using charts and tables.

## Preview

<img width="1707" alt="Screenshot 2025-03-26 at 10 07 24 a m" src="https://github.com/user-attachments/assets/b35eeeb8-70c8-471d-8f1e-28fa4d2da4b7" />
<img width="1369" alt="Screenshot 2025-03-26 at 10 08 55 a m" src="https://github.com/user-attachments/assets/40f33ad0-bf3d-4232-b4a7-fa059fb92086" />

## Usage

1. Set Up the MySQL Database

- Start a MySQL instance.
- Navigate to the database folder.
- Run the AireSano.sql file to create the database and necessary tables.

2. Configure & Run the API

- Navigate to the api folder.
  
- Either:
  
  - Create a .env file with the following fields:
    
    ```ini
    DB_HOST=your_mysql_host
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database_name
    
  - OR manually configure the database credentials in api/helpers/mysql-config.js.
 
  - Install dependencies and start the API:
    
    ```sh
    npm install
    npm start
    ```
    
3. Configure & Run the Frontend

- Navigate to the frontend folder.
- Open the frontend .js files and update the fetch requests to point to your API instance.
- Install dependencies and run the frontend:
  
  ```sh
    npm install
    npm start
  ```

4. Set Up the ESP32 Hardware

Before uploading the firmware, you need to assemble the ESP32 with its sensors.

- Required Maerials:
  
<img width="1503" alt="Materiales" src="https://github.com/user-attachments/assets/65b73609-332a-492f-8c97-7ba41984c368" />

- Wiring Diagram:
  
![Prototipo Final](https://github.com/user-attachments/assets/5aedd3fb-ab74-4bad-85bb-997c6cb21dc4)

  - Connect the air quality, temperature, and humidity sensors to the ESP32 following the wiring diagram.

  - Ensure proper power supply and secure connections.

5. Configure & Upload the ESP32 Firmware

- Navigate to the esp32 folder.
- Open arduino.ino in the Arduino IDE.
- Update the following fields in the code:

  ```cpp
  #define WIFI_NETWORK "your_wifi_ssid"
  #define WIFI_PASSWORD "your_wifi_password"
  #define SERVER_NAME "http://your_api_endpoint"
  ```

- Compile and upload the code to your ESP32.

## Contributors  
This project was developed collaboratively by:  

- [Carlos Ito]()  
- [Carolina Figueroa]()  
- [Eduardo Dario]()  
