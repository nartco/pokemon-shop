const getColorFromType = (type, background) => {
  if (!background) {
    switch (type) {
      case "normal":
        return "rgba(169, 144, 108, 1.0);";
      case "bug":
        return "rgba(215, 193, 18, 1.0);";
      case "dark":
        return "rgba(66, 75, 84, 1.0);";
      case "dragon":
        return "rgba(220, 104, 16, 1.0);";
      case "electric":
        return "rgba(201, 201, 0, 1.0)";
      case "fairy":
        return "rgba(243, 163, 204, 1.0);";
      case "fighting":
        return "rgba(201, 50, 7, 1.0);";
      case "fire":
        return "rgba(239, 71, 16, 1.0);";
      case "flying":
        return "rgba(169, 206, 212, 1.0);";
      case "ghost":
        return "rgba(132, 135, 194, 1.0);";
      case "grass":
        return "rgba(45, 115, 35, 1.0);";
      case "ground":
        return "rgba(116, 65, 16, 1.0);";
      case "ice":
        return "rgba(177, 189, 227, 1.0);";
      case "poison":
        return "rgba(67, 78, 74, 1.0);";
      case "psychic":
        return "rgba(164, 34, 128, 1.0);";
      case "rock":
        return "rgba(129, 128, 111, 1.0);";
      case "steel":
        return "rgba(174, 156, 126, 1.0);";
      case "water":
        return "rgba(7, 102, 182, 1.0);";
      case "shadow":
        return "rgba(25, 25, 25, 1.0);";
      case "unknown":
        return "rgba(66, 66, 66, 1.0);";
      default:
        break;
    }
  }

  switch (type) {
    case "normal":
      return "rgba(169, 144, 108, 0.10);";
    case "bug":
      return "rgba(215, 193, 18, 0.10);";
    case "dark":
      return "rgba(66, 75, 84, 0.10);";
    case "dragon":
      return "rgba(220, 104, 16, 0.10);";
    case "electric":
      return "rgba(253, 222, 8, 0.05);";
    case "fairy":
      return "rgba(243, 163, 204, 0.10);";
    case "fighting":
      return "rgba(201, 50, 7, 0.10);";
    case "fire":
      return "rgba(239, 71, 16, 0.10);";
    case "flying":
      return "rgba(169, 206, 212, 0.10);";
    case "ghost":
      return "rgba(132, 135, 194, 0.10);";
    case "grass":
      return "rgba(45, 115, 35, 0.10);";
    case "ground":
      return "rgba(116, 65, 16, 0.10);";
    case "ice":
      return "rgba(177, 189, 227, 0.10);";
    case "poison":
      return "rgba(28, 28, 28, 0.20);";
    case "psychic":
      return "rgba(164, 34, 128, 0.10);";
    case "rock":
      return "rgba(129, 128, 111, 0.10);";
    case "steel":
      return "rgba(174, 156, 126, 0.10);";
    case "water":
      return "rgba(7, 102, 182, 0.10);";
    case "shadow":
      return "rgba(25, 25, 25, 0.10);";
    case "unknown":
      return "rgba(66, 66, 66, 0.10);";
    default:
      break;
  }
};

export { getColorFromType as default };
