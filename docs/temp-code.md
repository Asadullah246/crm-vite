function isValidDuration(type, duration, details) {
  if (type === 'emi') {
    return duration >= details.minDuration && duration <= details.maxDuration;
  } else if (type === 'subscription') {
    return duration >= details.minDuration && duration <= details.maxDuration;
  }
  return false;
}

// Example usage
const emiOptions = { minDuration: 3, maxDuration: 6, pricePerMonth: 180 };
console.log(isValidDuration('emi', 4, emiOptions)); // true
console.log(isValidDuration('emi', 7, emiOptions)); // false
