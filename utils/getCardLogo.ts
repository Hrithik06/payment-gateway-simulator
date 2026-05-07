import { CardType } from "@/types";

export const getCardLogo = (cardType: CardType) => {
  switch (cardType) {
    case "visa":
      return "/cards/visa.svg";

    case "mastercard":
      return "/cards/mastercard.svg";

    case "amex":
      return "/cards/amex.svg";

    case "discover":
      return "/cards/discover.svg";
    default:
      return "/cards/unknown.svg";
  }
};
