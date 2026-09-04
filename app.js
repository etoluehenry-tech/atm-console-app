// var , let, const
import readline from "node:readline";

// // Create interface for input/output
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// create user accounts or database
const accounts = [
  {
    name: "Henry",
    type: "savings",
    balance: 100,
    pin: 12,
  },
  {
    name: "Divine",
    type: "savings",
    balance: 10000000,
    pin: 13,
  },
  {
    name: "Arinze",
    type: "savings",
    balance: -10000,
    pin: 14,
  },
];

// create bank menu options
const options = ["Withdraw", "Transfer", "Check balance"];


const showMenu = (account) => {
    const optionsString = options
      .map((value, idx) => `${idx + 1}: ${value} \n`)
      .join('');

  const question = `Hello, ${account.name}!\nSelect one of the following options to continue:\n${optionsString}x: Dismiss\n`;
//   const question = "Hello, " + account.name + "!\n"  + "Select one of the following options to continue: \n" + optionsString;

  prompt.question(question, (option) => {
    console.log("You have selected option ", option);
    switch (option) {
        //assignment
       case "1": // Allow user to withdraw money
        prompt.question("Enter the amount you want to withdraw: ", (amountInput) => {
          let  amount = Number(amountInput);
          let balance = account.balance;
          let newBalance = balance - amount;
          if (amount <= 0 ){
            console.log("Please enter a valid amount.");
            continueOrStopMenu(account);
            return;
          }
           if (amount > balance) {
            console.log("You have insufficient funds to withdraw.");
          } else if (amount <= balance) {
        
            console.log(`You have successfully withdrawn ${amount}. Your new balance is ${newBalance}.`);
          }
        continueOrStopMenu(account);
        })
        
        continueOrStopMenu(account);
        break;

      case "2": // Allow user to transfer money
          prompt.question("Enter amount to transfer: ", (amount) => {
          amount = Number(amount);

          if (amount > account.balance) {
            console.log("Insufficient balance");
          }
          else if (amount < account.balance) {
            let accountNumber = prompt.question("Enter account number: ", (accountNumber) => {
              console.log(`You have transferred ${amount} to account number ${accountNumber}`);
              account.balance = account.balance - amount;
              console.log(`Your new balance is ${account.balance}`);
              continueOrStopMenu(account);
            });
          };
        continueOrStopMenu(account);
     } )
        break;
      case "3": // Allow user to check balance
        const balance = account.balance;
        console.log(`Your account balance is: ${balance}`);
        continueOrStopMenu(account);
        break;
      case "x": // Allow user to exit
        console.log("Thank you for banking with us.");
        prompt.close();
        break;
      default:
        console.log("You have selected a wrong option");
        continueOrStopMenu(account);
    }

  });
};

function continueOrStopMenu(account) {
  prompt.question("\n 00. Main Menu \n x. Dismiss \n\n", (option) => {
    if (option == "00") {
      return showMenu(account);
    } else if (option == "x") {
      prompt.close();
    } else {
      console.log("You have entered a option.");
      continueOrStop(account);
    }
  });
}


const App = () => {
  // Ask a question and handle the response
  prompt.question("Enter pin: ", (pin) => {
    const account = accounts.find((v) => v.pin === Number(pin));

    if (!account) {
      console.log("Account does not exist");
      prompt.close();
      return;
    }

    console.log({ account });

    // show menu
    showMenu(account);
  });
};



// Handle application exit
prompt.on("close", () => {
  console.log("\n Goodbye!");
  process.exit(0);
});

App();