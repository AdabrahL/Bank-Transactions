 class Account {
    constructor(owner, balance = 0) {
      this.owner = owner;
      this.balance = balance;
    }

    deposit(amount) {
      if (amount <= 0) {
        this._showPopup("Amount must be positive.");
        return;
      }
      const fee = amount * 0.01;
      const netAmount = amount - fee;
      this.balance += netAmount;
      this._showPopup(`Deposited ₵${amount.toFixed(2)} (1% fee: ₵${fee.toFixed(2)}). New balance: ₵${this.balance.toFixed(2)}`);
      updateBalanceUI();
    }

    withdraw(amount) {
      if (amount <= 0) {
        this._showPopup("Withdrawal must be positive.");
        return;
      }
      const fee = amount * 0.01;
      const total = amount + fee;
      if (total > this.balance) {
        this._showPopup("Insufficient balance.");
        return;
      }
      this.balance -= total;
      this._showPopup(`Withdrew ₵${amount.toFixed(2)} (1% fee: ₵${fee.toFixed(2)}). New balance: ₵${this.balance.toFixed(2)}`);
      updateBalanceUI();
    }

    checkBalance() {
      this._showPopup(`${this.owner}'s current balance is ₵${this.balance.toFixed(2)}`);
    }

    _showPopup(message) {
      alert(message); 
      showToast(message);
    }
  }

  const myAccount = new Account('Lincoln');

  function getAmount() {
    const amount = parseFloat(document.getElementById('amount').value);
    return isNaN(amount) ? 0 : amount;
  }

  function deposit() {
    const amount = getAmount();
    myAccount.deposit(amount);
  }

  function withdraw() {
    const amount = getAmount();
    myAccount.withdraw(amount);
  }

  function checkBalance() {
    myAccount.checkBalance();
  }

  function updateBalanceUI() {
    document.getElementById('balance').textContent = `Balance: ₵${myAccount.balance.toFixed(2)}`;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
  }
