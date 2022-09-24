console.clear();

class ATM {
    constructor(banknotes) {
        this.allBanknotes = banknotes;

        this.availableBanknotes = new Map();

        this.allBanknotes.forEach(banknote => {
            this.availableBanknotes.set(banknote, 0);
        });
    }

    incasation(banknotes) {
        banknotes.forEach((value, key) => {
            if (this.allBanknotes.includes(key)) {
                this.availableBanknotes.set(key, value);
            } else throw new Error('Invalid banknote');
        })
    }

    withdraw(amount) {
        let money = amount;
        const availableBanknotes = new Map(this.availableBanknotes);

        const banknotes = [];
        for (const key of availableBanknotes.keys()) {
            banknotes.push(key);
        }

        banknotes.sort((a, b) => b - a);

        banknotes.forEach(banknote => {
            const count = Math.trunc(money / banknote);
            const banknoteCount = availableBanknotes.get(banknote);
            if (count > 0) {
                money -= banknote * (banknoteCount > count ? count : banknoteCount);
                availableBanknotes.set(banknote, banknoteCount > count ? banknoteCount - count : 0);
            }
        })

        if (money !== 0) {
            throw new Error('Not enough money');
        } else {
            this.availableBanknotes = availableBanknotes;
        }
    }

    getAvailable() {
        return [...this.availableBanknotes];
    }

    calculateTotalMoneyCount() {
        let total = 0;
        this.availableBanknotes.forEach((value, key) => {
            total += key * value;
        })

        return total;
    }
}

const atm = new ATM([1, 5, 10, 20, 50, 100, 200]);

console.log(atm.getAvailable());

const money = new Map();
money.set(1, 100);
money.set(5, 100);
money.set(10, 100);
money.set(20, 100);
money.set(50, 1);
money.set(100, 0);
money.set(200, 0);

atm.incasation(money);


console.log(atm.getAvailable());
console.log(atm.calculateTotalMoneyCount());

atm.withdraw(255);
console.log(atm.getAvailable());