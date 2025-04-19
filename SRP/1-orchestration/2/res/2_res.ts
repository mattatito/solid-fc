class StockValidator {
  validate(cart) {
    for (const item of cart.items) {
      if (item.stock < item.quantity) {
        throw new Error(`Produto ${item.name} sem estoque suficiente.`);
      }
    }
  }
}

class TaxCalculator {
  calculateTax(cart) {
    let total = 0;
    for (const item of cart.items) {
      total += item.price * item.quantity;
    }
    const tax = total * 0.1;
    total += tax;
  }
}

class ProcessPayment {
  process(userId) {
    console.log(`Processando pagamento para o usuário ${userId}`);
  }
}

class CheckoutService1 {
  constructor(
    private stockValidator: StockValidator,
    private taxCalculator: TaxCalculator,
    private processPayment: ProcessPayment
  ) {}

  processCheckout(cart: any, userId: string) {
    this.stockValidator.validate(cart);

    const total = this.taxCalculator.calculateTax(cart);
    console.log(`Total com impostos: R$${total}`);

    this.processPayment.process(userId);
  }
}
