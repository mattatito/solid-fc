class BookingValidator {
  validateBooking(startDate, endDate) {
    if (startDate >= endDate) {
      throw new Error("Data de check-out deve ser após a data de check-in");
    }
  }
}

class PriceCalculator {
  calculatePrice(startDate, endDate, dailyRate) {
    const durationInDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = dailyRate * durationInDays;
    return totalPrice;
  }
}

class EmailService {
  sendConfirmation(email) {
    console.log(`Enviando e-mail de confirmação para ${email}`);
  }
}

class BookingService1 {
  constructor(
    private validator: BookingValidator,
    private priceCalculator: PriceCalculator,
    private emailService: EmailService
  ) {}

  processBooking(bookingDetails: any) {
    this.validator.validateBooking(
      bookingDetails.startDate,
      bookingDetails.endDate
    );

    const totalPrice = this.priceCalculator.calculatePrice(
      bookingDetails.startDate,
      bookingDetails.endDate,
      bookingDetails.dailyRate
    );
    console.log(`Preço total calculado: R$${totalPrice}`);

    this.emailService.sendConfirmation(bookingDetails.email);
  }
}
