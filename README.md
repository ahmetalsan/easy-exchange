# Getting Started

## Pre-requisites

* Node.js version 20.0.0 or higher
* NVM (Node Version Manager) is recommended for managing Node.js versions (Optional)

## Installation

* You have to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/en/download/). Alternatively, you can use NVM to manage Node.js versions, this project also has a `.nvmrc` file which specifies the Node.js version to use.
* Install the dependencies by running the following command in the root directory of the project

    ```bash
    npm install
    ```

## Running the development server

* Run the development server by running the following command after dependencies are installed

    ```bash
    npm run dev
    ```

* Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Notes

* This project has `.env.prod` file which contains the environment variables for production. Currently, i have `EXCHANGE_RATE_API_KEY` key and value hardcoded in the `.env.prod` file. This is not recommended for production in real world applications but good enough for this project.
* This project should have `.env.local` file which contains the environment variables for development, if you want to run this locally. That file is ignored by default in this project, and should has the same content as `.env.prod` file (For testing purposes, this should be different and much more securely done in real life applications).