#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.italic.cyanBright(`
                ******************************************************************************************************************** \n
                ||    %%%%%%%  %%%%%%%  %%%%%%%    %%         %%  %%     %%    %%%%%%%        %%       %%       %%   %%     %%    ||
                ||    %%   %%  %%   %%  %%   %%    %% %%   %% %%    %% %%      %%     %%    %%   %%    %% %%    %%   %%   %%      ||
                ||    %%   %%  %%   %%  %%%%%%%    %%  %% %%  %%      %%       %%%%%%%     %% %%% %%   %%   %%  %%   %% %%        ||
                ||    %%   %%  %%   %%  %%         %%   %%    %%      %%       %%     %%   %%     %%   %%    %% %%   %%   %%      ||
                ||    %%%%%%%  %%%%%%%  %%         %%    %    %%      %%       %%%%%%%     %%     %%   %%       %%   %%     %%    || \n
                ******************************************************************************************************************** \n                  
 
      `));
class BankAccount {
    constructor(accNumber, balance) {
        this.accNumber = accNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance <= amount) {
            this.balance -= amount;
            console.log(chalk.bold.italic.magentaBright(`withdrawal of $${amount} successful.Your remaining balance is $${this.balance}`));
        }
        else {
            console.log(chalk.bold.italic.redBright("Insufficient balance"));
        }
    }
    deposite(amount) {
        if (amount > 100) {
            amount -= 1; // $1 free charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.bold.italic.yellowBright(`Deposite of $${amount} successful.Remaining balance is $${this.balance}`));
    }
    checkBalance() {
        console.log(chalk.bold.italic.yellowBright(`Current balance: $${this.balance}`));
    }
}
class Custumer {
    constructor(firstname, lastname, gender, age, mobilenumber, account) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.age = age;
        this.account = account;
        this.mobilenumber = mobilenumber;
    }
}
//creat bank account
const account = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 1500),
];
//creat custumer
const customers = [
    new Custumer("Rabia", "Sohail", "Female", 35, +923170809389, account[0]),
    new Custumer("Sohail Khan", "Zai", "Male", 45, +923127947191, account[1]),
    new Custumer("Yashal", "Khan", "Female", 20, +923453428644, account[2]),
];
async function service() {
    do {
        const answer = await inquirer.prompt({
            message: chalk.bold.italic.greenBright("Enter your account number."),
            type: "number",
            name: "AccountNumber"
        });
        const custumer = customers.find(custumer => custumer.account.accNumber === answer.AccountNumber);
        if (custumer) {
            console.log(chalk.bold.italic.cyanBright(`Welcome, ${custumer.firstname} ${custumer.lastname}\n`));
            const ans = await inquirer.prompt({
                message: chalk.bold.italic.greenBright("Please select an operation."),
                type: "list",
                name: "select",
                choices: ["Withdraw", "Deposite", "Check Balance", "Exit"]
            });
            switch (ans.select) {
                case "Deposite":
                    const depositeAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bold.italic.greenBright("Please amount to deposit.")
                    });
                    custumer.account.deposite(depositeAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bold.italic.greenBright("Please amount to withdraw")
                    });
                    custumer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    custumer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.bold.italic.yellowBright("Exiting bank program......."));
                    console.log(chalk.bold.italic.yellowBright("\n Thank you for using our bank services.Have a great day."));
                    return;
            }
        }
        else {
            console.log(chalk.bold.italic.redBright("Invalid account number.Please try again...."));
        }
    } while (true);
}
service();
