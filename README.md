# React Native Project - Contacts Manager

This is a React Native project for managing contacts. Follow the steps below to run the project on Android and iOS using Yarn.

## Prerequisites

- Node.js installed on your machine
- Yarn package manager installed globally

## Getting Started

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your-username/contacts-manager.git
   ```

2. Navigate to the project directory:

   ```shell
   cd contacts-manager
   ```

3. Install the project dependencies using Yarn:

   ```shell
   yarn install
   ```

### Running on Android

1. Make sure you have an Android emulator or a physical device connected to your machine.

2. Start the Metro bundler:

   ```shell
   yarn start
   ```

3. In a separate terminal window, run the app on Android:

   ```shell
   yarn android
   ```

### Running on iOS

1. Make sure you have Xcode installed on your machine.

2. Start the Metro bundler:

   ```shell
   yarn start
   ```

3. In a separate terminal window, run the app on iOS:

   ```shell
   cd ios && pod install

   yarn ios
   ```

## Testing

To run the tests for this project, follow the steps below:

1. Make sure you have the project dependencies installed by running the following command:

   ```shell
   yarn install
   ```

2. Run the tests using the following command:

   ```shell
   yarn test
   ```

The test suite will then be executed, and you will see the results in the terminal.

## Third party libraries used

1. `expo-camera` for photo capture
2. `expo-image-picker` for photo library
3. `react-hook-form` for form validations and management
4. `react-native-contacts` for phonebook access
5. `react-redux` for store

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
